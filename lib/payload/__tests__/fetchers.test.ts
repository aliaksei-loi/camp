import { describe, expect, it, vi, beforeEach } from "vitest";

const { findMock, findGlobalMock, draftModeMock } = vi.hoisted(() => ({
  findMock: vi.fn(),
  findGlobalMock: vi.fn(),
  draftModeMock: vi.fn(),
}));

vi.mock("payload", () => ({
  getPayload: vi.fn(async () => ({ find: findMock, findGlobal: findGlobalMock })),
}));

vi.mock("next/headers", () => ({
  draftMode: draftModeMock,
}));

vi.mock("@payload-config", () => ({ default: {} }));

import {
  getAboutPage,
  getActivities,
  getFaqs,
  getGalleryPage,
  getGalleryPhotos,
  getHome,
  getLodges,
  getReviews,
  getShifts,
  getTeamMembers,
} from "../fetchers";

describe("getFaqs", () => {
  beforeEach(() => {
    findMock.mockReset();
    draftModeMock.mockReset();
    draftModeMock.mockResolvedValue({ isEnabled: false });
  });

  it("returns parsed FAQ list from Payload docs", async () => {
    findMock.mockResolvedValue({
      docs: [
        {
          id: "f1",
          question: "Age?",
          answer: "From 2 years.",
          open: true,
          order: 1,
        },
        { id: "f2", question: "Rain?", answer: "It's fine." },
      ],
    });

    const faqs = await getFaqs();

    expect(faqs).toHaveLength(2);
    expect(faqs[0]).toMatchObject({ id: "f1", question: "Age?", open: true });
    expect(faqs[1]).toMatchObject({ id: "f2", question: "Rain?" });
  });

  it("requests drafts and overrides access when draft mode is on", async () => {
    draftModeMock.mockResolvedValue({ isEnabled: true });
    findMock.mockResolvedValue({ docs: [] });

    await getFaqs();

    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "faqs",
        draft: true,
        overrideAccess: true,
      }),
    );
  });

  it("fetches published-only when draft mode is off", async () => {
    draftModeMock.mockResolvedValue({ isEnabled: false });
    findMock.mockResolvedValue({ docs: [] });

    await getFaqs();

    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "faqs",
        draft: false,
        overrideAccess: false,
      }),
    );
  });

  it("rejects malformed docs (Zod contract)", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "f1" /* missing question + answer */ }],
    });

    await expect(getFaqs()).rejects.toThrow();
  });
});

describe("getActivities", () => {
  beforeEach(() => {
    findMock.mockReset();
    draftModeMock.mockReset();
    // getActivities does not read draftMode — the collection has drafts off.
  });

  it("returns parsed activity list", async () => {
    findMock.mockResolvedValue({
      docs: [
        {
          id: "a1",
          name: "Каноэ",
          description: "на рассвете",
          icon: "ic-canoe",
          order: 1,
        },
        {
          id: "a2",
          name: "Йога",
          description: "босиком",
          icon: "ic-tree",
        },
      ],
    });

    const activities = await getActivities();

    expect(activities).toHaveLength(2);
    expect(activities[0]).toMatchObject({ id: "a1", icon: "ic-canoe" });
    expect(activities[1]).toMatchObject({ id: "a2", icon: "ic-tree" });
  });

  it("calls Payload with sort=order (not draft-aware)", async () => {
    findMock.mockResolvedValue({ docs: [] });
    await getActivities();

    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "activities",
        sort: "order",
      }),
    );
    // No draft toggling for drafts-off collections
    expect(findMock.mock.calls[0][0]).not.toHaveProperty("draft", true);
  });

  it("rejects malformed docs (Zod contract — missing icon)", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "a1", name: "Йога", description: "…" }],
    });
    await expect(getActivities()).rejects.toThrow();
  });
});

describe("getShifts", () => {
  beforeEach(() => {
    findMock.mockReset();
    draftModeMock.mockReset();
    draftModeMock.mockResolvedValue({ isEnabled: false });
  });

  it("returns parsed shifts list", async () => {
    findMock.mockResolvedValue({
      docs: [
        {
          id: "s1",
          num: 1,
          datesLine1: "07 — 16",
          datesLine2: "июня",
          theme: "Open smena",
          spotsTotal: 42,
          spotsLeft: 6,
          soldOut: false,
          order: 1,
        },
        {
          id: "s4",
          num: 4,
          datesLine1: "10 — 19",
          datesLine2: "июля",
          theme: "Семейная",
          soldOut: true,
        },
      ],
    });

    const shifts = await getShifts();
    expect(shifts).toHaveLength(2);
    expect(shifts[0].num).toBe(1);
    expect(shifts[1].soldOut).toBe(true);
  });

  it("requests drafts + overrides access in draft mode", async () => {
    draftModeMock.mockResolvedValue({ isEnabled: true });
    findMock.mockResolvedValue({ docs: [] });
    await getShifts();
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "shifts", draft: true, overrideAccess: true }),
    );
  });

  it("published-only when draft mode is off", async () => {
    findMock.mockResolvedValue({ docs: [] });
    await getShifts();
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "shifts", draft: false, overrideAccess: false }),
    );
  });

  it("rejects malformed docs (Zod — missing theme)", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "s1", num: 1, datesLine1: "a", datesLine2: "b" }],
    });
    await expect(getShifts()).rejects.toThrow();
  });
});


