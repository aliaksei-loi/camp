import type { Metadata, Viewport } from "next";
import { Caveat, Nunito, DM_Serif_Display, Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { IconSprite } from "@/components/IconSprite";
import { Tweaks } from "@/components/Tweaks";
import { PlaceholderFiller } from "@/components/PlaceholderFiller";
import { getFooter, getNav, getSiteSettings } from "@/lib/payload/fetchers";

const gloria = Caveat({
  variable: "--font-gloria",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dmserif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const ogImage = typeof settings.defaultSEO?.ogImage === "object" ? settings.defaultSEO.ogImage : null;
  return {
    title: {
      default:
        settings.defaultSEO?.title ??
        settings.siteName ??
        "Belcreation — семейный кемпинг у озера",
      template: `%s — ${settings.siteName ?? "Belcreation"}`,
    },
    description:
      settings.defaultSEO?.description ??
      "Belcreation — семейный кемпинг на берегу озера Нарочь. Палатки, домики, костры, программы для детей и взрослых. Лето 2026.",
    openGraph: ogImage?.url
      ? {
          images: [{ url: ogImage.url, width: ogImage.width ?? undefined, height: ogImage.height ?? undefined }],
        }
      : undefined,
  };
}

// `themeColor` intentionally omitted here — the pre-hydration script
// in <body> inserts a `<meta name="theme-color">` whose content matches
// the resolved (`--c-paper`) surface for the active theme, and the
// ThemeToggle keeps it in sync on subsequent mode changes. Declaring a
// static themeColor in `viewport` would emit a competing tag.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [nav, footer, settings] = await Promise.all([
    getNav(),
    getFooter(),
    getSiteSettings(),
  ]);

  const logo = typeof settings.logo === "object" ? settings.logo : null;

  return (
    <html
      lang="ru"
      data-palette="blue"
      data-type="handwritten"
      data-density="roomy"
      data-theme="light"
      data-theme-mode="system"
      className={`${gloria.variable} ${nunito.variable} ${dmSerif.variable} ${bricolage.variable}`}
    >
      <body>
        <script
          // Pre-hydration: resolve theme before first paint to avoid FOUC.
          // Reads `belcreation-theme-mode` from localStorage; resolves
          // `system` via matchMedia. Writes both data-theme (resolved)
          // and data-theme-mode (chosen) on <html>. Also inserts a
          // `<meta name="theme-color">` matching the resolved surface
          // (matches `--c-paper`: cream in light, warm-brown in dark) so
          // mobile address-bar tinting agrees with the page on first paint.
          // Schedules a post-paint `data-theme-ready` flag on <html> so
          // CSS color transitions only apply to subsequent toggles, not
          // the initial mode resolution.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='belcreation-theme-mode';var m=localStorage.getItem(k);if(m!=='light'&&m!=='dark'&&m!=='system'){m='system';}var r=m;if(m==='system'){r=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';}var d=document.documentElement;d.setAttribute('data-theme',r);d.setAttribute('data-theme-mode',m);var c=r==='dark'?'#16110d':'#fffbef';var t=document.querySelector('meta[name=\"theme-color\"]');if(!t){t=document.createElement('meta');t.setAttribute('name','theme-color');document.head.appendChild(t);}t.setAttribute('content',c);var raf=window.requestAnimationFrame||function(f){return setTimeout(f,0);};raf(function(){raf(function(){d.setAttribute('data-theme-ready','');});});}catch(e){}})();",
          }}
        />
        <Nav
          scrollLinks={nav.scrollLinks}
          pinnedLink={nav.pinnedLink ?? null}
          marqueeItems={nav.marqueeItems}
          brandLabel={nav.brandLabel ?? null}
          logoUrl={logo?.url ?? null}
        />
        <IconSprite />
        {children}
        <Footer
          cta={footer.cta ?? null}
          brand={footer.brand ?? null}
          navColumn={footer.navColumn ?? null}
          contactColumn={footer.contactColumn ?? null}
          socialColumn={footer.socialColumn ?? null}
          bottomLeft={footer.bottomLeft ?? null}
          bottomRight={footer.bottomRight ?? null}
        />
        {process.env.NODE_ENV !== "production" && <Tweaks />}
        <PlaceholderFiller />
      </body>
    </html>
  );
}
