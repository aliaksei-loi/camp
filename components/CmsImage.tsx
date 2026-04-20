import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Media = {
  id?: string;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type Props = {
  media: Media | string | null | undefined;
  fallback?: ReactNode;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

const isPopulated = (m: Props["media"]): m is Media =>
  !!m && typeof m === "object" && typeof m.url === "string" && m.url.length > 0;

export function CmsImage({
  media,
  fallback = null,
  className,
  style,
  sizes,
  priority,
  fill,
}: Props) {
  if (!isPopulated(media)) return <>{fallback}</>;

  const alt = media.alt ?? "";

  if (fill) {
    return (
      <Image
        src={media.url as string}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        style={style}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={media.url as string}
      alt={alt}
      width={media.width ?? 1200}
      height={media.height ?? 800}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