describe("getTeamMembers", () => {
  beforeEach(() => {
    findMock.mockReset();
    draftModeMock.mockReset();
  });

  it("returns parsed members incl. populated photo media doc", async () => {
    findMock.mockResolvedValue({
      docs: [
        {
          id: "m1",
          name: "Катя",
          role: "founder",
          bio: "bio text",
          photo: {
            id: "media-1",
            url: "https://x.public.blob.vercel-storage.com/a.jpg",
            alt: "Katya",
            width: 800,
            height: 1000,
          },
          order: 1,
        },
        { id: "m2", name: "Артём", role: "founder", bio: "bio2" },
      ],
    });

    const members = await getTeamMembers();
    expect(members).toHaveLength(2);
    expect(members[0].photo).toMatchObject({ url: expect.stringMatching(/\.jpg$/) });
    expect(members[1].photo).toBeUndefined();
  });

  it("passes depth=1 so photo is populated", async () => {
    findMock.mockResolvedValue({ docs: [] });
    await getTeamMembers();
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "team-members", depth: 1 }),
    );
  });

  it("accepts team member without photo (field is optional)", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "m1", name: "X", role: "y", bio: "z" }],
    });
    await expect(getTeamMembers()).resolves.toHaveLength(1);
  });
});

describe("getLodges", () => {
  beforeEach(() => {
    findMock.mockReset();
    draftModeMock.mockReset();
    draftModeMock.mockResolvedValue({ isEnabled: false });
  });

  it("returns parsed lodges incl. populated image", async () => {
    findMock.mockResolvedValue({
      docs: [
        {
          id: "l1",
          name: "Сосна",
          meta: "до 4",
          price: "от 140",
          image: {
            id: "media-1",
            url: "https://x.public.blob.vercel-storage.com/tent.jpg",
            width: 1200,
            height: 800,
          },
          tag: "★ Популярно",
          order: 1,
        },
        {
          id: "l2",
          name: "Своя",
          meta: "место",
          price: "от 60",
          order: 6,
        },
      ],
    });

    const lodges = await getLodges();
    expect(lodges).toHaveLength(2);
    expect(lodges[0].tag).toBe("★ Популярно");
    expect(lodges[1].image).toBeUndefined();
  });

  it("requests drafts + overrides access in draft mode", async () => {
    draftModeMock.mockResolvedValue({ isEnabled: true });
    findMock.mockResolvedValue({ docs: [] });
    await getLodges();
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "lodges", draft: true, overrideAccess: true, depth: 1 }),
    );
  });

  it("rejects malformed docs (Zod — missing price)", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "l1", name: "X", meta: "y" }],
    });
    await expect(getLodges()).rejects.toThrow();
  });
});

describe("getReviews", () => {
  beforeEach(() => {
    findMock.mockReset();
    draftModeMock.mockReset();
  });

  it("returns parsed reviews with populated avatar", async () => {
    findMock.mockResolvedValue({
      docs: [
        { id: "r1", text: "…", authorName: "A", authorMeta: "M", rating: 5 },
        { id: "r2", text: "…", authorName: "B", authorMeta: "M2", authorPhoto: { id: "m1", url: "https://x/y.jpg" } },
      ],
    });
    const reviews = await getReviews();
    expect(reviews).toHaveLength(2);
    expect(reviews[1].authorPhoto).toMatchObject({ url: "https://x/y.jpg" });
  });

  it("passes depth=1", async () => {
    findMock.mockResolvedValue({ docs: [] });
    await getReviews();
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "reviews", depth: 1 }),
    );
  });

  it("rejects malformed docs (Zod — missing text)", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "r1", authorName: "A", authorMeta: "M" }],
    });
    await expect(getReviews()).rejects.toThrow();
  });
});

