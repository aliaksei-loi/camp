import { getPayload } from "payload";

import config from "../payload.config";

const SHIFTS = [
  { num: 1, datesLine1: "07 — 16", datesLine2: "июня", theme: "Open smena — знакомство", spotsTotal: 42, spotsLeft: 6, soldOut: false, order: 1 },
  { num: 2, datesLine1: "18 — 27", datesLine2: "июня", theme: "Творческая — ремёсла", spotsTotal: 42, spotsLeft: 14, soldOut: false, order: 2 },
  { num: 3, datesLine1: "29 июня —", datesLine2: "08 июля", theme: "Водная — сапы, каноэ", spotsTotal: 42, spotsLeft: 3, soldOut: false, order: 3 },
  { num: 4, datesLine1: "10 — 19", datesLine2: "июля", theme: "Большая семейная", spotsTotal: 42, spotsLeft: 0, soldOut: true, order: 4 },
  { num: 5, datesLine1: "21 — 30", datesLine2: "июля", theme: "Музыкальная — квартирники", spotsTotal: 42, spotsLeft: 18, soldOut: false, order: 5 },
  { num: 6, datesLine1: "01 — 10", datesLine2: "августа", theme: "Дикая — походы и астро", spotsTotal: 42, spotsLeft: 22, soldOut: false, order: 6 },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const shift of SHIFTS) {
    const existing = await payload.find({
      collection: "shifts",
      where: { num: { equals: shift.num } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "shifts",
        id: existing.docs[0].id,
        data: shift,
        overrideAccess: true,
      });
      console.log(`updated: shift ${shift.num}`);
    } else {
      await payload.create({
        collection: "shifts",
        data: { ...shift, _status: "published" },
        overrideAccess: true,
      });
      console.log(`created: shift ${shift.num}`);
    }
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
