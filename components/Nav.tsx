"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavLinkDef = { label: string; href: string; id?: string | null };
type PinnedLinkDef = { label?: string | null; href?: string | null } | null;

type Props = {
  scrollLinks: NavLinkDef[];
  pinnedLink: PinnedLinkDef;
  marqueeItems: { text: string; id?: string | null }[];
  brandLabel?: string | null;
  logoUrl?: string | null;
};

const matches = (href: string, path: string): boolean => {
  if (href === "/") return path === "/";
  if (href.includes("#")) return false;
  return path.startsWith(href);
};

export function Nav({ scrollLinks, pinnedLink, marqueeItems, brandLabel, logoUrl }: Props) {
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

  const isPinnedActive = pinnedLink?.href ? matches(pinnedLink.href, pathname) : false;

  return (
    <>
      <nav className="topbar" aria-label="Основная навигация">
        <Link href="/" className="topbar-brand">
          {logoUrl ? (
            <Image src={logoUrl} alt="" width={384} height={388} aria-hidden="true" />
          ) : (
            <Image src="/logo.png" alt="" width={384} height={388} aria-hidden="true" />
          )}
          <span className="topbar-brand-text">{brandLabel ?? "Belcreation"}</span>
        </Link>
        <div className="topbar-links">
          {scrollLinks.map((l, i) => (
            <Link
              key={l.id ?? `${l.href}-${i}`}
              className={`topbar-link ${matches(l.href, pathname) ? "active" : ""}`}
              href={l.href}
            >
              {l.label}
            </Link>
          ))}
        </div>
        {pinnedLink?.label && pinnedLink?.href && (
          <Link
            className={`topbar-link topbar-link-pinned ${isPinnedActive ? "active" : ""}`}
            href={pinnedLink.href}
          >
            {pinnedLink.label}
          </Link>
        )}
        <ThemeToggle />
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
            {scrollLinks.map((l, i) => (
              <Link
                key={l.id ?? `${l.href}-${i}`}
                className={`mobile-drawer-link ${matches(l.href, pathname) ? "active" : ""}`}
                href={l.href}
                onClick={close}
              >
                ({l.label})
              </Link>
            ))}
          </nav>
          <div className="mobile-drawer-theme">
            <ThemeToggle />
          </div>
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
      {marqueeItems.length > 0 && (
        <div className="marquee-strip">
          <div className="marquee-track">
            <span>
              {[...marqueeItems, ...marqueeItems].map((m, i) => (
                <span key={`${m.id ?? i}-${i}`}>
                  <span>{m.text}</span>
                  <span className="marquee-star">✻</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
