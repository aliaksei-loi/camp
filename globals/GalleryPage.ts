import type { GlobalConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const GalleryPage: GlobalConfig = {
  slug: "gallery-page",
  versions: { drafts: true },
  admin: {
    preview: generatePreviewURL("/gallery"),
    livePreview: livePreview("/gallery"),
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/gallery")],
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
        { name: "sub", type: "textarea" },
      ],
    },
    {
      name: "telegramStrip",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "handle", type: "text", admin: { description: "e.g. @belcreation.camp" } },
        { name: "body", type: "textarea" },
        { name: "ctaLabel", type: "text" },
        { name: "ctaHref", type: "text" },
      ],
    },
    {
      name: "instaTiles",
      type: "array",
      minRows: 0,
      maxRows: 12,
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: false },
        { name: "mood", type: "text", admin: { description: "Placeholder fallback" } },
      ],
    },
  ],
};
