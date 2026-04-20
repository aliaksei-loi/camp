import { getPayload } from "payload";

import config from "../payload.config";

type PhotoSeed = {
  title: string;
  meta: string;
  category: "camp" | "kids" | "food" | "nature" | "night" | "water";
  shape: "wide" | "tall" | "short" | "sq";
  style?: "polaroid";
  isVideo?: boolean;
  mood: string;
  order: number;
};

const PHOTOS: PhotoSeed[] = [
  { mood: "tent", category: "camp", title: "Лагерь на рассвете", meta: "Смена 3 · 2025", shape: "tall", order: 1 },
  { mood: "kids", category: "kids", title: "Квест «Тайна ручья»", meta: "Смена 2 · 2025", shape: "sq", style: "polaroid", order: 2 },
  { mood: "campfire", category: "night", title: "Вечерняя песня", meta: "Смена 5 · 2024", shape: "short", isVideo: true, order: 3 },
  { mood: "lake", category: "water", title: "Нарочь, 6:02 утра", meta: "Смена 1 · 2025", shape: "wide", order: 4 },
  { mood: "meadow", category: "food", title: "Каша с малиной", meta: "Кухня · 2025", shape: "sq", order: 5 },
  { mood: "forest", category: "nature", title: "Сосны после дождя", meta: "Смена 4 · 2024", shape: "tall", order: 6 },
  { mood: "meadow", category: "nature", title: "Лесная йога", meta: "Смена 2 · 2025", shape: "wide", order: 7 },
  { mood: "kids", category: "kids", title: "Первая рыба", meta: "Смена 6 · 2024", shape: "short", style: "polaroid", order: 8 },
  { mood: "sunset", category: "nature", title: "Закат над водой", meta: "Смена 3 · 2023", shape: "wide", order: 9 },
  { mood: "tent", category: "camp", title: "Домик «Грибок»", meta: "Смена 1 · 2025", shape: "sq", order: 10 },
  { mood: "campfire", category: "night", title: "Маршмеллоу-вечер", meta: "Смена 5 · 2025", shape: "tall", order: 11 },
  { mood: "lake", category: "water", title: "Каноэ на рассвете", meta: "Смена 3 · 2025", shape: "sq", order: 12 },
  { mood: "kids", category: "kids", title: "Весь детский десант", meta: "Смена 4 · 2024", shape: "short", order: 13 },
  { mood: "dune", category: "food", title: "Хлеб из печки", meta: "Кухня · 2024", shape: "sq", style: "polaroid", order: 14 },
  { mood: "meadow", category: "nature", title: "Утренний туман", meta: "Смена 2 · 2023", shape: "tall", order: 15 },
  { mood: "campfire", category: "night", title: "Звездное небо", meta: "Астро-вечер", shape: "wide", isVideo: true, order: 16 },
  { mood: "kids", category: "kids", title: "Лепим из глины", meta: "Керамика · 2025", shape: "sq", order: 17 },
  { mood: "forest", category: "nature", title: "Собираем чернику", meta: "Смена 6 · 2024", shape: "short", order: 18 },
  { mood: "lake", category: "water", title: "Сап-прогулка", meta: "Смена 3 · 2024", shape: "tall", order: 19 },
  { mood: "sunset", category: "camp", title: "Конец смены", meta: "Август · 2024", shape: "wide", style: "polaroid", order: 20 },
  { mood: "meadow", category: "food", title: "Пикник в поле", meta: "Кухня · 2025", shape: "sq", order: 21 },
  { mood: "tent", category: "camp", title: "Наш шатёр", meta: "Смена 4 · 2025", shape: "short", order: 22 },
];

const GALLERY_PAGE = {
  hero: {
    eyebrow: "★ архив ★",
    titleLine1: "Семь лет лета,",
    titleLine2: "собранные в одном месте.",
    sub: "Фотографии, кадры с костровых вечеров, детские рисунки и случайные моменты, которые нам потом присылают семьи.",
  },
  telegramStrip: {
    eyebrow: "★ мы в телеграме ★",
    handle: "@belcreation.camp",
    body: "Каждую неделю мы выкладываем кусочек лета: новые даты, кадры с кухни, заметки из леса.",
    ctaLabel: "Подписаться в Telegram →",
    ctaHref: "https://t.me/belcreation_camp",
  },
  instaTiles: [
    { mood: "lake" },
    { mood: "tent" },
    { mood: "campfire" },
    { mood: "meadow" },
    { mood: "kids" },
    { mood: "forest" },
  ],
};

const seed = async () => {
  const payload = await getPayload({ config });

  for (const photo of PHOTOS) {
    const existing = await payload.find({
      collection: "gallery-photos",
      where: { title: { equals: photo.title } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`skipped (exists): ${photo.title}`);
      continue;
    }

    await payload.create({
      collection: "gallery-photos",
      data: photo,
      overrideAccess: true,
    });
    console.log(`created: ${photo.title}`);
  }

  await payload.updateGlobal({
    slug: "gallery-page",
    data: { ...GALLERY_PAGE, _status: "published" },
    overrideAccess: true,
  });
  console.log("gallery-page global: published");

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
