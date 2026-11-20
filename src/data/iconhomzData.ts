export type ProjectCategory = 'All' | 'Villa Plots' | 'Apartments' | 'Villas' | 'Fluid Homes';
export type ProjectStatus = 'All' | 'Ongoing' | 'Upcoming' | 'Completed';

export interface ProjectConfiguration {
  id: string;
  label: string;
  dimensionOrType: string;
  areaSqFt: number;
  facing: string;
  guidePriceLabel: string;
  priceLakhs: number;
}

export interface ProjectFaq {
  question: string;
  answer: string;
}

export interface IconhomzProject {
  id: string;
  slug: string;
  name: string;
  location: string;
  corridor: 'Gunjur' | 'Sarjapur Road' | 'Bommasandra' | 'Electronic City';
  category: Exclude<ProjectCategory, 'All'>;
  status: Exclude<ProjectStatus, 'All'>;
  approvals: string;
  reraId: string;
  reraNote: string;
  startingPriceDisplay: string;
  configurationSummary: string;
  highlights: string[];
  summary: string;
  overview: string;
  connectivity: string[];
  amenities: string[];
  image: string;
  imageAlt: string;
  metrics: { label: string; value: string }[];
  configurations: ProjectConfiguration[];
  faqs: ProjectFaq[];
}

export interface ProjectRouteMeta {
  path: string;
  breadcrumbLabel: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  intro: string;
  filterStatus?: Exclude<ProjectStatus, 'All'>;
  filterCategory?: Exclude<ProjectCategory, 'All'>;
  filterLocation?: 'Bangalore' | 'Gunjur' | 'Sarjapur Road';
}

