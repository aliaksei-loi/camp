import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";

import config from "../payload.config";

const SRC = process.env.HERO_SRC ?? path.join(
  process.env.HOME ?? "",
  "Downloads",
  "ChatGPT Image Apr 25, 2026, 11_29_30 AM.png",
);
const ALT = "Палатка-шапито в ночном лесу под луной — Belcreation";

const main = async () => {
  const info = await stat(SRC);
  const data = await readFile(SRC);
  const filename = path.basename(SRC);

  const payload = await getPayload({ config });

  const home = await payload.findGlobal({ slug: "home", depth: 0, overrideAccess: true });
  const oldId =
    typeof (home.hero as { image?: unknown })?.image === "string"
      ? ((home.hero as { image?: string }).image as string)
      : ((home.hero as { image?: { id?: string } } | undefined)?.image?.id ?? null);

  const created = await payload.create({
    collection: "media",
    data: { alt: ALT },
    file: {
      data,
      mimetype: "image/png",
      name: filename,
      size: info.size,
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "home",
    data: {
      hero: { ...(home.hero ?? {}), image: created.id },
    } as Record<string, unknown>,
    overrideAccess: true,
  });

  console.log(`uploaded media id=${created.id} (${filename})`);
  console.log(`home.hero.image: ${oldId ?? "(none)"} -> ${created.id}`);
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
