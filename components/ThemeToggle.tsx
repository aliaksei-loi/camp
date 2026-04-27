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

// SSR snapshot — must match the static `data-theme-mode` rendered into
// the server HTML (`light`). On the client, the pre-hydration script
// writes the resolved mode to <html> before React hydrates, and the
// next `useSyncExternalStore` pass picks it up via `readDomMode`.
const getServerSnapshot = (): Mode => "light";

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
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3.6" fill="currentColor" stroke="none" />
      <path d="M12 2.6v2" />
      <path d="M12 19.4v2" />
      <path d="M2.6 12h2" />
      <path d="M19.4 12h2" />
      <path d="M5.3 5.3l1.4 1.4" />
      <path d="M17.3 17.3l1.4 1.4" />
      <path d="M5.3 18.7l1.4-1.4" />
      <path d="M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  // Tilted crescent + a small star — a hand-warm "night at camp" glyph.
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 14.6A7.5 7.5 0 1 1 9.4 3.5a8.6 8.6 0 0 0 11.1 11.1Z"
        fill="currentColor"
      />
      <path
        d="M17.7 5.2 18 6.6l1.4.3-1.4.3-.3 1.4-.3-1.4-1.4-.3 1.4-.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SystemIcon() {
  // Laptop silhouette — universally reads as "follow the device".
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4.5" width="18" height="11" rx="1.6" />
      <path d="M2 18.5h20" />
    </svg>
  );
}
