import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

type StatusHolder = { _status?: "draft" | "published" };

export const revalidateOnPublish = (
  path: string,
): CollectionAfterChangeHook & GlobalAfterChangeHook =>
  (async ({ doc }: { doc: unknown }) => {
    const status = (doc as StatusHolder)?._status;
    // Fire on: "published" (drafts-on collections) AND undefined (drafts-off collections
    // where every save is effectively published). Skip only explicit drafts.
    if (status !== "draft") {
      try {
        revalidatePath(path);
      } catch {
        // Called outside a Next.js request (e.g. seed script) — no cache to revalidate.
      }
    }
    return doc;
  }) as CollectionAfterChangeHook & GlobalAfterChangeHook;
