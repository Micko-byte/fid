export interface WorkImage {
  src: string;
  label: string;
}

export interface WorkProject {
  slug: string;
  client: string;
  sector: string;
  years: string;
  title: string;
  tagline: string;
  desc: string;
  scope: string[];
  impact: string;
  images: WorkImage[];
}

export interface WorkSector {
  name: string;
  icon: string;
  src: string;
}

declare global {
  interface Window {
    FID_PROJECTS?: WorkProject[];
    FID_SECTORS?: WorkSector[];
  }
}

export {};
