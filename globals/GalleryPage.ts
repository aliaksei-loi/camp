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
      name: "hidePage",
      type: "checkbox",
      label: "Скрыть страницу целиком (404)",
      defaultValue: false,
      admin: { description: "Если включено — страница возвращает 404. Content preserved." },
    },
    {
      name: "sectionVisibility",
      type: "group",
      admin: { description: "Hide sections without deleting their content" },
      fields: [
        { name: "hideHero", type: "checkbox", label: "Скрыть: Заголовок + фильтры", defaultValue: false },
        { name: "hideWall", type: "checkbox", label: "Скрыть: Сетка фотографий", defaultValue: false },
        { name: "hideInstaStrip", type: "checkbox", label: "Скрыть: Telegram / Instagram полоса", defaultValue: false },
      ],
    },
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
