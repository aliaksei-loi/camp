import type { GlobalConfig } from "payload";

import { generatePreviewURL, livePreview } from "@/lib/payload/preview";
import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const BookingPage: GlobalConfig = {
  slug: "booking-page",
  versions: { drafts: true },
  admin: {
    preview: generatePreviewURL("/booking"),
    livePreview: livePreview("/booking"),
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateOnPublish("/booking")],
  },
  fields: [
    {
      name: "periodLabel",
      type: "text",
      required: true,
      admin: {
        description:
          "Период кемпа. Если значение в Schedule global отличается — единственный источник истины — Schedule.",
      },
    },
    {
      name: "periodSub",
      type: "text",
      admin: {
        description:
          "Короткий подтекст под датами (напр. «приезд и отъезд в любой день · единая стоимость»).",
      },
    },
    {
      name: "heroIntro",
      type: "textarea",
      admin: {
        description: "Параграф под H1 на /booking.",
      },
    },
  ],
};
