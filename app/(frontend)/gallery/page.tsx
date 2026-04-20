import { getGalleryPage, getGalleryPhotos } from "@/lib/payload/fetchers";

import { GalleryView, type GalleryPhotoView } from "./GalleryView";

export default async function GalleryPage() {
  const [page, photos] = await Promise.all([getGalleryPage(), getGalleryPhotos()]);

  const viewPhotos: GalleryPhotoView[] = photos.map((p) => ({
    id: p.id,
    image: typeof p.image === "object" ? p.image ?? null : null,
    title: p.title,
    meta: p.meta ?? null,
    category: p.category,
    shape: p.shape,
    style: p.style ?? null,
    isVideo: p.isVideo ?? null,
    mood: p.mood ?? null,
  }));

  const instaTiles = (page.instaTiles ?? []).map((t) => ({
    id: t.id ?? null,
    image: typeof t.image === "object" ? t.image ?? null : null,
    mood: t.mood ?? null,
  }));

  return (
    <GalleryView
      photos={viewPhotos}
      hero={page.hero ?? {}}
      telegramStrip={page.telegramStrip ?? {}}
      instaTiles={instaTiles}
    />
  );
}
