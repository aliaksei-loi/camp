import type { GlobalConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/")],
  },
  fields: [
    { name: "siteName", type: "text", defaultValue: "Belcreation" },
    {
      name: "defaultSEO",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media", required: false },
      ],
    },
    { name: "logo", type: "upload", relationTo: "media", required: false },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
        { name: "location", type: "text", admin: { description: "e.g. 'Минская обл., оз. Нарочь'" } },
      ],
    },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "telegramHandle", type: "text", admin: { description: "e.g. @belcreation.camp" } },
        { name: "telegramUrl", type: "text" },
        { name: "instagramUrl", type: "text" },
        { name: "youtubeUrl", type: "text" },
      ],
    },
  ],
};
