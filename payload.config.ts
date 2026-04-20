import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { seoPlugin } from "@payloadcms/plugin-seo";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Activities } from "./collections/Activities";
import { Faqs } from "./collections/Faqs";
import { Lodges } from "./collections/Lodges";
import { Plans } from "./collections/Plans";
import { Shifts } from "./collections/Shifts";
import { TeamMembers } from "./collections/TeamMembers";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [],
    },
    {
      slug: "media",
      upload: true,
      admin: { useAsTitle: "filename" },
      access: { read: () => true },
      fields: [
        { name: "alt", type: "text" },
      ],
    },
    Faqs,
    Activities,
    Shifts,
    Plans,
    TeamMembers,
    Lodges,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
    seoPlugin({
      collections: [],
      uploadsCollection: "media",
      generateTitle: ({ doc }) =>
        `${(doc as { title?: string }).title ?? "Belcreation"}`,
    }),
  ],
});