export interface PropertyCategoryCard {
  id: Exclude<ProjectCategory, 'All'>;
  routePath: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface BrandPillar {
  index: string;
  title: string;
  summary: string;
  projectProof: string;
  details: string[];
}

export interface BangaloreLocation {
  id: string;
  name: string;
  zone: string;
  routePath?: string;
  summary: string;
  connectivityHighlights: string[];
  linkedProjectIds: string[];
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
}

export interface CustomerExperience {
  id: string;
  quote: string;
  name: string;
  community: string;
  context: string;
}

export type BlogRouteCategoryPath =
  | '/blogs/real-estate/'
  | '/blogs/property-investment/'
  | '/blogs/vastu/'
  | '/blogs/home-buying-guides/'
  | '/blogs/bangalore-real-estate/'
  | '/blogs/lifestyle/';

export interface BlogRouteMeta {
  path: string;
  breadcrumbLabel: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
}

export interface BlogTopicOpportunity {
  id: string;
  pillar: string;
  title: string;
  targetRoute: BlogRouteCategoryPath;
  status: 'Published' | 'Editorial Review Queue';
  linkedArticleId?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  title: string;
  category:
    | 'Real Estate'
    | 'Property Investment'
    | 'Home Buying Guides'
    | 'Vastu'
    | 'Bangalore Real Estate'
    | 'Lifestyle';
  routeCategoryPath: BlogRouteCategoryPath;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  imageAlt: string;
  answerFirstSummary: string;
  keyTakeaways: string[];
  sections: { heading: string; subHeading?: string; body: string }[];
  factsAndSources: { stat: string; context: string; source: string }[];
  comparisonTable?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  expertCommentary: string;
  faqs: { question: string; answer: string }[];
  relatedArticleIds: string[];
  relatedProjectId: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedTarget: 'projects' | 'insights' | 'contact' | 'about';
  relatedLabel: string;
}

export const CORPORATE_CONTACT = {
  entity: 'ICONHOMZ (ICON Infra Shelters India Pvt. Ltd.)',
  address: '47/9, Jai Plaza Symphony, 9th Main, 14th Cross, Sector 6, HSR Layout, Bengaluru, Karnataka – 560102',
  coordinates: '12.9121° N, 77.6446° E · Sector 6, HSR Layout',
  phone: '+91 83101 81484',
  whatsappDisplay: '+91 83101 81484 (WhatsApp Advisory)',
  whatsappUrl:
    'https://wa.me/918310181484?text=Hello%20ICONHOMZ%2C%20I%20would%20like%20to%20request%20project%20details%20and%20book%20a%20site%20visit.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=47%2F9+Jai+Plaza+Symphony+Sector+6+HSR+Layout+Bengaluru+560102',
  email: 'info@iconhomz.com',
  hours: 'Monday – Sunday · 9:30 AM – 6:30 PM IST'
};

export const HERO_BANNER = {
  image: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
  alt: 'ICONHOMZ residential developments in Bangalore'
};

export const ABOUT_BANNER = {
  image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
  alt: 'ICONHOMZ Fluid Homes space-efficient interior residential architecture'
};

export const COMPANY_MILESTONES = [
  {
    period: '2001 Onwards',
    title: 'Land Underwriting & Bengaluru Foundation',
    description:
      'Founding leadership led by Chairman & CEO Rajasekhar Gowrineni established transparent land acquisition, clear title verification, and local planning sanction discipline across Bengaluru.'
  },
  {
    period: 'Iconest Series',
    title: 'Pioneering "Fluid Homes" Value Architecture',
    description:
      'Introduced space-efficient multi-functional homes with Iconest 3, 4, and 5—turning everyday apartments into adaptable work-and-living sanctuaries.'
  },
  {
    period: 'Grand Icon & Villas',
    title: 'Plotted Enclaves & Independent Villa Delivery',
    description:
      'Delivered completed communities like ICON SANCTUARY and ICONEST 5 alongside lakeside plotted communities in South Bengaluru.'
  },
  {
    period: 'Present Flagships',
    title: 'IVY COUNTY (50 Acres) & ICON MICASA',
    description:
      'Expanding East and South Bengaluru footprints with 658 BDA & RERA-approved villa plots at IVY COUNTY in Gunjur and RERA-registered 2 BHK Fluid Homes adjacent to HCL Campus.'
  }
];

export const QUALITY_STANDARDS = [
  {
    title: '30-Year Title & Authority Verification',
    detail:
      'Every project undergoes exhaustive 30-year Encumbrance Certificate checks, Mother Deed audits, DC residential conversion, and BDA/BMRDA sanction review prior to booking.'
  },
  {
    title: 'Underground Civil Infrastructure',
    detail:
      'Plotted communities feature concealed electrical cabling, stormwater recharge drains, fiber conduits, and graded asphalt internal avenues built for multi-decade durability.'
  },
  {
    title: 'Conscious Ecological Planning',
    detail:
      'Rainwater harvesting pits, native avenue landscaping, passive cross-ventilation orientation, and low-wastage structural grids reduce lifetime homeowner operating costs.'
  },
  {
    title: 'CREDAI & Karnataka RERA Accountability',
    detail:
      'Clear quarterly RERA disclosures, transparent allotment documentation, and dedicated legal coordination through registration and handover.'
  }
];

export const COMPANY_STATISTICS = [
  {
    value: 'Since 2001',
    label: 'Leadership Legacy',
    detail: 'Over two decades of Bengaluru land & housing expertise'
  },
  {
    value: '50 Acres',
    label: 'IVY COUNTY Masterplan',
    detail: '658 BDA-approved villa plots off Gunjur, East Bangalore'
  },
  {
    value: 'Fluid Homes',
    label: 'Conscious Living Design',
    detail: 'Multi-functional rooms pioneered across Iconest & MiCasa'
  },
  {
    value: 'CREDAI & RERA',
    label: 'Transparent Governance',
    detail: 'Compliant titles & documented statutory disclosures'
  }
];

export const PROJECT_ARCHIVE_ROUTES: Record<string, ProjectRouteMeta> = {
  '/residential/': {
    path: '/residential/',
    breadcrumbLabel: 'Residential Projects',
    seoTitle: 'Residential Projects in Bangalore – Ongoing, Completed & Upcoming | ICONHOMZ',
    metaDescription:
      'Explore ICONHOMZ residential projects in Bangalore organized across Ongoing, Completed, and Upcoming villa plots, Fluid Home apartments, and gated villas.',
    h1: 'ICONHOMZ Residential Projects in Bangalore',
    kicker: 'Residential Portfolio · Ongoing, Completed & Upcoming',
    intro:
      'Explore ICONHOMZ’s complete residential portfolio across East and South Bengaluru—organized into Ongoing developments open for allotment, Completed & occupied communities, and Upcoming villa and apartment launches.'
  },
  '/projects/': {
    path: '/projects/',
    breadcrumbLabel: 'All Projects',
    seoTitle: 'Projects in Bangalore | Plots, Flats & Villas – ICONHOMZ',
    metaDescription:
      'Browse ongoing, completed, and upcoming residential projects by ICONHOMZ in Bangalore. Explore BDA villa plots, apartments, and villas today.',
    h1: 'Residential Projects in Bangalore by ICONHOMZ',
    kicker: 'ICONHOMZ Project Portfolio',
    intro:
      'Discover thoughtfully planned residential communities across East and South Bengaluru. From 50-acre BDA-approved villa plot enclaves in Gunjur to space-efficient Fluid Home apartments in Bommasandra and Sarjapur Road, every ICONHOMZ development is backed by clear statutory approvals.'
  },
  '/projects/ongoing/': {
    path: '/projects/ongoing/',
    breadcrumbLabel: 'Ongoing Projects',
    seoTitle: 'Ongoing Residential Projects in Bangalore | ICONHOMZ',
    metaDescription:
      'Explore ongoing BDA & RERA approved residential projects in Bangalore by ICONHOMZ: IVY COUNTY in Gunjur, ICON MICASA, GRAND ICON 3 & ICONEST 4.',
    h1: 'Ongoing Residential Projects in Bangalore by ICONHOMZ',
    kicker: 'Active Developments',
    intro:
      'Active residential communities currently open for private site visits and stage-linked allotment across Gunjur, Sarjapur Road, Bommasandra, and Electronic City.',
    filterStatus: 'Ongoing'
  },
  '/projects/upcoming/': {
    path: '/projects/upcoming/',
    breadcrumbLabel: 'Upcoming Projects',
    seoTitle: 'Upcoming Residential Projects in Bangalore | ICONHOMZ',
    metaDescription:
      'Preview upcoming villa and residential launches in Bangalore by ICONHOMZ. Register early for architectural briefings and priority release updates.',
    h1: 'Upcoming Residential Projects in Bangalore by ICONHOMZ',
    kicker: 'Priority Releases',
    intro:
      'Forthcoming low-density residential developments entering priority architectural preview. Register your interest for official RERA filing updates and early release floor plans.',
    filterStatus: 'Upcoming'
  },
  '/projects/completed/': {
    path: '/projects/completed/',
    breadcrumbLabel: 'Completed Projects',
    seoTitle: 'Completed Projects in Bangalore | ICONHOMZ Track Record',
    metaDescription:
      'Review delivered residential apartments and villas by ICONHOMZ in Bangalore including ICON SANCTUARY, ICONEST 5, ICONEST 3, and GRAND ICON 2.',
    h1: 'Completed Residential Projects in Bangalore by ICONHOMZ',
    kicker: 'Delivered Communities',
    intro:
      'Occupied residential communities demonstrating ICONHOMZ’s execution quality, infrastructure completion, and long-term neighborhood stewardship across Bengaluru.',
    filterStatus: 'Completed'
  },
  '/projects/villa-plots/': {
    path: '/projects/villa-plots/',
    breadcrumbLabel: 'Villa Plots',
    seoTitle: 'BDA & RERA Approved Villa Plots in Bangalore | ICONHOMZ',
    metaDescription:
      'Invest in gated residential villa plots in Gunjur and Electronic City by ICONHOMZ. Explore IVY COUNTY (658 plots) and GRAND ICON 3 lakeside plots.',
    h1: 'Villa Plots in Bangalore by ICONHOMZ',
    kicker: 'Plotted Developments',
    intro:
      'Masterplanned gated plotted communities featuring underground electrical and fiber utilities, landscaped parks, expansive clubhouses, and clear statutory titles ready for custom villa construction.',
    filterCategory: 'Villa Plots'
  },
  '/projects/apartments/': {
    path: '/projects/apartments/',
    breadcrumbLabel: 'Apartments',
    seoTitle: 'Residential Apartments & Fluid Homes in Bangalore | ICONHOMZ',
    metaDescription:
      'Discover thoughtfully planned 2 & 3 BHK Fluid Home apartments in Bommasandra, Sarjapur Road, and Harlur by ICONHOMZ.',
    h1: 'Residential Apartments in Bangalore by ICONHOMZ',
    kicker: 'Urban Apartments & Fluid Homes',
    intro:
      'Space-efficient 2 and 3 BHK residential apartments engineered around ICONHOMZ’s Fluid Homes philosophy—combining cross-ventilation, multi-functional rooms, and proximity to IT and Metro corridors.',
    filterCategory: 'Apartments'
  },
  '/projects/villas/': {
    path: '/projects/villas/',
    breadcrumbLabel: 'Villas',
    seoTitle: 'Gated Residential Villas in Bangalore | ICONHOMZ',
    metaDescription:
      'Explore independent 3 & 3.5 BHK gated villas in South and East Bangalore by ICONHOMZ including ICON LAURELS and ICON SANCTUARY.',
    h1: 'Residential Villas in Bangalore by ICONHOMZ',
    kicker: 'Independent Villa Living',
    intro:
      'Low-density independent gated villas crafted with private garden setbacks, natural daylight orientation, and dedicated community amenities for multi-generational families.',
    filterCategory: 'Villas'
  },
  '/projects/bangalore/': {
    path: '/projects/bangalore/',
    breadcrumbLabel: 'Bangalore Projects',
    seoTitle: 'Residential Projects in Bangalore | Villas, Plots & Apartments – ICONHOMZ',
    metaDescription:
      'Browse all ICONHOMZ residential projects across Bangalore—spanning Gunjur, Sarjapur Road, Bommasandra, and Electronic City.',
    h1: 'Residential Projects in Bangalore by ICONHOMZ',
    kicker: 'City Portfolio · Bengaluru',
    intro:
      'Serving East, South-East, and South Bengaluru growth corridors since 2001 with BDA-approved plotted enclaves, Fluid Home apartments, and gated villa communities.',
    filterLocation: 'Bangalore'
  },
  '/projects/gunjur/': {
    path: '/projects/gunjur/',
    breadcrumbLabel: 'Gunjur Projects',
    seoTitle: 'BDA Approved Villa Plots & Projects in Gunjur, Bangalore | ICONHOMZ',
    metaDescription:
      'Explore IVY COUNTY by ICONHOMZ in Gunjur, East Bangalore—50 acres of BDA & RERA-approved villa plots located behind Greenwood High School.',
    h1: 'Residential Projects in Gunjur, East Bangalore by ICONHOMZ',
    kicker: 'Location Guide · Gunjur',
    intro:
      'Situated between Whitefield ITPL and Sarjapur Road behind Greenwood High International School, Gunjur hosts ICONHOMZ’s flagship 50-acre BDA-approved plotted community, IVY COUNTY.',
    filterLocation: 'Gunjur'
  },
  '/projects/sarjapur-road/': {
    path: '/projects/sarjapur-road/',
    breadcrumbLabel: 'Sarjapur Road Projects',
    seoTitle: 'Projects on Sarjapur Road, Bangalore | Fluid Homes & Villas – ICONHOMZ',
    metaDescription:
      'Discover ICONHOMZ residential projects along Sarjapur Road and nearby Gunjur, including ICONEST 4 Fluid Homes, ICON SANCTUARY villas, and IVY COUNTY.',
    h1: 'Residential Projects on Sarjapur Road, Bangalore by ICONHOMZ',
    kicker: 'Location Guide · Sarjapur Road',
    intro:
      'Serving Bengaluru’s high-growth Sarjapur–Varthur IT belt with eco-conscious Fluid Home apartments (ICONEST 4), completed villa living (ICON SANCTUARY), and nearby Gunjur plotted estates.',
    filterLocation: 'Sarjapur Road'
  }
};

export const ICONHOMZ_PROJECTS: IconhomzProject[] = [
  {
    id: 'ivy-county',
    slug: 'ivy-county-gunjur',
    name: 'IVY COUNTY',
    location: 'Off Gunjur, Varthur–Sarjapur Road, Bengaluru',
    corridor: 'Gunjur',
    category: 'Villa Plots',
    status: 'Ongoing',
    approvals: 'BDA & RERA Approved',
    reraId: 'BDA Approved · Karnataka RERA Registered',
    reraNote: '50-acre BDA-approved plotted development behind Greenwood High School, Gunjur',
    startingPriceDisplay: 'Approved Cost Sheet on Request',
    configurationSummary: '30×40 · 30×50 · 40×60 Villa Plots (1,200 – 2,400 sq. ft.)',
    highlights: [
      '50-acre gated community featuring ~658 premium BDA-approved villa plots',
      'Expansive ~50,000 sq. ft. clubhouse with vast open green parks',
      'Located behind Greenwood High School linking Varthur, Gunjur, and Sarjapur Road'
    ],
    summary:
      'A 50-acre BDA-approved plotted residential enclave off Gunjur featuring ~658 villa plots, an expansive clubhouse, and prime Varthur–Sarjapur connectivity.',
    overview:
      'IVY COUNTY spans 50 lush acres off Gunjur behind Greenwood High School near the Varthur–Sarjapur Road belt. Planned for families seeking long-term land equity alongside gated clubhouse living, the masterplan dedicates vast acreage to landscaped open spaces, wide internal avenues, and underground utility networks.',
    connectivity: [
      'Adjacent to Greenwood High International School, Gunjur',
      '10 mins to Varthur Kodi & Whitefield ITPL corridor',
      '15 mins to Sarjapur Road, Bellandur & Outer Ring Road'
    ],
    amenities: [
      '50,000 Sq. Ft. Community Clubhouse',
      'Landscaped Central Parks & Open Greens',
      'Underground Power, Water & Fiber Lines',
      'Wide Asphalt Internal Avenues',
      '24/7 Gated Perimeter Security',
      'Multi-Sport & Wellness Zones'
    ],
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'Ivy County premium villa plots in Gunjur Bangalore',
    metrics: [
      { label: 'Masterplan Scale', value: '50 Acres' },
      { label: 'Villa Plots', value: '658' },
      { label: 'Statutory Approval', value: 'BDA & RERA' }
    ],
    configurations: [
      {
        id: 'ivy-30x40',
        label: '30 × 40 Villa Plot',
        dimensionOrType: '30 ft × 40 ft Standard Plot',
        areaSqFt: 1200,
        facing: 'East / North / West Options',
        guidePriceLabel: 'Official Approved Cost Sheet on Request',
        priceLakhs: 108
      },
      {
        id: 'ivy-30x50',
        label: '30 × 50 Villa Plot',
        dimensionOrType: '30 ft × 50 ft Courtyard Plot',
        areaSqFt: 1500,
        facing: 'East / North Facing',
        guidePriceLabel: 'Official Approved Cost Sheet on Request',
        priceLakhs: 135
      },
      {
        id: 'ivy-40x60',
        label: '40 × 60 Estate Plot',
        dimensionOrType: '40 ft × 60 ft Corner & Park-Facing',
        areaSqFt: 2400,
        facing: 'Park-Facing Corner Options',
        guidePriceLabel: 'Official Approved Cost Sheet on Request',
        priceLakhs: 216
      }
    ],
    faqs: [
      {
        question: 'Where exactly is IVY COUNTY located in Gunjur?',
        answer:
          'IVY COUNTY is situated off Gunjur behind Greenwood High International School, connecting Varthur Kodi, Whitefield, and Sarjapur Road in East Bengaluru.'
      },
      {
        question: 'What plot dimensions and approvals does IVY COUNTY hold?',
        answer:
          'The 50-acre enclave comprises ~658 BDA and RERA-approved villa plots across standard 30×40 (1,200 sq. ft.), 30×50 (1,500 sq. ft.), and 40×60 (2,400 sq. ft.) configurations.'
      }
    ]
  },
  {
    id: 'icon-micasa',
    slug: 'icon-micasa-bommasandra',
    name: 'ICON MICASA',
    location: 'Bommasandra (Adjacent to HCL Campus), Electronic City, Bengaluru',
    corridor: 'Bommasandra',
    category: 'Apartments',
    status: 'Ongoing',
    approvals: 'RERA Registered',
    reraId: 'PRM/KA/RERA/1251/310/PR/110422/004823',
    reraNote: 'Karnataka RERA Reg: PRM/KA/RERA/1251/310/PR/110422/004823',
    startingPriceDisplay: 'Approved Cost Sheet on Request',
    configurationSummary: '2 BHK Fluid Homes (1,085 – 1,210 sq. ft.)',
    highlights: [
      '1.9-acre gated apartment community adjacent to HCL Campus, Bommasandra',
      'Thoughtfully planned 2 BHK Fluid Homes with space-efficient multi-functional layouts',
      'Terrace lifestyle amenities minutes from Electronic City & Bommasandra Metro'
    ],
    summary:
      'A 1.9-acre residential apartment community in Bommasandra adjacent to the HCL Campus, offering 2 BHK Fluid Homes with terrace amenities.',
    overview:
      'ICON MICASA brings ICONHOMZ’s signature Fluid Homes design to Bommasandra near Electronic City. Spread across 1.9 acres adjacent to the HCL Campus, the project pairs multi-functional space-efficient 2 BHK residences with landscaped terrace amenities and rapid connectivity to South Bangalore’s IT, biotech, and Yellow Line Metro hubs.',
    connectivity: [
      'Adjacent to HCL Campus, Bommasandra Industrial & Tech Hub',
      '5 mins to Bommasandra Metro Station & Hosur Road',
      '10 mins to Electronic City Phase I & II'
    ],
    amenities: [
      'Terrace Lounge & Social Deck',
      'Fitness Zone & Outdoor Seating',
      'Landscaped Community Spaces',
      '24/7 Gated Security & CCTV',
      'Rainwater Harvesting & Waste Management'
    ],
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'ICON Micasa apartments by ICONHOMZ near HCL Campus in Bommasandra',
    metrics: [
      { label: 'Site Footprint', value: '1.9 Acres' },
      { label: 'Home Typology', value: '2 BHK Fluid' },
      { label: 'RERA ID', value: '004823' }
    ],
    configurations: [
      {
        id: 'micasa-2bhk-std',
        label: '2 BHK Fluid Home',
        dimensionOrType: '2 Bed · Multi-Functional Living Zone',
        areaSqFt: 1085,
        facing: 'East / North Facing',
        guidePriceLabel: 'Official Approved Cost Sheet on Request',
        priceLakhs: 74
      },
      {
        id: 'micasa-2bhk-corner',
        label: '2 BHK Corner Fluid Suite',
        dimensionOrType: '2 Bed · Transformative Study · Balcony',
        areaSqFt: 1210,
        facing: 'East / North Corner',
        guidePriceLabel: 'Official Approved Cost Sheet on Request',
        priceLakhs: 84
      }
    ],
    faqs: [
      {
        question: 'What is the Karnataka RERA number for ICON MICASA?',
        answer:
          'ICON MICASA is registered under Karnataka RERA with ID PRM/KA/RERA/1251/310/PR/110422/004823.'
      },
      {
        question: 'What makes ICON MICASA a Fluid Home community?',
        answer:
          'Each 2 BHK apartment uses space-efficient structural planning and multi-functional rooms that seamlessly convert between daytime work zones and family living areas.'
      }
    ]
  },
  {
    id: 'grand-icon-3',
    slug: 'grand-icon-3-electronic-city',
    name: 'GRAND ICON 3',
    location: 'Near Electronic City & Bommasandra, Bengaluru',
    corridor: 'Electronic City',
    category: 'Villa Plots',
    status: 'Ongoing',
    approvals: 'Planning Authority & RERA Compliant',
    reraId: 'Grand Icon Plotted Series · RERA Compliant',
    reraNote: 'Part of the Grand Icon plotted series (alongside Grand Icon 2 RERA: PRM/KA/RERA/1251/308/PR/211215/004584)',
    startingPriceDisplay: 'Approved Cost Sheet on Request',
    configurationSummary: '30×40 & 30×50 Lakeside Villa Plots (1,200 – 1,500 sq. ft.)',
    highlights: [
      '5-acre lakeside luxury residential plot community near Electronic City',
      'Themed landscaped parks, wide avenues & underground infrastructure',
      'Positioned inside the thriving Bommasandra–Electronic City residential belt'
    ],
    summary:
      'A 5-acre lakeside residential plotted community near Electronic City featuring themed parks and ready-to-build infrastructure.',
    overview:
      'GRAND ICON 3 continues ICONHOMZ’s proven Grand Icon plotted development series in South Bangalore. Set across 5 acres alongside serene lakeside surroundings near Electronic City and Bommasandra, it combines themed neighborhood parks, wide internal avenues, and clear registered documentation.',
    connectivity: [
      '10 mins to Electronic City & Hosur Road Elevated Expressway',
      '12 mins to Bommasandra & Jigani industrial corridors',
      '20 mins to Silk Board & HSR Layout'
    ],
    amenities: [
      'Themed Community Parks',
      'Lakeside Scenic Perimeter',
      'Wide Internal Roads & Streetlights',
      'Underground Drainage & Water Lines'
    ],
    image: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
    imageAlt: 'Grand Icon 3 lakeside residential plotted community near Electronic City, Bengaluru',
    metrics: [
      { label: 'Community Area', value: '5 Acres' },
      { label: 'Setting', value: 'Lakeside Plots' },
      { label: 'Series', value: 'Grand Icon' }
    ],
    configurations: [
      {
        id: 'grand3-1200',
        label: '1,200 Sq. Ft. Plot',
        dimensionOrType: '30 ft × 40 ft Residential Plot',
        areaSqFt: 1200,
        facing: 'North / East Options',
        guidePriceLabel: 'Approved Cost Sheet on Request',
        priceLakhs: 78
      },
      {
        id: 'grand3-1500',
        label: '1,500 Sq. Ft. Plot',
        dimensionOrType: '30 ft × 50 ft Residential Plot',
        areaSqFt: 1500,
        facing: 'East Facing',
        guidePriceLabel: 'Approved Cost Sheet on Request',
        priceLakhs: 98
      }
    ],
    faqs: [
      {
        question: 'How close is GRAND ICON 3 to Electronic City?',
        answer:
          'GRAND ICON 3 sits approximately 10 minutes from Electronic City and Hosur Road in the Bommasandra growth corridor.'
      }
    ]
  },
  {
    id: 'iconest-4',
    slug: 'iconest-4-sarjapur-road',
    name: 'ICONEST 4',
    location: 'Sarjapur Road, Bengaluru',
    corridor: 'Sarjapur Road',
    category: 'Apartments',
    status: 'Ongoing',
    approvals: 'RERA Compliant Eco-Living Apartments',
    reraId: 'Sarjapur Road Fluid Homes Release',
    reraNote: 'Eco-friendly 3 BHK Fluid Home apartments along the Sarjapur Road IT corridor',
    startingPriceDisplay: 'Approved Cost Sheet on Request',
    configurationSummary: '3 BHK Eco-Friendly Fluid Home Apartments (1,420 – 1,640 sq. ft.)',
    highlights: [
      'Eco-friendly 3 BHK Fluid Home apartments designed for Sarjapur Road families',
      'Multi-functional interior layouts maximizing natural light and ventilation',
      'Direct access to RGA Tech Park, Wipro SEZ, and Whitefield–Gunjur arterial links'
    ],
    summary:
      'Eco-friendly 3 BHK Fluid Home apartments on Sarjapur Road designed around Conscious Living and space-efficient architectural planning.',
    overview:
      'ICONEST 4 brings ICONHOMZ’s signature Fluid Homes concept to the Sarjapur Road corridor. Designed for families seeking sustainable 3 BHK living with multi-functional rooms, strong daylight penetration, and rapid commutes to Outer Ring Road and Whitefield tech parks.',
    connectivity: [
      '10 mins to Wipro SEZ & RGA Tech Park, Sarjapur Road',
      '15 mins to Bellandur Outer Ring Road & Carmelaram',
      '20 mins to Electronic City & HSR Layout'
    ],
    amenities: [
      'Conscious Living Rooftop Lounge',
      'Rainwater Harvesting & Solar Lighting',
      'Indoor Fitness & Community Hall',
      '24/7 Access-Controlled Security'
    ],
    image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
    imageAlt: 'ICONEST 4 eco-friendly 3 BHK Fluid Home apartments on Sarjapur Road, Bangalore',
    metrics: [
      { label: 'Configuration', value: '3 BHK Fluid' },
      { label: 'Corridor', value: 'Sarjapur Rd' },
      { label: 'Concept', value: 'Eco Living' }
    ],
    configurations: [
      {
        id: 'iconest4-3bhk',
        label: '3 BHK Fluid Residence',
        dimensionOrType: '3 Bed · Convertible Study Suite',
        areaSqFt: 1420,
        facing: 'East / North Facing',
        guidePriceLabel: 'Approved Cost Sheet on Request',
        priceLakhs: 118
      },
      {
        id: 'iconest4-3bhk-plus',
        label: '3 BHK Corner Fluid Home',
        dimensionOrType: '3 Bed · Dual Aspect Balcony',
        areaSqFt: 1640,
        facing: 'East Corner',
        guidePriceLabel: 'Approved Cost Sheet on Request',
        priceLakhs: 136
      }
    ],
    faqs: [
      {
        question: 'What configurations are offered at ICONEST 4 on Sarjapur Road?',
        answer:
          'ICONEST 4 focuses on spacious, eco-conscious 3 BHK Fluid Home apartments engineered for Sarjapur Road and Outer Ring Road families.'
      }
    ]
  },
  {
    id: 'icon-laurels',
    slug: 'icon-laurels-bommasandra',
    name: 'ICON LAURELS',
    location: 'Bommasandra, South Bengaluru',
    corridor: 'Bommasandra',
    category: 'Villas',
    status: 'Upcoming',
    approvals: 'Priority Architectural Preview',
    reraId: 'Upcoming Phase · Statutory Filings Underway',
    reraNote: '3 & 3.5 BHK independent villas in Bommasandra · Priority preview registration open',
    startingPriceDisplay: 'Pre-Release Guidance on Request',
    configurationSummary: '3 & 3.5 BHK Independent Villas (2,150 – 2,540 sq. ft.)',
    highlights: [
      'Low-density independent 3 and 3.5 BHK villas in Bommasandra, South Bengaluru',
      'Private landscaped garden setbacks, terrace decks & courtyard ventilation',
      'Proximity to Electronic City, Bommasandra Metro & Narayana Health City'
    ],
    summary:
      'Upcoming release of spacious 3 and 3.5 BHK independent gated villas in Bommasandra designed for multi-generational family privacy.',
    overview:
      'ICON LAURELS delivers spacious 3 and 3.5 BHK villas in Bommasandra for families seeking independent home ownership inside a secure gated enclave. Designed around natural light, private garden setbacks, and community amenities, it sits within quick reach of Electronic City workplaces and major healthcare hubs.',
    connectivity: [
      '8 mins to Electronic City & Bommasandra Metro Station',
      '10 mins to Narayana Health City & Hosur Road',
      '25 mins to HSR Layout Corporate Office'
    ],
    amenities: [
      'Gated Villa Community Security',
      'Residents’ Clubhouse & Leisure Lawn',
      'Children’s Play Area & Walking Track',
      'Private Covered Car Parking'
    ],
    image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
    imageAlt: 'ICON LAURELS 3 and 3.5 BHK gated villas in Bommasandra by ICONHOMZ',
    metrics: [
      { label: 'Configurations', value: '3 & 3.5 BHK' },
      { label: 'Location', value: 'Bommasandra' },
      { label: 'Release', value: 'Priority Preview' }
    ],
    configurations: [
      {
        id: 'laurels-3bhk',
        label: '3 BHK Villa',
        dimensionOrType: 'Duplex Villa + Private Setback',
        areaSqFt: 2150,
        facing: 'East / North Facing',
        guidePriceLabel: 'Pre-Release Pricing on Request',
        priceLakhs: 195
      },
      {
        id: 'laurels-35bhk',
        label: '3.5 BHK Villa',
        dimensionOrType: 'Duplex Villa + Study & Terrace Lounge',
        areaSqFt: 2540,
        facing: 'East Corner',
        guidePriceLabel: 'Pre-Release Pricing on Request',
        priceLakhs: 235
      }
    ],
    faqs: [
      {
        question: 'When does ICON LAURELS open for formal allotment?',
        answer:
          'ICON LAURELS is currently open for priority architectural preview registration; formal allotment commences following completion of statutory filings.'
      }
    ]
  },
  {
    id: 'icon-sanctuary',
    slug: 'icon-sanctuary-sarjapur-road',
    name: 'ICON SANCTUARY',
    location: 'Sarjapur Road, Bengaluru',
    corridor: 'Sarjapur Road',
    category: 'Villas',
    status: 'Completed',
    approvals: 'Completed & Occupied Villa Enclave',
    reraId: 'Delivered Residential Villa Community',
    reraNote: 'Completed residential villa enclave on Sarjapur Road demonstrating ICONHOMZ delivery track record',
    startingPriceDisplay: 'Completed Portfolio Showcase',
    configurationSummary: '3 & 4 BHK Completed Gated Villas (2,200 – 2,850 sq. ft.)',
    highlights: [
      'Completed and occupied gated residential villa community on Sarjapur Road',
      'Mature landscaped avenues, clubhouse amenities & active residents’ association',
      'Proof of ICONHOMZ’s construction finish and community stewardship'
    ],
    summary:
      'A completed residential villa community on Sarjapur Road showcasing ICONHOMZ’s delivered architectural quality and thriving neighborhood life.',
    overview:
      'ICON SANCTUARY stands as a delivered testament to ICONHOMZ’s residential craftsmanship along the Sarjapur Road growth belt. Families reside amidst mature avenue greens, completed clubhouse amenities, and spacious independent villa architecture.',
    connectivity: [
      'Direct access to Sarjapur Road & Attibelle–Varthur arterial grid',
      '15 mins to Wipro SEZ & international school belt',
      '20 mins to Electronic City'
    ],
    amenities: [
      'Completed Residents’ Clubhouse',
      'Mature Tree-Lined Villa Streets',
      '24/7 Gated Perimeter Security',
      'Landscaped Neighborhood Parks'
    ],
    image: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
    imageAlt: 'ICON SANCTUARY completed residential villa enclave on Sarjapur Road, Bangalore',
    metrics: [
      { label: 'Delivery Status', value: 'Completed' },
      { label: 'Typology', value: 'Gated Villas' },
      { label: 'Location', value: 'Sarjapur Rd' }
    ],
    configurations: [
      {
        id: 'sanctuary-3bhk',
        label: '3 BHK Villa',
        dimensionOrType: 'Completed Villa Residence',
        areaSqFt: 2200,
        facing: 'East / North',
        guidePriceLabel: 'Delivered Community Showcase',
        priceLakhs: 210
      },
      {
        id: 'sanctuary-4bhk',
        label: '4 BHK Villa',
        dimensionOrType: 'Corner Villa Residence',
        areaSqFt: 2850,
        facing: 'East Corner',
        guidePriceLabel: 'Delivered Community Showcase',
        priceLakhs: 265
      }
    ],
    faqs: [
      {
        question: 'Can prospective buyers tour completed ICONHOMZ communities?',
        answer:
          'Yes. Our advisory team arranges scheduled walkthroughs of completed communities such as ICON SANCTUARY and ICONEST 5 so buyers can inspect our delivered build quality firsthand.'
      }
    ]
  },
  {
    id: 'iconest-5',
    slug: 'iconest-5-harlur-sarjapur',
    name: 'ICONEST 5',
    location: 'Harlur / Kudlu (Off Sarjapur Road), Bengaluru',
    corridor: 'Sarjapur Road',
    category: 'Apartments',
    status: 'Completed',
    approvals: 'Completed Smart Fluid Homes',
    reraId: 'Completed Residential Community',
    reraNote: 'Delivered contemporary smart Fluid Home apartments in Harlur / Kudlu, Bengaluru',
    startingPriceDisplay: 'Completed Portfolio Showcase',
    configurationSummary: '1 & 2 BHK Smart Fluid Homes (740 – 1,120 sq. ft.)',
    highlights: [
      'Completed smart apartment community near Harlur & Kudlu off Sarjapur Road',
      'Demonstrates ICONHOMZ’s Fluid Homes space-optimization and tech integration',
      'Minutes from HSR Layout, Bellandur Outer Ring Road & Sarjapur Junction'
    ],
    summary:
      'A completed contemporary smart apartment community in Harlur/Kudlu demonstrating ICONHOMZ’s Fluid Homes engineering in South-East Bengaluru.',
    overview:
      'ICONEST 5 is a flagship completed community in the Harlur–Kudlu belt near HSR Layout and Sarjapur Road. Residents experience multi-functional Fluid Home layouts, smart living features, and rapid access to Outer Ring Road technology parks.',
    connectivity: [
      '8 mins to HSR Layout Corporate Office & Outer Ring Road',
      '10 mins to Sarjapur Road & Bellandur tech hubs',
      '15 mins to Koramangala & Electronic City'
    ],
    amenities: [
      'Smart Fluid Home Interior Systems',
      'Rooftop Recreational Terrace',
      'Gymnasium & Community Lounge',
      '24/7 Security & Power Backup'
    ],
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'ICONEST 5 completed smart apartments in Harlur off Sarjapur Road by ICONHOMZ',
    metrics: [
      { label: 'Delivery Status', value: 'Completed' },
      { label: 'Typology', value: 'Smart Fluid' },
      { label: 'Location', value: 'Harlur / Kudlu' }
    ],
    configurations: [
      {
        id: 'iconest5-2bhk',
        label: '2 BHK Smart Fluid Home',
        dimensionOrType: 'Space-Efficient Smart Apartment',
        areaSqFt: 1050,
        facing: 'East / North',
        guidePriceLabel: 'Delivered Community Showcase',
        priceLakhs: 95
      }
    ],
    faqs: [
      {
        question: 'Where is ICONEST 5 located?',
        answer:
          'ICONEST 5 is located in Harlur / Kudlu Village off Sarjapur Road, minutes from HSR Layout and Outer Ring Road.'
      }
    ]
  },
  {
    id: 'icon-by-the-lake',
    slug: 'icon-by-the-lake-electronic-city',
    name: 'ICON BY THE LAKE',
    location: 'Off Electronic City (Bommasandra Lakefront), Bengaluru',
    corridor: 'Electronic City',
    category: 'Villas',
    status: 'Ongoing',
    approvals: 'RERA Registered Tropical Lakefront Villas',
    reraId: 'South Bengaluru Lakefront Villa Community',
    reraNote: 'Tropical-themed G+2 smart luxury 4 BHK villas situated beside a 23-acre lake near Electronic City',
    startingPriceDisplay: 'Approved Cost Sheet on Request',
    configurationSummary: '4 BHK Smart Lakefront Villas (G+2 · Private Terrace & Lawn)',
    highlights: [
      'Tropical-themed 4 BHK smart luxury villas overlooking a 23-acre serene lake',
      'Minutes from Electronic City Phase I/II, HCL Campus & Bommasandra Metro Station',
      'Smart home automation, double-height living zones, and low-density gated planning'
    ],
    summary:
      'Ongoing tropical-themed 4 BHK smart luxury villas situated right beside a 23-acre lake near Electronic City and Bommasandra Metro.',
    overview:
      'ICON BY THE LAKE pairs resort-inspired tropical villa architecture with urban Electronic City convenience. Designed as G+2 smart luxury 4 BHK villas beside a 23-acre natural lake, each residence integrates cross-ventilated courtyards, private sit-outs, and gated clubhouse living.',
    connectivity: [
      '5 mins to Bommasandra Metro Station (Yellow Line) & Hosur Road',
      '10 mins to Electronic City Phase I & II IT campuses',
      '12 mins to Narayana Health City & Jigani'
    ],
    amenities: [
      '23-Acre Natural Lakefront Promenade',
      'Tropical Residents’ Clubhouse & Pool',
      'Smart Home Access & Automation Ready',
      '24/7 Gated Perimeter Security'
    ],
    image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
    imageAlt: 'ICON BY THE LAKE 4 BHK smart luxury villas near Electronic City Bangalore',
    metrics: [
      { label: 'Typology', value: '4 BHK Villas' },
      { label: 'Lakefront', value: '23 Acres' },
      { label: 'Corridor', value: 'Electronic City' }
    ],
    configurations: [
      {
        id: 'lake-4bhk',
        label: '4 BHK Lakefront Villa',
        dimensionOrType: 'G+2 Smart Villa · Tropical Courtyard',
        areaSqFt: 2650,
        facing: 'East / North Facing',
        guidePriceLabel: 'Official Approved Cost Sheet on Request',
        priceLakhs: 245
      }
    ],
    faqs: [
      {
        question: 'What makes ICON BY THE LAKE distinct in Electronic City?',
        answer:
          'ICON BY THE LAKE offers low-density tropical-themed 4 BHK G+2 smart villas set immediately beside a 23-acre lake, minutes from Electronic City and Bommasandra Metro.'
      }
    ]
  },
  {
    id: 'iconest-3',
    slug: 'iconest-3-bommasandra',
    name: 'ICONEST 3',
    location: 'Kachanayakanahalli, Bommasandra, Bengaluru',
    corridor: 'Bommasandra',
    category: 'Apartments',
    status: 'Completed',
    approvals: 'Completed & Occupied Fluid Homes',
    reraId: 'Delivered Apartment Community',
    reraNote: 'Completed space-efficient 2 & 3 BHK Fluid Home apartments in Kachanayakanahalli, Bommasandra',
    startingPriceDisplay: 'Completed Portfolio Showcase',
    configurationSummary: '2 & 3 BHK Space-Efficient Fluid Homes (960 – 1,340 sq. ft.)',
    highlights: [
      'Completed and occupied Fluid Home apartment enclave in Bommasandra',
      'Space-efficient floor plates engineered with zero wasted corridor geometry',
      'Established connectivity to HCL Campus, Hosur Road & Electronic City'
    ],
    summary:
      'Completed 2 and 3 BHK Fluid Home apartments in Kachanayakanahalli, Bommasandra, demonstrating ICONHOMZ’s delivered urban housing quality.',
    overview:
      'ICONEST 3 is a delivered residential apartment enclave in Kachanayakanahalli near Bommasandra Industrial & IT corridor. Built around ICONHOMZ’s Fluid Homes engineering, the community continues to serve working families with reliable amenities and rapid Electronic City access.',
    connectivity: [
      '5 mins to HCL Campus & Bommasandra Metro Station',
      '10 mins to Electronic City & Hosur Road',
      '12 mins to Narayana Health City'
    ],
    amenities: [
      'Occupied Residents’ Association & Security',
      'Fitness Studio & Rooftop Social Deck',
      'Covered Stilt Parking & Power Backup',
      'Rainwater Harvesting Systems'
    ],
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'ICONEST 3 completed 2 and 3 BHK Fluid Home apartments in Bommasandra Bangalore',
    metrics: [
      { label: 'Delivery Status', value: 'Completed' },
      { label: 'Typology', value: 'Fluid Homes' },
      { label: 'Location', value: 'Bommasandra' }
    ],
    configurations: [
      {
        id: 'iconest3-2bhk',
        label: '2 BHK Fluid Home',
        dimensionOrType: 'Completed Space-Efficient Unit',
        areaSqFt: 980,
        facing: 'East / North',
        guidePriceLabel: 'Delivered Community Showcase',
        priceLakhs: 72
      }
    ],
    faqs: [
      {
        question: 'Is ICONEST 3 ready and occupied?',
        answer:
          'Yes. ICONEST 3 in Kachanayakanahalli, Bommasandra is a completed and occupied ICONHOMZ apartment community.'
      }
    ]
  },
  {
    id: 'grand-icon-2',
    slug: 'grand-icon-2-bommasandra',
    name: 'GRAND ICON 2',
    location: 'Bommasandra–Jigani Corridor, South Bengaluru',
    corridor: 'Bommasandra',
    category: 'Villa Plots',
    status: 'Completed',
    approvals: 'Completed & RERA Registered Plotted Enclave',
    reraId: 'PRM/KA/RERA/1251/308/PR/211215/004584',
    reraNote: 'Delivered gated residential plotted layout in South Bengaluru with completed civil infrastructure',
    startingPriceDisplay: 'Completed Portfolio Showcase',
    configurationSummary: '30×40 · 30×50 Gated Villa Plots (1,200 – 1,500 sq. ft.)',
    highlights: [
      'Completed gated plotted community along the Bommasandra–Jigani growth belt',
      'Blacktop internal avenues, underground drainage, and landscaped parks delivered',
      'RERA registered under PRM/KA/RERA/1251/308/PR/211215/004584'
    ],
    summary:
      'Delivered gated residential villa plot development in the Bommasandra–Jigani corridor featuring complete civil infrastructure and clear titles.',
    overview:
      'GRAND ICON 2 exemplifies ICONHOMZ’s plotted development execution in South Bengaluru. Registered under Karnataka RERA, the community delivers graded internal roads, underground utility lines, avenue landscaping, and ready villa plots near Electronic City.',
    connectivity: [
      '10 mins to Bommasandra Metro Station & Hosur Road',
      '12 mins to Electronic City & HCL Campus',
      '15 mins to Jigani Industrial & Biotech belt'
    ],
    amenities: [
      'Completed Blacktop Internal Avenues',
      'Underground Sanitary & Water Supply',
      'Landscaped Community Park',
      'Compound Wall & Gated Entry'
    ],
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'GRAND ICON 2 completed residential villa plots in Bommasandra South Bangalore',
    metrics: [
      { label: 'Delivery Status', value: 'Completed' },
      { label: 'Typology', value: 'Villa Plots' },
      { label: 'RERA Status', value: 'Registered' }
    ],
    configurations: [
      {
        id: 'grand2-30x40',
        label: '30 × 40 Villa Plot',
        dimensionOrType: '1,200 Sq. Ft. Delivered Plot',
        areaSqFt: 1200,
        facing: 'East / North',
        guidePriceLabel: 'Delivered Community Showcase',
        priceLakhs: 68
      }
    ],
    faqs: [
      {
        question: 'What is the RERA registration number for GRAND ICON 2?',
        answer:
          'GRAND ICON 2 is registered under Karnataka RERA ID PRM/KA/RERA/1251/308/PR/211215/004584.'
      }
    ]
  },
  {
    id: 'icon-central-park',
    slug: 'icon-central-park-sarjapur-road',
    name: 'ICON CENTRAL PARK',
    location: 'Choodasandra, Off Sarjapur Road, Bengaluru',
    corridor: 'Sarjapur Road',
    category: 'Apartments',
    status: 'Upcoming',
    approvals: 'Upcoming Residential Release',
    reraId: 'Upcoming Phase · Statutory Approvals in Progress',
    reraNote: 'Planned residential community in Choodasandra off Sarjapur Road · Priority registration open',
    startingPriceDisplay: 'Pre-Release Guidance on Request',
    configurationSummary: '2 & 3 BHK Park-Facing Residences (Upcoming Launch)',
    highlights: [
      'Upcoming low-density residential enclave in Choodasandra off Sarjapur Road',
      'Designed around central landscaped greens, daylight orientation, and Fluid living',
      'Rapid commute to HSR Layout, Kasavanahalli, Bellandur & Electronic City'
    ],
    summary:
      'Upcoming park-centric residential apartment community in Choodasandra off Sarjapur Road, open for priority early-release briefings.',
    overview:
      'ICON CENTRAL PARK is an upcoming ICONHOMZ residential release in Choodasandra near Sarjapur Road and HSR Layout. Conceived around expansive central green spaces and conscious floor-plan efficiency, the community brings refined urban living to South-East Bengaluru.',
    connectivity: [
      '8 mins to Sarjapur Road & Kasavanahalli Junction',
      '12 mins to HSR Layout & Bellandur Outer Ring Road',
      '15 mins to Electronic City & Wipro SEZ'
    ],
    amenities: [
      'Central Landscaped Park & Walking Trail',
      'Planned Residents’ Clubhouse & Fitness Center',
      'EV-Ready Basement Parking',
      '24/7 Gated Perimeter Security'
    ],
    image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
    imageAlt: 'ICON CENTRAL PARK upcoming residential development off Sarjapur Road Bangalore',
    metrics: [
      { label: 'Status', value: 'Upcoming' },
      { label: 'Location', value: 'Choodasandra' },
      { label: 'Release', value: 'Early Preview' }
    ],
    configurations: [
      {
        id: 'cp-2bhk',
        label: '2 BHK Park Residence',
        dimensionOrType: 'Upcoming 2 Bed Layout',
        areaSqFt: 1180,
        facing: 'East / North',
        guidePriceLabel: 'Pre-Release Pricing on Request',
        priceLakhs: 105
      },
      {
        id: 'cp-3bhk',
        label: '3 BHK Central Park Residence',
        dimensionOrType: 'Upcoming 3 Bed Corner Layout',
        areaSqFt: 1580,
        facing: 'East Facing',
        guidePriceLabel: 'Pre-Release Pricing on Request',
        priceLakhs: 142
      }
    ],
    faqs: [
      {
        question: 'How can buyers register for ICON CENTRAL PARK off Sarjapur Road?',
        answer:
          'Prospective buyers can register for priority pre-release briefings via our Contact page to receive official RERA filing updates and floor plans upon launch.'
      }
    ]
  }
];

export const PROPERTY_CATEGORIES: PropertyCategoryCard[] = [
  {
    id: 'Villa Plots',
    routePath: '/projects/villa-plots/',
    title: 'Villa Plots',
    subtitle: 'BDA & RERA Approved Enclaves',
    description:
      'Masterplanned gated plot communities like IVY COUNTY and GRAND ICON 3 with underground utilities, parks, and clubhouses.',
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'Masterplanned villa plots in Bangalore by ICONHOMZ'
  },
  {
    id: 'Apartments',
    routePath: '/projects/apartments/',
    title: 'Apartments',
    subtitle: 'Connected Urban Residences',
    description:
      'Space-efficient residential apartments like ICON MICASA and ICONEST 4 positioned along Electronic City and Sarjapur corridors.',
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'Modern residential apartments in Bangalore by ICONHOMZ'
  },
  {
    id: 'Villas',
    routePath: '/projects/villas/',
    title: 'Villas',
    subtitle: 'Independent Gated Living',
    description:
      'Spacious architectural villas including ICON LAURELS and ICON SANCTUARY combining private garden space with gated stewardship.',
    image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
    imageAlt: 'Independent residential villas in Bangalore by ICONHOMZ'
  },
  {
    id: 'Fluid Homes',
    routePath: '/projects/apartments/',
    title: 'Fluid Homes',
    subtitle: 'Conscious Living Innovation',
    description:
      'Space-efficient homes pioneered across Iconest 3, 4, 5 & ICON MICASA using multi-functional rooms, transformative furniture, and smart tech.',
    image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
    imageAlt: 'ICONHOMZ Fluid Homes adaptable interior residential architecture'
  }
];

export const WHY_ICONHOMZ_PILLARS: BrandPillar[] = [
  {
    index: '01',
    title: 'Conscious Living & Fluid Homes',
    summary:
      'ICONHOMZ pioneers "Conscious Living"—building ecologically mindful, space-efficient value homes using fluid layouts, multi-functional rooms, transformative furniture, and futuristic home technology.',
    projectProof: 'Demonstrated across ICON MICASA (Bommasandra) & Iconest 4 & 5',
    details: [
      'Multi-functional rooms that adapt between daytime workspaces and evening living suites',
      'Maximized usable carpet efficiency with zero wasted corridor geometry',
      'Sustainable urban footprint designed for growing modern families'
    ]
  },
  {
    index: '02',
    title: 'Statutory & RERA Transparency',
    summary:
      'Built on core values of ethics, honesty, and transparent customer communication—prioritizing clear titles, planning authority sanctions, and explicit RERA disclosures.',
    projectProof: 'BDA & RERA approved at IVY COUNTY · Registered RERA at ICON MICASA',
    details: [
      'Explicit Karnataka RERA registration numbers shared upfront for due diligence',
      'Clear 30-year title verification and bank legal empanelment support',
      'Honest milestone communication aligned with statutory guidelines'
    ]
  },
  {
    index: '03',
    title: 'High-Connectivity Micro-Markets',
    summary:
      'Every project is sited near active employment hubs, schools, and transit corridors—from Gunjur behind Greenwood High School to Bommasandra adjacent to HCL Campus.',
    projectProof: 'Strategic East & South Bengaluru footprint (Gunjur, Electronic City, Sarjapur)',
    details: [
      'Gunjur & Varthur–Sarjapur belt serving Whitefield and ORR professionals',
      'Bommasandra & Electronic City belt linked to Namma Metro Yellow Line',
      'Lakeside and green-perimeter planning across plotted communities'
    ]
  },
  {
    index: '04',
    title: 'End-to-End Stakeholder Stewardship',
    summary:
      'Guided by promoters with hands-on Bengaluru real estate experience since 2001, our team delivers structured legal, loan, NRI, and handover support.',
    projectProof: 'CREDAI Bengaluru member · Dedicated HSR Layout corporate desk',
    details: [
      'Direct developer advisory from site visit through registration & possession',
      'Structured NRI documentation and Power-of-Attorney coordination',
      'Long-term community infrastructure built for lasting value'
    ]
  }
];

export const BANGALORE_LOCATIONS: BangaloreLocation[] = [
  {
    id: 'gunjur',
    name: 'Gunjur',
    zone: 'East Bengaluru',
    routePath: '/projects/gunjur/',
    summary:
      'Anchored by Greenwood High International School and linking Varthur with Sarjapur Road, Gunjur hosts ICONHOMZ’s flagship 50-acre BDA-approved IVY COUNTY plotted development.',
    connectivityHighlights: [
      'Right behind Greenwood High School, Gunjur',
      '10 mins to Varthur Kodi & Whitefield ITPL',
      '15 mins to Sarjapur Road & Bellandur ORR'
    ],
    linkedProjectIds: ['ivy-county']
  },
  {
    id: 'sarjapur-road',
    name: 'Sarjapur Road',
    zone: 'South-East Bengaluru',
    routePath: '/projects/sarjapur-road/',
    summary:
      'A premier residential and IT growth spine—home to ICONHOMZ’s ICONEST 4 Fluid Homes, completed ICON SANCTUARY villas, ICONEST 5 in Harlur, and rapid connectivity to IVY COUNTY.',
    connectivityHighlights: [
      'Direct access to Wipro SEZ & RGA Tech Park',
      'Seamless link via Varthur–Gunjur to Whitefield',
      'Strong long-term land & apartment appreciation'
    ],
    linkedProjectIds: ['iconest-4', 'icon-sanctuary', 'iconest-5', 'icon-central-park']
  },
  {
    id: 'bommasandra',
    name: 'Bommasandra',
    zone: 'South Bengaluru',
    routePath: '/projects/bangalore/',
    summary:
      'Adjacent to the HCL Campus and served by the Namma Metro Yellow Line, Bommasandra hosts ICON MICASA Fluid Homes apartments, completed ICONEST 3 & GRAND ICON 2, and upcoming ICON LAURELS villas.',
    connectivityHighlights: [
      'Adjacent to HCL Campus & Electronic City Phase I/II',
      '5 mins to Bommasandra Metro Station (Yellow Line)',
      'Close to Narayana Health City & Hosur Road'
    ],
    linkedProjectIds: ['icon-micasa', 'icon-laurels', 'iconest-3', 'grand-icon-2']
  },
  {
    id: 'electronic-city',
    name: 'Electronic City',
    zone: 'South Bengaluru',
    routePath: '/projects/bangalore/',
    summary:
      'Bengaluru’s foundational IT and engineering corridor, supporting strong end-user demand across ICON BY THE LAKE 4 BHK villas, GRAND ICON 3 lakeside plots, and nearby Bommasandra residences.',
    connectivityHighlights: [
      'Elevated Expressway link to Silk Board & HSR Layout',
      'Home to major global IT, biotech & aerospace campuses',
      'Connected to Namma Metro Yellow Line stations'
    ],
    linkedProjectIds: ['icon-by-the-lake', 'grand-icon-3', 'icon-micasa']
  },
  {
    id: 'varthur',
    name: 'Varthur',
    zone: 'East Bengaluru',
    routePath: '/projects/gunjur/',
    summary:
      'Connecting Whitefield Main Road and State Highway 35 to Gunjur, Varthur supports strong family demand for BDA-approved plotted enclaves.',
    connectivityHighlights: [
      '10 mins to Whitefield & ITPL technology hubs',
      'Direct arterial access along SH-35',
      'Surrounded by international schools & retail hubs'
    ],
    linkedProjectIds: ['ivy-county']
  },
  {
    id: 'jigani',
    name: 'Jigani',
    zone: 'South Bengaluru',
    routePath: '/projects/bangalore/',
    summary:
      'Bordering Bommasandra and Electronic City, Jigani offers quieter residential access near Hosur Road employment centers.',
    connectivityHighlights: [
      '12 mins to Bommasandra Metro & HCL Campus',
      'Easy access to Bannerghatta green belt',
      'Well-connected to Jigani Industrial & Biotech Park'
    ],
    linkedProjectIds: ['icon-micasa', 'icon-laurels']
  }
];

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: 'lead-ceo',
    name: 'Rajasekhar Gowrineni',
    role: 'Co-Founder, Chairman & CEO',
    focus: 'Strategic Vision, Land Acquisition, Regulatory Approvals & Delivery (Active since 2001)',
    bio: 'Co-Founder, Chairman & CEO of ICONHOMZ (ICON Infra Shelters India Pvt. Ltd.). Bringing hands-on Bengaluru real estate experience since 2001 across land acquisition, statutory approvals, construction, and sales, he leads ICONHOMZ’s mission to build sustainable, ecologically conscious value homes and plotted communities.'
  },
  {
    id: 'lead-coo',
    name: 'Dr. P. Manmohan Reddy',
    role: 'Co-Founder, COO & Director',
    focus: 'Infrastructure Execution, Joint Developments & Operational Excellence',
    bio: 'Co-Founder and Chief Operating Officer with deep-rooted experience in Bengaluru’s construction and infrastructure sector. Oversees land underwriting, joint development partnerships (JDAs), engineering quality, and timely infrastructure execution across all residential enclaves.'
  },
  {
    id: 'lead-dir',
    name: 'Chaitanya Kumar Reddy',
    role: 'Director',
    focus: 'Corporate Governance, Customer Stewardship & Project Operations',
    bio: 'Director at ICONHOMZ guiding operational governance, stakeholder transparency, and customer experience across ongoing plotted, apartment, and villa communities in East and South Bengaluru.'
  }
];

