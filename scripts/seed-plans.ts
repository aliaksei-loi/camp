import { getPayload } from "payload";

import config from "../payload.config";

const PLANS = [
  {
    eyebrow: "базовый",
    name: "Палаточник",
    price: "1 400",
    perUnit: "р / человек",
    nights: "за смену · 10 дней",
    items: [
      { text: "Палатка «Сосна» или своя" },
      { text: "Питание 3 раза в день" },
      { text: "Все программы и активности" },
      { text: "Костёр, баня, трансфер из Минска" },
    ],
    featured: false,
    btnClass: "ghost",
    order: 1,
  },
  {
    eyebrow: "всё включено",
    name: "Семейный",
    price: "2 200",
    perUnit: "р / человек",
    nights: "за смену · 10 дней",
    items: [
      { text: "Глэмпинг или домик «Грибок»" },
      { text: "Всё из пакета «Палаточник»" },
      { text: "Детская программа с сопровождением" },
      { text: "Индивидуальная керамика + фото-пакет" },
    ],
    featured: true,
    order: 2,
  },
  {
    eyebrow: "с комфортом",
    name: "Приватный",
    price: "3 400",
    perUnit: "р / человек",
    nights: "за смену · 10 дней",
    items: [
      { text: "Студия «Тишина» или шатёр" },
      { text: "Всё из «Семейного»" },
      { text: "Персональный каноэ-тур на рассвете" },
      { text: "Массаж, сауна по расписанию" },
    ],
    featured: false,
    btnClass: "ghost",
    order: 3,
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const plan of PLANS) {
    const existing = await payload.find({
      collection: "plans",
      where: { name: { equals: plan.name } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`skipped (exists): ${plan.name}`);
      continue;
    }

    await payload.create({
      collection: "plans",
      data: { ...plan, _status: "published" },
      overrideAccess: true,
    });
    console.log(`created: ${plan.name}`);
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
