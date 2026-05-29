"use client";

import { Building2, FileStack, Globe, RefreshCw } from "lucide-react";
import { HeroFeatureGrid, type FeatureItem } from "@/components/site/HeroFeatureGrid";

const ITEMS: readonly FeatureItem[] = [
  { title: "Scan to BIM modeling", icon: Building2 },
  { title: "As-built documentation", icon: FileStack },
  { title: "Renovation & retrofit", icon: RefreshCw },
  { title: "Digital twin ready", icon: Globe },
];

export function HeroScanServices({
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