export const CUSTOMER_EXPERIENCES: CustomerExperience[] = [
  {
    id: 'exp-1',
    quote:
      'Choosing a 50-acre BDA-approved layout right behind Greenwood High School in Gunjur gave our family total peace of mind on legal titles and future neighborhood appreciation.',
    name: 'Karthik & Ananya Hegde',
    community: 'IVY COUNTY · Gunjur',
    context: 'Villa Plot Owners · East Bengaluru'
  },
  {
    id: 'exp-2',
    quote:
      'ICON MICASA’s Fluid Homes layout maximizes every square foot of our 2 BHK residence, and being adjacent to the HCL Campus in Bommasandra cuts my daily Electronic City commute to minutes.',
    name: 'Prashanth Nair',
    community: 'ICON MICASA · Bommasandra',
    context: '2 BHK Fluid Home Buyer · Tech Lead'
  },
  {
    id: 'exp-3',
    quote:
      'Seeing completed communities like ICON SANCTUARY and ICONEST 5 firsthand gave us complete confidence in ICONHOMZ’s delivery discipline and transparent documentation.',
    name: 'Shruti & Vivek Menon',
    community: 'GRAND ICON 3 · Electronic City Belt',
    context: 'Plot Investors · South Bengaluru'
  },
  {
    id: 'exp-4',
    quote:
      'Living in ICON SANCTUARY has given our parents peaceful green avenues while keeping Wipro SEZ and international schools on Sarjapur Road just minutes away.',
    name: 'Raghavendra & Meera Rao',
    community: 'ICON SANCTUARY · Sarjapur Road',
    context: 'Completed Villa Homeowners'
  }
];

