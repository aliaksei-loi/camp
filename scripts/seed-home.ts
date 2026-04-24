import { getPayload } from "payload";

import config from "../payload.config";

const HOME = {
  hero: {
    tag: "✦ семейный кемпинг у озера ✦",
    titleLine1: "лето,",
    titleLine2: "костёр &",
    titleLine3: "босиком.",
    description:
      "Belcreation — это три недели в лесу для всей семьи. Палатки на берегу Нарочи, завтрак на траве, сотни звёзд, программы для детей и ни одного будильника. Ничего лишнего — только лето.",
    ctaPrimaryLabel: "Зарегистрироваться на смену",
    ctaPrimaryHref: "/booking",
    ctaSecondaryLabel: "Посмотреть домики →",
    ctaSecondaryHref: "#accom",
    stickerLine1: "Места",
    stickerLine2: "на лето",
    stickerLine3: "— 40%",
  },
  intro: {
    eyebrow: "новая парадигма отдыха",
    headPart1: "Мы собираем семьи",
    headIcon1: "ic-tent",
    headPart2: "у костра, на берегу озера",
    headIcon2: "ic-canoe",
    headPart3: "и отпускаем их обратно в город немного счастливее.",
    sub: "6 смен по 10 дней · палатки, домики и глэмпинг · занятия для детей от 3 до 16 · свободное расписание для родителей · никакого wi-fi в лесу, только в лаундже.",
  },
  quizBox: {
    pill: "прежде чем листать дальше",
    title: "Не уверены, что кемпинг подойдёт вашей семье?",
    ctaLabel: "Пройти короткий тест",
    ctaHref: "#faq",
  },
  pillarsBand: {
    title: "★ что мы делаем лучше всего ★",
    pillars: [
      {
        icon: "ic-tent",
        eyebrow: "домики и палатки",
        titleLine1: "Место,",
        titleLine2: "которое пахнет сосной",
        text: "Четыре типа размещения — от классической палатки до утеплённого домика с печкой. Мы сами выбрали каждое место, проверили каждый матрас, и на каждой лужайке оставили немного дикости.",
        ctaLabel: "Смотреть →",
        ctaHref: "#accom",
      },
      {
        icon: "ic-fire",
        eyebrow: "программы",
        titleLine1: "Дни, которые",
        titleLine2: "не забываются",
        text: "Утренние заплывы, керамика, сбор трав, вечерние сказки, ночные кинопросмотры. Есть программа для детей 3–6, 7–11, подростков 12–16 и раздельная — для взрослых.",
        ctaLabel: "Активности →",
        ctaHref: "#activities",
        bgColor: "var(--c-blue)",
      },
      {
        icon: "ic-heart",
        eyebrow: "комьюнити",
        titleLine1: "Люди,",
        titleLine2: "которых хочется обнять",
        text: "Мы собираем не больше 80 человек за смену. Достаточно, чтобы было весело. Мало, чтобы каждого запомнить по имени. К концу недели — новые друзья у вашего ребёнка и у вас.",
        ctaLabel: "О нас →",
        ctaHref: "/about",
        bgColor: "var(--c-salmon)",
      },
    ],
  },
  accomHead: {
    eyebrow: "где вы будете спать",
    titleLine1: "Размещение",
    titleLine2: "на четыре лада.",
    description:
      "Выбирайте по настроению: от простой палатки «как в детстве» до домика с печкой и душем. Бельё, спальники и подушки — мы.",
  },
  activitiesHead: {
    eyebrow: "★ чем занят день ★",
    titleLine1: "Маленькие приключения,",
    titleLine2: "большие воспоминания.",
  },
  scheduleHead: {
    eyebrow: "лето 2026",
    titleLine1: "шесть смен.",
    titleLine2: "выбирайте свою.",
    ctaLabel: "Зарегистрироваться",
    ctaHref: "/booking",
  },
  galleryStrip: {
    eyebrow: "★ прошлое лето ★",
    titleLine1: "Так выглядит один",
    titleLine2: "обычный день у нас.",
    tiles: [
      { mood: "lake" },
      { mood: "tent" },
      { mood: "campfire" },
      { mood: "meadow" },
      { mood: "forest" },
      { mood: "sunset" },
      { mood: "kids" },
    ],
  },
  reviewsHead: {
    eyebrow: "★ пишут семьи ★",
    titleLine1: "«Мы уже плачем",
    titleLine2: "и хотим вернуться.»",
  },
  faqHead: {
    eyebrow: "★ вопросы и ответы ★",
    titleLine1: "Что вы скорее всего",
    titleLine2: "хотите спросить.",
  },
};

const seed = async () => {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "home",
    data: { ...HOME, _status: "published" },
    overrideAccess: true,
  });
  console.log("home global: published");

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
