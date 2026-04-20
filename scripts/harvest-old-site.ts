import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const BASE = "https://belcreationng.vercel.app";
const OUT = path.resolve(process.cwd(), "assets/harvested");

const FILES = [
  "tent1.JPG",
  "tent2.JPG",
  "tent3.JPG",
  "child1.JPG",
  "child2.JPG",
  "child3.JPG",
  "child4.JPG",
  "child5.JPG",
  "child6.JPG",
  "child7.JPG",
  "team0.JPG",
  "team1.JPG",
  "team2.JPG",
  "team3.JPG",
  "team4.JPG",
  "team5.jpg",
  "time.JPG",
  "time01.JPG",
  "time02.JPG",
  "time03.JPG",
  "time2.JPG",
  "time3.JPG",
  "pic1.png",
  "pic2.png",
  "blob-1.PNG",
  "blob-2.PNG",
  "blob-3.PNG",
  "main-logo-small.png",
  "logo.jpg",
];

const exists = async (p: string) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const run = async () => {
  await mkdir(OUT, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of FILES) {
    const outPath = path.join(OUT, file);
    if (await exists(outPath)) {
      console.log(`skip: ${file} (already downloaded)`);
      skipped++;
      continue;
    }
    const url = `${BASE}/${file}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`fail: ${file} — ${res.status} ${res.statusText}`);
        failed++;
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(outPath, buf);
      console.log(`ok:   ${file} (${buf.length} bytes)`);
      downloaded++;
    } catch (err) {
      console.warn(`fail: ${file} — ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  console.log("");
  console.log(`downloaded: ${downloaded}, skipped: ${skipped}, failed: ${failed}`);
  console.log(`→ ${OUT}`);
  process.exit(failed > 0 ? 1 : 0);
};

run();
