import type { Metadata, Viewport } from "next";
import { Caveat, Nunito, DM_Serif_Display, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { IconSprite } from "@/components/IconSprite";
import { Tweaks } from "@/components/Tweaks";
import { PlaceholderFiller } from "@/components/PlaceholderFiller";

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

export const metadata: Metadata = {
  title: "Belcreation — семейный кемпинг у озера",
  description:
    "Belcreation — семейный кемпинг на берегу озера Нарочь. Палатки, домики, костры, программы для детей и взрослых. Лето 2026.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#B94A2A",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-palette="blue"
      data-type="handwritten"
      data-density="roomy"
      className={`${gloria.variable} ${nunito.variable} ${dmSerif.variable} ${bricolage.variable}`}
    >
      <body>
        <Nav />
        <IconSprite />
        {children}
        <Footer />
        {process.env.NODE_ENV !== "production" && <Tweaks />}
        <PlaceholderFiller />
      </body>
    </html>
  );
}
