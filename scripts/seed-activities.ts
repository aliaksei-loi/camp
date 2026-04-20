import { getPayload } from "payload";

import config from "../payload.config";

const ACTIVITIES = [
  { name: "Каноэ и сапы", description: "на рассвете, когда озеро гладкое как стекло", icon: "ic-canoe", order: 1 },
  { name: "Травы и чаи", description: "собираем, сушим, завариваем вместе с ботаником", icon: "ic-leaf", order: 2 },
  { name: "Костровые вечера", description: "маршмеллоу, гитара, истории из детства", icon: "ic-marshmallow", order: 3 },
  { name: "Кулинарная юрта", description: "пироги на огне, хлеб в печке, варенье из малины", icon: "ic-bowl", order: 4 },
  { name: "Квесты для детей", description: "карта, подсказки, клад — каждый день новый", icon: "ic-map", order: 5 },
  { name: "Астро-вечера", description: "телескоп, одеяла и рассказы про созвездия", icon: "ic-star", order: 6 },
  { name: "Концерты и квартирники", description: "раз в смену — живая музыка под навесом", icon: "ic-guitar", order: 7 },
  { name: "Лесная йога", description: "утренняя практика босиком по мягкому мху", icon: "ic-tree", order: 8 },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const activity of ACTIVITIES) {
    const existing = await payload.find({
      collection: "activities",
      where: { name: { equals: activity.name } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "activities",
        id: existing.docs[0].id,
        data: activity,
        overrideAccess: true,
      });
      console.log(`updated: ${activity.name}`);
    } else {
      await payload.create({
        collection: "activities",
        data: activity,
        overrideAccess: true,
      });
      console.log(`created: ${activity.name}`);
    }
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
