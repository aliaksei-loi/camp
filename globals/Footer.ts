import type { GlobalConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
        { name: "ctaLabel", type: "text" },
        { name: "ctaHref", type: "text" },
      ],
    },
    {
      name: "brand",
      type: "group",
      fields: [
        { name: "name", type: "text", defaultValue: "belcreation" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "navColumn",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "contactColumn",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "items",
          type: "array",
          fields: [{ name: "text", type: "text", required: true }],
        },
      ],
    },
    {
      name: "socialColumn",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text" },
          ],
        },
      ],
    },
    {
      name: "bottomLeft",
      type: "text",
      admin: { description: "e.g. © 2026 BELCREATION CAMP · СДЕЛАНО С ЛЮБОВЬЮ" },
    },
    { name: "bottomRight", type: "text", admin: { description: "e.g. ★ МИНСК — НАРОЧЬ ★" } },
  ],
};
