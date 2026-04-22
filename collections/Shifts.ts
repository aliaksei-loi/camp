import type { CollectionConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Shifts: CollectionConfig = {
  slug: "shifts",
  admin: {
    useAsTitle: "theme",
    defaultColumns: ["num", "theme", "datesLine1", "spotsLeft", "soldOut", "_status"],
    preview: generatePreviewURL("/#schedule"),
    livePreview: livePreview("/#schedule"),
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
    { name: "num", type: "number", required: true, admin: { description: "Display number (1..6)" } },
    { name: "datesLine1", type: "text", required: true, admin: { description: "e.g. '07 — 16'" } },
    { name: "datesLine2", type: "text", required: true, admin: { description: "e.g. 'июня'" } },
    { name: "theme", type: "text", required: true },
    { name: "spotsTotal", type: "number", defaultValue: 42 },
    { name: "spotsLeft", type: "number", defaultValue: 0 },
    { name: "soldOut", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower numbers render first" } },
  ],
};
