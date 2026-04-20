import { getPayload } from "payload";

import config from "../payload.config";

const REVIEWS = [
  {
    text: "Первый раз привезли детей в кемпинг — боялась, что будет тяжело. В итоге старший (9 лет) выучил имена всех деревьев, младшая (4) впервые ела суп сама. Мы вернёмся обязательно.",
    authorName: "Алёна М.",
    authorMeta: "Минск · 2 детей",
    mood: "kids",
    rating: 5,
    order: 1,
  },
  {
    text: "Мы ездили втроём (я, муж, подросток). Думали — подростку будет скучно. Его первая фраза на обратной дороге: «Я хочу сюда в августе снова». Всё.",
    authorName: "Ирина П.",
    authorMeta: "Гродно · семья",
    mood: "sunset",
    rating: 5,
    order: 2,
  },
  {
    text: "Отдельное спасибо команде — они заметили, что мой ребёнок стеснялся, и мягко подвели его к группе. К концу смены он вёл квест сам. Это дорогого стоит.",
    authorName: "Денис К.",
    authorMeta: "Брест · папа",
    mood: "forest",
    rating: 5,
    order: 3,
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const review of REVIEWS) {
    const existing = await payload.find({
      collection: "reviews",
      where: { authorName: { equals: review.authorName } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`skipped (exists): ${review.authorName}`);
      continue;
    }

    await payload.create({
      collection: "reviews",
      data: review,
      overrideAccess: true,
    });
    console.log(`created: ${review.authorName}`);
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
