import { getPayload } from "payload";

import config from "../payload.config";

const NAV = {
  brandLabel: "Belcreation",
  scrollLinks: [
    { label: "Главная", href: "/" },
    { label: "О нас", href: "/about" },
    { label: "Размещение", href: "/#accom" },
    { label: "Смены", href: "/#schedule" },
    { label: "Галерея", href: "/gallery" },
  ],
  pinnedLink: { label: "Регистрация", href: "/booking" },
  marqueeItems: [
    { text: "BELCREATION ★ СЕМЕЙНЫЙ КЕМПИНГ" },
    { text: "ЛЕТО 2026" },
    { text: "3 ОЗЕРА · 6 СМЕН · 40 ПАЛАТОК" },
    { text: "СЛЫШНО ТОЛЬКО КОСТЁР И ДЕТСКИЙ СМЕХ" },
  ],
};

const FOOTER = {
  cta: {
    heading: "Лес уже ждёт. Присоединяйтесь.",
    body:
      "Каждое лето у нас 6 смен, и места всегда заканчиваются к маю. Зарегистрируйтесь на свою смену прямо сейчас — даже если ещё не выбрали даты.",
    ctaLabel: "Зарегистрироваться",
    ctaHref: "/booking",
  },
  brand: {
    name: "belcreation",
    description:
      "Семейный кемпинг на берегу озера. Три смены в июне, три в июле-августе. Палатки, домики, костры, долгие разговоры под звёздами.",
  },
  navColumn: {
    heading: "Навигация",
    links: [
      { label: "Главная", href: "/" },
      { label: "О нас", href: "/about" },
      { label: "Размещение", href: "/#accom" },
      { label: "Регистрация", href: "/booking" },
    ],
  },
  contactColumn: {
    heading: "Контакты",
    items: [
      { text: "+375 29 123 45 67" },
      { text: "hello@belcreation.camp" },
      { text: "Минская обл., оз. Нарочь" },
    ],
  },
  socialColumn: {
    heading: "Мы в сети",
    items: [
      { label: "Telegram" },
      { label: "Instagram" },
      { label: "YouTube" },
    ],
  },
  bottomLeft: "© 2026 BELCREATION CAMP · СДЕЛАНО С ЛЮБОВЬЮ",
  bottomRight: "★ МИНСК — НАРОЧЬ ★",
};

const SITE = {
  siteName: "Belcreation",
  defaultSEO: {
    title: "Belcreation — семейный кемпинг у озера",
    description:
      "Belcreation — семейный кемпинг на берегу озера Нарочь. Палатки, домики, костры, программы для детей и взрослых. Лето 2026.",
  },
  contact: {
    email: "hello@belcreation.camp",
    phone: "+375 29 123 45 67",
    location: "Минская обл., оз. Нарочь",
  },
  social: {
    telegramHandle: "@belcreation.camp",
    telegramUrl: "https://t.me/belcreation_camp",
  },
};

const seed = async () => {
  const payload = await getPayload({ config });

  await payload.updateGlobal({ slug: "nav", data: NAV, overrideAccess: true });
  console.log("nav: updated");

  await payload.updateGlobal({ slug: "footer", data: FOOTER, overrideAccess: true });
  console.log("footer: updated");

  await payload.updateGlobal({ slug: "site-settings", data: SITE, overrideAccess: true });
  console.log("site-settings: updated");

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
