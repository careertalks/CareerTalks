export type CareerSlug =
  | "ai-data-science"
  | "software-development"
  | "fintech"
  | "business-entrepreneurship"
  | "clean-tech"
  | "telecommunications"
  | "biotech-pharma"
  | "automotive"
  | "retail-logistics"
  | "digital-marketing"
  | "product-management"
  | "real-estate"
  | "law-legal"
  | "fashion-design"
  | "human-resources"
  | "architecture-planning"
  | "healthcare-management"
  | "hospitality-management"
  | "education-social-work"
  | "creative-arts";

export type Cluster = "tech" | "business" | "science" | "creative";

export interface CareerConfig {
  slug: CareerSlug;
  title: string;
  shortTitle: string;
  cluster: Cluster;
  icon: string;
  description: string;
  heroDescription: string;
  stats: {
    avgSalary: string;
    growthRate: string;
    topRoles: string[];
  };
}

export interface ClusterConfig {
  id: Cluster;
  title: string;
  accent: string;
  accentLight: string;
  accentBg: string;
  badgeClass: string;
  borderClass: string;
  dotClass: string;
  glowClass: string;
  gradientFrom: string;
  gradientTo: string;
}

export const clusterConfigs: Record<Cluster, ClusterConfig> = {
  tech: {
    id: "tech",
    title: "Tech & Data",
    accent: "#3B82F6",
    accentLight: "#93C5FD",
    accentBg: "#EFF6FF",
    badgeClass: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-200",
    dotClass: "bg-blue-500",
    glowClass: "shadow-blue-500/20",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-400",
  },
  business: {
    id: "business",
    title: "Business & Commerce",
    accent: "#F59E0B",
    accentLight: "#FCD34D",
    accentBg: "#FFFBEB",
    badgeClass: "bg-amber-100 text-amber-700",
    borderClass: "border-amber-200",
    dotClass: "bg-amber-500",
    glowClass: "shadow-amber-500/20",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-400",
  },
  science: {
    id: "science",
    title: "Science & Health",
    accent: "#10B981",
    accentLight: "#6EE7B7",
    accentBg: "#ECFDF5",
    badgeClass: "bg-emerald-100 text-emerald-700",
    borderClass: "border-emerald-200",
    dotClass: "bg-emerald-500",
    glowClass: "shadow-emerald-500/20",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-400",
  },
  creative: {
    id: "creative",
    title: "People & Creative",
    accent: "#F43F5E",
    accentLight: "#FDA4AF",
    accentBg: "#FFF1F2",
    badgeClass: "bg-rose-100 text-rose-700",
    borderClass: "border-rose-200",
    dotClass: "bg-rose-500",
    glowClass: "shadow-rose-500/20",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-400",
  },
};