export const BLOG_ARCHIVE_ROUTES: Record<string, BlogRouteMeta> = {
  '/blogs/': {
    path: '/blogs/',
    breadcrumbLabel: 'All Blogs',
    seoTitle: 'Bangalore Real Estate Blog & Buyer Guides | ICONHOMZ',
    metaDescription:
      'Read Bangalore real estate guides on BDA vs BMRDA approvals, villa plot investment, Vastu directions, and gated community living by ICONHOMZ.',
    h1: 'ICONHOMZ Blog & Research Guides',
    intro:
      'Editorially reviewed, answer-first guides engineered for homebuyers and investors evaluating BDA/RERA approvals, Bangalore micro-markets, and space-efficient Fluid Homes.'
  },
  '/blogs/real-estate/': {
    path: '/blogs/real-estate/',
    breadcrumbLabel: 'Real Estate',
    seoTitle: 'Bangalore Real Estate & Developer Blog | ICONHOMZ',
    metaDescription:
      'Read practical guides on evaluating real estate developers, Bangalore market trends, and pre-booking checks by the ICONHOMZ advisory team.',
    h1: 'Bangalore Real Estate Market & Developer Research',
    intro:
      'Objective frameworks to evaluate residential developers, track market fundamentals, and complete pre-booking due diligence across Bengaluru.'
  },
  '/blogs/property-investment/': {
    path: '/blogs/property-investment/',
    breadcrumbLabel: 'Property Investment',
    seoTitle: 'Bangalore Property Investment & Loan Blog | ICONHOMZ',
    metaDescription:
      'Compare villa plots vs apartments, property appreciation factors, and home loan vs plot loan options across Bangalore with ICONHOMZ guides.',
    h1: 'Property Investment & Financing Research in Bangalore',
    intro:
      'Data-backed perspectives on long-term land equity, appreciation drivers, and structured plot vs. apartment financing options.'
  },
  '/blogs/vastu/': {
    path: '/blogs/vastu/',
    breadcrumbLabel: 'Vastu',
    seoTitle: 'Vastu Guide for Residential Plots | ICONHOMZ Blog',
    metaDescription:
      'Explore Vastu tips for selecting North, East, and West-facing residential plots, plot proportions, and daylight planning in Bangalore by ICONHOMZ.',
    h1: 'Vastu & Architectural Orientation Guides',
    intro:
      'Practical orientation, daylighting, and plot-selection guidance grounded in architectural usability and traditional Vastu principles.'
  },
  '/blogs/home-buying-guides/': {
    path: '/blogs/home-buying-guides/',
    breadcrumbLabel: 'Home Buying Guides',
    seoTitle: 'Home Buying Checklists – BDA & RERA | ICONHOMZ Blog',
    metaDescription:
      'Step-by-step home buying checklists covering BDA vs BMRDA vs BBMP plot approvals, Karnataka RERA checks, and legal title documents in Bangalore.',
    h1: 'Bangalore Home Buying & Legal Approval Guides',
    intro:
      'Verification checklists covering planning authority sanctions (BDA, BMRDA, BBMP), Karnataka RERA filings, and title documentation before purchase.'
  },
  '/blogs/bangalore-real-estate/': {
    path: '/blogs/bangalore-real-estate/',
    breadcrumbLabel: 'Bangalore Real Estate',
    seoTitle: 'Bangalore Corridors Blog – Gunjur & More | ICONHOMZ',
    metaDescription:
      'Explore East and South Bangalore real estate corridor guides comparing Gunjur vs Varthur, Sarjapur Road, Whitefield ITPL, and Bommasandra Metro.',
    h1: 'Bangalore Micro-Market & Location Guides',
    intro:
      'On-the-ground corridor analysis spanning Gunjur, Varthur, Sarjapur Road, Whitefield, and the Bommasandra–Electronic City Metro belt.'
  },
  '/blogs/lifestyle/': {
    path: '/blogs/lifestyle/',
    breadcrumbLabel: 'Lifestyle',
    seoTitle: 'Gated Community & Clubhouse Living | ICONHOMZ Blog',
    metaDescription:
      'Learn how gated community plots, landscaped parks, and clubhouses enhance family safety, wellness, and long-term home value in Bangalore.',
    h1: 'Conscious Living & Gated Community Lifestyle',
    intro:
      'Perspectives on low-density gated neighborhoods, multi-generational clubhouse amenities, and adaptable Fluid Home interiors.'
  }
};

