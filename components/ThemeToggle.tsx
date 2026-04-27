"use client";

import { useEffect, useSyncExternalStore } from "react";

type Mode = "light" | "system" | "dark";
type Resolved = "light" | "dark";

const STORAGE_KEY = "belcreation-theme-mode";

const NEXT: Record<Mode, Mode> = {
  light: "system",
  system: "dark",
  dark: "light",
};

const LABEL: Record<Mode, string> = {
  light: "Светлая тема",
  system: "Авто (системная тема)",
  dark: "Тёмная тема",
};

const isMode = (v: unknown): v is Mode =>
  v === "light" || v === "system" || v === "dark";

// Client snapshot — reads `data-theme-mode` written on <html> by the
// pre-hydration <script>. The script reads localStorage synchronously
// before React renders, so the attribute is already correct. Sourcing
// from the DOM (rather than localStorage) eliminates the first-paint
// icon swap for returning users with stored light/dark and keeps the
// SSR snapshot consistent with the first client snapshot.
const readDomMode = (): Mode => {
  if (typeof document === "undefined") return "system";
  const v = document.documentElement.getAttribute("data-theme-mode");
  return isMode(v) ? v : "system";
};

const resolveSystem = (): Resolved => {
  if (typeof window === "undefined") return "light";
  if (typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Surface colors that match `--c-paper` for each resolved theme.
// Kept in sync with the dark-token override in `app/globals.css`.
const PAPER_COLOR: Record<Resolved, string> = {
  light: "#fffbef",
  dark: "#16110d",
};

const syncMetaThemeColor = (resolved: Resolved): void => {
  if (typeof document === "undefined") return;
  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", PAPER_COLOR[resolved]);
};

const applyTheme = (mode: Mode): void => {
  const resolved: Resolved = mode === "system" ? resolveSystem() : mode;
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.setAttribute("data-theme-mode", mode);
  syncMetaThemeColor(resolved);
};

// Custom event the toggle dispatches after mutating localStorage so any
// other ThemeToggle instances (e.g. mobile drawer mirror) update too.
const CHANGE_EVENT = "belcreation:theme-mode-change";

const subscribe = (cb: () => void): (() => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
};

// SSR snapshot — on the server there is no DOM and no localStorage,
// so we return the literal `"system"` (which matches the static
// `data-theme-mode="system"` rendered into the server HTML). React's
// initial client render uses this same snapshot for hydration; on the
// next pass `useSyncExternalStore` calls `readDomMode`, which picks up
// any value the pre-hydration script wrote to <html>. The pre-hydration
// script runs before React hydrates, so the visible icon is correct on
// first paint and there is no SSR/client snapshot mismatch.
const getServerSnapshot = (): Mode => "system";

export function ThemeToggle() {
  const mode = useSyncExternalStore<Mode>(
    subscribe,
    readDomMode,
    getServerSnapshot,
  );

  // While in system mode, listen for OS theme changes and update the
  // resolved data-theme without reload.
  useEffect(() => {
    if (mode !== "system") return;
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved: Resolved = mql.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", resolved);
      syncMetaThemeColor(resolved);
    };
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    // Safari < 14 fallback
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [mode]);

  const cycle = () => {
    const next = NEXT[mode];
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    applyTheme(next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const label = LABEL[mode];

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label={label}
      title={label}
      data-mode={mode}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {mode === "light" && <SunIcon />}
        {mode === "system" && <SystemIcon />}
        {mode === "dark" && <MoonIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2.5 L12 5" />
        <path d="M12 19 L12 21.5" />
        <path d="M2.5 12 L5 12" />
        <path d="M19 12 L21.5 12" />
        <path d="M5.2 5.2 L7 7" />
        <path d="M17 17 L18.8 18.8" />
        <path d="M5.2 18.8 L7 17" />
        <path d="M17 7 L18.8 5.2" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 14.5 A 8 8 0 1 1 9.5 4 A 6.5 6.5 0 0 0 20 14.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SystemIcon() {
  // A circle split light/dark — universal "auto" glyph.
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 3.5 A 8.5 8.5 0 0 1 12 20.5 Z" fill="currentColor" />
    </svg>
  );
}
