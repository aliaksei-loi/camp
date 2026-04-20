import type { CollectionConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Plans: CollectionConfig = {
  slug: "plans",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "featured", "order", "_status"],
    preview: () =>
      `/api/preview?secret=${process.env.PREVIEW_SECRET ?? ""}&path=/%23pricing`,
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
    { name: "eyebrow", type: "text", required: true, admin: { description: "Small caption above the name, e.g. 'базовый'" } },
    { name: "name", type: "text", required: true },
    { name: "price", type: "text", required: true, admin: { description: "Display string, e.g. '1 400' — non-breaking spaces ok" } },
    { name: "perUnit", type: "text", defaultValue: "р / человек" },
    { name: "nights", type: "text", defaultValue: "за смену · 10 дней" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      admin: { description: "Bullet list shown under the price" },
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { description: "Adds the 'любимый выбор' ribbon + strong styling" } },
    { name: "btnClass", type: "text", admin: { description: "Optional CSS modifier for the CTA button, e.g. 'ghost'" } },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower numbers render first" } },
  ],
};
