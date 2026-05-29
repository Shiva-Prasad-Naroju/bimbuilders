import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Boxes,
  Calculator,
  ClipboardList,
  Cpu,
  GitMerge,
  Layers2,
  PanelTop,
  ScanLine,
  Zap,
} from "lucide-react";

/** Curated Unsplash URLs — theme-matched, high-res (`w=2000`). */
const u = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=2000&q=88`;

export type ServiceColors = {
  text: string;
  bg: string;
  border: string;
  indicator: string;
};

export type ServiceDefinition = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** One short line under the card title on the homepage. */
  cardTagline: string;
  /** Service-themed hero image (high-res remote or /public path). */
  cardImage: string;
  points: readonly string[];
  icon: LucideIcon;
  colors: ServiceColors;
};

export const SERVICES: readonly ServiceDefinition[] = [
  {
    id: "bim-modeling",
    title: "BIM Modeling (Architectural & Structural)",
    subtitle: "LOD-ready Revit modeling",
    description:
      "3D BIM from CAD, PDF, or concepts — architectural and structural elements, parametric Revit models, LOD 100–500, and coordination-ready delivery.",
    cardTagline: "LOD-ready Revit models from drawings or concepts.",
    cardImage: "/images/BimModelling.png",
    points: [
      "3D BIM modeling from CAD, PDF, or concept drawings",
      "Architectural & structural elements (walls, slabs, beams, columns, etc.)",
      "LOD 100–500 modeling based on project requirements",
      "Parametric, data-rich Revit models",
      "Clean, organized, and coordination-ready files",
    ],
    icon: Building2,
    colors: {
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      indicator: "bg-blue-500",
    },
  },
  {
    id: "coordination",
    title: "BIM Coordination & Clash Detection",
    subtitle: "Multi-discipline integration",
    description:
      "We coordinate Architectural, Structural, and MEP models in Navisworks, run clash detection, document issues, and support resolution before construction.",
    cardTagline: "Multi-trade coordination and clash resolution before site work.",
    cardImage: "/images/bg.png",
    points: [
      "Multi-discipline model coordination (Architectural, Structural, MEP)",
      "Clash detection using Navisworks",
      "Clash reports and issue tracking",
      "Resolution support before construction stage",
      "Improved coordination and reduced site errors",
    ],
    icon: GitMerge,
    colors: {
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      indicator: "bg-emerald-500",
    },
  },
  {
    id: "shop-drawings",
    title: "Shop Drawings (Construction Drawings)",
    subtitle: "Site-ready documentation",
    description:
      "Detailed architectural and structural shop drawings with dimensions, annotations, and execution clarity for construction teams.",
    cardTagline: "Construction-ready drawings with dimensions crews can build from.",
    cardImage: u("photo-1503387762-592deb58ef4e"),
    points: [
      "Detailed architectural and structural shop drawings",
      "Dimensions, annotations, and execution details",
      "Construction-ready documentation",
      "Easy-to-understand drawings for site teams",
    ],
    icon: ClipboardList,
    colors: {
      text: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      indicator: "bg-cyan-500",
    },
  },
  {
    id: "masonry-shop-drawings",
    title: "Masonry Shop Drawings (CMU / Block Work)",
    subtitle: "Block layouts & reinforcement",
    description:
      "Masonry-focused documentation: layouts, reinforcement, openings, sections, elevations, schedules, and control joints.",
    cardTagline: "CMU layouts, reinforcement, and masonry-specific details.",
    cardImage: "/images/MasonryImage.png",
    points: [
      "Masonry wall layout plans",
      "Horizontal & vertical reinforcement detailing",
      "Lintel and opening details",
      "Sections, elevations, and control joints",
      "Masonry schedules and material details",
    ],
    icon: Layers2,
    colors: {
      text: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      indicator: "bg-amber-500",
    },
  },
  {
    id: "lgs",
    title: "Light Gauge Steel (LGS) Modeling & Detailing",
    subtitle: "Fabrication-focused framing",
    description:
      "LGS wall panels and framing systems with studs, tracks, connections, panelization-ready models, and shop drawings for fabrication.",
    cardTagline: "Cold-formed steel framing modeled for fabrication and install.",
    cardImage: "/images/slides/lgs.png",
    points: [
      "LGS wall panels and framing systems",
      "Studs, tracks, and connection detailing",
      "Fabrication-ready shop drawings",
      "Panelization and modular-friendly modeling",
    ],
    icon: PanelTop,
    colors: {
      text: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      indicator: "bg-orange-500",
    },
  },
  {
    id: "scan-to-bim",
    title: "Scan to BIM (Point Cloud Services)",
    subtitle: "As-built precision",
    description:
      "Point cloud conversion (RCP, RCS, E57, LAS) into accurate as-built and retrofit-ready BIM aligned with field conditions.",
    cardTagline: "Field scans converted into accurate as-built and retrofit models.",
    cardImage: "/images/scan2bim.png",
    points: [
      "Conversion of point cloud data (RCP, RCS, E57, LAS)",
      "As-built BIM models",
      "Renovation and retrofit-ready models",
      "High-accuracy modeling based on real-world conditions",
    ],
    icon: ScanLine,
    colors: {
      text: "text-fuchsia-500",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/20",
      indicator: "bg-fuchsia-500",
    },
  },
  {
    id: "qty-bom",
    title: "Quantity Take-Off & Bill of Materials (BOM)",
    subtitle: "Model-driven quantities",
    description:
      "Extract quantities and structured BOMs directly from BIM for estimation, procurement, and clear reporting.",
    cardTagline: "BOQs and BOMs extracted cleanly from coordinated BIM.",
    cardImage: u("photo-1554224155-6726b3ff858f"),
    points: [
      "Quantity extraction directly from BIM models",
      "Accurate BOQs and material take-offs",
      "Structured and easy-to-read reports",
      "Support for cost estimation and procurement",
    ],
    icon: Calculator,
    colors: {
      text: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      indicator: "bg-violet-500",
    },
  },
  {
    id: "modular-prefabrication",
    title: "Modular & Prefabrication BIM Services",
    subtitle: "Design to manufacturing",
    description:
      "Modular coordination, feasibility studies, design-to-manufacturing translation, and factory-ready BIM deliverables.",
    cardTagline: "Modular systems coordinated from design through fabrication.",
    cardImage: u("photo-1565008447742-97f6f38c985c"),
    points: [
      "Modular design coordination",
      "Modular feasibility analysis",
      "Design-to-manufacturing translation",
      "Factory-ready BIM models",
    ],
    icon: Boxes,
    colors: {
      text: "text-sky-500",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      indicator: "bg-sky-500",
    },
  },
  {
    id: "digital-twin",
    title: "Digital Twin & Advanced BIM",
    subtitle: "Lifecycle-ready models",
    description:
      "Highly coordinated BIM for long-term use: constructability, approvals, permitting support, and integration with fabrication workflows.",
    cardTagline: "Lifecycle-grade models linking design, build, and operations data.",
    cardImage: "/images/DigitalTwin.png",
    points: [
      "Highly coordinated BIM models for lifecycle use",
      "Constructability analysis",
      "Support for approvals and permitting",
      "Integration with fabrication workflows",
    ],
    icon: Cpu,
    colors: {
      text: "text-teal-500",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
      indicator: "bg-teal-500",
    },
  },
  {
    id: "automation",
    title: "BIM Automation (Dynamo)",
    subtitle: "Repeatable workflows",
    description:
      "Dynamo-based automation to cut repetitive Revit tasks, accelerate delivery, and keep models consistent and accurate.",
    cardTagline: "Dynamo scripts that speed Revit work and lock in standards.",
    cardImage: "/images/bimautomation.png",
    points: [
      "Automation using Dynamo",
      "Reduction of repetitive tasks",
      "Faster project delivery",
      "Improved consistency and accuracy",
    ],
    icon: Zap,
    colors: {
      text: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      indicator: "bg-rose-500",
    },
  },
] as const;
