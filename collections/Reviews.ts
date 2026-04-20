import type { CollectionConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "rating", "order"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    { name: "text", type: "textarea", required: true },
    { name: "authorName", type: "text", required: true },
    { name: "authorMeta", type: "text", required: true, admin: { description: "e.g. 'Минск · 2 детей'" } },
    { name: "authorPhoto", type: "upload", relationTo: "media", required: false },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "mood", type: "text", admin: { description: "Deprecated — placeholder fallback. Values: kids/sunset/forest/meadow/lake/etc" } },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
