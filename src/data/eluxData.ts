/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceId = 'kitchens' | 'bathrooms' | 'laundries' | 'joinery';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  typicalTimeline: string;
  startingGuide: string;
  featured?: boolean;
  inclusions: string[];
  craftsmanshipNote: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: Exclude<ServiceId, never>;
  categoryLabel: string;
  suburb: string;
  duration: string;
  year: string;
  image: string;
  imageAlt: string;
  summary: string;
  challenge: string;
  outcome: string;
  materials: {
    element: string;
    specification: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface ProcessStage {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverable: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  suburb: string;
  projectType: string;
  source: string;
  quote: string;
  outcome: string;
}

export const BUSINESS_INFO = {
  brandName: 'ELUX RENOVATIONS',
  legalName: 'Elux Renovations Pty Ltd',
  address: '5/8 Kerr Rd, Ingleburn NSW 2565',
  shortAddress: 'Ingleburn, NSW 2565',
  phoneDisplay: '+61 420 871 372',
  phoneHref: 'tel:+61420871372',
  email: 'admin@eluxrenovations.com.au',
  hours: 'Monday – Friday · 7:00 AM – 5:00 PM',
  saturdayNote: 'Saturday consultations by prior appointment',
  serviceRegions: [
    'Macarthur & Camden',
    'Greater Western Sydney',
    'Inner West & Eastern Suburbs',
    'Sutherland Shire & Hills District',
  ],
};

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_elux_kitchen_1794524439934.jpg',
  alt: 'Bespoke oak fluted island kitchen renovation with honed Taj Mahal quartzite benchtop by Elux Renovations Sydney',
};

