import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { z } from "zod";

import config from "@payload-config";

// ---------- FAQs ----------

const FaqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  open: z.boolean().nullish(),
  order: z.number().nullish(),
});

export type Faq = z.infer<typeof FaqSchema>;

const FaqsSchema = z.array(FaqSchema);

export const getFaqs = async (): Promise<Faq[]> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "faqs",
    draft,
    sort: "order",
    limit: 100,
    overrideAccess: draft,
  });
  return FaqsSchema.parse(docs);
};

// ---------- Activities ----------

const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number().nullish(),
});

export type Activity = z.infer<typeof ActivitySchema>;

const ActivitiesSchema = z.array(ActivitySchema);

export const getActivities = async (): Promise<Activity[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "activities",
    sort: "order",
    limit: 100,
  });
  return ActivitiesSchema.parse(docs);
};

// ---------- Shifts ----------

const ShiftSchema = z.object({
  id: z.string(),
  num: z.number(),
  datesLine1: z.string(),
  datesLine2: z.string(),
  theme: z.string(),
  spotsTotal: z.number().nullish(),
  spotsLeft: z.number().nullish(),
  soldOut: z.boolean().nullish(),
  order: z.number().nullish(),
});

export type Shift = z.infer<typeof ShiftSchema>;

const ShiftsSchema = z.array(ShiftSchema);

export const getShifts = async (): Promise<Shift[]> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "shifts",
    draft,
    sort: "order",
    limit: 100,
    overrideAccess: draft,
  });
  return ShiftsSchema.parse(docs);
};

// ---------- Plans ----------

const PlanSchema = z.object({
  id: z.string(),
  eyebrow: z.string(),
  name: z.string(),
  price: z.string(),
  perUnit: z.string().nullish(),
  nights: z.string().nullish(),
  items: z.array(z.object({ id: z.string().nullish(), text: z.string() })).default([]),
  featured: z.boolean().nullish(),
  btnClass: z.string().nullish(),
  order: z.number().nullish(),
});

export type Plan = z.infer<typeof PlanSchema>;

const PlansSchema = z.array(PlanSchema);

export const getPlans = async (): Promise<Plan[]> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "plans",
    draft,
    sort: "order",
    limit: 100,
    overrideAccess: draft,
  });
  return PlansSchema.parse(docs);
};

// ---------- Team members ----------

const MediaRefSchema = z
  .object({
    id: z.string(),
    url: z.string().nullish(),
    alt: z.string().nullish(),
    width: z.number().nullish(),
    height: z.number().nullish(),
  })
  .nullish();

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  photo: z.union([z.string(), MediaRefSchema]).nullish(),
  order: z.number().nullish(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

const TeamMembersSchema = z.array(TeamMemberSchema);

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "team-members",
    sort: "order",
    limit: 100,
    depth: 1,
  });
  return TeamMembersSchema.parse(docs);
};
