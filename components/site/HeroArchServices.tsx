"use client";

import { Boxes, ClipboardList, GitMerge, Ruler } from "lucide-react";
import { HeroFeatureGrid, type FeatureItem } from "@/components/site/HeroFeatureGrid";

const ITEMS: readonly FeatureItem[] = [
  { title: "Architectural BIM", icon: Ruler },
  { title: "Structural BIM", icon: Boxes },
  { title: "Coordination & clash", icon: GitMerge },
  { title: "Shop drawings & BOQ", icon: ClipboardList },
];

export function HeroArchServices({
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
