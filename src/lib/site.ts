export const CONTACT = {
  phone: "+919544909991",
  phoneDisplay: "+91 95449 09991",
  office: "04844858111",
  officeDisplay: "0484 485 8111",
  email: "info@inhouseprojects.in",
  whatsapp: "919544909991",
  address: ["Inhouse Projects", "1/333, Kairali Nagar, Maradu P.O", "Kochi – 682304, Kerala"],
} as const;

export const whatsappLink = (text = "Hi, I'm interested in villas at Inhouse Projects") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

/** Options in every lead form's project dropdown. */
export const FORM_PROJECTS = ["Inhouse Caristo", "Seventh Avenue", "Kaitharam Plots", "SolaceAve"] as const;
export type FormProject = (typeof FORM_PROJECTS)[number];

export type LeadIntent = "enquiry" | "brochure" | "visit";

export type Spec = { label: string; value: string };

export type Project = {
  slug: "caristo" | "seventh-avenue";
  name: FormProject;
  status: string;
  statusTone: "ongoing" | "hot";
  headline: string;
  summary: string;
  image: { src: string; alt: string; width: number; height: number };
  specs: Spec[];
  meta: Spec[];
  /** Set to a /public path or URL once the PDF is available; until then, brochure requests are sent by the team. */
  brochureUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "caristo",
    name: "Inhouse Caristo",
    status: "Ongoing",
    statusTone: "ongoing",
    headline: "Premium Villa Living at Pattimattom, Vengola, Kochi",
    summary:
      "Gated community of 27 exclusive villas on 2.2 acres, with a minimum of 5 cents of private land for every villa.",
    image: { src: "/img/caristo-villa.jpg", alt: "Inhouse Caristo villa exterior at dusk", width: 1600, height: 1024 },
    specs: [
      { label: "Size", value: "1300–3000 sq ft" },
      { label: "Type", value: "3 & 4 BHK" },
      { label: "Price", value: "₹85 Lakh – ₹1.85 Cr" },
    ],
    meta: [
      { label: "Expected completion", value: "December 2027" },
      { label: "K-RERA", value: "K-RERA/PRJ/ERN/139/2023" },
    ],
  },
  {
    slug: "seventh-avenue",
    name: "Seventh Avenue",
    status: "Few Villas Left",
    statusTone: "hot",
    headline: "Premium Villas at Thiruvankulam, Kochi",
    summary:
      "27 villas in a gated community, with 23 already handed over and families happily living there. Behind Muthoot Engineering College.",
    image: { src: "/img/seventh-villa.jpg", alt: "Seventh Avenue villas at Thiruvankulam at dusk", width: 700, height: 350 },
    specs: [
      { label: "Size", value: "1500–3000 sq ft" },
      { label: "Price", value: "₹6,500 per sq ft" },
      { label: "Handed over", value: "23 of 27" },
    ],
    meta: [
      { label: "Completion", value: "In 8 months" },
      { label: "K-RERA", value: "K-RERA/PRJ/ERN/016/2022" },
    ],
  },
];

export const COMPARISON = [
  {
    project: "Inhouse Caristo" as FormProject,
    location: "Vengola",
    type: "3 & 4 BHK Villas",
    size: "1300–3000 sq ft",
    price: "₹85 Lakh – ₹1.85 Cr",
    status: "Ongoing, Dec 2027",
    tone: "ongoing" as const,
  },
  {
    project: "Seventh Avenue" as FormProject,
    location: "Thiruvankulam",
    type: "Villas",
    size: "1500–3000 sq ft",
    price: "₹6,500/sq ft",
    status: "Few villas left",
    tone: "hot" as const,
  },
];

