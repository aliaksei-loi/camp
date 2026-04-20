"use client";

import { useEffect, useState } from "react";

type Palette = "blue" | "coral" | "lemon" | "salmon" | "lime";
type Typography = "handwritten" | "serif" | "sans";
type Density = "roomy" | "compact";
type Hero = "v1" | "v2" | "v3";

type State = {
  palette: Palette;
  typography: Typography;
  stripes: boolean;
  density: Density;
  hero: Hero;
};

const DEFAULT: State = {
  palette: "blue",
  typography: "handwritten",
  stripes: true,
  density: "roomy",
  hero: "v1",
};

export function Tweaks() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<State>(DEFAULT);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", s.palette);
    root.setAttribute("data-type", s.typography);
    root.setAttribute("data-density", s.density);
    document.body.classList.toggle("no-stripes", !s.stripes);
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.classList.remove("hero-v1", "hero-v2", "hero-v3");
      hero.classList.add("hero-" + s.hero);
    }
  }, [s]);

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((prev) => ({ ...prev, [k]: v }));

  return (
    <>
      {!open && (
        <button className="tweaks-open-btn" type="button" onClick={() => setOpen(true)}>
          ✎ Tweaks
        </button>
      )}
      <div id="tweaks-panel" className={open ? "open" : ""}>
        <div className="tweaks-head">
          <span>Tweaks</span>
          <button className="tweaks-close" type="button" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
        </div>
        <div className="tweaks-body">
          <div className="tweak-group">
            <label className="tweak-label">Палитра</label>
            <div className="tweak-opts">
              {(["blue", "coral", "lemon", "salmon", "lime"] as Palette[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`swatch swatch-${p} ${s.palette === p ? "on" : ""}`}
                  onClick={() => set("palette", p)}
                  aria-label={p}
                />
              ))}
            </div>
          </div>
          <div className="tweak-group">
            <label className="tweak-label">Типографика</label>
            <div className="tweak-opts">
              {(
                [
                  ["handwritten", "Рукопись"],
                  ["serif", "Serif"],
                  ["sans", "Sans"],
                ] as [Typography, string][]
              ).map(([v, lbl]) => (
                <button
                  key={v}
                  type="button"
                  className={s.typography === v ? "on" : ""}
                  onClick={() => set("typography", v)}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
          <div className="tweak-group">
            <label className="tweak-label">Полоски на фоне</label>
            <div className="tweak-opts">
              <button type="button" className={s.stripes ? "on" : ""} onClick={() => set("stripes", true)}>
                Вкл
              </button>
              <button type="button" className={!s.stripes ? "on" : ""} onClick={() => set("stripes", false)}>
                Выкл
              </button>
            </div>
          </div>
          <div className="tweak-group">
            <label className="tweak-label">Плотность</label>
            <div className="tweak-opts">
              <button type="button" className={s.density === "roomy" ? "on" : ""} onClick={() => set("density", "roomy")}>
                Просторно
              </button>
              <button
                type="button"
                className={s.density === "compact" ? "on" : ""}
                onClick={() => set("density", "compact")}
              >
                Компактно
              </button>
            </div>
          </div>
          <div className="tweak-group">
            <label className="tweak-label">Hero-композиция</label>
            <div className="tweak-opts">
              {(
                [
                  ["v1", "Split"],
                  ["v2", "Stack"],
                  ["v3", "Bold"],
                ] as [Hero, string][]
              ).map(([v, lbl]) => (
                <button key={v} type="button" className={s.hero === v ? "on" : ""} onClick={() => set("hero", v)}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
