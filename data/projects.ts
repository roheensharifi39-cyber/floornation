export const projectFilters = [
  "All",
  "Residential",
  "Commercial",
  "Flooring",
  "Decking",
  "Outdoor",
  "Furniture",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, "All">;
export type ProjectSector = Extract<
  ProjectCategory,
  "Residential" | "Commercial"
>;

export type ProjectImage = {
  readonly src: string;
  readonly alt: string;
  readonly orientation: "landscape" | "portrait" | "wide";
};

export type ProjectFact = {
  readonly label: string;
  readonly value: string;
};

export type ProjectMaterial = {
  readonly name: string;
  readonly detail: string;
};

export type RelatedService = {
  readonly title: string;
  readonly href: string;
  readonly description: string;
};

export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly location: string;
  readonly category: ProjectSector;
  readonly categories: readonly ProjectCategory[];
  readonly material: string;
  readonly completionYear: string;
  readonly coverImage: string;
  readonly coverAlt: string;
  readonly heroImage: string;
  readonly heroAlt: string;
  readonly summary: string;
  readonly statement: string;
  readonly challenge: readonly string[];
  readonly solution: readonly string[];
  readonly materials: readonly ProjectMaterial[];
  readonly gallery: readonly ProjectImage[];
  readonly facts: readonly ProjectFact[];
  readonly relatedService: RelatedService;
};

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=2400&q=85`;

export const projects: readonly Project[] = [
  {
    slug: "private-villa-emirates-hills",
    title: "Private Villa, Emirates Hills",
    location: "Emirates Hills, Dubai",
    category: "Residential",
    categories: ["Residential", "Flooring", "Furniture"],
    material: "European oak flooring & bespoke joinery",
    completionYear: "2025",
    coverImage: unsplash("1757924461488-ef9ad0670978"),
    coverAlt:
      "Calm villa living room framed by warm timber flooring and full-height glazing",
    heroImage: unsplash("1521783593447-5702b9bfd267"),
    heroAlt:
      "Open-plan Emirates Hills villa interior with natural oak surfaces and soft daylight",
    summary:
      "A restrained family interior where continuous oak flooring gives a large villa a warmer, more coherent rhythm.",
    statement:
      "One timber language was carried through the public rooms, stair details, and custom joinery so the architecture reads as a single, composed home.",
    challenge: [
      "The villa's long sightlines crossed several structurally different floor zones. The finish needed to remain visually continuous while accommodating movement, cooling loads, and transitions to stone.",
      "The client also wanted a pale, natural character without losing the grain definition that makes real timber feel substantial.",
    ],
    solution: [
      "We mapped the installation direction from the main entrance through the living spaces, then prepared and levelled each substrate before fitting wide-plank engineered oak with controlled perimeter movement gaps.",
      "A low-sheen, lightly brushed finish reduced glare from the glazing. Stair nosings, thresholds, and selected joinery panels were colour-matched in the workshop for a quiet architectural connection.",
    ],
    materials: [
      {
        name: "Wide-plank European oak",
        detail: "Lightly brushed, natural-matte engineered boards",
      },
      {
        name: "Solid oak stair profiles",
        detail: "Custom-milled nosings and landing trims",
      },
      {
        name: "Oak veneer joinery",
        detail: "Book-matched panels with a low-sheen protective finish",
      },
    ],
    gallery: [
      {
        src: unsplash("1708111776235-990d08c84658"),
        alt: "Oak floor continuing from a villa lounge toward the glazed garden elevation",
        orientation: "wide",
      },
      {
        src: unsplash("1710883734891-93709398496d"),
        alt: "Detail of warm timber, neutral upholstery, and precise shadow gaps",
        orientation: "portrait",
      },
      {
        src: unsplash("1746439318854-4a8bc02a03ba"),
        alt: "Layered villa seating area unified by pale engineered oak flooring",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Property", value: "Private villa" },
      { label: "Floor area", value: "365 m²" },
      { label: "Installation", value: "8 weeks" },
      { label: "Finish", value: "Natural matte" },
      { label: "Completed", value: "2025" },
    ],
    relatedService: {
      title: "Engineered Wood Flooring",
      href: "/services#engineered-wood-flooring",
      description:
        "Stable, genuine timber flooring specified around the character and technical needs of each interior.",
    },
  },
  {
    slug: "opus-tower-terrace",
    title: "Opus Tower Terrace",
    location: "Business Bay, Dubai",
    category: "Commercial",
    categories: ["Commercial", "Decking", "Outdoor"],
    material: "Ipe timber decking & integrated planters",
    completionYear: "2024",
    coverImage: unsplash("1696846912973-3233cc80bf86"),
    coverAlt:
      "Elevated hospitality terrace arranged across richly toned timber decking",
    heroImage: unsplash("1696846912293-9a8013e17403"),
    heroAlt:
      "Contemporary Business Bay terrace with timber deck, shade structure, and lounge seating",
    summary:
      "A hard-working hospitality terrace transformed into a warm outdoor room designed for lunch service, evening events, and Dubai's intense climate.",
    statement:
      "The deck is both finish and infrastructure: it resolves drainage, level changes, services, and furniture zones without interrupting the terrace's clean perimeter.",
    challenge: [
      "The exposed elevation receives strong sun and wind, while the existing slab contained multiple falls, access hatches, and drainage points that had to remain serviceable.",
      "Installation also needed to progress around live building operations with strict delivery windows and minimal noise transfer.",
    ],
    solution: [
      "We developed a ventilated subframe with removable access bays and calibrated pedestal heights, allowing the finished deck to read level while preserving the original drainage strategy below.",
      "Dense ipe boards were pre-finished on all sides and fixed with concealed stainless hardware. Flush planter edges and coordinated lighting channels keep the operational details visually quiet.",
    ],
    materials: [
      {
        name: "FSC-sourced ipe decking",
        detail: "Dense exterior timber with UV-resistant oil finish",
      },
      {
        name: "Aluminium substructure",
        detail: "Ventilated, corrosion-resistant support system",
      },
      {
        name: "Stainless concealed fixings",
        detail: "Marine-grade clips and removable access panels",
      },
    ],
    gallery: [
      {
        src: unsplash("1527359443443-84a48aec73d2"),
        alt: "Shaded timber terrace prepared for daytime hospitality service",
        orientation: "wide",
      },
      {
        src: unsplash("1580469322701-45b34d5e6e9b"),
        alt: "Pergola structure meeting the deck beside planted edges",
        orientation: "portrait",
      },
      {
        src: unsplash("1696321061861-f549e8765e67"),
        alt: "Outdoor seating aligned with concealed deck-board fixings",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Setting", value: "Hospitality terrace" },
      { label: "Deck area", value: "210 m²" },
      { label: "System", value: "Raised & ventilated" },
      { label: "Programme", value: "6 weeks" },
      { label: "Completed", value: "2024" },
    ],
    relatedService: {
      title: "Natural Timber Decking",
      href: "/services#natural-timber-decking",
      description:
        "Exterior timber systems detailed for heat, drainage, maintenance access, and a naturally tactile finish.",
    },
  },
  {
    slug: "palm-jumeirah-residence",
    title: "Palm Jumeirah Residence",
    location: "Palm Jumeirah, Dubai",
    category: "Residential",
    categories: ["Residential", "Flooring", "Furniture"],
    material: "Chevron oak parquet & custom furniture",
    completionYear: "2025",
    coverImage: unsplash("1512918728675-ed5a9ecdebfd"),
    coverAlt:
      "Refined Palm Jumeirah living space with chevron timber flooring and tailored furniture",
    heroImage: unsplash("1601002257790-ebe0966a85ae"),
    heroAlt:
      "Sunlit coastal residence layered with oak flooring, soft textiles, and bespoke furniture",
    summary:
      "A coastal apartment given depth and structure through measured chevron parquet, tonal timberwork, and furniture made to the room's exact proportions.",
    statement:
      "The pattern creates movement without noise, drawing the eye toward the sea view while custom pieces preserve generous circulation around the living room.",
    challenge: [
      "Large glazed elevations created shifting light across the floor and made even minor tonal inconsistencies visible. The existing screed also varied at the transition to stone bathrooms and balcony thresholds.",
      "Off-the-shelf furniture proportions compromised the main circulation route and blocked the view from the entrance.",
    ],
    solution: [
      "We dry-laid and tone-balanced the chevron blocks before installation, establishing the centreline from the principal view rather than the room perimeter. Careful substrate correction produced flush, low-profile transitions.",
      "A low modular sofa, oak console, and curved occasional tables were developed around the plan, using upholstery and timber tones that sit quietly beside the floor rather than competing with it.",
    ],
    materials: [
      {
        name: "Select-grade oak parquet",
        detail: "Chevron blocks with a smoked natural-oil finish",
      },
      {
        name: "European oak veneer",
        detail: "Custom media console and occasional tables",
      },
      {
        name: "Performance upholstery",
        detail: "Textured neutral weave suited to daily family use",
      },
    ],
    gallery: [
      {
        src: unsplash("1600376709132-33584c8ddb17"),
        alt: "Coastal terrace framed by warm wood and relaxed lounge furniture",
        orientation: "wide",
      },
      {
        src: unsplash("1602860739945-9a61573cd62d"),
        alt: "Timber shade structure extending the residence toward its outdoor view",
        orientation: "portrait",
      },
      {
        src: unsplash("1530491396055-5aca4203edbf"),
        alt: "Tailored outdoor setting continuing the apartment's calm material palette",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Property", value: "Waterfront apartment" },
      { label: "Floor area", value: "185 m²" },
      { label: "Pattern", value: "45° chevron" },
      { label: "Custom pieces", value: "6" },
      { label: "Completed", value: "2025" },
    ],
    relatedService: {
      title: "Parquet Flooring",
      href: "/services#parquet-flooring",
      description:
        "Precisely set parquet patterns with considered borders, centre lines, transitions, and finish selection.",
    },
  },
  {
    slug: "downtown-executive-office",
    title: "Downtown Executive Office",
    location: "Downtown Dubai",
    category: "Commercial",
    categories: ["Commercial", "Flooring", "Furniture"],
    material: "Smoked oak flooring & executive joinery",
    completionYear: "2024",
    coverImage: unsplash("1497215728101-856f4ea42174"),
    coverAlt:
      "Contemporary executive workspace with smoked oak flooring and focused natural light",
    heroImage: unsplash("1631247022917-53f9af27d719"),
    heroAlt:
      "Downtown Dubai office interior composed with dark timber, glass, and tailored work settings",
    summary:
      "A focused workplace where smoked oak brings warmth to a precise glass-and-stone shell without compromising commercial durability.",
    statement:
      "Floor, wall, and furniture details were coordinated as one package, giving client-facing rooms a consistent identity and simplifying delivery across trades.",
    challenge: [
      "The office needed an executive character that felt assured but not ceremonial. Acoustic requirements, heavy rolling furniture, and frequent client traffic placed clear performance demands on every timber surface.",
      "A compressed fit-out programme required decisions on flooring, joinery, and loose furniture to move in parallel.",
    ],
    solution: [
      "We specified a commercial-grade engineered oak with a textured, repairable finish and installed it over a tested acoustic underlay. Board direction reinforces the route from reception to the boardroom.",
      "Wall panels, credenzas, and the meeting table were sampled together under the project's actual lighting, producing controlled tonal variation across different timber constructions.",
    ],
    materials: [
      {
        name: "Smoked engineered oak",
        detail: "Textured UV-oiled finish for high-traffic commercial use",
      },
      {
        name: "Acoustic underlay",
        detail: "High-density resilient layer beneath the timber floor",
      },
      {
        name: "Quarter-cut oak veneer",
        detail: "Executive joinery, wall panels, and boardroom table",
      },
    ],
    gallery: [
      {
        src: unsplash("1745970347652-8f22f5d7d3ba"),
        alt: "Executive meeting room with an expansive timber table and restrained finishes",
        orientation: "wide",
      },
      {
        src: unsplash("1610374792793-f016b77ca51a"),
        alt: "Quiet workplace circulation defined by timber and glazed partitions",
        orientation: "portrait",
      },
      {
        src: unsplash("1431540015161-0bf868a2d407"),
        alt: "Boardroom arranged around a warm timber conference table",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Use", value: "Executive workplace" },
      { label: "Floor area", value: "420 m²" },
      { label: "Work settings", value: "34" },
      { label: "Programme", value: "9 weeks" },
      { label: "Completed", value: "2024" },
    ],
    relatedService: {
      title: "Commercial Wood Flooring",
      href: "/services#engineered-wood-flooring",
      description:
        "Timber floors selected and installed for commercial traffic, acoustic comfort, repairability, and brand character.",
    },
  },
  {
    slug: "jumeirah-outdoor-retreat",
    title: "Jumeirah Outdoor Retreat",
    location: "Jumeirah, Dubai",
    category: "Residential",
    categories: ["Residential", "Decking", "Outdoor"],
    material: "WPC decking, pergola & privacy screens",
    completionYear: "2025",
    coverImage: unsplash("1696846911635-83b97e53fb65"),
    coverAlt:
      "Private Jumeirah garden retreat with shaded seating and timber-toned decking",
    heroImage: unsplash("1695144438038-a8ca899c20d7"),
    heroAlt:
      "Layered outdoor living area with pergola, poolside deck, and integrated planting",
    summary:
      "An underused side garden redesigned as a shaded all-day retreat with a low-maintenance deck, dining zone, and filtered privacy.",
    statement:
      "A simple sequence of shade, deck, planting, and light turns a narrow exterior strip into three distinct places to gather, dine, and unwind.",
    challenge: [
      "The garden's west-facing orientation, narrow footprint, and overlooking neighbours limited comfort and privacy. Existing irrigation and pool services also crossed the proposed deck zone.",
      "The family wanted the warmth of timber with minimal seasonal refinishing and safe barefoot performance around the pool.",
    ],
    solution: [
      "We used a heat-mitigating capped composite board on a drained aluminium frame, retaining access to every service point. Board direction visually widens the garden and creates clear zones without raised thresholds.",
      "A slim pergola and staggered timber-look screens filter direct sun and views while allowing air movement. Integrated warm lighting extends use into the evening without turning the garden into a brightly lit stage.",
    ],
    materials: [
      {
        name: "Capped WPC decking",
        detail: "Slip-conscious, low-maintenance boards in a weathered teak tone",
      },
      {
        name: "Powder-coated aluminium",
        detail: "Pergola frame and ventilated deck substructure",
      },
      {
        name: "Timber-look privacy battens",
        detail: "UV-stable vertical screens with varied spacing",
      },
    ],
    gallery: [
      {
        src: unsplash("1602774895672-b553538bceb9"),
        alt: "Poolside deck with outdoor dining and shade overhead",
        orientation: "wide",
      },
      {
        src: unsplash("1703783028657-5905a1662aa8"),
        alt: "Outdoor lounge chair set on clean-lined timber decking",
        orientation: "portrait",
      },
      {
        src: unsplash("1515768678138-4ba95ba6ec96"),
        alt: "Sheltered dining terrace connected to the planted garden",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Property", value: "Private villa garden" },
      { label: "Outdoor area", value: "145 m²" },
      { label: "Shade structure", value: "38 m²" },
      { label: "Programme", value: "5 weeks" },
      { label: "Completed", value: "2025" },
    ],
    relatedService: {
      title: "WPC Decking & Pergolas",
      href: "/services#wpc-decking",
      description:
        "Coordinated low-maintenance decking and shade systems designed around climate, drainage, and daily use.",
    },
  },
  {
    slug: "dubai-marina-penthouse",
    title: "Dubai Marina Penthouse",
    location: "Dubai Marina",
    category: "Residential",
    categories: ["Residential", "Flooring", "Furniture"],
    material: "Natural oak planks & made-to-measure furniture",
    completionYear: "2023",
    coverImage: unsplash("1497366811353-6870744d04b2"),
    coverAlt:
      "Elevated penthouse interior with natural oak floor and sculptural contemporary furniture",
    heroImage: unsplash("1497366754035-f200968a6e72"),
    heroAlt:
      "Dubai Marina penthouse living area shaped by warm timber and panoramic daylight",
    summary:
      "A bright penthouse softened with long natural-oak planks and made-to-measure pieces that sit comfortably within an angular plan.",
    statement:
      "Rather than filling the floor plate, the material plan preserves long views and lets a small number of carefully proportioned timber pieces anchor each zone.",
    challenge: [
      "Irregular perimeter glazing and angled columns left standard furniture either undersized or intrusive. The floor also needed to flow across expansive rooms without amplifying impact sound to the residence below.",
      "The client wanted visible natural variation, but with enough curation that the finished floor remained calm at penthouse scale.",
    ],
    solution: [
      "We graded and distributed extra-long oak boards across the plan before fitting, reserving quieter boards for formal areas and more expressive grain for private rooms. A high-performance acoustic build-up was tested before full installation.",
      "A curved dining table, window bench, and low media unit were templated on site to respond directly to the apartment geometry and preserve the circulation around full-height glazing.",
    ],
    materials: [
      {
        name: "Extra-long engineered oak",
        detail: "Natural-grade planks with an ultra-matte hardwax oil",
      },
      {
        name: "Acoustic floor system",
        detail: "Resilient underlay and perimeter isolation detailing",
      },
      {
        name: "Solid and veneered oak",
        detail: "Made-to-measure dining, media, and window furniture",
      },
    ],
    gallery: [
      {
        src: unsplash("1704655295066-681e61ecca6b"),
        alt: "Penthouse dining zone set against long oak boards and broad city views",
        orientation: "wide",
      },
      {
        src: unsplash("1564540574859-0dfb63985953"),
        alt: "Custom desk and timber detailing fitted to a bright corner room",
        orientation: "portrait",
      },
      {
        src: unsplash("1729551610680-c6ea05b08937"),
        alt: "Tailored furniture composition balancing timber, stone, and soft upholstery",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Property", value: "Duplex penthouse" },
      { label: "Floor area", value: "310 m²" },
      { label: "Acoustic target", value: "55 dB impact rating" },
      { label: "Custom pieces", value: "7" },
      { label: "Completed", value: "2023" },
    ],
    relatedService: {
      title: "Engineered Wood & Custom Furniture",
      href: "/services#engineered-wood-flooring",
      description:
        "A coordinated interior package pairing stable natural timber floors with furniture developed around the architecture.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
