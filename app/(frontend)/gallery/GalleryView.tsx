"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { makePlaceholder, type Mood } from "@/lib/placeholders";

import { CmsImage } from "@/components/CmsImage";

type Category = "camp" | "kids" | "food" | "nature" | "night" | "water";
type Filter = "all" | Category;

const CATEGORY_LABELS: Record<Filter, string> = {
  all: "Всё",
  camp: "Кемпинг",
  kids: "Дети",
  food: "Еда",
  nature: "Природа",
  night: "Костры и ночь",
  water: "Вода",
};

const FILTERS: Filter[] = ["all", "camp", "kids", "food", "nature", "night", "water"];

type PhotoImage = {
  id?: string;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
} | null;

export type GalleryPhotoView = {
  id: string;
  image: PhotoImage;
  title: string;
  meta?: string | null;
  category: Category;
  shape: "wide" | "tall" | "short" | "sq";
  style?: string | null;
  isVideo?: boolean | null;
  mood?: string | null;
};

type InstaTileView = {
  id?: string | null;
  image: PhotoImage;
  mood?: string | null;
};

type Props = {
  photos: GalleryPhotoView[];
  hero: {
    eyebrow?: string | null;
    titleLine1?: string | null;
    titleLine2?: string | null;
    sub?: string | null;
  };
  telegramStrip: {
    eyebrow?: string | null;
    handle?: string | null;
    body?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  };
  instaTiles: InstaTileView[];
};

export function GalleryView({ photos, hero, telegramStrip, instaTiles }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      photos
        .map((p, idx) => ({ ...p, idx }))
        .filter((p) => filter === "all" || p.category === filter),
    [photos, filter],
  );

  const openLb = useCallback((idx: number) => setLbIdx(idx), []);
  const closeLb = useCallback(() => setLbIdx(null), []);
  const next = useCallback(() => {
    setLbIdx((i) => (i === null ? i : (i + 1) % photos.length));
  }, [photos.length]);
  const prev = useCallback(() => {
    setLbIdx((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbIdx, closeLb, prev, next]);

  const lbItem = lbIdx === null ? null : photos[lbIdx];
  const lbBg = useMemo(() => {
    if (!lbItem) return "";
    if (lbItem.image?.url) return lbItem.image.url;
    return makePlaceholder({
      w: 1200,
      h: 900,
      mood: (lbItem.mood ?? "tent") as Mood,
      seed: 110 + (lbIdx ?? 0),
    });
  }, [lbItem, lbIdx]);

  return (
    <>
      <section className="g-hero" data-screen-label="01 Галерея заголовок">
        {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
        <h1>
          {hero.titleLine1} <span className="inline-em" data-ph="campfire" data-seed="101" />
          {hero.titleLine2 && (
            <>
              <br />
              {hero.titleLine2}
            </>
          )}
        </h1>
        {hero.sub && <p>{hero.sub}</p>}

        <div className="g-filters">
          {FILTERS.map((f) => {
            const count = f === "all" ? photos.length : photos.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                className={`g-filter ${filter === f ? "on" : ""}`}
                onClick={() => setFilter(f)}
              >
                {CATEGORY_LABELS[f]} <span className="g-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="g-wall">
        {visible.map((p) => (
          <article
            key={p.id}
            className={`g-item ${p.shape} ${p.style ?? ""} ${p.isVideo ? "video" : ""}`}
            onClick={() => openLb(p.idx)}
          >
            <div className="g-img" data-ph={p.mood ?? "tent"} data-seed={110 + p.idx}>
              <CmsImage media={p.image} fill sizes="400px" />
            </div>
            {p.isVideo && <div className="play">▶</div>}
            <div className="g-cap">
              <strong>{p.title}</strong>
              <span className="g-tag">{CATEGORY_LABELS[p.category]}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="insta-strip">
        {telegramStrip.eyebrow && (
          <span className="eyebrow" style={{ color: "var(--c-cream)", opacity: 0.9 }}>
            {telegramStrip.eyebrow}
          </span>
        )}
        {telegramStrip.handle && <h3>{telegramStrip.handle}</h3>}
        {telegramStrip.body && <p>{telegramStrip.body}</p>}
        {telegramStrip.ctaLabel && telegramStrip.ctaHref && (
          <Link href={telegramStrip.ctaHref} className="btn cream" style={{ display: "inline-flex" }}>
            {telegramStrip.ctaLabel}
          </Link>
        )}
        <div className="insta-grid" style={{ marginTop: 36 }}>
          {instaTiles.map((t, i) => {
            const img = t.image;
            return (
              <div key={t.id ?? i} data-ph={t.mood ?? "lake"} data-seed={201 + i} style={{ position: "relative" }}>
                <CmsImage media={img} fill sizes="300px" />
              </div>
            );
          })}
        </div>
      </section>

      <div className={`lightbox ${lbItem ? "on" : ""}`} onClick={(e) => e.target === e.currentTarget && closeLb()}>
        <button className="lb-close" type="button" onClick={closeLb} aria-label="Закрыть">
          ×
        </button>
        <button className="lb-nav lb-prev" type="button" onClick={prev} aria-label="Предыдущее">
          ←
        </button>
        <button className="lb-nav lb-next" type="button" onClick={next} aria-label="Следующее">
          →
        </button>
        <div className="lightbox-frame">
          <div
            className="lightbox-img"
            style={lbBg ? { backgroundImage: `url(${lbBg})` } : undefined}
          />
          <div className="lightbox-cap">
            <strong>{lbItem?.title ?? "—"}</strong>
            <small>{lbItem ? `${lbItem.meta ?? ""} · ${CATEGORY_LABELS[lbItem.category]}` : "—"}</small>
          </div>
        </div>
      </div>
    </>
  );
}
