export const serviceCategories = ["Indoor Flooring", "Outdoor Living"] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export type RelatedProject = {
  name: string;
  slug: string;
  location: string;
};

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  image: string;
  imageAlt: string;
  shortDescription: string;
  benefits: readonly string[];
  applications: readonly string[];
  relatedProject: RelatedProject;
};

export const services: readonly Service[] = [
  {
    slug: "engineered-wood-flooring",
    title: "Engineered Wood Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1723641876143-e92eb116a51c?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Open-plan residence with warm engineered timber flooring and contemporary furnishings",
    shortDescription:
      "A genuine timber surface over a precision-built core, bringing the depth of natural wood to climate-controlled UAE interiors with improved dimensional stability.",
    benefits: [
      "Authentic timber grain and warmth",
      "Stable multi-layer construction",
      "Choice of plank widths, tones, and finishes",
    ],
    applications: ["Living spaces", "Bedrooms", "Hospitality suites"],
    relatedProject: {
      name: "Palm Jumeirah Residence",
      slug: "palm-jumeirah-residence",
      location: "Palm Jumeirah, Dubai",
    },
  },
  {
    slug: "solid-timber-flooring",
    title: "Solid Timber Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1722604531031-96e567e195db?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Quiet interior hallway finished with long natural hardwood floorboards",
    shortDescription:
      "Full-thickness hardwood selected for its character, longevity, and ability to develop a rich patina across carefully managed residential interiors.",
    benefits: [
      "Can be renewed through sanding and refinishing",
      "Long service life with proper care",
      "Distinctive natural variation in every board",
    ],
    applications: ["Private villas", "Formal reception rooms", "Premium residences"],
    relatedProject: {
      name: "Private Villa, Emirates Hills",
      slug: "private-villa-emirates-hills",
      location: "Emirates Hills, Dubai",
    },
  },
  {
    slug: "special-shaped-timber-flooring",
    title: "Special-Shaped Timber Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1570998531453-91c0e1c92f03?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Architectural corridor where timber flooring follows a precise custom layout",
    shortDescription:
      "Bespoke-cut timber elements for curves, borders, medallions, transitions, and patterns that standard planks cannot resolve cleanly.",
    benefits: [
      "Made to suit complex room geometry",
      "Precise borders, inlays, and transitions",
      "Coordinated fabrication and installation",
    ],
    applications: ["Feature entrances", "Statement rooms", "Branded commercial spaces"],
    relatedProject: {
      name: "Dubai Marina Penthouse",
      slug: "dubai-marina-penthouse",
      location: "Dubai Marina, Dubai",
    },
  },
  {
    slug: "parquet-flooring",
    title: "Parquet Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1607683647175-62bfc63a8cbe?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Close view of a precisely laid geometric parquet timber floor",
    shortDescription:
      "Pattern-led timber flooring in herringbone, chevron, and custom compositions, scaled to give each room a deliberate architectural rhythm.",
    benefits: [
      "Timeless geometric character",
      "Pattern scale tailored to the room",
      "Compatible borders and feature inlays",
    ],
    applications: ["Majlis rooms", "Living and dining areas", "Boutiques"],
    relatedProject: {
      name: "Private Villa, Emirates Hills",
      slug: "private-villa-emirates-hills",
      location: "Emirates Hills, Dubai",
    },
  },
  {
    slug: "spc-flooring",
    title: "SPC Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1721395286594-8913b06056eb?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Bright modern room with a clean wood-effect resilient floor",
    shortDescription:
      "A dense stone-polymer core floor that combines convincing timber visuals with water resistance, everyday durability, and efficient click installation.",
    benefits: [
      "Water-resistant rigid core",
      "Reliable dimensional stability",
      "Easy-care surface for active spaces",
    ],
    applications: ["Apartments", "Kitchens and utility areas", "Fast-turnaround retail"],
    relatedProject: {
      name: "Downtown Executive Office",
      slug: "downtown-executive-office",
      location: "Downtown Dubai",
    },
  },
  {
    slug: "luxury-vinyl-flooring",
    title: "Luxury Vinyl Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1630699376289-b62375a35505?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Contemporary kitchen and living space with a refined timber-look floor",
    shortDescription:
      "A resilient, low-maintenance finish with nuanced wood and stone visuals, available in formats suited to both residential and commercial use.",
    benefits: [
      "Comfortable and quiet underfoot",
      "Replaceable plank and tile formats",
      "Commercial wear-layer options",
    ],
    applications: ["Offices", "Hospitality interiors", "Retail environments"],
    relatedProject: {
      name: "Downtown Executive Office",
      slug: "downtown-executive-office",
      location: "Downtown Dubai",
    },
  },
  {
    slug: "laminated-flooring",
    title: "Laminated Flooring",
    category: "Indoor Flooring",
    image:
      "https://images.unsplash.com/photo-1722248211334-04c8f912efa3?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Minimal living room finished with clean-lined laminate flooring",
    shortDescription:
      "A practical surface that balances durable performance, a wide choice of timber decors, and efficient installation for cost-aware project briefs.",
    benefits: [
      "Scratch- and impact-resistant surface",
      "Efficient floating installation",
      "Broad selection of tones and grains",
    ],
    applications: ["Bedrooms", "Rental properties", "Light commercial offices"],
    relatedProject: {
      name: "Dubai Marina Penthouse",
      slug: "dubai-marina-penthouse",
      location: "Dubai Marina, Dubai",
    },
  },
  {
    slug: "wpc-decking",
    title: "WPC Decking",
    category: "Outdoor Living",
    image:
      "https://images.unsplash.com/photo-1780220176917-750c21d4ff87?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Contemporary outdoor terrace with wide composite deck boards and built-in seating",
    shortDescription:
      "Wood-plastic composite decking engineered for low-upkeep outdoor living, with profiles and tones selected to suit the architecture around them.",
    benefits: [
      "Splinter-resistant everyday surface",
      "Consistent colour and board profile",
      "No routine sanding or oiling required",
    ],
    applications: ["Pool decks", "Balconies", "Garden walkways"],
    relatedProject: {
      name: "Opus Tower Terrace",
      slug: "opus-tower-terrace",
      location: "Business Bay, Dubai",
    },
  },
  {
    slug: "natural-timber-decking",
    title: "Natural Timber Decking",
    category: "Outdoor Living",
    image:
      "https://images.unsplash.com/photo-1734079692147-c6fc9438a2d0?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Natural hardwood deck set beside stone landscaping and mature greenery",
    shortDescription:
      "Selected hardwood decking with the grain, tactile warmth, and natural weathering that make an outdoor space feel materially grounded.",
    benefits: [
      "Authentic natural texture",
      "Repairable and refinishable surface",
      "Custom board profiles and detailing",
    ],
    applications: ["Villa terraces", "Pool surrounds", "Hospitality rooftops"],
    relatedProject: {
      name: "Jumeirah Outdoor Retreat",
      slug: "jumeirah-outdoor-retreat",
      location: "Jumeirah, Dubai",
    },
  },
  {
    slug: "pergolas",
    title: "Pergolas",
    category: "Outdoor Living",
    image:
      "https://images.unsplash.com/photo-1772817259738-941b9f5f30b2?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Rooftop garden shaded by a clean-lined timber pergola against a blue sky",
    shortDescription:
      "Site-specific shade structures planned around solar exposure, circulation, and the visual language of the property rather than a standard kit size.",
    benefits: [
      "Made to suit the available span",
      "Integrated options for lighting and screens",
      "Finishes coordinated with decking and facades",
    ],
    applications: ["Villa gardens", "Rooftop terraces", "Hospitality courtyards"],
    relatedProject: {
      name: "Opus Tower Terrace",
      slug: "opus-tower-terrace",
      location: "Business Bay, Dubai",
    },
  },
  {
    slug: "gazebos",
    title: "Gazebos",
    category: "Outdoor Living",
    image:
      "https://images.unsplash.com/photo-1760727467110-12261019bf14?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Freestanding garden gazebo surrounded by palms and layered planting",
    shortDescription:
      "Freestanding outdoor rooms designed to create a sheltered destination for dining, gathering, or quiet retreat within a larger landscape.",
    benefits: [
      "Defines a comfortable outdoor room",
      "Can coordinate decking, screens, and seating",
      "Proportioned to the site and intended use",
    ],
    applications: ["Private gardens", "Pool clubs", "Resort landscapes"],
    relatedProject: {
      name: "Jumeirah Outdoor Retreat",
      slug: "jumeirah-outdoor-retreat",
      location: "Jumeirah, Dubai",
    },
  },
  {
    slug: "fencing",
    title: "Fencing",
    category: "Outdoor Living",
    image:
      "https://images.unsplash.com/photo-1661330232328-afc820096788?auto=format&fit=crop&w=1800&q=85",
    imageAlt:
      "Timber privacy fence integrated into a densely planted residential garden",
    shortDescription:
      "Timber and composite boundary systems that balance privacy, airflow, durability, and the surrounding landscape with considered spacing and detailing.",
    benefits: [
      "Privacy and airflow options",
      "Durable timber and composite systems",
      "Matching gates and service screening",
    ],
    applications: ["Villa perimeters", "Terrace dividers", "Landscape and equipment screens"],
    relatedProject: {
      name: "Jumeirah Outdoor Retreat",
      slug: "jumeirah-outdoor-retreat",
      location: "Jumeirah, Dubai",
    },
  },
] as const;

