"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { makePlaceholder, type Mood } from "@/lib/placeholders";

type Category = "camp" | "kids" | "food" | "nature" | "night" | "water";
type Filter = "all" | Category;
type Shape = "wide" | "tall" | "short" | "sq";
type Style = "polaroid";

type Item = {
  mood: Mood;
  cat: Category;
  title: string;
  meta: string;
  shape: Shape;
  style?: Style;
  video?: boolean;
};

const items: Item[] = [
  { mood: "tent", cat: "camp", title: "Лагерь на рассвете", meta: "Смена 3 · 2025", shape: "tall" },
  { mood: "kids", cat: "kids", title: "Квест «Тайна ручья»", meta: "Смена 2 · 2025", shape: "sq", style: "polaroid" },
  { mood: "campfire", cat: "night", title: "Вечерняя песня", meta: "Смена 5 · 2024", shape: "short", video: true },
  { mood: "lake", cat: "water", title: "Нарочь, 6:02 утра", meta: "Смена 1 · 2025", shape: "wide" },
  { mood: "meadow", cat: "food", title: "Каша с малиной", meta: "Кухня · 2025", shape: "sq" },
  { mood: "forest", cat: "nature", title: "Сосны после дождя", meta: "Смена 4 · 2024", shape: "tall" },
  { mood: "meadow", cat: "nature", title: "Лесная йога", meta: "Смена 2 · 2025", shape: "wide" },
  { mood: "kids", cat: "kids", title: "Первая рыба", meta: "Смена 6 · 2024", shape: "short", style: "polaroid" },
  { mood: "sunset", cat: "nature", title: "Закат над водой", meta: "Смена 3 · 2023", shape: "wide" },
  { mood: "tent", cat: "camp", title: "Домик «Грибок»", meta: "Смена 1 · 2025", shape: "sq" },
  { mood: "campfire", cat: "night", title: "Маршмеллоу-вечер", meta: "Смена 5 · 2025", shape: "tall" },
  { mood: "lake", cat: "water", title: "Каноэ на рассвете", meta: "Смена 3 · 2025", shape: "sq" },
  { mood: "kids", cat: "kids", title: "Весь детский десант", meta: "Смена 4 · 2024", shape: "short" },
  { mood: "dune", cat: "food", title: "Хлеб из печки", meta: "Кухня · 2024", shape: "sq", style: "polaroid" },
  { mood: "meadow", cat: "nature", title: "Утренний туман", meta: "Смена 2 · 2023", shape: "tall" },
  { mood: "campfire", cat: "night", title: "Звездное небо", meta: "Астро-вечер", shape: "wide", video: true },
  { mood: "kids", cat: "kids", title: "Лепим из глины", meta: "Керамика · 2025", shape: "sq" },
  { mood: "forest", cat: "nature", title: "Собираем чернику", meta: "Смена 6 · 2024", shape: "short" },
  { mood: "lake", cat: "water", title: "Сап-прогулка", meta: "Смена 3 · 2024", shape: "tall" },
  { mood: "sunset", cat: "camp", title: "Конец смены", meta: "Август · 2024", shape: "wide", style: "polaroid" },
  { mood: "meadow", cat: "food", title: "Пикник в поле", meta: "Кухня · 2025", shape: "sq" },
  { mood: "tent", cat: "camp", title: "Наш шатёр", meta: "Смена 4 · 2025", shape: "short" },
];

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

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  const visible = useMemo(
    () => items.map((it, idx) => ({ ...it, idx })).filter((it) => filter === "all" || it.cat === filter),
    [filter],
  );

  const openLb = useCallback((idx: number) => setLbIdx(idx), []);
  const closeLb = useCallback(() => setLbIdx(null), []);
  const next = useCallback(() => {
    setLbIdx((i) => (i === null ? i : (i + 1) % items.length));
  }, []);
  const prev = useCallback(() => {
    setLbIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }, []);

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

  const lbUrl = useMemo(() => {
    if (lbIdx === null) return "";
    const it = items[lbIdx];
    return makePlaceholder({ w: 1200, h: 900, mood: it.mood, seed: 110 + lbIdx });
  }, [lbIdx]);

  const lbItem = lbIdx === null ? null : items[lbIdx];

  return (
    <>
      <section className="g-hero" data-screen-label="01 Галерея заголовок">
        <span className="eyebrow">★ архив ★</span>
        <h1>
          Семь лет <span className="inline-em" data-ph="campfire" data-seed="101" /> лета,
          <br />
          собранные в одном месте.
        </h1>
        <p>
          Фотографии, кадры с костровых вечеров, детские рисунки и случайные моменты, которые нам потом присылают
          семьи.
        </p>

        <div className="g-filters">
          {FILTERS.map((f) => {
            const count = f === "all" ? items.length : items.filter((i) => i.cat === f).length;
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
        {visible.map((it) => (
          <article
            key={it.idx}
            className={`g-item ${it.shape} ${it.style ?? ""} ${it.video ? "video" : ""}`}
            onClick={() => openLb(it.idx)}
          >
            <div className="g-img" data-ph={it.mood} data-seed={110 + it.idx} />
            {it.video && <div className="play">▶</div>}
            <div className="g-cap">
              <strong>{it.title}</strong>
              <span className="g-tag">{CATEGORY_LABELS[it.cat]}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="insta-strip">
        <span className="eyebrow" style={{ color: "var(--c-cream)", opacity: 0.9 }}>
          ★ мы в телеграме ★
        </span>
        <h3>@belcreation.camp</h3>
        <p>Каждую неделю мы выкладываем кусочек лета: новые даты, кадры с кухни, заметки из леса.</p>
        <div className="btn cream" style={{ display: "inline-flex" }}>
          Подписаться в Telegram →
        </div>
        <div className="insta-grid" style={{ marginTop: 36 }}>
          <div data-ph="lake" data-seed="201" />
          <div data-ph="tent" data-seed="202" />
          <div data-ph="campfire" data-seed="203" />
          <div data-ph="meadow" data-seed="204" />
          <div data-ph="kids" data-seed="205" />
          <div data-ph="forest" data-seed="206" />
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
            style={lbUrl ? { backgroundImage: `url(${lbUrl})` } : undefined}
          />
          <div className="lightbox-cap">
            <strong>{lbItem?.title ?? "—"}</strong>
            <small>{lbItem ? `${lbItem.meta} · ${CATEGORY_LABELS[lbItem.cat]}` : "—"}</small>
          </div>
        </div>
      </div>
    </>
  );
}
