"use client";

import { Blocks, ClipboardCheck, Files, HardHat } from "lucide-react";
import { HeroFeatureGrid, type FeatureItem } from "@/components/site/HeroFeatureGrid";

const ITEMS: readonly FeatureItem[] = [
  { title: "Detailed accuracy", icon: Blocks },
  { title: "Full documentation", icon: Files },
  { title: "Code compliant", icon: ClipboardCheck },
  { title: "Construction ready", icon: HardHat },
];

export function HeroMasonryServices({
  onDark = false,
  compact = false,
  active = false,
}: {
  onDark?: boolean;
  compact?: boolean;
  active?: boolean;
}) {
  void compact;
  return <HeroFeatureGrid items={ITEMS} active={active} onDark={onDark} />;
}
