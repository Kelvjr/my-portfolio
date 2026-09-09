import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    name: "AEGIS",
    type: "Web & mobile application",
    technology: "Next.js / Node.js / PostgreSQL / Flutter",
    role: "Lead / Full-stack developer",
    description:
      "A consumer alert system that brings safety information, verification and reporting into one place.",
    preview: "/media/images/marquee/aegis.png",
    alt: "AEGIS consumer alert platform shown on a laptop",
    url: "https://www.aegisalerts.online/",
    id: "aegis",
  },
  {
    name: "Kasvin Homes",
    type: "Brand identity",
    technology: "Logo / Visual identity / Brand guidelines",
    role: "Brand designer / Art director",
    description:
      "A complete brand identity system for a modern hospitality brand.",
    preview: "/media/images/marquee/kasvin.png",
    alt: "Kasvin Homes brand identity",
    url: null,
    id: "kasvin",
  },
  {
    name: "Grains Depot",
    type: "Brand identity",
    technology: "Logo / Visual identity / Packaging",
    role: "Brand designer",
    description:
      "A visual identity for a provisions business offering everyday food and household essentials.",
    preview: "/media/images/grains/branding.webp",
    alt: "Grains Depot brand identity",
    url: null,
    id: "grains",
  },
];
