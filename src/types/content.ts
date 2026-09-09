export interface Project {
  id: string;
  name: string;
  type: string;
  technology: string;
  role: string;
  description: string;
  preview: string;
  alt: string;
  url: string | null;
}
export interface Service {
  title: string;
  short: string;
  color: string;
  capabilities: string[];
  images: string[];
}
export interface SkillCategory {
  title: string;
  items: string[];
}
export interface GalleryImage {
  src: string;
  alt: string;
}
