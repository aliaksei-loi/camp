import type { CollectionConfig } from "payload";

import { revalidateOnPublish } from "@/lib/payload/revalidate-on-publish";

export const Lodges: CollectionConfig = {
  slug: "lodges",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "tag", "order", "_status"],
    preview: () =>
      `/api/preview?secret=${process.env.PREVIEW_SECRET ?? ""}&path=/%23accom`,
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
    { name: "name", type: "text", required: true },
    { name: "meta", type: "text", required: true, admin: { description: "Short meta line, e.g. 'до 4 человек · деревянный настил'" } },
    { name: "price", type: "text", required: true, admin: { description: "e.g. 'от 140 р / ночь'" } },
    { name: "image", type: "upload", relationTo: "media", required: false },
    { name: "tag", type: "text", admin: { description: "Optional badge text like '★ Популярно' or 'Новое'" } },
    { name: "tagBg", type: "text", admin: { description: "Optional CSS colour/var for tag background" } },
    { name: "tagColor", type: "text", admin: { description: "Optional CSS colour/var for tag text" } },
    { name: "mood", type: "text", admin: { description: "Deprecated — used by placeholder fallback while real photos are missing. Values: tent/lake/forest/sunset/dune/meadow/campfire/kids" } },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
