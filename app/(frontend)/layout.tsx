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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#B94A2A",
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
      className={`${gloria.variable} ${nunito.variable} ${dmSerif.variable} ${bricolage.variable}`}
    >
      <body>
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
