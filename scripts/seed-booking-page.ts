import { getPayload } from "payload";

import config from "../payload.config";

const seed = async () => {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "booking-page",
    data: {
      periodLabel: "07–11 июня · 5 дней у озера",
      periodSub: "приезд и отъезд в любой день · единая стоимость",
      heroIntro:
        "Одна регистрация — участие в кемпе на все дни. Никаких смен и пакетов: единая программа, общая атмосфера, одна большая палаточная семья. Оставьте анкету — мы свяжемся в течение часа.",
      _status: "published",
    },
    overrideAccess: true,
  });
  console.log("booking-page global: published");

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
