import type { CollectionConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    preview: generatePreviewURL("/about"),
    livePreview: livePreview("/about"),
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOnPublish("/about")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true, admin: { description: "e.g. 'основатель · повар'" } },
    { name: "bio", type: "textarea", required: true },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: { description: "Portrait. If missing, a placeholder renders." },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower numbers render first" } },
  ],
};
