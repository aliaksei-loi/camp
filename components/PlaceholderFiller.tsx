"use client";

import { useEffect } from "react";
import { makePlaceholder, type Mood } from "@/lib/placeholders";

export function PlaceholderFiller() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-ph]");
    nodes.forEach((el, i) => {
      if (el.dataset.phFilled === "1") return;
      const mood = (el.getAttribute("data-ph") || "forest") as Mood;
      const seed = parseInt(el.getAttribute("data-seed") || String(i + 1), 10);
      const rect = el.getBoundingClientRect();
      const w = Math.max(600, Math.min(1600, Math.round(rect.width * 1.6) || 1200));
      const h = Math.max(400, Math.min(1200, Math.round(rect.height * 1.6) || Math.round(w * 0.72)));
      const url = makePlaceholder({ w, h, mood, seed });
      if (el.tagName === "IMG") {
        (el as HTMLImageElement).src = url;
      } else {
        el.style.backgroundImage = `url(${url})`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
      el.dataset.phFilled = "1";
    });
  });

  return null;
}
