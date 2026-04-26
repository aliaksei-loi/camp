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

const applyTheme = (mode: Mode): void => {
  const resolved: Resolved = mode === "system" ? resolveSystem() : mode;
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.setAttribute("data-theme-mode", mode);
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

// SSR snapshot — server has no DOM/localStorage; <html> is rendered
// with `data-theme-mode="system"` so that's what the icon must show
// for the SSR pass. The actual displayed icon on hydrate is taken
// from `readDomMode` (post-pre-hydration-script), which keeps the
// SSR HTML and the first client paint in agreement.
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
      document.documentElement.setAttribute(
        "data-theme",
        mql.matches ? "dark" : "light",
      );
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
