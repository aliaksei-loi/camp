"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  id: string;
  match: (path: string) => boolean;
};

const scrollLinks: NavLink[] = [
  { href: "/", label: "Главная", id: "home", match: (p) => p === "/" },
  {
    href: "/about",
    label: "О нас",
    id: "about",
    match: (p) => p.startsWith("/about"),
  },
  { href: "/#accom", label: "Размещение", id: "stay", match: () => false },
  { href: "/#schedule", label: "Смены", id: "shifts", match: () => false },
  {
    href: "/gallery",
    label: "Галерея",
    id: "gallery",
    match: (p) => p.startsWith("/gallery"),
  },
];

const pinnedLink: NavLink = {
  href: "/booking",
  label: "Регистрация",
  id: "book",
  match: (p) => p.startsWith("/booking"),
};

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <nav className="topbar" aria-label="Основная навигация">
        <Link href="/" className="topbar-brand">
          <Image
            src="/logo.png"
            alt=""
            width={384}
            height={388}
            aria-hidden="true"
          />
          <span className="topbar-brand-text">Belcreation</span>
        </Link>
        <div className="topbar-links">
          {scrollLinks.map((l) => (
            <Link
              key={l.id}
              className={`topbar-link ${l.match(pathname) ? "active" : ""}`}
              href={l.href}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          className={`topbar-link topbar-link-pinned ${pinnedLink.match(pathname) ? "active" : ""}`}
          href={pinnedLink.href}
        >
          {pinnedLink.label}
        </Link>
        <button
          type="button"
          className="topbar-menu-btn"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`burger ${open ? "open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>
      <div
        id="mobile-drawer"
        className={`mobile-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        hidden={!open}
      >
        <button
          type="button"
          className="mobile-drawer-backdrop"
          aria-label="Закрыть меню"
          onClick={close}
        />
        <div className="mobile-drawer-panel">
          <button
            type="button"
            className="mobile-drawer-close"
            aria-label="Закрыть меню"
            onClick={close}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M4 4 L16 16 M16 4 L4 16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <nav className="mobile-drawer-links" aria-label="Меню">
            {scrollLinks.map((l) => (
              <Link
                key={l.id}
                className={`mobile-drawer-link ${l.match(pathname) ? "active" : ""}`}
                href={l.href}
                onClick={close}
              >
                ({l.label})
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="mobile-drawer-tweaks"
            onClick={() => {
              close();
              window.dispatchEvent(new Event("tweaks:open"));
            }}
          >
            ✎ Tweaks
          </button>
        </div>
      </div>
      <div className="marquee-strip">
        <div className="marquee-track">
          <span>
            <span>BELCREATION ★ СЕМЕЙНЫЙ КЕМПИНГ</span>
            <span className="marquee-star">✻</span>
            <span>ЛЕТО 2026</span>
            <span className="marquee-star">✻</span>
            <span>3 ОЗЕРА · 6 СМЕН · 40 ПАЛАТОК</span>
            <span className="marquee-star">✻</span>
            <span>СЛЫШНО ТОЛЬКО КОСТЁР И ДЕТСКИЙ СМЕХ</span>
            <span className="marquee-star">✻</span>
            <span>BELCREATION ★ СЕМЕЙНЫЙ КЕМПИНГ</span>
            <span className="marquee-star">✻</span>
            <span>ЛЕТО 2026</span>
            <span className="marquee-star">✻</span>
            <span>3 ОЗЕРА · 6 СМЕН · 40 ПАЛАТОК</span>
            <span className="marquee-star">✻</span>
            <span>СЛЫШНО ТОЛЬКО КОСТЁР И ДЕТСКИЙ СМЕХ</span>
            <span className="marquee-star">✻</span>
          </span>
        </div>
      </div>
    </>
  );
}
