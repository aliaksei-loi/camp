import { NextResponse } from "next/server";
import { z } from "zod";

import { getSchedule, getSiteSettings } from "@/lib/payload/fetchers";

// Validate exactly what the form sends. The route also derives `total`,
// `submittedAt`, and `period` server-side so the client cannot tamper
// with them.
const BookingSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя"),
  surname: z.string().trim().optional().default(""),
  email: z.string().trim().email("Проверьте email"),
  phone: z.string().trim().optional().default(""),
  adults: z.number().int().min(1).max(50),
  kids: z.number().int().min(0).max(50),
  babies: z.number().int().min(0).max(50),
  interests: z.array(z.string()).default([]),
  notes: z.string().optional().default(""),
  source: z.string().optional().default(""),
  consent: z.literal(true, { message: "Подтвердите согласие с условиями" }),
});

const TIMEOUT_MS = 8_000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Проверьте поля формы" },
      { status: 400 },
    );
  }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error("[booking] SHEETS_WEBHOOK_URL/SECRET env vars are not set");
    return NextResponse.json(
      { ok: false, error: "Регистрация временно недоступна" },
      { status: 500 },
    );
  }

  const data = parsed.data;
  const total = data.adults + data.kids + data.babies;

  // Fetch period from Schedule global (single source of truth for the
  // current camp dates) and contact info for the error fallback message.
  const [schedule, settings] = await Promise.all([
    getSchedule().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  const period = schedule?.periodLabel ?? "";

  // Header-mapped payload — Apps Script reads sheet headers and writes
  // each cell from the matching key. Order/missing/extra columns in the
  // sheet are tolerated.
  const fields: Record<string, string | number> = {
    submittedAt: new Date().toISOString(),
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: data.phone,
    adults: data.adults,
    kids: data.kids,
    babies: data.babies,
    total,
    interests: data.interests.join(", "),
    notes: data.notes,
    source: data.source,
    period,
  };

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, fields }),
      signal: ac.signal,
      redirect: "follow",
    });
    const text = await res.text();
    let upstream: { ok?: boolean; error?: string };
    try {
      upstream = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      upstream = { ok: false, error: text.slice(0, 200) };
    }
    if (!upstream.ok) {
      throw new Error(upstream.error ?? "upstream not ok");
    }
  } catch (err) {
    console.error("[booking] sheets sync failed", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Не получилось отправить заявку. Попробуйте ещё раз через минуту.",
        contact: {
          email: settings?.contact?.email ?? null,
          telegram: settings?.social?.telegramHandle ?? null,
          telegramUrl: settings?.social?.telegramUrl ?? null,
        },
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }

  return NextResponse.json({ ok: true });
}
