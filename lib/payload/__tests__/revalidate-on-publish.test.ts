import { describe, expect, it, vi, beforeEach } from "vitest";

const { revalidatePathMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

import { revalidateOnPublish } from "../revalidate-on-publish";

type HookArgs = Parameters<ReturnType<typeof revalidateOnPublish>>[0];

const run = async (doc: unknown, path = "/") => {
  const hook = revalidateOnPublish(path);
  await hook({ doc } as HookArgs);
};

describe("revalidateOnPublish", () => {
  beforeEach(() => {
    revalidatePathMock.mockReset();
  });

  it("revalidates when doc status is published (drafts-on collection)", async () => {
    await run({ _status: "published", id: "1" });
    expect(revalidatePathMock).toHaveBeenCalledTimes(1);
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
  });

  it("does not revalidate when doc status is draft", async () => {
    await run({ _status: "draft", id: "1" });
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("revalidates when doc has no status (drafts-off collection)", async () => {
    await run({ id: "1" });
    expect(revalidatePathMock).toHaveBeenCalledTimes(1);
  });

  it("revalidates the configured path (not hard-coded)", async () => {
    await run({ _status: "published", id: "1" }, "/about");
    expect(revalidatePathMock).toHaveBeenCalledWith("/about");
  });

  it("swallows errors from outside a Next request context (seed scripts etc)", async () => {
    revalidatePathMock.mockImplementation(() => {
      throw new Error("Invariant: static generation store missing");
    });
    await expect(
      run({ _status: "published", id: "1" }),
    ).resolves.not.toThrow();
  });
});
