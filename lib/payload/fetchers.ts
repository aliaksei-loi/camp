import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { z } from "zod";

import config from "@payload-config";

const FaqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  open: z.boolean().nullish(),
  order: z.number().nullish(),
});

export type Faq = z.infer<typeof FaqSchema>;

const FaqsSchema = z.array(FaqSchema);

export const getFaqs = async (): Promise<Faq[]> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "faqs",
    draft,
    sort: "order",
    limit: 100,
    overrideAccess: draft,
  });
  return FaqsSchema.parse(docs);
};
