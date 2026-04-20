"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string; id: string; match: (path: string) => boolean };

const scrollLinks: NavLink[] = [
  { href: "/", label: "Главная", id: "home", match: (p) => p === "/" },
  { href: "/about", label: "О нас", id: "about", match: (p) => p.startsWith("/about") },
  { href: "/#accom", label: "Размещение", id: "stay", match: () => false },
  { href: "/#schedule", label: "Смены", id: "shifts", match: () => false },
  { href: "/gallery", label: "Галерея", id: "gallery", match: (p) => p.startsWith("/gallery") },
];

const pinnedLink: NavLink = {
  href: "/booking",
  label: "Регистрация",
  id: "book",
  match: (p) => p.startsWith("/booking"),
};

export function Nav() {
  const pathname = usePathname();
  return (
    <>
      <nav className="topbar" aria-label="Основная навигация">
        <Link href="/" className="topbar-brand">
          belcreation
        </Link>
        <div className="topbar-links">
          {scrollLinks.map((l) => (
            <Link
              key={l.id}
              className={`topbar-link ${l.match(pathname) ? "active" : ""}`}
              href={l.href}
            >
              ({l.label})
            </Link>
          ))}
        </div>
        <Link
          className={`topbar-link topbar-link-pinned ${pinnedLink.match(pathname) ? "active" : ""}`}
          href={pinnedLink.href}
        >
          ({pinnedLink.label})
        </Link>
      </nav>
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
