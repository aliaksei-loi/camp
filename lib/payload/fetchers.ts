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

// ---------- Lodges ----------

const LodgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.string(),
  price: z.string(),
  image: z.union([z.string(), MediaRefSchema]).nullish(),
  tag: z.string().nullish(),
  tagBg: z.string().nullish(),
  tagColor: z.string().nullish(),
  mood: z.string().nullish(),
  order: z.number().nullish(),
});

export type Lodge = z.infer<typeof LodgeSchema>;

const LodgesSchema = z.array(LodgeSchema);

export const getLodges = async (): Promise<Lodge[]> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "lodges",
    draft,
    sort: "order",
    limit: 100,
    depth: 1,
    overrideAccess: draft,
  });
  return LodgesSchema.parse(docs);
};

// ---------- Reviews ----------

const ReviewSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorName: z.string(),
  authorMeta: z.string(),
  authorPhoto: z.union([z.string(), MediaRefSchema]).nullish(),
  rating: z.number().nullish(),
  mood: z.string().nullish(),
  order: z.number().nullish(),
});

export type Review = z.infer<typeof ReviewSchema>;

const ReviewsSchema = z.array(ReviewSchema);

export const getReviews = async (): Promise<Review[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "reviews",
    sort: "order",
    limit: 100,
    depth: 1,
  });
  return ReviewsSchema.parse(docs);
};

// ---------- Home global ----------

const TextLike = z.string().nullish();

const HomeSchema = z.object({
  hero: z
    .object({
      tag: TextLike,
      titleLine1: TextLike,
      titleLine2: TextLike,
      titleLine3: TextLike,
      description: TextLike,
      image: z.union([z.string(), MediaRefSchema]).nullish(),
      ctaPrimaryLabel: TextLike,
      ctaPrimaryHref: TextLike,
      ctaSecondaryLabel: TextLike,
      ctaSecondaryHref: TextLike,
      stickerLine1: TextLike,
      stickerLine2: TextLike,
      stickerLine3: TextLike,
    })
    .nullish(),
  intro: z
    .object({
      eyebrow: TextLike,
      headPart1: TextLike,
      headIcon1: TextLike,
      headPart2: TextLike,
      headIcon2: TextLike,
      headPart3: TextLike,
      sub: TextLike,
    })
    .nullish(),
  quizBox: z
    .object({
      pill: TextLike,
      title: TextLike,
      ctaLabel: TextLike,
      ctaHref: TextLike,
    })
    .nullish(),
  pillarsBand: z
    .object({
      title: TextLike,
      pillars: z
        .array(
          z.object({
            id: z.string().nullish(),
            icon: TextLike,
            eyebrow: TextLike,
            titleLine1: TextLike,
            titleLine2: TextLike,
            text: TextLike,
            ctaLabel: TextLike,
            ctaHref: TextLike,
            bgColor: TextLike,
          }),
        )
        .default([]),
    })
    .nullish(),
  accomHead: z
    .object({
      eyebrow: TextLike,
      titleLine1: TextLike,
      titleLine2: TextLike,
      description: TextLike,
    })
    .nullish(),
  activitiesHead: z
    .object({ eyebrow: TextLike, titleLine1: TextLike, titleLine2: TextLike })
    .nullish(),
  scheduleHead: z
    .object({
      eyebrow: TextLike,
      titleLine1: TextLike,
      titleLine2: TextLike,
      ctaLabel: TextLike,
      ctaHref: TextLike,
    })
    .nullish(),
  galleryStrip: z
    .object({
      eyebrow: TextLike,
      titleLine1: TextLike,
      titleLine2: TextLike,
      tiles: z
        .array(
          z.object({
            id: z.string().nullish(),
            image: z.union([z.string(), MediaRefSchema]).nullish(),
            mood: TextLike,
          }),
        )
        .default([]),
    })
    .nullish(),
  pricingHead: z
    .object({
      eyebrow: TextLike,
      titleLine1: TextLike,
      titleLine2: TextLike,
      body: TextLike,
    })
    .nullish(),
  reviewsHead: z
    .object({ eyebrow: TextLike, titleLine1: TextLike, titleLine2: TextLike })
    .nullish(),
  faqHead: z
    .object({ eyebrow: TextLike, titleLine1: TextLike, titleLine2: TextLike })
    .nullish(),
});

