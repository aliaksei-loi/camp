import type { GlobalConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

const scheduleItemFields = [
  { name: "time", type: "text" as const },
  { name: "title", type: "text" as const, required: true },
  { name: "description", type: "text" as const },
];

export const Schedule: GlobalConfig = {
  slug: "schedule",
  versions: { drafts: true },
  admin: {
    preview: generatePreviewURL("/"),
    livePreview: livePreview("/"),
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "titleLine1", type: "text" },
    { name: "titleLine2", type: "text" },
    { name: "periodLabel", type: "text" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    { name: "trackKidsLabel", type: "text" },
    { name: "trackOlderLabel", type: "text" },
    {
      name: "days",
      type: "array",
      minRows: 5,
      maxRows: 6,
      fields: [
        { name: "dateLabel", type: "text", required: true },
        { name: "theme", type: "text" },
        {
          name: "kidsItems",
          type: "array",
          minRows: 1,
          maxRows: 12,
          fields: scheduleItemFields,
        },
        {
          name: "olderItems",
          type: "array",
          minRows: 1,
          maxRows: 12,
          fields: scheduleItemFields,
        },
      ],
    },
  ],
};
