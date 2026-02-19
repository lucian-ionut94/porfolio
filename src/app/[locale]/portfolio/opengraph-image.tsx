import { makeOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Lucian Ionuț — Portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return makeOgImage({
    subtitle: "Portfolio",
    tags: ["WordPress", "React", "Laravel", "OpenCart"],
  });
}