export type Home = z.infer<typeof HomeSchema>;

export const getHome = async (): Promise<Home> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "home",
    draft,
    depth: 1,
    overrideAccess: draft,
  });
  return HomeSchema.parse(doc);
};

// ---------- About page global ----------

const AboutPageSchema = z.object({
  hero: z
    .object({
      eyebrow: TextLike,
      titlePart1: TextLike,
      titlePart2: TextLike,
      titlePart3: TextLike,
      sub: TextLike,
    })
    .nullish(),
  photoCard: z
    .object({
      image: z.union([z.string(), MediaRefSchema]).nullish(),
      caption: TextLike,
    })
    .nullish(),
  storySections: z
    .array(
      z.object({
        id: z.string().nullish(),
        heading: z.string(),
        body: z.string(),
        pullQuote: TextLike,
      }),
    )
    .default([]),
  valuesHead: z.object({ eyebrow: TextLike, title: TextLike }).nullish(),
  values: z
    .array(
      z.object({
        id: z.string().nullish(),
        num: z.number(),
        titleLine1: z.string(),
        titleLine2: TextLike,
        text: z.string(),
      }),
    )
    .default([]),
  teamHead: z.object({ eyebrow: TextLike, title: TextLike }).nullish(),
  numbers: z
    .array(
      z.object({
        id: z.string().nullish(),
        value: z.string(),
        label: z.string(),
      }),
    )
    .default([]),
  manifesto: z
    .array(
      z.object({
        id: z.string().nullish(),
        text: z.string(),
        emphasized: z.boolean().nullish(),
      }),
    )
    .default([]),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;

export const getAboutPage = async (): Promise<AboutPage> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "about-page",
    draft,
    depth: 1,
    overrideAccess: draft,
  });
  return AboutPageSchema.parse(doc);
};

// ---------- Gallery photos ----------

const GalleryPhotoSchema = z.object({
  id: z.string(),
  image: z.union([z.string(), MediaRefSchema]).nullish(),
  title: z.string(),
  meta: TextLike,
  category: z.enum(["camp", "kids", "food", "nature", "night", "water"]),
  shape: z.enum(["wide", "tall", "short", "sq"]),
  style: z.string().nullish(),
  isVideo: z.boolean().nullish(),
  mood: TextLike,
  order: z.number().nullish(),
});

export type GalleryPhoto = z.infer<typeof GalleryPhotoSchema>;

const GalleryPhotosSchema = z.array(GalleryPhotoSchema);

export const getGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "gallery-photos",
    sort: "order",
    limit: 200,
    depth: 1,
  });
  return GalleryPhotosSchema.parse(docs);
};

// ---------- Gallery page global ----------

const GalleryPageSchema = z.object({
  hero: z
    .object({ eyebrow: TextLike, titleLine1: TextLike, titleLine2: TextLike, sub: TextLike })
    .nullish(),
  telegramStrip: z
    .object({
      eyebrow: TextLike,
      handle: TextLike,
      body: TextLike,
      ctaLabel: TextLike,
      ctaHref: TextLike,
    })
    .nullish(),
  instaTiles: z
    .array(
      z.object({
        id: z.string().nullish(),
        image: z.union([z.string(), MediaRefSchema]).nullish(),
        mood: TextLike,
      }),
    )
    .default([]),
});

export type GalleryPage = z.infer<typeof GalleryPageSchema>;

export const getGalleryPage = async (): Promise<GalleryPage> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "gallery-page",
    draft,
    depth: 1,
    overrideAccess: draft,
  });
  return GalleryPageSchema.parse(doc);
};