export const careerConfigs: Record<CareerSlug, CareerConfig> = {
  "ai-data-science": {
    slug: "ai-data-science",
    title: "AI & Data Science",
    shortTitle: "AI & Data",
    cluster: "tech",
    icon: "\u{1F916}",
    description: "Discover key skills, degrees, and growth paths behind roles like AI Researcher, Data Analyst, and Machine Learning Engineer.",
    heroDescription: "Step into the world of AI \u2014 discover the skills, tools, and pathways that lead to some of the most exciting and highest-paying careers of the decade. From machine learning to data analytics, find out what it takes to build the future.",
    stats: { avgSalary: "$128,000", growthRate: "25%", topRoles: ["ML Engineer", "Data Scientist", "AI Product Manager"] },
  },
  "software-development": {
    slug: "software-development",
    title: "Software & App Development",
    shortTitle: "Software Dev",
    cluster: "tech",
    icon: "\u{1F4BB}",
    description: "Launch your coding career from beginner to expert. See what junior developers really do and the secrets to mastering modern app development.",
    heroDescription: "The backbone of every tech company. Learn how to break into software development, choose your specialization, and build a career that grows with technology.",
    stats: { avgSalary: "$110,000", growthRate: "22%", topRoles: ["Full-Stack Developer", "Mobile Engineer", "DevOps Engineer"] },
  },
  "fintech": {
    slug: "fintech",
    title: "FinTech",
    shortTitle: "FinTech",
    cluster: "tech",
    icon: "\u{1F4B3}",
    description: "Explore careers in financial analytics, payments innovation, and blockchain technology that are shaping the future of money.",
    heroDescription: "Where finance meets technology. Unlock career opportunities in digital payments, cryptocurrency, algorithmic trading, and the platforms reshaping how the world handles money.",
    stats: { avgSalary: "$115,000", growthRate: "20%", topRoles: ["Blockchain Developer", "Financial Analyst", "Product Manager"] },
  },
  "business-entrepreneurship": {
    slug: "business-entrepreneurship",
    title: "Business Management & Entrepreneurship",
    shortTitle: "Business & Startups",
    cluster: "business",
    icon: "\u{1F4BC}",
    description: "From business basics to building your own venture \u2014 explore management skills, startup blueprints, and founder stories.",
    heroDescription: "Whether you want to climb the corporate ladder or build your own company, this path covers everything from strategy and leadership to startup funding and growth hacking.",
    stats: { avgSalary: "$95,000", growthRate: "15%", topRoles: ["Business Analyst", "Startup Founder", "Management Consultant"] },
  },
  "clean-tech": {
    slug: "clean-tech",
    title: "Clean Tech & Green Energy",
    shortTitle: "Clean Tech",
    cluster: "science",
    icon: "\u{1F33F}",
    description: "Drive impact with careers in green energy and sustainability \u2014 discover growing roles in solar tech, environmental engineering.",
    heroDescription: "Build a career that saves the planet. From renewable energy engineering to sustainability consulting, discover how to make a real impact while building a recession-proof career.",
    stats: { avgSalary: "$92,000", growthRate: "28%", topRoles: ["Renewable Energy Engineer", "Sustainability Consultant", "Environmental Scientist"] },
  },
  "telecommunications": {
    slug: "telecommunications",
    title: "Telecommunications",
    shortTitle: "Telecom",
    cluster: "tech",
    icon: "\u{1F4E1}",
    description: "Explore behind-the-scenes careers powering our global networks \u2014 from network support to 5G engineering and beyond.",
    heroDescription: "The invisible infrastructure that connects the world. Explore careers in 5G networks, satellite communications, IoT, and the technologies keeping billions connected.",
    stats: { avgSalary: "$98,000", growthRate: "12%", topRoles: ["Network Engineer", "5G Specialist", "RF Engineer"] },
  },
  "biotech-pharma": {
    slug: "biotech-pharma",
    title: "BioTech & Pharma",
    shortTitle: "BioTech",
    cluster: "science",
    icon: "\u{1F9EC}",
    description: "Join the health revolution \u2014 see how biotech roles drive breakthroughs in medicine, research, and next-gen therapies.",
    heroDescription: "At the intersection of biology and technology. Discover careers in gene therapy, pharmaceutical research, clinical trials, and the innovations that are extending and improving human life.",
    stats: { avgSalary: "$105,000", growthRate: "18%", topRoles: ["Biotech Researcher", "Clinical Data Manager", "Regulatory Affairs Specialist"] },
  },
  "automotive": {
    slug: "automotive",
    title: "Automotive",
    shortTitle: "Automotive",
    cluster: "science",
    icon: "\u{1F697}",
    description: "Get under the hood of tomorrow\u2019s autos \u2014 uncover career tracks from technicians to engineers in innovative industries.",
    heroDescription: "The automotive industry is being revolutionized by electric vehicles, autonomous driving, and connected car technology. Explore careers at the cutting edge of transportation.",
    stats: { avgSalary: "$88,000", growthRate: "16%", topRoles: ["EV Engineer", "Autonomous Systems Developer", "Automotive Designer"] },
  },
  "retail-logistics": {
    slug: "retail-logistics",
    title: "Retail & Logistics",
    shortTitle: "Retail & Logistics",
    cluster: "business",
    icon: "\u{1F6D2}",
    description: "Shape how products move and sell \u2014 discover dynamic careers in retail management, supply chain, and logistics.",
    heroDescription: "From warehouse to doorstep, from storefront to screen. Explore careers in e-commerce operations, supply chain optimization, and the digital transformation of retail.",
    stats: { avgSalary: "$75,000", growthRate: "14%", topRoles: ["Supply Chain Manager", "E-Commerce Manager", "Logistics Analyst"] },
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital + Content Marketing",
    shortTitle: "Digital Marketing",
    cluster: "business",
    icon: "\u{1F4F1}",
    description: "Master digital marketing: plan campaigns, grow brands, and develop creative skills used by marketing pros worldwide.",
    heroDescription: "Every brand needs a digital presence. Learn to master SEO, social media, content strategy, paid advertising, and the analytics that drive modern marketing decisions.",
    stats: { avgSalary: "$72,000", growthRate: "19%", topRoles: ["SEO Specialist", "Content Strategist", "Growth Marketing Manager"] },
  },
  "product-management": {
    slug: "product-management",
    title: "Product Management",
    shortTitle: "Product Management",
    cluster: "tech",
    icon: "\u{1F4CA}",
    description: "Learn what it takes to build products people love \u2014 from tech research to launch as a product manager or analyst.",
    heroDescription: "The bridge between technology, business, and users. Product managers shape what gets built and why. Learn the skills, frameworks, and career paths in this high-demand field.",
    stats: { avgSalary: "$120,000", growthRate: "21%", topRoles: ["Product Manager", "Technical PM", "Product Analyst"] },
  },
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate",
    shortTitle: "Real Estate",
    cluster: "business",
    icon: "\u{1F3E0}",
    description: "Emerging and rewarding areas are popping up in real estate. Explore top companies, projects, and career options.",
    heroDescription: "Beyond buying and selling houses. Discover careers in commercial real estate, property technology (PropTech), real estate investment, urban development, and sustainable building.",
    stats: { avgSalary: "$78,000", growthRate: "10%", topRoles: ["Real Estate Analyst", "Property Manager", "PropTech Developer"] },
  },
  "law-legal": {
    slug: "law-legal",
    title: "Law & Legal Services",
    shortTitle: "Law & Legal",
    cluster: "creative",
    icon: "\u2696\uFE0F",
    description: "Step inside the legal world \u2014 from support roles to advocacy and specialized practice, see how legal pros drive change.",
    heroDescription: "Justice, advocacy, and the rule of law. Explore diverse legal careers from corporate law and intellectual property to legal tech and public interest advocacy.",
    stats: { avgSalary: "$95,000", growthRate: "8%", topRoles: ["Corporate Lawyer", "Legal Tech Specialist", "Paralegal"] },
  },
  "fashion-design": {
    slug: "fashion-design",
    title: "Fashion Design & Tech",
    shortTitle: "Fashion & Tech",
    cluster: "creative",
    icon: "\u{1F457}",
    description: "Design tomorrow\u2019s trends. See fashion careers from assistant to designer, and the new tech shaping style.",
    heroDescription: "Where creativity meets commerce and technology. From sustainable fashion and digital design to fashion tech startups and luxury brand management.",
    stats: { avgSalary: "$65,000", growthRate: "11%", topRoles: ["Fashion Designer", "Textile Technologist", "Fashion Buyer"] },
  },
  "human-resources": {
    slug: "human-resources",
    title: "Human Resources",
    shortTitle: "HR",
    cluster: "creative",
    icon: "\u{1F91D}",
    description: "Shape workplaces and culture \u2014 see how HR pros drive growth, team-building, and talent success in every industry.",
    heroDescription: "People are every organization\u2019s most valuable asset. Build a career in talent acquisition, employee experience, organizational development, and the future of work.",
    stats: { avgSalary: "$78,000", growthRate: "13%", topRoles: ["HR Business Partner", "Talent Acquisition Lead", "People Analytics Manager"] },
  },
  "architecture-planning": {
    slug: "architecture-planning",
    title: "Architecture & Planning",
    shortTitle: "Architecture",
    cluster: "creative",
    icon: "\u{1F3D7}\uFE0F",
    description: "Imagine and build \u2014 explore careers in architecture and urban planning shaping the cities and homes of tomorrow.",
    heroDescription: "Design the spaces where people live, work, and dream. From sustainable architecture and smart cities to interior design and landscape planning.",
    stats: { avgSalary: "$82,000", growthRate: "9%", topRoles: ["Architect", "Urban Planner", "Sustainable Design Consultant"] },
  },
  "healthcare-management": {
    slug: "healthcare-management",
    title: "Healthcare Management",
    shortTitle: "Healthcare",
    cluster: "science",
    icon: "\u{1FA7A}",
    description: "Build a caring career \u2014 see how nurses and healthcare leaders provide essential care, from hands-on support to advanced practice.",
    heroDescription: "Healthcare is one of the largest and most stable industries in the world. Explore careers in hospital administration, health informatics, public health, and clinical management.",
    stats: { avgSalary: "$85,000", growthRate: "17%", topRoles: ["Hospital Administrator", "Health Informatics Specialist", "Clinical Manager"] },
  },
  "hospitality-management": {
    slug: "hospitality-management",
    title: "Hospitality Management",
    shortTitle: "Hospitality",
    cluster: "business",
    icon: "\u{1F3E8}",
    description: "Create memorable experiences: lead in hospitality from the front desk to hotel management and event planning.",
    heroDescription: "From luxury hotels to event management, food service to tourism. Build a career creating unforgettable experiences in one of the world\u2019s most dynamic industries.",
    stats: { avgSalary: "$62,000", growthRate: "12%", topRoles: ["Hotel Manager", "Event Director", "Tourism Consultant"] },
  },
  "education-social-work": {
    slug: "education-social-work",
    title: "Education & Social Work",
    shortTitle: "Education",
    cluster: "creative",
    icon: "\u{1F393}",
    description: "Make real impact \u2014 grow your career in teaching or social work to educate, inspire, and build better communities.",
    heroDescription: "Shape the next generation and strengthen communities. Explore careers in teaching, educational technology, school counseling, social work, and nonprofit leadership.",
    stats: { avgSalary: "$58,000", growthRate: "10%", topRoles: ["Teacher", "EdTech Specialist", "School Counselor"] },
  },
  "creative-arts": {
    slug: "creative-arts",
    title: "Creative Arts & Design",
    shortTitle: "Creative Arts",
    cluster: "creative",
    icon: "\u{1F3A8}",
    description: "Bring ideas to life \u2014 discover careers in the creative arts, from design to leadership in culture-shaping campaigns.",
    heroDescription: "Turn creativity into a career. From UX/UI design and motion graphics to art direction, game design, and creative entrepreneurship.",
    stats: { avgSalary: "$70,000", growthRate: "14%", topRoles: ["UX/UI Designer", "Art Director", "Motion Designer"] },
  },
};

// Helper to get careers by cluster
export function getCareersByCluster(cluster: Cluster): CareerConfig[] {
  return Object.values(careerConfigs).filter((c) => c.cluster === cluster);
}

// Helper to get cluster config for a career
export function getClusterForCareer(slug: CareerSlug): ClusterConfig {
  const career = careerConfigs[slug];
  return clusterConfigs[career.cluster];
}

// All career slugs for static generation
export function getAllCareerSlugs(): CareerSlug[] {
  return Object.keys(careerConfigs) as CareerSlug[];
}
