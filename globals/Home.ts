import type { GlobalConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Home: GlobalConfig = {
  slug: "home",
  versions: { drafts: true },
  admin: {
    preview: generatePreviewURL("/"),
    livePreview: livePreview("/"),
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return true;
    },
  },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "tag", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
        { name: "titleLine3", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "ctaPrimaryLabel", type: "text" },
        { name: "ctaPrimaryHref", type: "text" },
        { name: "ctaSecondaryLabel", type: "text" },
        { name: "ctaSecondaryHref", type: "text" },
        { name: "stickerLine1", type: "text" },
        { name: "stickerLine2", type: "text" },
        { name: "stickerLine3", type: "text" },
      ],
    },
    {
      name: "intro",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "headPart1", type: "text", admin: { description: "Text before the first inline icon" } },
        { name: "headIcon1", type: "text", admin: { description: "Sprite id (e.g. ic-tent)" } },
        { name: "headPart2", type: "text" },
        { name: "headIcon2", type: "text" },
        { name: "headPart3", type: "text" },
        { name: "sub", type: "textarea" },
      ],
    },
    {
      name: "quizBox",
      type: "group",
      fields: [
        { name: "pill", type: "text" },
        { name: "title", type: "text" },
        { name: "ctaLabel", type: "text" },
        { name: "ctaHref", type: "text" },
      ],
    },
    {
      name: "pillarsBand",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        {
          name: "pillars",
          type: "array",
          minRows: 3,
          maxRows: 3,
          fields: [
            { name: "icon", type: "text" },
            { name: "eyebrow", type: "text" },
            { name: "titleLine1", type: "text" },
            { name: "titleLine2", type: "text" },
            { name: "text", type: "textarea" },
            { name: "ctaLabel", type: "text" },
            { name: "ctaHref", type: "text" },
            { name: "bgColor", type: "text", admin: { description: "Optional CSS var for background, e.g. var(--c-blue)" } },
          ],
        },
      ],
    },
    {
      name: "accomHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "activitiesHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
      ],
    },
    {
      name: "scheduleHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
        { name: "ctaLabel", type: "text" },
        { name: "ctaHref", type: "text" },
      ],
    },
    {
      name: "galleryStrip",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
        {
          name: "tiles",
          type: "array",
          minRows: 0,
          maxRows: 7,
          fields: [
            { name: "image", type: "upload", relationTo: "media", required: false },
            { name: "mood", type: "text", admin: { description: "Placeholder fallback mood (deprecated once real photo is uploaded)" } },
          ],
        },
      ],
    },
    {
      name: "reviewsHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
      ],
    },
    {
      name: "faqHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titleLine1", type: "text" },
        { name: "titleLine2", type: "text" },
      ],
    },
  ],
};
