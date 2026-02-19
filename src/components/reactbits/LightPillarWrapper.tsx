"use client";

import dynamic from "next/dynamic";

const LightPillar = dynamic(() => import("./LightPillar"), {
  ssr: false,
});

interface LightPillarWrapperProps {
  colorA?: string;
  colorB?: string;
  pillarCount?: number;
  speed?: number;
  className?: string;
}

export default function LightPillarWrapper(props: LightPillarWrapperProps) {
  return <LightPillar {...props} />;
}
