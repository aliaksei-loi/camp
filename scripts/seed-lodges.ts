import { getPayload } from "payload";

import config from "../payload.config";

const LODGES = [
  { name: "Палатка «Сосна»", meta: "до 4 человек · деревянный настил · матрасы-пенка", price: "от 140 р / ночь", tag: "★ Популярно", mood: "tent", order: 1 },
  { name: "Глэмпинг «Озеро»", meta: "до 3 человек · кровать, свет, розетка · у воды", price: "от 210 р / ночь", mood: "lake", order: 2 },
  { name: "Домик «Грибок»", meta: "до 5 человек · печка-буржуйка · душ рядом", price: "от 280 р / ночь", mood: "forest", order: 3 },
  { name: "Шатёр «Большая семья»", meta: "до 8 человек · высокие стены · отдельная зона", price: "от 360 р / ночь", tag: "Новое", tagBg: "var(--c-lime)", tagColor: "var(--c-rust)", mood: "sunset", order: 4 },
  { name: "Домик-студия «Тишина»", meta: "для двоих · свой санузел · вид на рассвет", price: "от 320 р / ночь", mood: "dune", order: 5 },
  { name: "Своя палатка", meta: "место под собственную палатку · вода и душ", price: "от 60 р / ночь", mood: "meadow", order: 6 },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const lodge of LODGES) {
    const existing = await payload.find({
      collection: "lodges",
      where: { name: { equals: lodge.name } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`skipped (exists): ${lodge.name}`);
      continue;
    }

    await payload.create({
      collection: "lodges",
      data: { ...lodge, _status: "published" },
      overrideAccess: true,
    });
    console.log(`created: ${lodge.name}`);
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
