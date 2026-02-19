import { makeOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Lucian Ionuț — Full-Stack Web Developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return makeOgImage({
    subtitle: "Full-Stack Web Developer",
    tags: ["React", "Next.js", "Laravel", "WordPress"],
  });
}
