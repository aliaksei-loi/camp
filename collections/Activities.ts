import type { CollectionConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Activities: CollectionConfig = {
  slug: "activities",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "icon", "order"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text", required: true },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: {
        description:
          "Sprite id. Known values: ic-canoe, ic-leaf, ic-marshmallow, ic-bowl, ic-map, ic-star, ic-guitar, ic-tree, ic-tent, ic-fire, ic-heart.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers render first" },
    },
  ],
};
