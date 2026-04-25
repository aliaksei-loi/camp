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
  sectionVisibility: z
    .object({
      hideIntro: z.boolean().nullish(),
      hidePillars: z.boolean().nullish(),
      hideAccom: z.boolean().nullish(),
      hideActivities: z.boolean().nullish(),
      hideSchedule: z.boolean().nullish(),
      hideGallery: z.boolean().nullish(),
      hideReviews: z.boolean().nullish(),
      hideFaq: z.boolean().nullish(),
    })
    .nullish(),
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
  hidePage: z.boolean().nullish(),
  sectionVisibility: z
    .object({
      hideHero: z.boolean().nullish(),
      hidePhotoCard: z.boolean().nullish(),
      hideStory: z.boolean().nullish(),
      hideValues: z.boolean().nullish(),
      hideTeam: z.boolean().nullish(),
      hideNumbers: z.boolean().nullish(),
      hideManifesto: z.boolean().nullish(),
    })
    .nullish(),
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
  hidePage: z.boolean().nullish(),
  sectionVisibility: z
    .object({
      hideHero: z.boolean().nullish(),
      hideWall: z.boolean().nullish(),
      hideInstaStrip: z.boolean().nullish(),
    })
    .nullish(),
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

// ---------- Booking page global ----------

const BookingPageSchema = z.object({
  periodLabel: TextLike,
  periodSub: TextLike,
  heroIntro: TextLike,
});

export type BookingPage = z.infer<typeof BookingPageSchema>;

export const getBookingPage = async (): Promise<BookingPage> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "booking-page",
    draft,
    depth: 1,
    overrideAccess: draft,
  });
  return BookingPageSchema.parse(doc);
};

// ---------- Nav global ----------

const NavSchema = z.object({
  brandLabel: TextLike,
  scrollLinks: z
    .array(
      z.object({
        id: z.string().nullish(),
        label: z.string(),
        href: z.string(),
      }),
    )
    .default([]),
  pinnedLink: z
    .object({
      label: TextLike,
      href: TextLike,
    })
    .nullish(),
  marqueeItems: z
    .array(z.object({ id: z.string().nullish(), text: z.string() }))
    .default([]),
});

export type Nav = z.infer<typeof NavSchema>;

export const getNav = async (): Promise<Nav> => {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({ slug: "nav", depth: 1 });
  return NavSchema.parse(doc);
};

// ---------- Footer global ----------

const FooterSchema = z.object({
  cta: z
    .object({ heading: TextLike, body: TextLike, ctaLabel: TextLike, ctaHref: TextLike })
    .nullish(),
  brand: z.object({ name: TextLike, description: TextLike }).nullish(),
  navColumn: z
    .object({
      heading: TextLike,
      links: z
        .array(z.object({ id: z.string().nullish(), label: z.string(), href: z.string() }))
        .default([]),
    })
    .nullish(),
  contactColumn: z
    .object({
      heading: TextLike,
      items: z.array(z.object({ id: z.string().nullish(), text: z.string() })).default([]),
    })
    .nullish(),
  socialColumn: z
    .object({
      heading: TextLike,
      items: z
        .array(z.object({ id: z.string().nullish(), label: z.string(), href: TextLike }))
        .default([]),
    })
    .nullish(),
  bottomLeft: TextLike,
  bottomRight: TextLike,
});

export type Footer = z.infer<typeof FooterSchema>;

export const getFooter = async (): Promise<Footer> => {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({ slug: "footer", depth: 1 });
  return FooterSchema.parse(doc);
};

// ---------- Site settings global ----------

const SiteSettingsSchema = z.object({
  siteName: TextLike,
  defaultSEO: z
    .object({
      title: TextLike,
      description: TextLike,
      ogImage: z.union([z.string(), MediaRefSchema]).nullish(),
    })
    .nullish(),
  logo: z.union([z.string(), MediaRefSchema]).nullish(),
  contact: z
    .object({ email: TextLike, phone: TextLike, location: TextLike })
    .nullish(),
  social: z
    .object({
      telegramHandle: TextLike,
      telegramUrl: TextLike,
      instagramUrl: TextLike,
      youtubeUrl: TextLike,
    })
    .nullish(),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({ slug: "site-settings", depth: 1 });
  return SiteSettingsSchema.parse(doc);
};

// ---------- Schedule global ----------

const ScheduleItemSchema = z.object({
  id: z.string().nullish(),
  time: TextLike,
  title: z.string(),
  description: TextLike,
});

export type ScheduleItem = z.infer<typeof ScheduleItemSchema>;

const ScheduleDaySchema = z.object({
  id: z.string().nullish(),
  dateLabel: z.string(),
  theme: TextLike,
  kidsItems: z.array(ScheduleItemSchema).default([]),
  olderItems: z.array(ScheduleItemSchema).default([]),
});

export type ScheduleDay = z.infer<typeof ScheduleDaySchema>;

const ScheduleSchema = z.object({
  eyebrow: TextLike,
  titleLine1: TextLike,
  titleLine2: TextLike,
  periodLabel: TextLike,
  ctaLabel: TextLike,
  ctaHref: TextLike,
  trackKidsLabel: TextLike,
  trackOlderLabel: TextLike,
  days: z.array(ScheduleDaySchema).default([]),
});

export type Schedule = z.infer<typeof ScheduleSchema>;

export const getSchedule = async (): Promise<Schedule> => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "schedule",
    draft,
    depth: 1,
    overrideAccess: draft,
  });
  return ScheduleSchema.parse(doc);
};
