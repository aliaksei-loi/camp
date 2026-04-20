import type { CollectionConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order", "_status"],
    preview: () =>
      `/api/preview?secret=${process.env.PREVIEW_SECRET ?? ""}&path=/%23faq`,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
  },
  versions: { drafts: true },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "open",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show expanded by default on the page" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers render first" },
    },
  ],
};