export const CARISTO_DETAILS = {
  title: "Your Independent Villa. Your Private Space. Your Future.",
  intro:
    "More space, better amenities, greater comfort. INHOUSE CARISTO is an exclusive gated villa community for families who value spacious living, modern amenities and long-term value.",
  completion: "December 2027",
  gallery: [
    { src: "/img/caristo-drone.jpg", alt: "Aerial view of the Inhouse Caristo community" },
    { src: "/img/caristo-gate.jpg", alt: "Inhouse Caristo entrance gate" },
    { src: "/img/caristo-pool.jpg", alt: "Clubhouse swimming pool at Inhouse Caristo" },
    { src: "/img/caristo-balcony.jpg", alt: "Balcony outlook at an Inhouse Caristo villa" },
  ],
  highlights: [
    { lead: "Prime location:", text: "100 metres from the bus stop and about 800 metres from Vengola Junction." },
    { text: "Minimum 5 cents of private land with parking for multiple cars, depending on the villa layout." },
    { text: "Premium clubhouse with swimming pool and gym." },
    { text: "24/7 security with CCTV surveillance." },
    {
      lead: "Modern infrastructure:",
      text: "underground electrical cabling, waste management system, filtered borewell water and KWA water connection.",
    },
    { text: "Wide internal roads of more than 5 metres." },
    { lead: "Open layout:", text: "a minimum 15-metre distance between opposite villas." },
    { text: "Landscaped green spaces throughout the community." },
  ],
  travel: [
    { place: "Cochin International Airport", value: "~25 min" },
    { place: "Rajagiri Hospital", value: "~25 min" },
    { place: "Infopark", value: "~30 min" },
  ],
  nearby:
    "Easy access to public transport, Vengola Junction, supermarkets, schools (including Aspire Residential School) and places of worship.",
  travelNote: "Travel times are approximate and depend on route and traffic.",
  callouts: [
    {
      icon: "home" as const,
      title: "Why a villa instead of an apartment?",
      text: "3-bedroom city apartments can start at around ₹1 crore. INHOUSE CARISTO villas start from around ₹85 lakh, with independent living, private land and community amenities.",
    },
    {
      icon: "shield" as const,
      title: "Construction quality and warranty",
      text: "Selected materials and components carry warranties of 5–10 years, subject to the product, manufacturer and warranty terms.",
    },
  ],
};

export const SEVENTH_DETAILS = {
  title: "Only a few villas left. 23 families are already living here.",
  intro:
    "Seventh Avenue is a gated villa community of 27 villas. 23 have been handed over and the families are happily settled in. A few villas are still available.",
  facts: [
    { label: "Villa size", value: "1500–3000 sq ft" },
    { label: "Price", value: "₹6,500 per sq ft" },
    { label: "Completion time", value: "8 months" },
  ],
  handedOver: 23,
  total: 27,
  amenities: [
    { icon: "building", label: "Clubhouse" },
    { icon: "party", label: "Party hall" },
    { icon: "users", label: "Conference hall" },
    { icon: "gym", label: "Multi gym" },
    { icon: "kids", label: "Children’s play area" },
    { icon: "dice", label: "Indoor games" },
    { icon: "leaf", label: "Private garden for each villa" },
    { icon: "camera", label: "24-hour security with CCTV" },
    { icon: "phone", label: "Intercom connection" },
  ] as const,
  address: "Behind Muthoot Engineering College, Thiruvankulam, Kochi",
  distances: [
    { place: "Vytilla Hub", value: "12 km" },
    { place: "Infopark", value: "10 km" },
    { place: "Metro station", value: "7 km" },
    { place: "Puthencruz", value: "4.9 km" },
    { place: "Muthoot College", value: "2.2 km" },
    { place: "NH 85", value: "1.4 km" },
  ],
};

export const MAP_LOCATIONS = [
  { id: "caristo", name: "Caristo", area: "Vengola", query: "Pattimattom, Vengola, Ernakulam, Kerala" },
  {
    id: "seventh",
    name: "Seventh Avenue",
    area: "Thiruvankulam",
    query: "Muthoot Institute of Technology and Science, Varikoli, Kerala",
  },
  { id: "kaitharam", name: "Kaitharam Plots", area: "Kaitharam", query: "Kaitharam, Ernakulam, Kerala" },
  { id: "solace", name: "SolaceAve", area: "Mulanthuruthy", query: "Mulanthuruthy, Ernakulam, Kerala" },
] as const;

export const mapEmbedUrl = (query: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
