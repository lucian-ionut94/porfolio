import { makeOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Lucian Ionuț — Contact";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return makeOgImage({
    subtitle: "Let's Work Together",
  });
}
