export type ProjectKind = "Residential" | "Commercial" | "";

export type ContactMethod = "WhatsApp" | "Phone" | "Email" | "";

export interface ProjectDetails {
  dimensions: string;
  materials: string;
  colors: string;
  quantity: number;
  projectKind: ProjectKind;
  budget: string;
  completionDate: string;
  requirements: string;
}

export interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  preferredMethod: ContactMethod;
}

export interface FurnitureBrief {
  space: string;
  furnitureTypes: string[];
  direction: string;
  details: ProjectDetails;
  contact: ContactDetails;
}

export interface UploadedFile {
  id: string;
  file: File;
  previewUrl?: string;
}
