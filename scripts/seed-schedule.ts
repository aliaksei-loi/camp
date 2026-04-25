// Placeholder schedule — replace before production. Items intentionally generic.
import { getPayload } from "payload";

import config from "../payload.config";

const SCHEDULE = {
  eyebrow: "лето 2026",
  titleLine1: "день за днём —",
  titleLine2: "никакой скуки.",
  periodLabel: "10 дней · с 07 по 16 июня",
  ctaLabel: "Зарегистрироваться",
  ctaHref: "/booking",
  trackKidsLabel: "Малыши",
  trackOlderLabel: "Старшие",
  days: [
    {
      dateLabel: "Понедельник, 7 июня",
      theme: "День заезда",
      kidsItems: [
        { time: "12:00", title: "Заезд и заселение", description: "Встреча на парковке, помощь с вещами" },
        { time: "14:00", title: "Обед у общего стола" },
        { time: "15:30", title: "Знакомство с лагерем", description: "Экскурсия по территории, правила безопасности" },
        { time: "17:00", title: "Первые игры на поляне" },
        { time: "19:30", title: "Ужин у большого костра" },
        { time: "21:00", title: "Вечер знакомств" },
      ],
      olderItems: [
        { time: "12:00", title: "Заезд и заселение" },
        { time: "14:00", title: "Обед и ориентация" },
        { time: "16:00", title: "Знакомство с инструкторами" },
        { time: "17:30", title: "Спортивные игры на берегу" },
        { time: "19:30", title: "Ужин у костра" },
        { time: "21:00", title: "Вечер знакомств и форматы смены" },
      ],
    },
    {
      dateLabel: "Вторник, 8 июня",
      theme: "Активный день",
      kidsItems: [
        { time: "08:00", title: "Утренняя зарядка на берегу" },
        { time: "09:00", title: "Завтрак у общего костра" },
        { time: "10:30", title: "Занятие: лесная наука", description: "Знакомство с растениями и животными леса" },
        { time: "13:00", title: "Обед" },
        { time: "14:30", title: "Тихий час" },
        { time: "16:00", title: "Купание и игры на воде" },
        { time: "19:30", title: "Ужин" },
      ],
      olderItems: [
        { time: "07:30", title: "Утро на канатах", description: "Верёвочный курс для начинающих" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:00", title: "Сапборд и каноэ", description: "Инструктаж и первые выходы на воду" },
        { time: "13:00", title: "Обед" },
        { time: "14:30", title: "Свободное время" },
        { time: "16:00", title: "Волейбол на берегу" },
        { time: "19:30", title: "Ужин и кино на улице" },
      ],
    },
    {
      dateLabel: "Среда, 9 июня",
      theme: "Творческий день",
      kidsItems: [
        { time: "08:00", title: "Зарядка" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:30", title: "Занятие: глина и керамика", description: "Лепим миски и кружки под руководством мастера" },
        { time: "13:00", title: "Обед" },
        { time: "14:30", title: "Тихий час" },
        { time: "16:00", title: "Пленэр на берегу", description: "Рисуем акварелью пейзаж" },
        { time: "19:30", title: "Ужин" },
        { time: "21:00", title: "Песни у костра" },
      ],
      olderItems: [
        { time: "08:00", title: "Пробежка по лесной тропе" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:30", title: "Мастер-класс: фото и видео", description: "Как снимать природу на смартфон" },
        { time: "13:00", title: "Обед" },
        { time: "15:00", title: "Поход к дальнему озеру", description: "5 км с инструктором" },
        { time: "19:30", title: "Ужин" },
        { time: "21:00", title: "Квиз у костра" },
      ],
    },
    {
      dateLabel: "Четверг, 10 июня",
      theme: "День природы",
      kidsItems: [
        { time: "08:00", title: "Зарядка" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:30", title: "Сбор трав и ягод", description: "Что растёт в лесу и как это есть" },
        { time: "13:00", title: "Обед из собранного" },
        { time: "14:30", title: "Тихий час" },
        { time: "16:00", title: "Занятие: экология лагеря" },
        { time: "19:30", title: "Ужин" },
      ],
      olderItems: [
        { time: "08:00", title: "Зарядка на воде (каяки)" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:30", title: "Навыки выживания: разжечь огонь", description: "Без спичек и зажигалки" },
        { time: "13:00", title: "Обед" },
        { time: "14:30", title: "Свободное время" },
        { time: "16:00", title: "Занятие: первая помощь" },
        { time: "19:30", title: "Ужин и звёздное небо", description: "Телескоп и карта созвездий" },
      ],
    },
    {
      dateLabel: "Пятница, 11 июня",
      theme: "День воды",
      kidsItems: [
        { time: "08:00", title: "Зарядка" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:30", title: "Занятие: безопасность на воде" },
        { time: "13:00", title: "Обед" },
        { time: "14:30", title: "Тихий час" },
        { time: "16:00", title: "Водные игры и эстафеты" },
        { time: "19:30", title: "Ужин" },
        { time: "21:00", title: "Вечерняя дискотека" },
      ],
      olderItems: [
        { time: "07:30", title: "Утренний заплыв (по желанию)" },
        { time: "09:00", title: "Завтрак" },
        { time: "10:30", title: "Гонки на сапах", description: "Командный зачёт" },
        { time: "13:00", title: "Обед" },
        { time: "14:30", title: "Свободное время" },
        { time: "16:30", title: "Рафтинг на реке", description: "Выезд с инструктором" },
        { time: "19:30", title: "Ужин" },
        { time: "21:00", title: "Кинопоказ на открытом воздухе" },
      ],
    },
  ],
};

const seed = async () => {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "schedule",
    data: { ...SCHEDULE, _status: "published" },
    overrideAccess: true,
  });
  console.log("schedule global: published");

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
