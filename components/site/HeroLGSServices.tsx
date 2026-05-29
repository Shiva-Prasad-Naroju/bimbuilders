"use client";

import { Box, ClipboardList, Layers, ShieldCheck } from "lucide-react";
import { HeroFeatureGrid, type FeatureItem } from "@/components/site/HeroFeatureGrid";

const ITEMS: readonly FeatureItem[] = [
  { title: "3D BIM modeling", icon: Box },
  { title: "Shop drawings", icon: ClipboardList },
  { title: "Prefab ready", icon: Layers },
  { title: "Code compliant", icon: ShieldCheck },
];

export function HeroLGSServices({
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
