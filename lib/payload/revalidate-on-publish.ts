import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

type StatusHolder = { _status?: "draft" | "published" };

export const revalidateOnPublish = (
  path: string,
): CollectionAfterChangeHook & GlobalAfterChangeHook =>
  (async ({ doc }: { doc: unknown }) => {
    if ((doc as StatusHolder)?._status === "published") {
      try {
        revalidatePath(path);
      } catch {
        // Called outside a Next.js request (e.g. seed script) — no cache to revalidate.
      }
    }
    return doc;
  }) as CollectionAfterChangeHook & GlobalAfterChangeHook;
