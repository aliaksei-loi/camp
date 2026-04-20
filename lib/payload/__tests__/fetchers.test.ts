import { describe, expect, it, vi, beforeEach } from "vitest";

const { findMock, draftModeMock } = vi.hoisted(() => ({
  findMock: vi.fn(),
  draftModeMock: vi.fn(),
}));

vi.mock("payload", () => ({
  getPayload: vi.fn(async () => ({ find: findMock })),
}));

vi.mock("next/headers", () => ({
  draftMode: draftModeMock,
}));

vi.mock("@payload-config", () => ({ default: {} }));

import { getActivities, getFaqs } from "../fetchers";

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
