import type { GlobalConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  versions: { drafts: true },
  admin: {
    preview: generatePreviewURL("/about"),
    livePreview: livePreview("/about"),
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/about")],
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "titlePart1", type: "text", admin: { description: "Text before the first inline decorative image" } },
        { name: "titlePart2", type: "text", admin: { description: "Text between the two inline decorative images" } },
        { name: "titlePart3", type: "text", admin: { description: "Text after the second inline decorative image" } },
        { name: "sub", type: "textarea" },
      ],
    },
    {
      name: "photoCard",
      type: "group",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: false },
        { name: "caption", type: "text" },
      ],
    },
    {
      name: "storySections",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "pullQuote", type: "textarea", admin: { description: "Optional emphasized paragraph between heading and body" } },
      ],
    },
    {
      name: "valuesHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "text" },
      ],
    },
    {
      name: "values",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "num", type: "number", required: true },
        { name: "titleLine1", type: "text", required: true },
        { name: "titleLine2", type: "text" },
        { name: "text", type: "textarea", required: true },
      ],
    },
    {
      name: "teamHead",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "text" },
      ],
    },
    {
      name: "numbers",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "manifesto",
      type: "array",
      admin: {
        description:
          "Manifesto text split into segments. Use \\n inside text for line breaks. Toggle 'emphasized' to wrap the segment in a highlight span.",
      },
      fields: [
        { name: "text", type: "textarea", required: true },
        { name: "emphasized", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