export const TRUST_METRICS = [
  {
    value: '5.0 / 5.0',
    label: 'Verified Rating across Google & hipages',
  },
  {
    value: '7-Year',
    label: 'Structural & Waterproofing Workmanship Warranty',
  },
  {
    value: '4 – 6 Wks',
    label: 'Typical Kitchen or Bathroom Turnaround',
  },
  {
    value: '100% NSW',
    label: 'Licensed Builders, Plumbers & Electricians',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'kitchens',
    number: '01',
    title: 'Kitchen Renovations & Butler’s Pantries',
    subtitle: 'Architectural Joinery · Natural & Engineered Stone',
    summary:
      'Complete structural kitchen remodels combining CNC-precision cabinetry, natural quartzite or porcelain benchtops, integrated appliances, and seamless walk-in butler’s pantries.',
    image: '/src/assets/images/project_butlers_pantry_1794524440970.jpg',
    imageAlt: 'Custom alabaster shaker kitchen with arched walk-in butler pantry and veined stone island',
    typicalTimeline: '4 – 6 Weeks On-Site',
    startingGuide: 'From $28,000 AUD',
    featured: true,
    inclusions: [
      'On-site laser measure and 3D joinery elevation drawings',
      'Demolition, structural wall removal, and steel beam engineering if required',
      'Custom moisture-resistant cabinetry with Blum soft-close hardware',
      '20mm–40mm mitred stone, porcelain, or Taj Mahal quartzite benchtops',
      'Licensed plumbing, gas fitting, and 3-phase electrical rough-in',
      'Integrated rangehood ducting, task lighting, and splashback installation',
    ],
    craftsmanshipNote:
      'Every kitchen carcass is fabricated to exact room tolerances in our Ingleburn joinery workflow, eliminating filler strips and dead corner space.',
  },
  {
    id: 'bathrooms',
    number: '02',
    title: 'Bathroom & Ensuite Remodels',
    subtitle: 'Certified Waterproofing · Floor-to-Ceiling Tiling',
    summary:
      'Spa-calibrated wet areas built from bare studwork up—featuring AS 3740 compliant waterproofing, custom floating vanities, recessed niches, and architectural brassware.',
    image: '/src/assets/images/service_elux_bathroom_1794524440338.jpg',
    imageAlt: 'Luxury limestone tiled bathroom with custom fluted oak floating vanity and frameless glass shower',
    typicalTimeline: '3 – 4 Weeks On-Site',
    startingGuide: 'From $22,000 AUD',
    inclusions: [
      'Full strip-out to timber or masonry framing and subfloor levelling',
      'Certified AS 3740 dual-coat waterproofing with compliance certificate',
      'Concealed in-wall cisterns, linear floor wastes, and frameless glass screens',
      'Custom polyurethane or timber-veneer floating vanities',
      'Mitred porcelain tiling, heated towel rails, and underfloor heating options',
    ],
    craftsmanshipNote:
      'We flood-test and photograph every waterproofed membrane prior to screeding and tiling, issuing full NSW certification on handover.',
  },
  {
    id: 'laundries',
    number: '03',
    title: 'Laundries & Mudrooms',
    subtitle: 'Space-Efficient Utility · Concealed Storage',
    summary:
      'Hard-working utility rooms engineered for daily family flow—integrating stacked or front-load appliances, full-height broom towers, stone splashbacks, and ventilated hampers.',
    image: '/src/assets/images/service_elux_laundry_1794524440960.jpg',
    imageAlt: 'Custom warm taupe laundry and mudroom joinery with stone benchtop and concealed storage',
    typicalTimeline: '2 – 3 Weeks On-Site',
    startingGuide: 'From $12,500 AUD',
    inclusions: [
      'Ergonomic bench heights with concealed under-bench appliance housing',
      'Deep stainless or fireclay undermount laundry tubs with pull-out mixers',
      'Full-height linen, vacuum, and ironing station tallboys',
      'Ducted dryer ventilation and certified wet-area floor sealing',
      'Custom mudroom bench seating with coat hooks and shoe drawers',
    ],
    craftsmanshipNote:
      'Designed alongside your kitchen or independently, our laundries double usable storage capacity without enlarging the room footprint.',
  },
  {
    id: 'joinery',
    number: '04',
    title: 'Custom Joinery & Full Home',
    subtitle: 'Architectural Wardrobes · Media Walls · Whole-Home',
    summary:
      'Cohesive architectural cabinetry throughout the residence—floor-to-ceiling living room walls, walk-in robes, home offices, and coordinated multi-room renovations.',
    image: '/src/assets/images/project_custom_joinery_1794524441201.jpg',
    imageAlt: 'Floor-to-ceiling American oak custom joinery wall with recessed warm LED shelving and stone plinth',
    typicalTimeline: '3 – 8 Weeks (Scope Dependent)',
    startingGuide: 'Custom Quoted',
    inclusions: [
      'Architectural entertainment units with stone hearths and concealed cabling',
      'Walk-in and built-in wardrobes with integrated warm LED rail lighting',
      'Custom study desks, library shelving, and acoustic timber battens',
      'Single-point project coordination across multi-room home transformations',
    ],
    craftsmanshipNote:
      'Running one joinery team across kitchen, bath, laundry, and living zones guarantees identical timber grain matching and shadow-line detailing.',
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'camden-south-kitchen',
    title: 'Camden South French-Provincial Kitchen & Butler’s Pantry',
    category: 'kitchens',
    categoryLabel: 'Kitchens',
    suburb: 'Camden South, NSW',
    duration: '6 Weeks',
    year: '2026',
    image: '/src/assets/images/project_butlers_pantry_1794524440970.jpg',
    imageAlt: 'Camden South French-provincial kitchen with arched timber doorway into butler pantry',
    summary:
      'Simultaneous kitchen and walk-in butler’s pantry transformation replacing an enclosed 1990s galley layout with an arched architectural prep zone.',
    challenge:
      'The original U-shaped kitchen blocked backyard sightlines and lacked concealed appliance storage for a busy family of five.',
    outcome:
      'We opened the load-bearing nib wall, framed a solid oak archway into a dedicated scullery, and fabricated custom matte-alabaster shaker cabinetry paired with brushed brass hardware.',
    materials: [
      { element: 'Cabinetry', specification: '2-Pac Satin Alabaster Shaker · 22mm profiles' },
      { element: 'Island Stone', specification: '40mm Mitred Veined Quartzite Waterfall' },
      { element: 'Pantry Shelving', specification: 'Natural European Oak with integrated LEDs' },
      { element: 'Hardware', specification: 'Brushed Aged Brass cup pulls & rangehood shroud' },
    ],
    metrics: [
      { label: 'On-Site Build', value: '6 Weeks' },
      { label: 'Storage Gain', value: '+65%' },
      { label: 'Warranty', value: '7 Years' },
    ],
  },
  {
    id: 'oran-park-fluted-kitchen',
    title: 'Oran Park Fluted Oak Architectural Kitchen',
    category: 'kitchens',
    categoryLabel: 'Kitchens',
    suburb: 'Oran Park, NSW',
    duration: '5 Weeks',
    year: '2026',
    image: '/src/assets/images/hero_elux_kitchen_1794524439934.jpg',
    imageAlt: 'Oran Park contemporary kitchen with curved fluted timber island and stone splashback',
    summary:
      'A sculptural 3.6-metre curved fluted oak island anchoring an open-plan entertainer’s kitchen with full-height stone splashback.',
    challenge:
      'Creating warmth against polished concrete floors while concealing a double-door fridge, wine column, and secondary prep sink.',
    outcome:
      'Delivered pocket-integrated tall pantry doors, curved dowel-fluted island cladding, and bookmatched slab stone walls completed two days ahead of schedule.',
    materials: [
      { element: 'Island Front', specification: 'CNC-fluted Tasmanian Oak with curved ends' },
      { element: 'Benchtops', specification: 'Honed Taj Mahal Quartzite · 20mm pencil edge' },
      { element: 'Appliances', specification: 'Fully integrated column refrigeration & dual ovens' },
      { element: 'Tapware', specification: 'Brushed Brass Gooseneck Pull-Out Mixers' },
    ],
    metrics: [
      { label: 'Island Span', value: '3.6 m' },
      { label: 'On-Site Build', value: '5 Weeks' },
      { label: 'Handover', value: 'On Budget' },
    ],
  },
  {
    id: 'ingleburn-limestone-ensuite',
    title: 'Macarthur Limestone Sanctuary Ensuite',
    category: 'bathrooms',
    categoryLabel: 'Bathrooms',
    suburb: 'Ingleburn, NSW',
    duration: '3.5 Weeks',
    year: '2025',
    image: '/src/assets/images/service_elux_bathroom_1794524440338.jpg',
    imageAlt: 'Macarthur luxury limestone bathroom with backlit round mirror and curved timber vanity',
    summary:
      'Complete wet-area rebuild transforming a dated tiled bathroom into a calm, barrier-free limestone sanctuary with custom curved joinery.',
    challenge:
      'Previous leaking shower recess had damaged subfloor joists and left insufficient ventilation.',
    outcome:
      'Replaced structural subfloor framing, installed AS 3740 dual-membrane waterproofing, recessed twin tiled niches, and fitted a custom fluted oak floating vanity.',
    materials: [
      { element: 'Wall & Floor Tiles', specification: '600x1200mm Honed Limestone Porcelain' },
      { element: 'Vanity', specification: 'Curved Fluted Oak · Carved Travertine Basin' },
      { element: 'Shower Screen', specification: '10mm Starphire Low-Iron Frameless Glass' },
      { element: 'Tapware', specification: 'Brushed Bronze Wall-Mounted Rail & Mixer' },
    ],
    metrics: [
      { label: 'On-Site Build', value: '3.5 Weeks' },
      { label: 'Waterproofing', value: 'AS 3740' },
      { label: 'Drainage', value: 'Linear' },
    ],
  },
  {
    id: 'harrington-park-laundry',
    title: 'Harrington Park Mudroom & Laundry Suite',
    category: 'laundries',
    categoryLabel: 'Laundries',
    suburb: 'Harrington Park, NSW',
    duration: '2.5 Weeks',
    year: '2025',
    image: '/src/assets/images/service_elux_laundry_1794524440960.jpg',
    imageAlt: 'Harrington Park custom mudroom bench and taupe laundry joinery',
    summary:
      'Dual-purpose garage-entry mudroom and laundry featuring floor-to-ceiling matte taupe storage, oak ceiling beam detail, and under-bench appliance housing.',
    challenge:
      'Narrow single-wall laundry lacked folding space, school-bag drop zones, and broom storage.',
    outcome:
      'Reconfigured plumbing along the window wall and wrapped the return corner into an upholstered mudroom bench with concealed shoe drawers.',
    materials: [
      { element: 'Cabinetry', specification: 'Matte Warm Taupe 2-Pac Polyurethane' },
      { element: 'Benchtop', specification: '20mm Honed Limestone-Look Porcelain Slab' },
      { element: 'Flooring', specification: 'Slip-Resistant R11 Limestone Tumbled Tile' },
      { element: 'Hardware', specification: 'Solid Brass Coat Hooks & Undermount Tub' },
    ],
    metrics: [
      { label: 'On-Site Build', value: '2.5 Weeks' },
      { label: 'Tall Storage', value: '4 Cabinets' },
      { label: 'Slip Rating', value: 'R11 Wet' },
    ],
  },
  {
    id: 'gregory-hills-living-joinery',
    title: 'Gregory Hills Full-Height Living Joinery & Plinth',
    category: 'joinery',
    categoryLabel: 'Custom Joinery',
    suburb: 'Gregory Hills, NSW',
    duration: '3 Weeks',
    year: '2026',
    image: '/src/assets/images/project_custom_joinery_1794524441201.jpg',
    imageAlt: 'Gregory Hills architectural oak wall joinery with limestone hearth plinth',
    summary:
      'Architectural 5.4-metre living wall combining natural stone plinth base, concealed push-to-open storage, and warm 2700K recessed display lighting.',
    challenge:
      'Blank double-height living wall lacked visual grounding and practical media/book storage.',
    outcome:
      'Engineered seamless crown-cut American oak veneer panels aligned cleanly to the window mullions above a honed grey stone hearth.',
    materials: [
      { element: 'Veneer', specification: 'Crown-Cut American White Oak · Matte Clear Seal' },
      { element: 'Base Plinth', specification: '30mm Honed Pietra Grey Natural Stone' },
      { element: 'Lighting', specification: 'Recessed Aluminium 2700K Diffused LED Strips' },
      { element: 'Mechanisms', specification: 'Blum Tip-On Soft-Close Concealed Hinges' },
    ],
    metrics: [
      { label: 'Wall Span', value: '5.4 m' },
      { label: 'Fabrication', value: '2 Weeks' },
      { label: 'Install', value: '4 Days' },
    ],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'On-Site Measure & Consultation',
    duration: 'Week 1',
    description:
      'We visit your Sydney home to assess structural framing, plumbing locations, and natural light—listening carefully to how your household uses the space before quoting.',
    deliverable: 'Itemised fixed-price scope & preliminary layout',
  },
  {
    number: '02',
    title: '3D Design & Material Selection',
    duration: 'Weeks 2 – 3',
    description:
      'Review full 3D joinery elevations and handle physical stone, timber veneer, tile, and tapware samples at our Ingleburn studio until every junction is locked in.',
    deliverable: 'Signed CAD drawings & material schedule',
  },
  {
    number: '03',
    title: 'Licensed Build & Waterproofing',
    duration: 'Weeks 4 – 8',
    description:
      'Our dedicated project manager coordinates licensed demolition, electrical, plumbing, certified AS 3740 waterproofing, tiling, and precision joinery installation.',
    deliverable: 'Daily site cleanliness & milestone updates',
  },
  {
    number: '04',
    title: 'Quality Inspection & Handover',
    duration: 'Completion',
    description:
      'Every drawer alignment, silicone joint, and fixture is inspected alongside you at handover—backed by compliance certificates and our 7-year workmanship warranty.',
    deliverable: 'Compliance certificates & 7-year warranty',
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Sarah & Daniel M.',
    suburb: 'Camden South, NSW',
    projectType: 'Kitchen & Butler’s Pantry',
    source: 'Google Review · 5.0 Stars',
    quote:
      'Elux renovated our main kitchen and built a walk-in butler’s pantry simultaneously without a single missed deadline. Their joinery tolerances and stone mitres are flawless.',
    outcome: 'Completed in 6 weeks · Zero budget variations',
  },
  {
    id: 'rev-2',
    clientName: 'Andrew K.',
    suburb: 'Bradbury, NSW',
    projectType: 'Main Bathroom & Ensuite',
    source: 'hipages Verified · 5.0 Stars',
    quote:
      'Transparent communication from the first site measure at Ingleburn through to final handover. The crew arrived at 7am sharp every day and kept the rest of our home spotless.',
    outcome: '2 wet areas delivered in 4 weeks',
  },
  {
    id: 'rev-3',
    clientName: 'Elena & Mark T.',
    suburb: 'Oran Park, NSW',
    projectType: 'Kitchen, Laundry & Living Joinery',
    source: 'Google Review · 5.0 Stars',
    quote:
      'Having one team fabricate our kitchen, laundry, and living room cabinetry meant all our oak tones and brass finishes matched seamlessly across the ground floor.',
    outcome: 'Full ground-floor joinery cohesion',
  },
];
