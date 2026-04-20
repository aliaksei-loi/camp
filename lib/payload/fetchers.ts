import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { z } from "zod";

import config from "@payload-config";

// ---------- FAQs ----------

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

// ---------- Activities ----------

const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number().nullish(),
});

export type Activity = z.infer<typeof ActivitySchema>;

const ActivitiesSchema = z.array(ActivitySchema);

export const getActivities = async (): Promise<Activity[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "activities",
    sort: "order",
    limit: 100,
  });
  return ActivitiesSchema.parse(docs);
};
