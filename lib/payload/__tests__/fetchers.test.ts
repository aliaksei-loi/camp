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

import { getFaqs } from "../fetchers";

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
