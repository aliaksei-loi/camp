import { getPayload } from "payload";

import config from "../payload.config";

const MEMBERS = [
  {
    name: "Катя Бельская",
    role: "основатель · повар",
    bio: "Тот самый человек, который варит суп на 80 человек и помнит, кто не ест кинзу.",
    order: 1,
  },
  {
    name: "Артём Бельский",
    role: "основатель · инструктор",
    bio: "Канойные туры, походы, дрова, гитара. Говорит, что водил каноэ раньше, чем ходил.",
    order: 2,
  },
  {
    name: "Таня Вороненко",
    role: "детская программа",
    bio: "Педагог-дошкольник, 12 лет опыта. Знает 40 игр на воздухе и ни одной — на экране.",
    order: 3,
  },
  {
    name: "Игорь Малевич",
    role: "ботаник",
    bio: "Ведёт сбор трав и лесные прогулки. Может узнать любое дерево с закрытыми глазами — по запаху.",
    order: 4,
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const member of MEMBERS) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`skipped (exists): ${member.name}`);
      continue;
    }

    await payload.create({
      collection: "team-members",
      data: member,
      overrideAccess: true,
    });
    console.log(`created: ${member.name}`);
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
