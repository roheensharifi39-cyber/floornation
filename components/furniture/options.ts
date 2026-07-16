import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Armchair,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  CircleEllipsis,
  Hotel,
  LampFloor,
  PanelsTopLeft,
  Sofa,
  Table2,
  Trees,
  UtensilsCrossed,
} from "lucide-react";

export interface IconOption {
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface DirectionOption {
  label: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const STEPS = [
  { shortLabel: "Space", title: "Choose your space" },
  { shortLabel: "Pieces", title: "Select furniture" },
  { shortLabel: "Direction", title: "Set the direction" },
  { shortLabel: "Details", title: "Define the brief" },
  { shortLabel: "Inspiration", title: "Share inspiration" },
  { shortLabel: "Review", title: "Contact and review" },
] as const;

export const SPACE_OPTIONS: IconOption[] = [
  {
    label: "Living Room",
    description: "Seating, tables and complete lounge settings",
    icon: Sofa,
  },
  {
    label: "Bedroom",
    description: "Beds, nightstands, vanities and storage",
    icon: BedDouble,
  },
  {
    label: "Dining Room",
    description: "Tables, chairs, consoles and entertaining pieces",
    icon: UtensilsCrossed,
  },
  {
    label: "Office",
    description: "Desks, meeting tables and executive storage",
    icon: BriefcaseBusiness,
  },
  {
    label: "Hospitality",
    description: "Guest rooms, restaurants, lobbies and lounges",
    icon: Hotel,
  },
  {
    label: "Outdoor",
    description: "Weather-conscious pieces for terraces and gardens",
    icon: Trees,
  },
  {
    label: "Other",
    description: "Tell us about a different space in your brief",
    icon: CircleEllipsis,
  },
];

export const FURNITURE_OPTIONS: IconOption[] = [
  {
    label: "Sofa",
    description: "Sectional, modular or statement seating",
    icon: Sofa,
  },
  {
    label: "Table",
    description: "Dining, meeting, console or occasional",
    icon: Table2,
  },
  {
    label: "Bed",
    description: "Frames, headboards and integrated bedside pieces",
    icon: BedDouble,
  },
  {
    label: "Chair",
    description: "Dining, lounge, desk or accent seating",
    icon: Armchair,
  },
  {
    label: "Cabinet or Storage",
    description: "Freestanding or built-to-fit organization",
    icon: Archive,
  },
  {
    label: "Reception Desk",
    description: "Purpose-built welcome and service counters",
    icon: PanelsTopLeft,
  },
  {
    label: "Full-Room Furniture",
    description: "A coordinated suite shaped around one space",
    icon: Building2,
  },
  {
    label: "Other",
    description: "A one-off piece or an idea still taking shape",
    icon: LampFloor,
  },
];

export const DIRECTION_OPTIONS: DirectionOption[] = [
  {
    label: "Contemporary",
    description: "Clean silhouettes, refined details and balanced comfort.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Contemporary living room with tailored neutral furniture",
  },
  {
    label: "Minimal",
    description: "Essential forms, visual calm and considered materiality.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Minimal living space with restrained furniture forms",
  },
  {
    label: "Classic Luxury",
    description: "Quiet grandeur, generous upholstery and lasting finishes.",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Classic interior with warm wood and tailored seating",
  },
  {
    label: "Japandi",
    description: "Soft restraint, natural timber and tactile simplicity.",
    image:
      "https://images.unsplash.com/photo-1677568556685-09e40967e1f4?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Light-filled room with low natural timber furniture",
  },
  {
    label: "Industrial",
    description: "Honest structure, darker metals and robust surfaces.",
    image:
      "https://images.unsplash.com/photo-1666877769199-bd1110d33a25?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Modern loft interior with structural furniture details",
  },
  {
    label: "Modern Arabic",
    description: "Contemporary proportion with regional warmth and rhythm.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Layered luxury interior with warm contemporary finishes",
  },
  {
    label: "Fully Custom",
    description: "Start from a sketch, reference or requirement of your own.",
    image:
      "https://images.unsplash.com/photo-1766802982478-3151cf5ee7a7?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Craft-led timber furniture displayed in a design gallery",
  },
];

export const BUDGET_OPTIONS = [
  "Under AED 10,000",
  "AED 10,000–25,000",
  "AED 25,000–50,000",
  "AED 50,000+",
  "I need guidance",
] as const;
