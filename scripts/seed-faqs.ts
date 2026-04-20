import { getPayload } from "payload";

import config from "../payload.config";

const FAQS = [
  {
    question: "С какого возраста можно приезжать с детьми?",
    answer:
      "Минимальный возраст — 2 года, максимальный — не ограничен. У нас есть программы для 3–6, 7–11, 12–16 лет и семейные активности для всех. Малыши до 2 лет — бесплатно.",
    open: true,
    order: 1,
  },
  {
    question: "А если пойдёт дождь?",
    answer:
      "Дождь — не повод сворачиваться. У нас есть большой крытый навес, кулинарная юрта, мастерские, настолки и кино-вечер. Часто самые тёплые воспоминания — именно про дождливые дни.",
    open: false,
    order: 2,
  },
  {
    question: "Питание — что едят дети?",
    answer:
      "Три приёма пищи + полдник. Готовим сами на большом очаге: каши, супы, овощи с огорода, хлеб из печки, пироги. Учитываем аллергии и вегетарианство — просто укажите при бронировании.",
    open: false,
    order: 3,
  },
  {
    question: "Как добраться?",
    answer:
      "Из Минска — трансфер, входит в пакет. Выезжаем в день смены в 10:00 от площади Победы. На машине — 2 часа, координаты пришлём в письме.",
    open: false,
    order: 4,
  },
  {
    question: "Можно ли приехать без детей?",
    answer:
      "Можно! У нас есть взрослая линейка активностей — йога, керамика, вечерние разговоры. Но атмосфера у нас семейная, имейте это в виду.",
    open: false,
    order: 5,
  },
  {
    question: "Есть ли wi-fi и связь?",
    answer:
      "Мобильная связь работает. Wi-fi — в лаундже, с 18:00 до 22:00. Остальное время мы специально «отключаемся». Это часть опыта.",
    open: false,
    order: 6,
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const faq of FAQS) {
    const existing = await payload.find({
      collection: "faqs",
      where: { question: { equals: faq.question } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "faqs",
        id: existing.docs[0].id,
        data: faq,
        overrideAccess: true,
      });
      console.log(`updated: ${faq.question}`);
    } else {
      await payload.create({
        collection: "faqs",
        data: { ...faq, _status: "published" },
        overrideAccess: true,
      });
      console.log(`created: ${faq.question}`);
    }
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
