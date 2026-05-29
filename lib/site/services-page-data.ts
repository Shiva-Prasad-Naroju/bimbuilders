import { SERVICES } from "@/lib/site/services-data";

export type ServicePageCard = {
  serviceId: string;
  number: string;
  /** Short label on the card face */
  title: string;
};

const DISPLAY_TITLES: Record<string, string> = {
  "bim-modeling": "BIM Modeling Services",
  coordination: "BIM Coordination & Clash Detection",
  "shop-drawings": "Shop Drawings & Documentation",
  "masonry-shop-drawings": "Masonry Shop Drawings",
  lgs: "LGS Modeling & Detailing",
  "scan-to-bim": "Scan to BIM Services",
  "qty-bom": "QTO & Bill of Materials",
  "modular-prefabrication": "Modular & Prefabrication BIM",
  "digital-twin": "Digital Twin & Advanced BIM",
  automation: "BIM Automation (Dynamo)",
};

/** All services as compact brochure cards (01–10) */
export const SERVICE_PAGE_CARDS: readonly ServicePageCard[] = SERVICES.map(
  (service, index) => ({
    serviceId: service.id,
    number: String(index + 1).padStart(2, "0"),
    title: DISPLAY_TITLES[service.id] ?? service.title,
  }),
);
