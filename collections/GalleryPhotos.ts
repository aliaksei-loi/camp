import type { CollectionConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const GalleryPhotos: CollectionConfig = {
  slug: "gallery-photos",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "shape", "order"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOnPublish("/gallery")],
  },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: false },
    { name: "title", type: "text", required: true },
    { name: "meta", type: "text", admin: { description: "e.g. 'Смена 3 · 2025'" } },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Кемпинг", value: "camp" },
        { label: "Дети", value: "kids" },
        { label: "Еда", value: "food" },
        { label: "Природа", value: "nature" },
        { label: "Костры и ночь", value: "night" },
        { label: "Вода", value: "water" },
      ],
    },
    {
      name: "shape",
      type: "select",
      required: true,
      defaultValue: "sq",
      options: [
        { label: "wide", value: "wide" },
        { label: "tall", value: "tall" },
        { label: "short", value: "short" },
        { label: "square", value: "sq" },
      ],
    },
    {
      name: "style",
      type: "select",
      options: [{ label: "Polaroid", value: "polaroid" }],
    },
    { name: "isVideo", type: "checkbox", defaultValue: false },
    { name: "mood", type: "text", admin: { description: "Placeholder fallback mood. Deprecated once real images uploaded." } },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