describe("getHome", () => {
  beforeEach(() => {
    findGlobalMock.mockReset();
    draftModeMock.mockReset();
    draftModeMock.mockResolvedValue({ isEnabled: false });
  });

  it("returns parsed Home global", async () => {
    findGlobalMock.mockResolvedValue({
      hero: { tag: "hi", titleLine1: "summer" },
      pillarsBand: { title: "band", pillars: [{ icon: "ic-tent", eyebrow: "a" }] },
      galleryStrip: { tiles: [{ image: { id: "m1", url: "https://x/y.jpg" } }] },
    });

    const home = await getHome();
    expect(home.hero?.tag).toBe("hi");
    expect(home.pillarsBand?.pillars).toHaveLength(1);
    expect(home.galleryStrip?.tiles[0].image).toMatchObject({ url: "https://x/y.jpg" });
  });

  it("requests draft + overrideAccess when draft mode is on", async () => {
    draftModeMock.mockResolvedValue({ isEnabled: true });
    findGlobalMock.mockResolvedValue({});
    await getHome();
    expect(findGlobalMock).toHaveBeenCalledWith(
      expect.objectContaining({ slug: "home", draft: true, overrideAccess: true, depth: 1 }),
    );
  });

  it("tolerates empty global (all fields optional in schema)", async () => {
    findGlobalMock.mockResolvedValue({});
    await expect(getHome()).resolves.toBeTruthy();
  });
});

describe("getAboutPage", () => {
  beforeEach(() => {
    findGlobalMock.mockReset();
    draftModeMock.mockReset();
    draftModeMock.mockResolvedValue({ isEnabled: false });
  });

  it("returns parsed About global with required field shapes", async () => {
    findGlobalMock.mockResolvedValue({
      hero: { eyebrow: "★", titlePart1: "We" },
      storySections: [{ heading: "h1", body: "b1", pullQuote: "q1" }],
      values: [{ num: 1, titleLine1: "l1", text: "t1" }],
      numbers: [{ value: "7", label: "years" }],
      manifesto: [{ text: "we ", emphasized: false }, { text: "dream", emphasized: true }],
    });
    const about = await getAboutPage();
    expect(about.storySections).toHaveLength(1);
    expect(about.values[0].num).toBe(1);
    expect(about.manifesto[1].emphasized).toBe(true);
  });

  it("rejects malformed values (missing titleLine1)", async () => {
    findGlobalMock.mockResolvedValue({
      values: [{ num: 1, text: "t" }],
    });
    await expect(getAboutPage()).rejects.toThrow();
  });

  it("empty global yields empty arrays, not undefined", async () => {
    findGlobalMock.mockResolvedValue({});
    const about = await getAboutPage();
    expect(about.storySections).toEqual([]);
    expect(about.values).toEqual([]);
    expect(about.numbers).toEqual([]);
    expect(about.manifesto).toEqual([]);
  });
});

describe("getGalleryPhotos", () => {
  beforeEach(() => {
    findMock.mockReset();
  });

  it("returns parsed photos with enum categories + shapes", async () => {
    findMock.mockResolvedValue({
      docs: [
        { id: "p1", title: "x", category: "camp", shape: "tall", order: 1 },
        { id: "p2", title: "y", category: "night", shape: "wide", isVideo: true, order: 2 },
      ],
    });
    const photos = await getGalleryPhotos();
    expect(photos).toHaveLength(2);
    expect(photos[1].isVideo).toBe(true);
  });

  it("rejects docs with invalid category enum", async () => {
    findMock.mockResolvedValue({
      docs: [{ id: "p1", title: "x", category: "spaceships", shape: "tall" }],
    });
    await expect(getGalleryPhotos()).rejects.toThrow();
  });

  it("requests depth=1 for image population", async () => {
    findMock.mockResolvedValue({ docs: [] });
    await getGalleryPhotos();
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "gallery-photos", depth: 1 }),
    );
  });
});

describe("getGalleryPage", () => {
  beforeEach(() => {
    findGlobalMock.mockReset();
    draftModeMock.mockReset();
    draftModeMock.mockResolvedValue({ isEnabled: false });
  });

  it("returns gallery-page with parsed insta tiles", async () => {
    findGlobalMock.mockResolvedValue({
      hero: { eyebrow: "★ архив ★" },
      telegramStrip: { handle: "@bc" },
      instaTiles: [{ image: { id: "m1", url: "https://x/y.jpg" } }, { mood: "lake" }],
    });
    const page = await getGalleryPage();
    expect(page.instaTiles).toHaveLength(2);
    expect(page.telegramStrip?.handle).toBe("@bc");
  });

  it("tolerates empty global", async () => {
    findGlobalMock.mockResolvedValue({});
    const page = await getGalleryPage();
    expect(page.instaTiles).toEqual([]);
  });
});
