import type { GlobalConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Nav: GlobalConfig = {
  slug: "nav",
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    { name: "brandLabel", type: "text", defaultValue: "Belcreation" },
    {
      name: "scrollLinks",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, admin: { description: "e.g. /, /about, /#accom" } },
      ],
    },
    {
      name: "pinnedLink",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "marqueeItems",
      type: "array",
      admin: { description: "Scrolling strip below the top bar" },
      fields: [{ name: "text", type: "text", required: true }],
    },
  ],
};
