import Link from "next/link";
import { Fragment } from "react";

type Props = {
  cta?: {
    heading?: string | null;
    body?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  } | null;
  brand?: { name?: string | null; description?: string | null } | null;
  navColumn?: {
    heading?: string | null;
    links: { label: string; href: string; id?: string | null }[];
  } | null;
  contactColumn?: {
    heading?: string | null;
    items: { text: string; id?: string | null }[];
  } | null;
  socialColumn?: {
    heading?: string | null;
    items: { label: string; href?: string | null; id?: string | null }[];
  } | null;
  bottomLeft?: string | null;
  bottomRight?: string | null;
};

export function Footer({
  cta,
  brand,
  navColumn,
  contactColumn,
  socialColumn,
  bottomLeft,
  bottomRight,
}: Props) {
  return (
    <>
      {cta && (cta.heading || cta.body || cta.ctaLabel) && (
        <section className="cta-strip">
          {cta.heading && <h3>{cta.heading}</h3>}
          {cta.body && <p>{cta.body}</p>}
          {cta.ctaLabel && cta.ctaHref && (
            <Link href={cta.ctaHref} className="btn cream lg">
              {cta.ctaLabel}
            </Link>
          )}
        </section>
      )}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">{brand?.name ?? "belcreation"}</div>
            {brand?.description && (
              <p style={{ maxWidth: 360, opacity: 0.8, fontSize: 15, lineHeight: 1.5 }}>{brand.description}</p>
            )}
          </div>
          {navColumn && (navColumn.heading || navColumn.links.length > 0) && (
            <div>
              {navColumn.heading && <h4>{navColumn.heading}</h4>}
              <ul>
                {navColumn.links.map((l, i) => (
                  <li key={l.id ?? `${l.href}-${i}`}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {contactColumn && (contactColumn.heading || contactColumn.items.length > 0) && (
            <div>
              {contactColumn.heading && <h4>{contactColumn.heading}</h4>}
              <ul>
                {contactColumn.items.map((item, i) => (
                  <li key={item.id ?? i}>{item.text}</li>
                ))}
              </ul>
            </div>
          )}
          {socialColumn && (socialColumn.heading || socialColumn.items.length > 0) && (
            <div>
              {socialColumn.heading && <h4>{socialColumn.heading}</h4>}
              <ul>
                {socialColumn.items.map((item, i) => (
                  <li key={item.id ?? `${item.label}-${i}`}>
                    {item.href ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <Fragment>{item.label}</Fragment>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="footer-bottom">
          {bottomLeft && <span>{bottomLeft}</span>}
          {bottomRight && <span>{bottomRight}</span>}
        </div>
      </footer>
    </>
  );
}
