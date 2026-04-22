import type { GeneratePreviewURL, LivePreviewConfig } from "payload";

const buildHref = (path: string): string | null => {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;
  const qs = new URLSearchParams({ secret, path });
  return `/api/preview?${qs.toString()}`;
};

export const generatePreviewURL = (path: string): GeneratePreviewURL =>
  () => buildHref(path);

export const livePreview = (path: string): LivePreviewConfig => ({
  url: () => buildHref(path) ?? undefined,
  breakpoints: [
    { name: "mobile", label: "Mobile", width: 390, height: 844 },
    { name: "tablet", label: "Tablet", width: 820, height: 1180 },
    { name: "desktop", label: "Desktop", width: 1440, height: 900 },
  ],
});