export const BLOG_TOPIC_OPPORTUNITIES: BlogTopicOpportunity[] = [
  { id: 't-1', pillar: 'Real Estate', title: 'How to Evaluate a Real Estate Developer', targetRoute: '/blogs/real-estate/', status: 'Published', linkedArticleId: 'art-evaluate-developer' },
  { id: 't-2', pillar: 'Real Estate', title: 'Top Real Estate Developers in Bangalore', targetRoute: '/blogs/real-estate/', status: 'Published', linkedArticleId: 'art-top-developers-bangalore' },
  { id: 't-3', pillar: 'Real Estate', title: 'Bangalore Real Estate Market Trends', targetRoute: '/blogs/real-estate/', status: 'Published', linkedArticleId: 'art-bangalore-market-trends' },
  { id: 't-4', pillar: 'Property Investment', title: 'Villa Plots vs Apartments: Which Is Better for Investment?', targetRoute: '/blogs/property-investment/', status: 'Published', linkedArticleId: 'art-plots-vs-apartments' },
  { id: 't-5', pillar: 'Property Investment', title: 'Is Investing in Villa Plots in Bangalore a Good Decision?', targetRoute: '/blogs/property-investment/', status: 'Published', linkedArticleId: 'art-villa-plot-investment-bangalore' },
  { id: 't-6', pillar: 'Property Investment', title: 'Factors That Influence Property Appreciation in Bangalore', targetRoute: '/blogs/property-investment/', status: 'Published', linkedArticleId: 'art-property-appreciation-factors' },
  { id: 't-7', pillar: 'Home Buying Guides', title: 'BDA vs BMRDA vs BBMP: Understanding Plot Approvals', targetRoute: '/blogs/home-buying-guides/', status: 'Published', linkedArticleId: 'art-bda-bmrda-approvals' },
  { id: 't-8', pillar: 'Home Buying Guides', title: 'Complete Guide to Buying a Plot in Bangalore', targetRoute: '/blogs/home-buying-guides/', status: 'Published', linkedArticleId: 'art-complete-guide-buying-plot' },
  { id: 't-9', pillar: 'Home Buying Guides', title: 'Documents to Verify Before Buying a BDA Approved Plot', targetRoute: '/blogs/home-buying-guides/', status: 'Published', linkedArticleId: 'art-bda-documents-checklist' },
  { id: 't-10', pillar: 'Property Investment', title: 'Home Loan vs Plot Loan: Key Differences', targetRoute: '/blogs/property-investment/', status: 'Published', linkedArticleId: 'art-home-loan-vs-plot-loan' },
  { id: 't-11', pillar: 'Property Investment', title: 'How to Finance a Villa Plot Purchase', targetRoute: '/blogs/property-investment/', status: 'Published', linkedArticleId: 'art-finance-villa-plot' },
  { id: 't-12', pillar: 'Vastu', title: 'Vastu Tips Before Buying a Residential Plot', targetRoute: '/blogs/vastu/', status: 'Published', linkedArticleId: 'art-vastu-residential-plot' },
  { id: 't-13', pillar: 'Vastu', title: 'Best Plot Directions According to Vastu', targetRoute: '/blogs/vastu/', status: 'Published', linkedArticleId: 'art-best-plot-directions-vastu' },
  { id: 't-14', pillar: 'Bangalore Real Estate', title: 'Is Gunjur a Good Location to Buy Property?', targetRoute: '/blogs/bangalore-real-estate/', status: 'Published', linkedArticleId: 'art-bommasandra-gunjur-corridors' },
  { id: 't-15', pillar: 'Bangalore Real Estate', title: 'Gunjur vs Varthur: Which Location Should You Choose?', targetRoute: '/blogs/bangalore-real-estate/', status: 'Published', linkedArticleId: 'art-gunjur-vs-varthur' },
  { id: 't-16', pillar: 'Bangalore Real Estate', title: 'Sarjapur Road Real Estate Investment Guide', targetRoute: '/blogs/bangalore-real-estate/', status: 'Published', linkedArticleId: 'art-sarjapur-road-investment-guide' },
  { id: 't-17', pillar: 'Bangalore Real Estate', title: 'Whitefield Property Market and Connectivity Guide', targetRoute: '/blogs/bangalore-real-estate/', status: 'Published', linkedArticleId: 'art-whitefield-connectivity-guide' },
  { id: 't-18', pillar: 'Lifestyle', title: 'Benefits of Gated Community Living & Clubhouse Amenities', targetRoute: '/blogs/lifestyle/', status: 'Published', linkedArticleId: 'art-gated-community-lifestyle' },
  { id: 't-19', pillar: 'Lifestyle', title: 'Why Are Clubhouse Amenities Important?', targetRoute: '/blogs/lifestyle/', status: 'Published', linkedArticleId: 'art-why-clubhouse-amenities-matter' },
  { id: 't-20', pillar: 'Home Buying Guides', title: 'What Buyers Should Know Before Booking a Residential Property', targetRoute: '/blogs/home-buying-guides/', status: 'Published', linkedArticleId: 'art-what-buyers-should-know' }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-plots-vs-apartments',
    slug: 'villa-plots-vs-apartments-in-bangalore',
    seoTitle: 'Villa Plots vs Apartments in Bangalore: 10-Year Comparison | ICONHOMZ',
    metaDescription:
      'Compare BDA-approved villa plots vs RERA apartments in Bangalore on appreciation, customization, rental yield, and ongoing maintenance costs.',
    title: 'Villa Plots vs Apartments: Which Is Better for Long-Term Value in Bangalore?',
    category: 'Property Investment',
    routeCategoryPath: '/blogs/property-investment/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 19, 2026 · Editorially Verified',
    readTime: '6 min read',
    author: 'ICONHOMZ Research Desk',
    authorRole: 'Bengaluru Residential Advisory',
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'Villa plot investment opportunities in Bangalore',
    answerFirstSummary:
      'Choose BDA-approved villa plots in East Bengaluru corridors like IVY COUNTY in Gunjur if your primary objective is long-term land equity, zero structural depreciation, and freedom to design a custom family home. Choose space-efficient apartments such as ICON MICASA in Bommasandra or ICONEST 4 on Sarjapur Road if you prioritize immediate move-in convenience, proximity to transit stations, and lower upfront holding effort.',
    keyTakeaways: [
      'Residential land appreciates cleanly alongside arterial infrastructure without physical building depreciation.',
      'Large BDA-approved communities like IVY COUNTY (50 acres, 658 plots) pair land ownership with clubhouse infrastructure.',
      'Bommasandra apartments near HCL Campus and Yellow Line Metro attract consistent IT tenant demand.'
    ],
    sections: [
      {
        heading: '1. Capital Appreciation vs. Ready Rental Cashflow',
        subHeading: 'How Land Equity Behaves Across East & South Bengaluru',
        body: 'Across high-growth Bengaluru belts such as Gunjur–Varthur and Sarjapur Road, gated villa plots historically track arterial road and social infrastructure expansion closely because supply of BDA-sanctioned plotted layouts inside city limits remains constrained. Apartments near active employment centers like HCL Bommasandra generate faster post-handover rental cashflow for yield-focused buyers.'
      },
      {
        heading: '2. Space-Efficient Living Through Fluid Homes',
        subHeading: 'Maximizing Usable Daily Footprint',
        body: 'Modern buyers no longer accept dark corridors or underutilized guest rooms. ICONHOMZ’s Fluid Homes engineering—implemented at ICON MICASA and ICONEST 4—integrates convertible multi-functional spaces so compact 2 and 3 BHK apartments support hybrid work and family life comfortably.'
      }
    ],
    factsAndSources: [
      {
        stat: '50 Acres / ~658 Plots',
        context: 'Large-format BDA-approved gated plotted infrastructure example at IVY COUNTY, Gunjur.',
        source: 'ICONHOMZ Masterplan & Karnataka RERA Disclosures'
      },
      {
        stat: '30-Year Title Chain',
        context: 'Standard legal verification horizon recommended before plot or flat execution.',
        source: 'Karnataka RERA & CREDAI Bengaluru Buyer Guidelines'
      }
    ],
    comparisonTable: {
      caption: 'Villa Plots vs. Apartments Comparison Matrix',
      headers: ['Criteria', 'BDA-Approved Villa Plots', 'Fluid Home Apartments'],
      rows: [
        ['Asset Depreciation', 'Zero land depreciation', 'Structure ages gradually; regular corpus upkeep'],
        ['Design Flexibility', 'Full custom villa design within bylaws', 'Pre-engineered multi-functional floor plan'],
        ['Holding / Maintenance', 'Minimal pre-construction upkeep', 'Monthly society maintenance for amenities'],
        ['Example ICONHOMZ Project', 'IVY COUNTY (Gunjur) & GRAND ICON 3', 'ICON MICASA (Bommasandra) & ICONEST 4']
      ]
    },
    expertCommentary:
      'Before choosing strictly between a plot and an apartment, clarify your 5-year household timeline. Families planning custom multi-generational construction benefit most from BDA-approved 30×40 or 40×60 plots in active school belts like Gunjur, whereas professionals needing daily workplace proximity benefit from transit-linked apartments.',
    faqs: [
      {
        question: 'Can banks finance residential villa plot purchases in Bangalore?',
        answer:
          'Yes. Leading PSU and private sector banks approve plot loans for BDA and RERA-registered gated developments once layout sanctions and title opinions are empanelled.'
      },
      {
        question: 'Which costs more initially: maintaining a plot or an apartment?',
        answer:
          'Vacant gated villa plots incur nominal perimeter and landscape upkeep charges compared to apartment complexes with elevators, generators, and staff.'
      }
    ],
    relatedArticleIds: ['art-bda-bmrda-approvals', 'art-bommasandra-gunjur-corridors'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-bda-bmrda-approvals',
    slug: 'bda-vs-bmrda-vs-bbmp-approvals-bangalore',
    seoTitle: 'BDA vs BMRDA vs BBMP Plot Approvals in Bangalore | ICONHOMZ',
    metaDescription:
      'Learn how BDA, BMRDA, BBMP Khata, DC conversion, and Karnataka RERA registrations protect buyers purchasing residential plots in Bangalore.',
    title: 'BDA vs BMRDA vs BBMP: Essential Legal Checklist Before Buying Land',
    category: 'Home Buying Guides',
    routeCategoryPath: '/blogs/home-buying-guides/',
    publishedDate: 'October 2026',
    updatedDate: 'Updated November 18, 2026 · Legal Team Reviewed',
    readTime: '7 min read',
    author: 'ICONHOMZ Legal & Compliance Team',
    authorRole: 'Title & Statutory Advisory',
    image: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
    imageAlt: 'Bangalore BDA and RERA approved residential layout documentation guide',
    answerFirstSummary:
      'Before booking any plot or apartment in Bangalore, verify four mandatory statutory documents: Planning Authority Sanction (BDA or BMRDA depending on geography), active Karnataka RERA registration number, Deputy Commissioner (DC) residential conversion order, and A-Khata / e-Khata eligibility. Never purchase unapproved revenue or panchayat sites lacking planning authority release orders.',
    keyTakeaways: [
      'BDA sanctions projects inside the Bangalore Development Authority local planning area; BMRDA governs outer metropolitan zones.',
      'Every eligible development must display a verifiable Karnataka RERA registration number prior to marketing.',
      'Always audit 30-year Encumbrance Certificates (EC) and release orders with an independent property lawyer.'
    ],
    sections: [
      {
        heading: '1. Understanding Planning Authorities Across Bengaluru',
        subHeading: 'BDA vs. BMRDA Jurisdiction Boundaries',
        body: 'Jurisdiction is determined strictly by land parcel survey location. Within core expansion zones such as Gunjur–Varthur, BDA acts as the layout approval authority enforcing dedicated civic amenity sites, parks, and wide internal roads. Beyond BDA’s boundary across metropolitan growth belts, BMRDA / APA authorities govern layout sanctions.'
      },
      {
        heading: '2. Why RERA Release Orders Matter',
        subHeading: 'Escrow Protection & Staged Delivery Accountability',
        body: 'Under RERA Karnataka norms, promoters are bound to deposit buyer collections in designated project accounts and publish quarterly engineering updates, ensuring statutory transparency across milestones.'
      }
    ],
    factsAndSources: [
      {
        stat: 'Form-9 / Form-11B & Release Orders',
        context: 'Core municipal / panchayat e-Khata records paired with planning authority release certification.',
        source: 'Department of Urban Development & Karnataka RERA'
      },
      {
        stat: 'PRM/KA/RERA/1251/310/PR/110422/004823',
        context: 'Example verified Karnataka RERA registration format held by ICON MICASA.',
        source: 'Karnataka RERA Public Portal'
      }
    ],
    comparisonTable: {
      caption: 'Bengaluru Statutory Approval Overview',
      headers: ['Authority / Check', 'Primary Role', 'Buyer Verification Tip'],
      rows: [
        ['BDA / BMRDA', 'Layout plan & road/park sanction', 'Confirm 100% or phase-wise site release order'],
        ['Karnataka RERA', 'Financial escrow & delivery timeline', 'Match survey numbers directly on rera.karnataka.gov.in'],
        ['DC Conversion', 'Converts agricultural land to residential use', 'Mandatory prior to planning authority submission'],
        ['EC & Mother Deed', 'Establishes clear unbroken ownership', 'Verify minimum 30 years of non-encumbered title']
      ]
    },
    expertCommentary:
      'Ethical developers welcome legal scrutiny. At ICONHOMZ, our team prepares organized statutory document binders—including sanction plans, RERA certificates, and Mother Deed chains—so prospective families can complete bank and advocate verification before committing capital.',
    faqs: [
      {
        question: 'Is BDA approval safer than unapproved Panchayat sites?',
        answer:
          'Yes. BDA-approved layouts comply strictly with zoning laws, road width standards, and civic site reservations, enabling seamless bank financing and clear resale.'
      }
    ],
    relatedArticleIds: ['art-plots-vs-apartments', 'art-evaluate-developer'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-bommasandra-gunjur-corridors',
    slug: 'gunjur-and-bommasandra-bangalore-real-estate-guide',
    seoTitle: 'Is Gunjur & Bommasandra Good for Buying Property in Bangalore? | ICONHOMZ',
    metaDescription:
      'Evaluate residential livability, international schools, HCL Campus, and Namma Metro connectivity in Gunjur (East) and Bommasandra (South Bangalore).',
    title: 'Is Gunjur or Bommasandra Good for Buying Property in Bangalore?',
    category: 'Bangalore Real Estate',
    routeCategoryPath: '/blogs/bangalore-real-estate/',
    publishedDate: 'October 2026',
    updatedDate: 'Updated November 17, 2026 · Corridor Team Reviewed',
    readTime: '6 min read',
    author: 'ICONHOMZ Urban Strategy',
    authorRole: 'Corridor Research',
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'Residential developments in Gunjur and Bommasandra Bangalore',
    answerFirstSummary:
      'Yes—both Gunjur in East Bangalore and Bommasandra in South Bangalore offer strong residential fundamentals anchored by active employment clusters rather than speculative hype. Gunjur bridges Whitefield ITPL, Varthur, and Sarjapur Road beside Greenwood High International School, while Bommasandra sits directly beside HCL Campus and the Namma Metro Yellow Line serving Electronic City.',
    keyTakeaways: [
      'Gunjur connects Whitefield ITPL, Varthur Kodi, and Sarjapur–Bellandur ORR within 10–15 minutes.',
      'Bommasandra anchors Namma Metro Yellow Line access next to Electronic City Phase I & II.',
      'ICONHOMZ serves both corridors directly via IVY COUNTY (Gunjur), ICONEST 4, and ICON MICASA (Bommasandra).'
    ],
    sections: [
      {
        heading: '1. East Bangalore: Gunjur & Varthur–Sarjapur Triangle',
        subHeading: 'School Ecosystems & Whitefield–ORR Connectivity',
        body: 'Families relocating to East Bangalore consistently prioritize proximity to reputable K–12 schools like Greenwood High International School along Gunjur. With seamless access toward Whitefield to the north and Sarjapur Road–Bellandur ORR to the south, BDA-approved layouts like IVY COUNTY combine peaceful green living with genuine daily utility.'
      },
      {
        heading: '2. South Bangalore: Bommasandra & Electronic City',
        subHeading: 'Metro Access & Engineering Employment',
        body: 'Bommasandra has evolved beyond industrial zoning into a cohesive residential hub powered by Electronic City’s tech parks, Narayana Health City, and the Yellow Line Metro link. Communities such as ICON MICASA and upcoming ICON LAURELS villas give families walk-to-work or short-commute access.'
      }
    ],
    factsAndSources: [
      {
        stat: '10–15 Min Commute Window',
        context: 'Gunjur link between Varthur Kodi (Whitefield corridor) and Sarjapur–Bellandur ORR.',
        source: 'Bengaluru Urban Arterial Mapping'
      },
      {
        stat: 'Yellow Line Metro Node',
        context: 'Bommasandra terminal connecting Electronic City to Central Silk Board and RV Road.',
        source: 'BMRCL Namma Metro Phase 2 Network'
      }
    ],
    comparisonTable: {
      caption: 'East vs. South Bangalore ICONHOMZ Corridors',
      headers: ['Corridor', 'Primary Anchor Employers / Schools', 'Matching ICONHOMZ Projects'],
      rows: [
        ['Gunjur / Varthur', 'Greenwood High School, Whitefield ITPL, ORR Tech Parks', 'IVY COUNTY (50-Acre Villa Plots)'],
        ['Sarjapur Road / Harlur', 'Wipro SEZ, RGA Tech Park, HSR Layout', 'ICONEST 4, ICON SANCTUARY, ICONEST 5'],
        ['Bommasandra / E-City', 'HCL Campus, Infosys, Biocon, Yellow Line Metro', 'ICON MICASA, GRAND ICON 3, ICON LAURELS']
      ]
    },
    expertCommentary:
      'Choose corridors where social infrastructure (schools, hospitals, grocery retail, and rapid transit) already operates today rather than betting solely on unbuilt ring-road promises.',
    faqs: [
      {
        question: 'How is connectivity between Gunjur and Whitefield ITPL?',
        answer:
          'Gunjur connects via Varthur Kodi directly into Whitefield Main Road and ITPL in roughly 10–15 minutes under normal traffic.'
      }
    ],
    relatedArticleIds: ['art-plots-vs-apartments', 'art-gated-community-lifestyle'],
    relatedProjectId: 'icon-micasa'
  },
  {
    id: 'art-evaluate-developer',
    slug: 'how-to-evaluate-real-estate-developer-bangalore',
    seoTitle: 'How to Evaluate a Real Estate Developer in Bangalore | ICONHOMZ',
    metaDescription:
      'Checklist for assessing builder delivery track record, CREDAI membership, legal transparency, and completed project quality in Bangalore.',
    title: 'How to Evaluate a Real Estate Developer Before Booking a Home',
    category: 'Real Estate',
    routeCategoryPath: '/blogs/real-estate/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 19, 2026 · Editorial Review Completed',
    readTime: '5 min read',
    author: 'ICONHOMZ Advisory Editorial',
    authorRole: 'Buyer Governance Desk',
    image: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
    imageAlt: 'Completed residential community evaluation in Bangalore',
    answerFirstSummary:
      'Evaluate any residential developer across five verifiable signals: tour their completed and occupied communities firsthand (not just render brochures), confirm promoter track record longevity, verify active CREDAI and Karnataka RERA compliance, audit 30-year title transparency, and check whether promised infrastructure like underground utilities and clubhouses matches delivered reality.',
    keyTakeaways: [
      'Always visit a builder’s completed project to speak with existing homeowners and check construction aging.',
      'Check promoter tenure and governance reputation in Bengaluru (ICONHOMZ leadership dates back to 2001).',
      'Insist on transparent RERA IDs, payment schedules, and clear allotment terms upfront.'
    ],
    sections: [
      {
        heading: '1. Inspect Completed Projects Firsthand',
        subHeading: 'What Occupied Communities Reveal About Execution',
        body: 'Brochure elevations cannot predict water seepage control, internal road grading, or association handover discipline. Touring delivered developments—such as ICON SANCTUARY villas on Sarjapur Road or ICONEST 5 apartments in Harlur—lets buyers evaluate material longevity directly.'
      },
      {
        heading: '2. Confirm Leadership Continuity & Accountability',
        subHeading: 'Promoter Track Record Since 2001',
        body: 'Operating under ICON Infra Shelters India Pvt. Ltd. and registered as a CREDAI Bengaluru member, ICONHOMZ leadership brings over two decades of domain underwriting across Bengaluru land approvals and execution.'
      }
    ],
    factsAndSources: [
      {
        stat: 'Since 2001',
        context: 'Hands-on Bengaluru residential & plotted real estate track record of CEO Rajasekhar Gowrineni.',
        source: 'ICON Infra Shelters Corporate Disclosures'
      },
      {
        stat: 'CREDAI Bengaluru Member',
        context: 'Industry code of conduct prioritizing statutory disclosure and ethical homebuyer communication.',
        source: 'CREDAI Bengaluru Directory'
      }
    ],
    expertCommentary:
      'Never feel pressured by false "last unit today" urgency. A trustworthy developer gives your advocate adequate time to inspect sanctions, title chains, and RERA schedules.',
    faqs: [
      {
        question: 'Can buyers visit completed ICONHOMZ communities before booking IVY COUNTY or ICON MICASA?',
        answer:
          'Yes. Our HSR Layout advisory team arranges accompanied visits to completed developments including ICON SANCTUARY and ICONEST 5 alongside ongoing project sites.'
      }
    ],
    relatedArticleIds: ['art-bda-bmrda-approvals', 'art-plots-vs-apartments'],
    relatedProjectId: 'icon-sanctuary'
  },
  {
    id: 'art-vastu-residential-plot',
    slug: 'vastu-tips-before-buying-residential-plot-bangalore',
    seoTitle: 'Vastu Tips Before Buying a Residential Plot in Bangalore | ICONHOMZ',
    metaDescription:
      'Practical Vastu guidelines on plot orientation, road alignment, shape proportions, and sunlight planning for East and South Bangalore villa plots.',
    title: 'Vastu Tips Before Buying a Residential Plot: Direction, Shape & Slope Guide',
    category: 'Vastu',
    routeCategoryPath: '/blogs/vastu/',
    publishedDate: 'October 2026',
    updatedDate: 'Updated November 15, 2026 · Architecture Desk',
    readTime: '5 min read',
    author: 'ICONHOMZ Architecture Team',
    authorRole: 'Conscious Living Design',
    image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
    imageAlt: 'East and North facing villa plots planned with architectural sunlight orientation',
    answerFirstSummary:
      'When selecting a residential villa plot, prioritize a clean rectangular geometry (such as standard 30×40, 30×50, or 40×60 proportions), unobstructed natural morning light, positive drainage slope toward the North or East, and clear entrance orientation aligned with North, East, or well-designed West/South floor-plan entry adjustments.',
    keyTakeaways: [
      'Rectangular 30×40 and 40×60 plots simplify both Vastu zoning and structural column efficiency.',
      'North and East road-facing plots receive abundant balanced daylight while reducing harsh western heat gain.',
      'Even South or West-facing gated plots accommodate Vastu-compliant internal main door placement cleanly.'
    ],
    sections: [
      {
        heading: '1. Why Plot Shape & Proportion Come First',
        subHeading: 'Advantages of Standard 30×40 and 40×60 Masterplans',
        body: 'Oddly tapered corners reduce usable plinth area and complicate traditional room placement. Properly orthogonal gated layouts like IVY COUNTY in Gunjur maintain balanced 30×40, 30×50, and 40×60 dimensions so architects can place kitchens in the South-East, living rooms in the North-East, and master suites in the South-West effortlessly.'
      },
      {
        heading: '2. Passive Solar & Ventilation Alignment',
        subHeading: 'Architectural Science Behind Traditional Orientation',
        body: 'In Bengaluru’s tropical plateau climate, morning East sun and gentle North daylight keep interiors naturally bright and cool, lowering daytime lighting and air-conditioning loads.'
      }
    ],
    factsAndSources: [
      {
        stat: '1,200 – 2,400 Sq. Ft. Orthogonal Grids',
        context: 'Standardized rectangular plot footprints enabling efficient structural and Vastu zoning.',
        source: 'ICONHOMZ Masterplan Engineering'
      }
    ],
    expertCommentary:
      'Do not reject a great park-facing or corner plot solely over its road direction—a skilled residential architect can align your main entrance threshold, courtyard ventilation, and room zoning harmoniously.',
    faqs: [
      {
        question: 'Does IVY COUNTY offer East and North-facing villa plots?',
        answer:
          'Yes. IVY COUNTY’s 50-acre masterplan features North, East, West, and corner park-facing plot options across 30×40, 30×50, and 40×60 sizes.'
      }
    ],
    relatedArticleIds: ['art-plots-vs-apartments', 'art-gated-community-lifestyle'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-gated-community-lifestyle',
    slug: 'benefits-of-gated-community-living-and-clubhouse-amenities',
    seoTitle: 'Benefits of Gated Community Living & Clubhouse Amenities | ICONHOMZ',
    metaDescription:
      'Discover how gated masterplanned communities with landscaped parks, underground utilities, and clubhouses enhance safety, health, and family lifestyle.',
    title: 'Benefits of Gated Community Living & Why Clubhouse Amenities Matter',
    category: 'Lifestyle',
    routeCategoryPath: '/blogs/lifestyle/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 16, 2026 · Lifestyle Research',
    readTime: '5 min read',
    author: 'ICONHOMZ Community Experience',
    authorRole: 'Resident Lifestyle Research',
    image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
    imageAlt: 'ICONHOMZ gated community clubhouse and landscaped residential amenities',
    answerFirstSummary:
      'Gated community living provides controlled 24/7 perimeter security, vehicle-calmed internal streets where children and seniors can walk safely, reliable underground power and fiber utilities, and shared clubhouse amenities—delivering fitness studios, co-working lounges, and community parks at a fraction of independent private maintenance costs.',
    keyTakeaways: [
      'Expansive clubhouses (~50,000 sq. ft. at IVY COUNTY) support remote work lounges, wellness, and multi-sport routines inside the enclave.',
      'Underground power, water, and drainage reduce storm disruptions common on standalone city streets.',
      'Planned parks foster vibrant neighborhood friendships across multi-generational families.'
    ],
    sections: [
      {
        heading: '1. From Individual Plot to Holistic Neighborhood',
        subHeading: 'Safety, Walkability & Open Green Ratios',
        body: 'Modern urban families in East and South Bangalore increasingly favor gated enclaves over standalone unorganized streets because wide internal avenues, landscaped parks, and security gates let children play outdoors safely while maintaining serene evening quiet.'
      },
      {
        heading: '2. The Role of Modern Clubhouses in Hybrid Work Life',
        subHeading: 'Extended Third-Place Living',
        body: 'Today’s clubhouse acts as an extension of the home: residents use indoor fitness zones before office hours, host family milestones without hotel logistics, and collaborate in calm community lounges.'
      }
    ],
    factsAndSources: [
      {
        stat: '50,000 Sq. Ft. Clubhouse Scale',
        context: 'Dedicated lifestyle, recreation, and wellness center planned within IVY COUNTY, Gunjur.',
        source: 'IVY COUNTY Masterplan Overview'
      }
    ],
    expertCommentary:
      'A well-maintained clubhouse and green open ratio not only elevate daily life for current residents—they protect long-term neighborhood desirability when selling or leasing years later.',
    faqs: [
      {
        question: 'Do both plotted developments and apartments at ICONHOMZ include community amenities?',
        answer:
          'Yes. Flagship plotted projects like IVY COUNTY feature expansive clubhouses and themed parks, while apartment communities like ICON MICASA integrate terrace lounges and fitness amenities.'
      }
    ],
    relatedArticleIds: ['art-bommasandra-gunjur-corridors', 'art-plots-vs-apartments'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-top-developers-bangalore',
    slug: 'top-real-estate-developers-in-bangalore',
    seoTitle: 'What Defines Top Real Estate Developers in Bangalore | ICONHOMZ Blog',
    metaDescription:
      'Criteria homebuyers use to benchmark reliable real estate developers in Bangalore: RERA transparency, CREDAI membership, delivery record, and title clarity.',
    title: 'Top Real Estate Developers in Bangalore: How Buyers Benchmark Reliability',
    category: 'Real Estate',
    routeCategoryPath: '/blogs/real-estate/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 19, 2026 · Editorial Review Completed',
    readTime: '5 min read',
    author: 'ICONHOMZ Advisory Editorial',
    authorRole: 'Buyer Governance Desk',
    image: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
    imageAlt: 'Top residential real estate developments in Bengaluru',
    answerFirstSummary:
      'Rather than relying on advertising spend, evaluate leading Bangalore developers on four objective benchmarks: unbroken 30-year title clearness, BDA/RERA statutory adherence, timely handover across past communities, and active homeowner associations in occupied projects.',
    keyTakeaways: [
      'Completed communities demonstrate genuine engineering and waterproofing standards.',
      'CREDAI Bengaluru & Karnataka RERA compliance protect buyer escrow milestones.',
      'Dedicated plotted specialists vs. high-rise builders offer distinct infrastructure strengths.'
    ],
    sections: [
      {
        heading: '1. Track Record Across Economic Cycles',
        subHeading: 'Consistency Over Decades',
        body: 'Developers active across 20+ years in Bengaluru understand local soil hydrology, planning bylaws, and bank empanelment norms deeply, preventing late-stage regulatory bottlenecks.'
      },
      {
        heading: '2. Transparency on Carpet Area & Plot Release Orders',
        subHeading: 'Clear Specification Disclosures',
        body: 'Reliable builders provide clear Phase-wise Release Orders for plots and RERA carpet-area disclosures for apartments without hidden escalation clauses.'
      }
    ],
    factsAndSources: [
      {
        stat: 'CREDAI + Karnataka RERA',
        context: 'Core industry and statutory accountability benchmarks in Bengaluru.',
        source: 'Karnataka RERA Portal'
      }
    ],
    expertCommentary:
      'Spend one weekend touring two completed projects of any developer before paying a booking token.',
    faqs: [
      {
        question: 'Does CREDAI membership ensure extra accountability?',
        answer: 'Yes. CREDAI Bengaluru members commit to ethical disclosure norms and structured buyer grievance resolution.'
      }
    ],
    relatedArticleIds: ['art-evaluate-developer', 'art-bangalore-market-trends'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-bangalore-market-trends',
    slug: 'bangalore-real-estate-market-trends',
    seoTitle: 'Bangalore Real Estate Market Trends & Growth Corridors | ICONHOMZ Blog',
    metaDescription:
      'Key demand drivers shaping Bangalore real estate in 2026: Namma Metro expansion, gated villa plot scarcity, and East & South Bengaluru end-user demand.',
    title: 'Bangalore Real Estate Market Trends: End-User Demand & Infrastructure',
    category: 'Real Estate',
    routeCategoryPath: '/blogs/real-estate/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 19, 2026 · Research Desk',
    readTime: '6 min read',
    author: 'ICONHOMZ Research Desk',
    authorRole: 'Market Intelligence',
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'Bengaluru residential skyline and planned neighborhoods',
    answerFirstSummary:
      'Bengaluru housing demand remains overwhelmingly end-user driven, anchored by global GCC office hiring, Namma Metro Phase 2 connectivity along Hosur Road and Whitefield, and tight supply of BDA-approved gated villa plots inside established school belts.',
    keyTakeaways: [
      'Metro corridor stations boost demand around Bommasandra, Electronic City, and Whitefield.',
      'Large integrated plotted layouts inside BDA limits command strong long-term scarcity value.',
      'Space-efficient 2 & 3 BHK layouts lead mid-segment apartment absorption.'
    ],
    sections: [
      {
        heading: '1. Metro & Arterial Connectivity Shifts',
        subHeading: 'Commute Compression Across Corridors',
        body: 'As Namma Metro connects Bommasandra and Electronic City directly toward Central Silk Board and Whitefield links ITPL to core hubs, transit-accessible micro-markets continue to outperform isolated outskirts.'
      },
      {
        heading: '2. Shift Toward Low-Density Masterplanned Communities',
        subHeading: 'Open Spaces & Clubhouse Infrastructure',
        body: 'Post-hybrid work buyers increasingly seek masterplanned enclaves offering walkable green parks, reliable utilities, and spacious rooms.'
      }
    ],
    factsAndSources: [
      {
        stat: 'End-User Driven Absorption',
        context: 'IT & GCC workforce households drive primary residential demand in East and South Bengaluru.',
        source: 'Bengaluru Housing Market Research'
      }
    ],
    expertCommentary:
      'Focus on established residential corridors with functioning schools, hospitals, and multi-road access rather than single-road speculative pockets.',
    faqs: [
      {
        question: 'Which property formats lead Bangalore end-user interest?',
        answer: 'BDA-approved villa plots and well-ventilated 2 & 3 BHK Fluid Home apartments in employment-linked corridors.'
      }
    ],
    relatedArticleIds: ['art-plots-vs-apartments', 'art-bommasandra-gunjur-corridors'],
    relatedProjectId: 'icon-micasa'
  },
  {
    id: 'art-villa-plot-investment-bangalore',
    slug: 'is-investing-in-villa-plots-in-bangalore-good-decision',
    seoTitle: 'Is Investing in Villa Plots in Bangalore a Good Decision? | ICONHOMZ Blog',
    metaDescription:
      'Understand why BDA and RERA-approved villa plots in gated Bangalore enclaves build resilient long-term wealth without structural depreciation.',
    title: 'Is Investing in Villa Plots in Bangalore a Good Decision?',
    category: 'Property Investment',
    routeCategoryPath: '/blogs/property-investment/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 18, 2026 · Investment Advisory',
    readTime: '5 min read',
    author: 'ICONHOMZ Research Desk',
    authorRole: 'Investment Advisory',
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'Gated villa plots layout in Bangalore',
    answerFirstSummary:
      'Yes—acquiring a BDA or RERA-approved gated villa plot in an established East or South Bangalore corridor is one of the most resilient real estate strategies because land does not depreciate, carries minimal annual upkeep, and lets families build a bespoke villa at their preferred pace.',
    keyTakeaways: [
      'Scarcity of contiguous 30–50 acre BDA-approved residential land protects downside value.',
      'Underground utilities, wide blacktop roads, and clubhouses transform raw land into ready neighborhoods.',
      'Custom construction flexibility suits multi-generational family planning.'
    ],
    sections: [
      {
        heading: '1. Pure Land Equity Without Structural Aging',
        subHeading: 'Long-Term Capital Preservation',
        body: 'Unlike concrete structures that age over 15–20 years, underlying residential land inside sanctioned gated developments captures full neighborhood infrastructure appreciation.'
      },
      {
        heading: '2. Bank Financeability Drives Resale Liquidity',
        subHeading: 'Clean Title Equals Faster Exit Options',
        body: 'BDA-approved plots with PSU & private bank empanelment attract end-user villa builders readily, sustaining strong secondary market liquidity.'
      }
    ],
    factsAndSources: [
      {
        stat: '1,200 – 2,400 Sq. Ft.',
        context: 'Most liquid residential plot sizes across East & South Bengaluru.',
        source: 'ICONHOMZ Buyer Demand Analysis'
      }
    ],
    expertCommentary:
      'Prioritize gated layouts backed by clear title chains, BDA/RERA numbers, and bank approvals over fragmented unapproved revenue parcels.',
    faqs: [
      {
        question: 'When can I start building a house on an ICONHOMZ plot?',
        answer: 'Once phase registration and release orders are completed, owners can obtain building plan sanction and construct as per community design guidelines.'
      }
    ],
    relatedArticleIds: ['art-plots-vs-apartments', 'art-property-appreciation-factors'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-property-appreciation-factors',
    slug: 'factors-that-influence-property-appreciation-bangalore',
    seoTitle: 'Factors That Influence Property Appreciation in Bangalore | ICONHOMZ Blog',
    metaDescription:
      'Analyze the 5 primary drivers behind residential land and apartment appreciation in Bengaluru: jobs, metro rail, schools, approval clarity, and supply scarcity.',
    title: '5 Factors That Influence Property Appreciation in Bangalore',
    category: 'Property Investment',
    routeCategoryPath: '/blogs/property-investment/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 17, 2026 · Research Desk',
    readTime: '6 min read',
    author: 'ICONHOMZ Research Desk',
    authorRole: 'Corridor Valuation',
    image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
    imageAlt: 'High-growth residential avenues in Bangalore',
    answerFirstSummary:
      'Residential appreciation in Bangalore tracks five measurable catalysts: proximity to active IT/GCC employment clusters, Namma Metro and arterial road connectivity, established K–12 school zones, clear BDA/RERA title status, and gated community scale.',
    keyTakeaways: [
      'School belts (such as Greenwood High in Gunjur) create permanent family housing demand.',
      'Dual-corridor access (linking Whitefield and Sarjapur/ORR) insulates neighborhoods from single-hub risk.',
      'Clear A-Khata / BDA documentation unlocks institutional homebuyer financing.'
    ],
    sections: [
      {
        heading: '1. Social Infrastructure & Daily Convenience',
        subHeading: 'Schools, Hospitals & Neighbourhood Retail',
        body: 'Micro-markets anchored by functioning schools, multi-specialty hospitals, and daily retail draw genuine owner-occupiers—supporting steadier long-term pricing than investor-only suburbs.'
      },
      {
        heading: '2. Statutory Clarity Over Raw Distance',
        subHeading: 'Why BDA/RERA Parcels Outperform',
        body: 'Properties with unambiguous approvals consistently command a valuation premium over unapproved layouts even within the same postal code.'
      }
    ],
    factsAndSources: [
      {
        stat: '5 Core Valuation Drivers',
        context: 'Employment density, Metro links, schools, clear title, and community scale.',
        source: 'ICONHOMZ Advisory Matrix'
      }
    ],
    expertCommentary:
      'Always evaluate appreciation alongside rental demand and end-user livability over a 7–10 year horizon.',
    faqs: [
      {
        question: 'Does Metro connectivity impact both apartments and villa plots?',
        answer: 'Yes—both apartment rental yields and nearby plotted land values benefit once rapid rail stations enter service.'
      }
    ],
    relatedArticleIds: ['art-villa-plot-investment-bangalore', 'art-bommasandra-gunjur-corridors'],
    relatedProjectId: 'grand-icon-3'
  },
  {
    id: 'art-home-loan-vs-plot-loan',
    slug: 'home-loan-vs-plot-loan-key-differences',
    seoTitle: 'Home Loan vs Plot Loan in Bangalore: Key Differences | ICONHOMZ Blog',
    metaDescription:
      'Compare LTV ratios, interest rates, tax benefits, and bank eligibility between residential home loans and villa plot loans in India.',
    title: 'Home Loan vs Plot Loan: Key Differences Every Buyer Must Know',
    category: 'Property Investment',
    routeCategoryPath: '/blogs/property-investment/',
    publishedDate: 'October 2026',
    updatedDate: 'Updated November 16, 2026 · Banking Advisory',
    readTime: '5 min read',
    author: 'ICONHOMZ Finance Desk',
    authorRole: 'Banking & Home Loan Advisory',
    image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
    imageAlt: 'Home loan and residential plot financing advisory in Bangalore',
    answerFirstSummary:
      'Home loans fund completed or under-construction apartments and villas up to 75–90% Loan-to-Value (LTV) with immediate Section 24(b)/80C tax deductions, whereas standalone plot loans typically finance 70–75% of registered land value within city/planning limits and qualify for tax benefits only once construction finishes.',
    keyTakeaways: [
      'Home loans cover apartments, ready houses, or composite plot + construction sanctions.',
      'Banks require BDA, BMRDA, or RERA-approved gated layouts for residential plot financing.',
      'ICONHOMZ projects carry approvals across SBI, HDFC, ICICI, Axis, Kotak & LIC Housing.'
    ],
    sections: [
      {
        heading: '1. Loan-to-Value (LTV) & Down Payment Structure',
        subHeading: 'Planning Upfront Cashflow Accurately',
        body: 'For apartments such as ICON MICASA, buyers generally budget 20–25% own contribution plus stamp duty and registration. For villa plots like IVY COUNTY, plan 25–30% margin plus registration unless pairing with a composite construction loan.'
      },
      {
        heading: '2. Tax Treatment Differences',
        subHeading: 'Plot Only vs. Home Construction',
        body: 'Pure land purchases do not qualify for interest tax deductions until a dwelling is constructed and completion certificate is obtained.'
      }
    ],
    factsAndSources: [
      {
        stat: '6+ Empanelled Banks',
        context: 'SBI, HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra & LIC Housing Finance.',
        source: 'ICONHOMZ Banking Desk'
      }
    ],
    comparisonTable: {
      caption: 'Home Loan vs. Plot Loan Snapshot',
      headers: ['Feature', 'Residential Home Loan', 'Residential Plot Loan'],
      rows: [
        ['Typical LTV', 'Up to 75% – 85%', 'Up to 70% – 75%'],
        ['Eligible Property', 'Flats, villas & under-construction homes', 'BDA/BMRDA/RERA approved residential plots'],
        ['Tax Deduction', 'Available post-possession (Sec 24b/80C)', 'Eligible only after house construction']
      ]
    },
    expertCommentary:
      'Obtain an upfront bank APF / legal pre-check letter from our finance desk before paying registration stamp duty.',
    faqs: [
      {
        question: 'Can NRI buyers avail plot loans and home loans in Bangalore?',
        answer: 'Yes. Leading Indian banks extend both NRI home loans and approved-layout plot loans subject to income verification.'
      }
    ],
    relatedArticleIds: ['art-finance-villa-plot', 'art-plots-vs-apartments'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-finance-villa-plot',
    slug: 'how-to-finance-a-villa-plot-purchase-bangalore',
    seoTitle: 'How to Finance a Villa Plot Purchase in Bangalore | ICONHOMZ Blog',
    metaDescription:
      'Step-by-step financing guide for purchasing a BDA or RERA-approved villa plot in Bangalore including bank APF, margin money, and composite construction loans.',
    title: 'How to Finance a Villa Plot Purchase: Step-by-Step Banking Guide',
    category: 'Property Investment',
    routeCategoryPath: '/blogs/property-investment/',
    publishedDate: 'October 2026',
    updatedDate: 'Updated November 15, 2026 · Banking Advisory',
    readTime: '5 min read',
    author: 'ICONHOMZ Finance Desk',
    authorRole: 'Banking & Home Loan Advisory',
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'Villa plot banking and APF approval guide',
    answerFirstSummary:
      'To finance a villa plot smoothly, confirm the layout holds bank APF (Approved Project Finance) from PSU or private lenders, verify 70–75% LTV sanction eligibility against your income profile, keep 25–30% margin plus Karnataka stamp duty liquid, or choose a composite plot-plus-construction loan if building within 2–3 years.',
    keyTakeaways: [
      'APF-empanelled developments accelerate legal clearance from weeks down to days.',
      'Keep stamp duty, registration charges (~6.6% total), and margin liquidity ready before Sale Deed.',
      'Composite loans lock both land and villa construction disbursement under one sanction.'
    ],
    sections: [
      {
        heading: '1. Why Bank APF Status Matters',
        subHeading: 'Pre-Vetted Title Saves Time',
        body: 'When banks such as SBI or HDFC issue an APF number for a project, their panel advocates have already verified the 30-year title chain and RERA layout sanctions.'
      },
      {
        heading: '2. Standalone Plot vs. Plot + Construction Loan',
        subHeading: 'Matching Your Construction Timeline',
        body: 'If you plan to build immediately, a composite sanction lets you draw land disbursement first and subsequent construction tranches as slabs progress.'
      }
    ],
    factsAndSources: [
      {
        stat: 'Pre-Approved Legal Files',
        context: 'Ready legal document dossiers streamline sanction turnaround across major banks.',
        source: 'ICONHOMZ Home Finance Desk'
      }
    ],
    expertCommentary:
      'Compare processing fees, prepayment rules, and repo-linked floating rate spreads across at least two banks before signing your sanction letter.',
    faqs: [
      {
        question: 'Does ICONHOMZ assist with bank loan paperwork?',
        answer: 'Yes. Dedicated banking relationship coordinators from partner banks assist buyers directly from our HSR Layout office and project sites.'
      }
    ],
    relatedArticleIds: ['art-home-loan-vs-plot-loan', 'art-bda-bmrda-approvals'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-complete-guide-buying-plot',
    slug: 'complete-guide-to-buying-a-plot-in-bangalore',
    seoTitle: 'Complete Guide to Buying a Plot in Bangalore | ICONHOMZ Blog',
    metaDescription:
      'End-to-end roadmap to buying a residential plot in Bangalore: corridor selection, BDA/RERA checks, legal audit, bank loan, and Sale Deed registration.',
    title: 'Complete Guide to Buying a Residential Plot in Bangalore',
    category: 'Home Buying Guides',
    routeCategoryPath: '/blogs/home-buying-guides/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 18, 2026 · Legal & Buyer Desk',
    readTime: '7 min read',
    author: 'ICONHOMZ Legal & Compliance Team',
    authorRole: 'Title & Statutory Advisory',
    image: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
    imageAlt: 'Step-by-step plot buying roadmap in Bangalore',
    answerFirstSummary:
      'Follow a disciplined 6-step process when buying a plot in Bangalore: shortlist an infrastructure-backed corridor, confirm BDA/BMRDA and RERA approvals, obtain an independent 30-year title opinion, verify physical site boundaries and underground utilities, finalize bank sanction, and register the Sale Deed with e-Khata mutation.',
    keyTakeaways: [
      'Inspect actual physical approach roads, stormwater drains, and boundary pegs on site.',
      'Always register via e-Aasthi / Kaveri 2.0 at full disclosed consideration.',
      'Complete Khata transfer immediately after registration.'
    ],
    sections: [
      {
        heading: '1. Site Inspection Beyond Paper Brochures',
        subHeading: 'Approach Road Width & Topography',
        body: 'Verify whether the approach road connecting the main arterial highway to the gated enclave is public and clear, and check rainwater slope management.'
      },
      {
        heading: '2. Registration & Post-Sale Mutation',
        subHeading: 'Securing Individual Title Records',
        body: 'Post-registration, apply promptly for updated Encumbrance Certificate reflection and individual plot Khata mutation.'
      }
    ],
    factsAndSources: [
      {
        stat: '6-Stage Due Diligence',
        context: 'Location -> Sanction -> Legal -> Bank APF -> Registration -> Khata.',
        source: 'ICONHOMZ Homebuyer Handbook'
      }
    ],
    expertCommentary:
      'Buying inside an organized gated community saves years of post-purchase utility coordination for BESCOM power, water lines, and security.',
    faqs: [
      {
        question: 'How long does Bangalore plot registration take?',
        answer: 'Once legal audit and bank DD/RTGS readiness are complete, Sale Deed execution at the Sub-Registrar office via Kaveri 2.0 takes one scheduled appointment day.'
      }
    ],
    relatedArticleIds: ['art-bda-bmrda-approvals', 'art-bda-documents-checklist'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-bda-documents-checklist',
    slug: 'documents-to-verify-before-buying-bda-approved-plot',
    seoTitle: 'Documents to Verify Before Buying a BDA Approved Plot | ICONHOMZ Blog',
    metaDescription:
      'Exact document checklist before purchasing a BDA-approved plot in Bangalore: Layout Sanction Plan, Release Order, DC Conversion, Mother Deed, EC, and RERA certificate.',
    title: 'Documents to Verify Before Buying a BDA Approved Plot',
    category: 'Home Buying Guides',
    routeCategoryPath: '/blogs/home-buying-guides/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 17, 2026 · Legal Team Reviewed',
    readTime: '6 min read',
    author: 'ICONHOMZ Legal & Compliance Team',
    authorRole: 'Title & Statutory Advisory',
    image: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
    imageAlt: 'BDA approved layout legal document verification checklist',
    answerFirstSummary:
      'Before signing an Agreement of Sale for a BDA-approved plot, collect copies of eight essential documents: BDA Layout Sanction Plan & Work Order, BDA Site Release Order covering your plot number, DC Residential Conversion Order, Karnataka RERA Certificate, 30-year Mother Deed chain, latest Encumbrance Certificate (EC), Family Tree / Nil-Litigation confirmation, and Khata extract.',
    keyTakeaways: [
      'Confirm your exact plot number appears on the issued BDA Release Order.',
      'Cross-verify RERA registration validity directly on rera.karnataka.gov.in.',
      'Verify zero pending mortgages on unsold/released inventory.'
    ],
    sections: [
      {
        heading: '1. Layout Sanction vs. Site Release Order',
        subHeading: 'Understanding Why Both Matter',
        body: 'A BDA Layout Sanction approves the overall masterplan, while the BDA Release Order authorizes individual sites for sale once civic roads, drainage, and park handovers meet inspection milestones.'
      },
      {
        heading: '2. Mother Deed & PTCL / Revenue Clearances',
        subHeading: 'Unbroken 30-Year Title Verification',
        body: 'Your advocate should trace land ownership continuously back 30+ years alongside RTC/Pahani extracts and DC conversion records.'
      }
    ],
    factsAndSources: [
      {
        stat: '8 Statutory Records',
        context: 'Essential legal checklist recommended prior to earnest money commitment.',
        source: 'Karnataka Real Estate Legal Practice'
      }
    ],
    expertCommentary:
      'Transparent developers share full digital legal sets upfront so your personal property lawyer can verify everything comfortably.',
    faqs: [
      {
        question: 'Can I inspect IVY COUNTY statutory approvals before booking?',
        answer: 'Yes. Full BDA, RERA, and legal title documentation is available for review through our HSR Layout advisory desk.'
      }
    ],
    relatedArticleIds: ['art-bda-bmrda-approvals', 'art-what-buyers-should-know'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-what-buyers-should-know',
    slug: 'what-buyers-should-know-before-booking-residential-property',
    seoTitle: 'What Buyers Should Know Before Booking a Property | ICONHOMZ Blog',
    metaDescription:
      'Practical pre-booking checklist covering total landed cost sheets, cancellation clauses, RERA possession timelines, and maintenance handover.',
    title: 'What Buyers Should Know Before Booking a Residential Property',
    category: 'Home Buying Guides',
    routeCategoryPath: '/blogs/home-buying-guides/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 19, 2026 · Buyer Advisory',
    readTime: '5 min read',
    author: 'ICONHOMZ Advisory Editorial',
    authorRole: 'Buyer Governance Desk',
    image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
    imageAlt: 'Homebuyers reviewing residential property cost sheet in Bangalore',
    answerFirstSummary:
      'Always request an all-inclusive written cost sheet showing base rate, facing/corner premiums, clubhouse charges, GST (where applicable), BESCOM/water deposits, and stamp duty/registration—and confirm RERA registration plus Agreement of Sale payment milestones before issuing an allotment cheque.',
    keyTakeaways: [
      'Compare all-inclusive total landed price—not just advertised per sq. ft. base rates.',
      'Check RERA-compliant construction-linked vs. milestone payment schedules.',
      'Understand clear association handover & corpus fund terms.'
    ],
    sections: [
      {
        heading: '1. Reading the All-Inclusive Cost Sheet',
        subHeading: 'No Surprises at Registration',
        body: 'Ensure floor-rise, East/North facing or corner charges, GST (applicable to under-construction flats, exempt on pure land), and statutory registration costs are itemized cleanly.'
      },
      {
        heading: '2. Aligning Possession Dates with Family Plans',
        subHeading: 'Ongoing vs. Completed Selection',
        body: 'Review RERA completion dates realistically alongside children’s school academic calendars or lease expiry dates.'
      }
    ],
    factsAndSources: [
      {
        stat: 'All-Inclusive Cost Sheet',
        context: 'Itemized price transparency before booking allotment.',
        source: 'ICONHOMZ Buyer Charter'
      }
    ],
    expertCommentary:
      'Never sign a blank booking form; insist that the agreed unit number, dimension, and total schedule are printed clearly on the allotment sheet.',
    faqs: [
      {
        question: 'Is GST charged on residential villa plots?',
        answer: 'No. Under current Indian tax norms, sale of pure developed residential land is exempt from GST, unlike under-construction apartments.'
      }
    ],
    relatedArticleIds: ['art-evaluate-developer', 'art-bda-documents-checklist'],
    relatedProjectId: 'icon-micasa'
  },
  {
    id: 'art-best-plot-directions-vastu',
    slug: 'best-plot-directions-according-to-vastu',
    seoTitle: 'Best Plot Directions According to Vastu in Bangalore | ICONHOMZ Blog',
    metaDescription:
      'Compare North, East, West, and South-facing residential villa plots in Bangalore on daylighting, breeze, and architectural Vastu planning.',
    title: 'Best Plot Directions According to Vastu: North, East, West & South Compared',
    category: 'Vastu',
    routeCategoryPath: '/blogs/vastu/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 17, 2026 · Architecture Desk',
    readTime: '5 min read',
    author: 'ICONHOMZ Architecture Team',
    authorRole: 'Conscious Living Design',
    image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
    imageAlt: 'North and East facing residential plots architectural sunlight orientation',
    answerFirstSummary:
      'While North and East-facing residential plots are traditionally favored in Vastu for gentle morning sunlight and bright living entrances, well-proportioned West and South-facing gated plots also yield completely Vastu-compliant homes when main thresholds, open setbacks, and South-West master suites are oriented thoughtfully.',
    keyTakeaways: [
      'East-facing plots welcome direct morning sunlight across living foyers and sit-outs.',
      'North-facing plots stay cool year-round with consistent glare-free northern daylight.',
      'Proper North-East open setbacks keep every plot direction airy and well balanced.'
    ],
    sections: [
      {
        heading: '1. Morning Sun vs. Afternoon Heat Control',
        subHeading: 'Passive Comfort in Bengaluru Weather',
        body: 'Orienting generous living windows toward North and East maximizes gentle morning sun while using shaded utility zones or deep balconies along the West to block late-afternoon glare.'
      },
      {
        heading: '2. Corner & Park-Facing Multi-Aspect Plots',
        subHeading: 'Dual-Road Cross Ventilation Advantage',
        body: 'Corner plots offer dual road frontage, allowing architects greater freedom to situate driveways, main doors, and landscaped courtyards.'
      }
    ],
    factsAndSources: [
      {
        stat: 'All 4 Orthogonal Facings',
        context: 'Gated grid blocks offer North, East, West, South & corner plot inventories.',
        source: 'ICONHOMZ Masterplan Engineering'
      }
    ],
    expertCommentary:
      'Evaluate park proximity, cul-de-sac quietness, and neighboring setback space alongside road direction when picking your final plot number.',
    faqs: [
      {
        question: 'Can a West or South-facing plot still have an East or North entrance door?',
        answer: 'Yes. Through an L-shaped foyer verandah or side setback entry inside a spacious gated plot, architects can cleanly position the main door toward North or East.'
      }
    ],
    relatedArticleIds: ['art-vastu-residential-plot', 'art-complete-guide-buying-plot'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-gunjur-vs-varthur',
    slug: 'gunjur-vs-varthur-bangalore-location-comparison',
    seoTitle: 'Gunjur vs Varthur: Which Location Should You Choose? | ICONHOMZ Blog',
    metaDescription:
      'Compare Gunjur and Varthur in East Bangalore across school proximity, road bottlenecks, villa plot options, and Sarjapur–Whitefield commute times.',
    title: 'Gunjur vs Varthur: Which East Bangalore Corridor Should You Choose?',
    category: 'Bangalore Real Estate',
    routeCategoryPath: '/blogs/bangalore-real-estate/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 18, 2026 · Corridor Team',
    readTime: '5 min read',
    author: 'ICONHOMZ Urban Strategy',
    authorRole: 'Corridor Research',
    image: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
    imageAlt: 'Gunjur and Varthur East Bangalore residential corridor map',
    answerFirstSummary:
      'Choose Gunjur if you prioritize serene low-density residential enclaves right beside Greenwood High and direct shortcuts toward Sarjapur Road & Bellandur ORR; choose Varthur Kodi hubs if immediate proximity to Whitefield ITPL Main Road and hospital clusters outweighs congestion near Varthur junction.',
    keyTakeaways: [
      'Gunjur sits peacefully tucked off the Varthur–Sarjapur stretch behind major international schools.',
      'Large BDA-approved layouts like IVY COUNTY give Gunjur a cohesive gated neighborhood masterplan.',
      'Both belts enjoy dual workplace access toward Whitefield and Outer Ring Road.'
    ],
    sections: [
      {
        heading: '1. Daily School & Office Commute Flow',
        subHeading: 'Avoiding Choke Points',
        body: 'Because Gunjur sits between Varthur and Sarjapur Road, families avoid crossing dense junction traffic for top schools while staying 10–15 minutes from Whitefield ITPL and Bellandur.'
      },
      {
        heading: '2. Contiguous Land Availability',
        subHeading: 'Large Masterplanned Layouts vs. Infill Plots',
        body: 'Gunjur still permits 50-acre integrated BDA villa-plot townships with dedicated parks and clubhouses—rare inside heavily built-up Varthur pockets.'
      }
    ],
    factsAndSources: [
      {
        stat: 'Greenwood High Adjacent',
        context: 'Landmark educational anchor inside the Gunjur residential micro-market.',
        source: 'East Bengaluru Corridor Audit'
      }
    ],
    expertCommentary:
      'Test-drive the morning 8:30 AM route between your children’s school, office hub, and shortlisted layout before finalizing.',
    faqs: [
      {
        question: 'Where is IVY COUNTY located relative to Gunjur and Varthur?',
        answer: 'IVY COUNTY sits right behind Greenwood High International School off Gunjur, linking effortlessly toward both Varthur–Whitefield and Sarjapur Road.'
      }
    ],
    relatedArticleIds: ['art-bommasandra-gunjur-corridors', 'art-sarjapur-road-investment-guide'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-sarjapur-road-investment-guide',
    slug: 'sarjapur-road-real-estate-investment-guide',
    seoTitle: 'Sarjapur Road Real Estate Investment Guide | ICONHOMZ Blog',
    metaDescription:
      'Explore residential apartments, villa enclaves, tech parks (Wipro SEZ, RGA Tech Park), and long-term appreciation drivers along Sarjapur Road, Bangalore.',
    title: 'Sarjapur Road Real Estate Investment Guide: Corridors & Living Options',
    category: 'Bangalore Real Estate',
    routeCategoryPath: '/blogs/bangalore-real-estate/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 17, 2026 · Corridor Research',
    readTime: '6 min read',
    author: 'ICONHOMZ Urban Strategy',
    authorRole: 'Corridor Research',
    image: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
    imageAlt: 'Sarjapur Road residential apartment and villa communities in Bangalore',
    answerFirstSummary:
      'Sarjapur Road remains one of Bengaluru’s strongest self-sustaining residential belts thanks to Wipro SEZ, RGA Tech Park, direct links to Bellandur ORR and HSR Layout, dense international schools, and thriving social retail—supporting steady rental demand for apartments and enduring resale depth for gated villas.',
    keyTakeaways: [
      'Employment anchors along Sarjapur–Bellandur ORR sustain year-round apartment occupancy.',
      'ICONHOMZ’s delivered communities ICON SANCTUARY, ICONEST 5 & ICONEST 4 validate execution across Sarjapur–Harlur.',
      'Adjacent Gunjur–Sarjapur extension hubs capture expanding plotted villa demand.'
    ],
    sections: [
      {
        heading: '1. Established Workforce & Rental Stability',
        subHeading: 'HSR Layout to Wipro SEZ Stretch',
        body: 'From Harlur and Kasavanahalli near HSR Layout out toward Kodathi and Dommasandra, Sarjapur Road pairs walk-to-school convenience with major corporate campuses.'
      },
      {
        heading: '2. Apartment vs. Plot Entry Points',
        subHeading: 'Matching Budget to Corridor Sub-Zone',
        body: 'Buyers seeking compact Fluid Home apartments favor Harlur–Sarjapur proximity, while families wanting custom 30×40 or 40×60 villas step just north into Gunjur.'
      }
    ],
    factsAndSources: [
      {
        stat: '3+ ICONHOMZ Communities',
        context: 'Delivered & ongoing presence across Sarjapur Road, Harlur & adjoining Gunjur.',
        source: 'ICONHOMZ Portfolio Registry'
      }
    ],
    expertCommentary:
      'Evaluate internal neighborhood quietness just 500m–1.5km off Sarjapur Main Road to enjoy peaceful residential living with main-road access.',
    faqs: [
      {
        question: 'Which ICONHOMZ projects serve Sarjapur Road buyers?',
        answer: 'Explore ICONEST 4 & completed enclaves ICON SANCTUARY / ICONEST 5 along Sarjapur–Harlur, or IVY COUNTY off nearby Gunjur.'
      }
    ],
    relatedArticleIds: ['art-gunjur-vs-varthur', 'art-whitefield-connectivity-guide'],
    relatedProjectId: 'icon-sanctuary'
  },
  {
    id: 'art-whitefield-connectivity-guide',
    slug: 'whitefield-property-market-and-connectivity-guide',
    seoTitle: 'Whitefield Property Market & Connectivity Guide | ICONHOMZ Blog',
    metaDescription:
      'How Purple Line Namma Metro, ITPL employment, and nearby Varthur–Gunjur plotted enclaves drive Whitefield residential real estate demand.',
    title: 'Whitefield Property Market & Connectivity Guide for Families',
    category: 'Bangalore Real Estate',
    routeCategoryPath: '/blogs/bangalore-real-estate/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 16, 2026 · Corridor Team',
    readTime: '5 min read',
    author: 'ICONHOMZ Urban Strategy',
    authorRole: 'Corridor Research',
    image: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
    imageAlt: 'Whitefield East Bangalore residential connectivity and metro network',
    answerFirstSummary:
      'Namma Metro’s Purple Line across Whitefield and ITPL has dramatically improved cross-city commuting, pushing prime Whitefield land prices higher and prompting families who work in Whitefield to favor peaceful BDA-approved plotted enclaves 10–15 minutes south along the Gunjur–Varthur belt.',
    keyTakeaways: [
      'Purple Line Metro links Whitefield ITPL directly to Indiranagar, MG Road, and Majestic.',
      'High-density apartment towers inside Whitefield increase appeal of serene 50-acre villa plots in nearby Gunjur.',
      'Major hospitals, malls, and schools create complete lifestyle self-sufficiency.'
    ],
    sections: [
      {
        heading: '1. Metro Relief & Peripheral Expansion',
        subHeading: 'Spillover Toward Gunjur–Varthur',
        body: 'Because core Whitefield offers few fresh 50-acre BDA land parcels, families working in ITPL increasingly select spacious gated plot communities along Gunjur for larger homes and greenery.'
      },
      {
        heading: '2. Dual IT Corridor Flexibility',
        subHeading: 'Whitefield + Outer Ring Road',
        body: 'Living slightly south of Whitefield keeps households flexible if one spouse works in ITPL and the other commutes to Bellandur or Ecospace.'
      }
    ],
    factsAndSources: [
      {
        stat: 'Purple Line Metro Live',
        context: 'Direct rapid transit connecting Whitefield ITPL with central Bengaluru.',
        source: 'BMRCL Operational Network'
      }
    ],
    expertCommentary:
      'For Whitefield professionals seeking custom villa plots, adjacent Gunjur combines quieter residential avenues with fast commutes.',
    faqs: [
      {
        question: 'How far is Gunjur from Whitefield ITPL?',
        answer: 'Approximately 10 to 15 minutes via Varthur Kodi under regular traffic.'
      }
    ],
    relatedArticleIds: ['art-gunjur-vs-varthur', 'art-bommasandra-gunjur-corridors'],
    relatedProjectId: 'ivy-county'
  },
  {
    id: 'art-why-clubhouse-amenities-matter',
    slug: 'why-are-clubhouse-amenities-important-in-gated-communities',
    seoTitle: 'Why Clubhouse Amenities Are Important in Gated Communities | ICONHOMZ Blog',
    metaDescription:
      'How wellness zones, co-working lounges, sports courts, and community halls in residential clubhouses elevate family health and long-term property value.',
    title: 'Why Are Clubhouse Amenities Important in Modern Residential Enclaves?',
    category: 'Lifestyle',
    routeCategoryPath: '/blogs/lifestyle/',
    publishedDate: 'November 2026',
    updatedDate: 'Updated November 18, 2026 · Lifestyle Research',
    readTime: '5 min read',
    author: 'ICONHOMZ Community Experience',
    authorRole: 'Resident Lifestyle Research',
    image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
    imageAlt: 'Modern gated community clubhouse wellness and lounge spaces',
    answerFirstSummary:
      'A well-planned clubhouse transforms a cluster of plots or apartments into a cohesive daily neighborhood—delivering fitness centers, swimming pools, indoor games, co-working spaces, and multipurpose halls steps from your front door while boosting long-term resale appeal.',
    keyTakeaways: [
      'Saves external gym, club membership, and commute time for busy working families.',
      'Encourages multi-generational wellness for children, remote professionals, and seniors.',
      'Well-maintained clubhouses consistently differentiate gated enclaves on resale.'
    ],
    sections: [
      {
        heading: '1. Wellness & Fitness Built Into Daily Routine',
        subHeading: 'Consistency Over Distant Memberships',
        body: 'When a walking track, badminton court, and gym sit 2 minutes away inside the gated perimeter, families exercise significantly more regularly.'
      },
      {
        heading: '2. Community Bonding & Milestone Celebrations',
        subHeading: 'Shared Social Infrastructure',
        body: 'Dedicated banquet halls and landscaped lawns allow neighbors to celebrate festivals and milestones warmly together.'
      }
    ],
    factsAndSources: [
      {
        stat: '50,000 Sq. Ft. Flagship Club',
        context: 'Large-scale social, fitness, and recreation hub designed at IVY COUNTY.',
        source: 'ICONHOMZ Masterplan Specifications'
      }
    ],
    expertCommentary:
      'Look for practical, maintainable amenities that families use daily—like walking parks, courts, fitness studios, and study lounges—rather than high-upkeep gimmicks.',
    faqs: [
      {
        question: 'Do villa plot buyers get full access to community clubhouses?',
        answer: 'Yes. Plotted developments like IVY COUNTY include full residents’ clubhouse and landscaped park access across all phases.'
      }
    ],
    relatedArticleIds: ['art-gated-community-lifestyle', 'art-villa-plot-investment-bangalore'],
    relatedProjectId: 'ivy-county'
  }
];

export const AEO_FAQS: FaqItem[] = [
  {
    id: 'faq-ceo',
    category: 'Developer Trust & Leadership',
    question: 'What makes ICONHOMZ one of the trusted real estate developers in Bangalore?',
    answer:
      'Operating under ICON Infra Shelters India Pvt. Ltd. and led by Co-Founder, Chairman & CEO Rajasekhar Gowrineni (active in Bengaluru real estate since 2001) alongside Co-Founder & COO Dr. P. Manmohan Reddy, ICONHOMZ is a CREDAI Bengaluru member specializing in BDA & RERA-compliant villa plots, Fluid Homes apartments, and independent gated villas.',
    relatedTarget: 'about',
    relatedLabel: 'Meet ICONHOMZ Leadership'
  },
  {
    id: 'faq-projects',
    category: 'Residential Portfolio',
    question: 'What residential projects does ICONHOMZ offer in Bangalore?',
    answer:
      'ICONHOMZ’s ongoing portfolio features IVY COUNTY (50-acre, ~658 BDA & RERA-approved villa plots off Gunjur), ICON MICASA (2 BHK Fluid Home apartments adjacent to HCL Campus, Bommasandra), ICON BY THE LAKE (4 BHK lakefront smart villas near Electronic City), GRAND ICON 3, and ICONEST 4, complemented by upcoming releases ICON LAURELS & ICON CENTRAL PARK and delivered enclaves ICON SANCTUARY, ICONEST 5, ICONEST 3 & GRAND ICON 2.',
    relatedTarget: 'projects',
    relatedLabel: 'Explore Residential Projects'
  },
  {
    id: 'faq-locations',
    category: 'Bengaluru Corridors',
    question: 'Where are ICONHOMZ projects located and which areas in East Bangalore suit investment?',
    answer:
      'ICONHOMZ communities are anchored across Gunjur (behind Greenwood High School), Varthur–Sarjapur Road (serving Whitefield ITPL, Wipro SEZ & Bellandur ORR), Bommasandra, and Electronic City (linked by Hosur Road and Namma Metro Yellow Line). Gunjur and Sarjapur Road remain prime East Bangalore corridors for plotted land and family apartments due to school clusters and dual IT hub access.',
    relatedTarget: 'projects',
    relatedLabel: 'Explore Location Directories'
  },
  {
    id: 'faq-villa-plots',
    category: 'Property Investment',
    question: 'What are the benefits of investing in villa plots in Bangalore?',
    answer:
      'BDA or RERA-approved villa plots inside gated enclaves such as IVY COUNTY offer direct land appreciation, lower recurring ownership costs compared to high-rise towers, generational title flexibility, and the freedom to construct a custom home on underground-serviced infrastructure with clubhouse amenities.',
    relatedTarget: 'insights',
    relatedLabel: 'Read Villa Plot Guide'
  },
  {
    id: 'faq-verify-plot',
    category: 'Buyer Due Diligence',
    question: 'What should I verify before purchasing a residential plot or apartment in Bangalore?',
    answer:
      'Always verify Karnataka RERA registration, BDA or BMRDA/BMRDA-LPA layout sanction, DC residential land conversion order, 30-year Encumbrance Certificate (EC) & Mother Deed chain, Final Release Order (for plotted phases), and individual A-Khata / e-Khata documentation before allotment.',
    relatedTarget: 'insights',
    relatedLabel: 'Read Approval Checklist'
  },
  {
    id: 'faq-fluid-homes',
    category: 'Conscious Living',
    question: 'What are Fluid Homes by ICONHOMZ and where is the corporate office located?',
    answer:
      'Fluid Homes are space-efficient, multi-functional residences pioneered across Iconest 3, 4, 5 & ICON MICASA to maximize usable carpet efficiency. Visit our corporate office at 47/9, Jai Plaza Symphony, 9th Main, 14th Cross, Sector 6, HSR Layout, Bengaluru – 560102.',
    relatedTarget: 'contact',
    relatedLabel: 'Visit or Contact HSR Office'
  }
];

export interface KeywordMappingRule {
  intentGroup: string;
  examples: string;
  targetPage: string;
  targetPath: string;
}

export const KEYWORD_TO_URL_MAP: KeywordMappingRule[] = [
  {
    intentGroup: 'Brand & Developer Trust',
    examples: 'ICONHOMZ, ICONHOMZ projects, Real estate developers in Bangalore',
    targetPage: 'Homepage',
    targetPath: '/'
  },
  {
    intentGroup: 'Commercial Intent',
    examples: 'Real estate builders in Bangalore, Conscious Living residences',
    targetPage: 'Homepage & About Us',
    targetPath: '/about-us/'
  },
  {
    intentGroup: 'Portfolio Status',
    examples: 'Residential projects in Bangalore, Ongoing / Completed projects',
    targetPage: 'Residential Portfolio',
    targetPath: '/residential/'
  },
  {
    intentGroup: 'Project Specific',
    examples: 'Ivy County Bangalore, ICON MICASA Bommasandra, ICON BY THE LAKE',
    targetPage: 'Individual Project Landing Pages',
    targetPath: '/projects/ivy-county-gunjur/'
  },
  {
    intentGroup: 'Property Type',
    examples: 'Villa plots in Bangalore, Fluid Home apartments, Gated villas',
    targetPage: 'Category Directories',
    targetPath: '/projects/villa-plots/'
  },
  {
    intentGroup: 'Location Intent',
    examples: 'Villa plots in Gunjur, Flats & villas on Sarjapur Road',
    targetPage: 'Location Guides',
    targetPath: '/projects/gunjur/'
  },
  {
    intentGroup: 'Investment & Educational',
    examples: 'Property investment in Bangalore, BDA vs BMRDA approvals',
    targetPage: 'ICONHOMZ Blog',
    targetPath: '/blogs/'
  },
  {
    intentGroup: 'Transactional',
    examples: 'Contact real estate developer Bangalore, Book site visit ICONHOMZ',
    targetPage: 'Contact Us',
    targetPath: '/contact-us/'
  }
];

export type GalleryCategoryFilter =
  | 'All Views'
  | 'Architecture & Masterplan'
  | 'Clubhouse & Landscape'
  | 'Living Spaces';

export interface ProjectGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategoryFilter, 'All Views'>;
  masonryAspect: string;
}

export function getProjectGalleryPhotos(project: IconhomzProject): ProjectGalleryPhoto[] {
  const isPlots = project.category === 'Villa Plots';
  const isVillas = project.category === 'Villas';

  if (isPlots) {
    return [
      {
        id: `${project.id}-gal-1`,
        src: project.image,
        alt: project.imageAlt,
        title: `${project.name} Aerial Masterplan & Plotted Enclave`,
        caption: `Masterplanned plotted streets, underground utility corridors, and avenue tree planting at ${project.name} in ${project.corridor}.`,
        category: 'Architecture & Masterplan',
        masonryAspect: 'aspect-[4/3]'
      },
      {
        id: `${project.id}-gal-2`,
        src: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
        alt: `${project.name} central clubhouse courtyard and leisure pavilion in ${project.corridor}, Bangalore`,
        title: 'Clubhouse Pavilion & Social Lounge',
        caption: `${project.amenities[0] || 'Residents Clubhouse'} designed for fitness, community gatherings, and weekend recreation.`,
        category: 'Clubhouse & Landscape',
        masonryAspect: 'aspect-[3/4]'
      },
      {
        id: `${project.id}-gal-3`,
        src: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
        alt: `Custom independent villa elevation inspired for ${project.name} gated plots in Bangalore`,
        title: 'Bespoke Villa Architectural Perspective',
        caption: `Indicative villa setback and contemporary elevation envelope suited for ${project.configurationSummary}.`,
        category: 'Living Spaces',
        masonryAspect: 'aspect-[5/4]'
      },
      {
        id: `${project.id}-gal-4`,
        src: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
        alt: `Tree-lined residential streetscape and gated security perimeter at ${project.name}`,
        title: 'Avenue Streetscape & Pedestrian Boulevards',
        caption: 'Wide blacktop internal roads with pedestrian walkways, LED streetlighting, and native green verges.',
        category: 'Architecture & Masterplan',
        masonryAspect: 'aspect-[4/5]'
      },
      {
        id: `${project.id}-gal-5`,
        src: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
        alt: `Landscaped wellness terrace and outdoor pergola seating at ${project.name}`,
        title: 'Landscaped Open Parks & Recreation Lawn',
        caption: 'Dedicated multi-park open greens and shaded pergolas distributed evenly across residential blocks.',
        category: 'Clubhouse & Landscape',
        masonryAspect: 'aspect-[16/10]'
      },
      {
        id: `${project.id}-gal-6`,
        src: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
        alt: `Daylit living and study room interior concept for custom villas at ${project.name}`,
        title: 'Daylit Indoor-Outdoor Living Concept',
        caption: 'Open-plan living inspiration aligned with East and North-facing Vastu orientations.',
        category: 'Living Spaces',
        masonryAspect: 'aspect-[4/3]'
      }
    ];
  }

  if (isVillas) {
    return [
      {
        id: `${project.id}-gal-1`,
        src: project.image,
        alt: project.imageAlt,
        title: `${project.name} Villa Architectural Facade`,
        caption: `Signature ${project.configurationSummary} elevation featuring deep overhangs and private landscaped setbacks in ${project.corridor}.`,
        category: 'Architecture & Masterplan',
        masonryAspect: 'aspect-[4/3]'
      },
      {
        id: `${project.id}-gal-2`,
        src: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
        alt: `Double-height living room and natural daylight interior at ${project.name} Bangalore villas`,
        title: 'Living Suite & Courtyard Daylight',
        caption: 'Cross-ventilated living and dining spaces opening onto private garden sit-outs.',
        category: 'Living Spaces',
        masonryAspect: 'aspect-[3/4]'
      },
      {
        id: `${project.id}-gal-3`,
        src: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
        alt: `${project.name} gated villa enclave clubhouse and evening poolside architecture`,
        title: 'Residents’ Clubhouse & Leisure Deck',
        caption: `${project.amenities[0] || 'Gated Villa Clubhouse'} curated exclusively for resident families.`,
        category: 'Clubhouse & Landscape',
        masonryAspect: 'aspect-[16/10]'
      },
      {
        id: `${project.id}-gal-4`,
        src: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
        alt: `Quiet internal villa avenue and landscaped entryway at ${project.name}`,
        title: 'Gated Villa Avenue & Streetscape',
        caption: 'Low-density residential streets with mature native tree canopy and 24/7 perimeter security.',
        category: 'Architecture & Masterplan',
        masonryAspect: 'aspect-[5/4]'
      },
      {
        id: `${project.id}-gal-5`,
        src: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
        alt: `Private garden pergola and terraced courtyard greenery at ${project.name}`,
        title: 'Terrace & Private Garden Setbacks',
        caption: 'Thoughtfully proportioned outdoor decks designed for multi-generational relaxation.',
        category: 'Clubhouse & Landscape',
        masonryAspect: 'aspect-[4/5]'
      },
      {
        id: `${project.id}-gal-6`,
        src: '/src/assets/images/ivy_county_villa_plots_1795082010981.jpg',
        alt: `Neighborhood green corridor and masterplan layout perspective of ${project.name}`,
        title: 'Masterplan Orientation & Green Envelope',
        caption: `${project.approvals} · Balanced plot coverage preserving open perimeter light and air.`,
        category: 'Architecture & Masterplan',
        masonryAspect: 'aspect-[4/3]'
      }
    ];
  }

  return [
    {
      id: `${project.id}-gal-1`,
      src: project.image,
      alt: project.imageAlt,
      title: `${project.name} Architectural Arrival & Facade`,
      caption: `Contemporary residential elevation at ${project.name} in ${project.corridor}, engineered for natural ventilation.`,
      category: 'Architecture & Masterplan',
      masonryAspect: 'aspect-[4/3]'
    },
    {
      id: `${project.id}-gal-2`,
      src: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
      alt: `${project.name} Fluid Homes space-efficient interior living and study layout`,
      title: 'Fluid Homes Convertible Living Interior',
      caption: 'Multi-functional living spaces designed to transition effortlessly from daytime workspace to family lounge.',
      category: 'Living Spaces',
      masonryAspect: 'aspect-[3/4]'
    },
    {
      id: `${project.id}-gal-3`,
      src: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
      alt: `${project.name} landscaped podium courtyard and residents recreational terrace`,
      title: 'Podium Courtyard & Landscaped Greens',
      caption: `${project.amenities[0] || 'Conscious Living Amenities'} anchored by shaded seating and outdoor fitness trails.`,
      category: 'Clubhouse & Landscape',
      masonryAspect: 'aspect-[5/4]'
    },
    {
      id: `${project.id}-gal-4`,
      src: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
      alt: `${project.name} evening clubhouse facade and community lounge lighting in Bangalore`,
      title: 'Community Clubhouse & Social Deck',
      caption: 'Dedicated indoor gym, social hall, and co-working lounge serving resident families.',
      category: 'Clubhouse & Landscape',
      masonryAspect: 'aspect-[16/10]'
    },
    {
      id: `${project.id}-gal-5`,
      src: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
      alt: `${project.name} balcony sit-out and green neighborhood views in ${project.corridor}`,
      title: 'Deep Balconies & Daylight Facade',
      caption: `${project.configurationSummary} crafted to maximize usable carpet area and solar shading.`,
      category: 'Living Spaces',
      masonryAspect: 'aspect-[4/5]'
    },
    {
      id: `${project.id}-gal-6`,
      src: '/src/assets/images/residence_solis_townhomes_1795081868697.jpg',
      alt: `${project.name} gated driveway and pedestrian-friendly site circulation in Bangalore`,
      title: 'Access-Controlled Arrival Driveway',
      caption: `${project.connectivity[0] || project.location} · Clean vehicular separation and covered stilt/basement bays.`,
      category: 'Architecture & Masterplan',
      masonryAspect: 'aspect-[4/3]'
    }
  ];
}

