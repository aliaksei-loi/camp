import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") ?? "/";

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(path);
}
