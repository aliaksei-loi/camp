import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belcreation — галерея",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
