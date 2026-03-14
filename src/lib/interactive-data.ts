import type { CareerSlug, Cluster } from "./career-config";

// ============================================================================
// 1. ZODIAC CONFIGURATIONS
// ============================================================================

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface ZodiacConfig {
  sign: ZodiacSign;
  symbol: string;
  name: string;
  dates: string;
  element: string;
  traits: string[];
  careerMatches: { slug: CareerSlug; reason: string }[];
  shareText: string;
}

export const zodiacConfigs: ZodiacConfig[] = [
  {
    sign: "aries",
    symbol: "♈",
    name: "Aries",
    dates: "Mar 21 - Apr 19",
    element: "Fire",
    traits: ["pioneering", "courageous", "determined", "passionate"],
    careerMatches: [
      {
        slug: "software-development",
        reason: "Pioneer builders who love creating from scratch",
      },
      {
        slug: "business-entrepreneurship",
        reason: "Natural leaders ready to take risks and charge ahead",
      },
      {
        slug: "automotive",
        reason: "Driven engineers who push innovation forward",
      },
    ],
    shareText: "I'm a ♈ Aries → Software Dev & Entrepreneurship! What's your cosmic career match?",
  },
  {
    sign: "taurus",
    symbol: "♉",
    name: "Taurus",
    dates: "Apr 20 - May 20",
    element: "Earth",
    traits: ["reliable", "practical", "patient", "stable"],
    careerMatches: [
      {
        slug: "real-estate",
        reason: "Value stability and building tangible, lasting assets",
      },
      {
        slug: "retail-logistics",
        reason: "Practical operators who excel at systematic organization",
      },
      {
        slug: "architecture-planning",
        reason: "Build lasting structures with attention to detail",
      },
    ],
    shareText: "I'm a ♉ Taurus → Real Estate & Architecture! What's your cosmic career match?",
  },
  {
    sign: "gemini",
    symbol: "♊",
    name: "Gemini",
    dates: "May 21 - Jun 20",
    element: "Air",
    traits: ["communicative", "adaptable", "curious", "intellectual"],
    careerMatches: [
      {
        slug: "digital-marketing",
        reason: "Natural communicators who thrive connecting ideas and people",
      },
      {
        slug: "telecommunications",
        reason: "Connectors bridging gaps through technology",
      },
      {
        slug: "product-management",
        reason: "Versatile thinkers juggling multiple perspectives",
      },
    ],
    shareText: "I'm a ♊ Gemini → Digital Marketing & Comms! What's your cosmic career match?",
  },
  {
    sign: "cancer",
    symbol: "♋",
    name: "Cancer",
    dates: "Jun 21 - Jul 22",
    element: "Water",
    traits: ["nurturing", "protective", "intuitive", "empathetic"],
    careerMatches: [
      {
        slug: "healthcare-management",
        reason: "Nurturing instinct makes them natural care leaders",
      },
      {
        slug: "education-social-work",
        reason: "Community-focused professionals supporting growth",
      },
      {
        slug: "human-resources",
        reason: "People-first approach creates supportive cultures",
      },
    ],
    shareText: "I'm a ♋ Cancer → Healthcare & Social Work! What's your cosmic career match?",
  },
  {
    sign: "leo",
    symbol: "♌",
    name: "Leo",
    dates: "Jul 23 - Aug 22",
    element: "Fire",
    traits: ["creative", "confident", "charismatic", "generous"],
    careerMatches: [
      {
        slug: "creative-arts",
        reason: "Born for the spotlight, expressing their unique vision",
      },
      {
        slug: "product-management",
        reason: "Lead products with charisma and strategic vision",
      },
      {
        slug: "fashion-design",
        reason: "Style and presence define their creative expression",
      },
    ],
    shareText: "I'm a ♌ Leo → Creative Arts & Design! What's your cosmic career match?",
  },
  {
    sign: "virgo",
    symbol: "♍",
    name: "Virgo",
    dates: "Aug 23 - Sep 22",
    element: "Earth",
    traits: ["analytical", "meticulous", "practical", "methodical"],
    careerMatches: [
      {
        slug: "ai-data-science",
        reason: "Detail-oriented minds excelling at precision analysis",
      },
      {
        slug: "biotech-pharma",
        reason: "Meticulous researchers uncovering scientific truth",
      },
      {
        slug: "fintech",
        reason: "Analytical thinkers managing complex financial systems",
      },
    ],
    shareText: "I'm a ♍ Virgo → Data Science & Finance! What's your cosmic career match?",
  },
  {
    sign: "libra",
    symbol: "♎",
    name: "Libra",
    dates: "Sep 23 - Oct 22",
    element: "Air",
    traits: ["diplomatic", "balanced", "fair", "social"],
    careerMatches: [
      {
        slug: "law-legal",
        reason: "Justice and balance are their natural calling",
      },
      {
        slug: "human-resources",
        reason: "Harmony-seekers who mediate and balance interests",
      },
      {
        slug: "architecture-planning",
        reason: "Aesthetic balance and proportional thinking",
      },
    ],
    shareText: "I'm a ♎ Libra → Law & Human Resources! What's your cosmic career match?",
  },
  {
    sign: "scorpio",
    symbol: "♏",
    name: "Scorpio",
    dates: "Oct 23 - Nov 21",
    element: "Water",
    traits: ["strategic", "intense", "investigative", "powerful"],
    careerMatches: [
      {
        slug: "ai-data-science",
        reason: "Deep investigation reveals hidden patterns in data",
      },
      {
        slug: "fintech",
        reason: "Strategic depth in navigating financial systems",
      },
      {
        slug: "biotech-pharma",
        reason: "Uncover secrets of biology and chemistry",
      },
    ],
    shareText: "I'm a ♏ Scorpio → Data Science & Biotech! What's your cosmic career match?",
  },
  {
    sign: "sagittarius",
    symbol: "♐",
    name: "Sagittarius",
    dates: "Nov 22 - Dec 21",
    element: "Fire",
    traits: ["adventurous", "optimistic", "philosophical", "independent"],
    careerMatches: [
      {
        slug: "hospitality-management",
        reason: "Adventure and travel fuel their passion",
      },
      {
        slug: "clean-tech",
        reason: "Big-picture impact on the future excites them",
      },
      {
        slug: "business-entrepreneurship",
        reason: "Freedom to explore unconventional business paths",
      },
    ],
    shareText: "I'm a ♐ Sagittarius → Hospitality & Clean Tech! What's your cosmic career match?",
  },
  {
    sign: "capricorn",
    symbol: "♑",
    name: "Capricorn",
    dates: "Dec 22 - Jan 19",
    element: "Earth",
    traits: ["disciplined", "ambitious", "responsible", "strategic"],
    careerMatches: [
      {
        slug: "fintech",
        reason: "Disciplined approach to complex financial goals",
      },
      {
        slug: "law-legal",
        reason: "Structured thinking and long-term responsibility",
      },
      {
        slug: "retail-logistics",
        reason: "Systematic management of large-scale operations",
      },
    ],
    shareText: "I'm a ♑ Capricorn → Fintech & Law! What's your cosmic career match?",
  },
  {
    sign: "aquarius",
    symbol: "♒",
    name: "Aquarius",
    dates: "Jan 20 - Feb 18",
    element: "Air",
    traits: ["innovative", "visionary", "independent", "humanitarian"],
    careerMatches: [
      {
        slug: "clean-tech",
        reason: "Visionary thinkers building sustainable futures",
      },
      {
        slug: "software-development",
        reason: "Innovation and cutting-edge technology appeal to them",
      },
      {
        slug: "telecommunications",
        reason: "Future-focused connectivity and communication tech",
      },
    ],
    shareText: "I'm an ♒ Aquarius → Clean Tech & Software! What's your cosmic career match?",
  },
  {
    sign: "pisces",
    symbol: "♓",
    name: "Pisces",
    dates: "Feb 19 - Mar 20",
    element: "Water",
    traits: ["imaginative", "compassionate", "artistic", "intuitive"],
    careerMatches: [
      {
        slug: "creative-arts",
        reason: "Imagination flows through their creative work",
      },
      {
        slug: "education-social-work",
        reason: "Empathy drives their dedication to helping others",
      },
      {
        slug: "healthcare-management",
        reason: "Healing and compassion guide their leadership",
      },
    ],
    shareText: "I'm a ♓ Pisces → Creative Arts & Healthcare! What's your cosmic career match?",
  },
];

// ============================================================================
// 2. SKILL DEFINITIONS FOR SKILL MATCH GAME
// ============================================================================

export interface SkillDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  careerWeights: Partial<Record<CareerSlug, number>>;
}

export const skillDefinitions: SkillDefinition[] = [
  {
    id: "problem-solving",
    name: "Problem Solving",
    icon: "🔧",
    description: "Breaking down complex challenges into manageable solutions",
    careerWeights: {
      "software-development": 5,
      "ai-data-science": 5,
      fintech: 5,
      "business-entrepreneurship": 4,
      "clean-tech": 4,
      automotive: 4,
      "biotech-pharma": 4,
      "product-management": 4,
      "architecture-planning": 4,
      "law-legal": 3,
      "real-estate": 3,
    },
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: "👑",
    description: "Inspiring and guiding teams toward shared goals",
    careerWeights: {
      "business-entrepreneurship": 5,
      "product-management": 5,
      "healthcare-management": 5,
      "hospitality-management": 5,
      "human-resources": 5,
      "retail-logistics": 4,
      "digital-marketing": 4,
      "law-legal": 4,
      "real-estate": 3,
      "architecture-planning": 3,
    },
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: "🎨",
    description: "Generating original ideas and novel approaches",
    careerWeights: {
      "creative-arts": 5,
      "fashion-design": 5,
      "software-development": 4,
      "digital-marketing": 4,
      "product-management": 4,
      "clean-tech": 3,
      telecommunications: 3,
      "business-entrepreneurship": 3,
      "ai-data-science": 2,
      fintech: 2,
    },
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    icon: "📊",
    description: "Interpreting data to make informed decisions",
    careerWeights: {
      "ai-data-science": 5,
      fintech: 5,
      "digital-marketing": 4,
      "product-management": 4,
      "retail-logistics": 4,
      "real-estate": 3,
      "biotech-pharma": 3,
      "business-entrepreneurship": 3,
      "healthcare-management": 3,
      "law-legal": 2,
    },
  },
  {
    id: "communication",
    name: "Communication",
    icon: "💬",
    description: "Expressing ideas clearly to diverse audiences",
    careerWeights: {
      "digital-marketing": 5,
      telecommunications: 5,
      "product-management": 5,
      "human-resources": 5,
      "education-social-work": 5,
      "law-legal": 4,
      "creative-arts": 4,
      "business-entrepreneurship": 4,
      "healthcare-management": 4,
      "hospitality-management": 4,
      "real-estate": 3,
    },
  },
  {
    id: "technical",
    name: "Technical Skills",
    icon: "⚙️",
    description: "Proficiency with tools, code, and specialized equipment",
    careerWeights: {
      "software-development": 5,
      "ai-data-science": 5,
      telecommunications: 5,
      fintech: 4,
      automotive: 4,
      "clean-tech": 4,
      "biotech-pharma": 4,
      "product-management": 3,
      "digital-marketing": 3,
      "real-estate": 2,
    },
  },
  {
    id: "research",
    name: "Research",
    icon: "🔬",
    description: "Investigating topics systematically and deeply",
    careerWeights: {
      "biotech-pharma": 5,
      "ai-data-science": 5,
      "clean-tech": 4,
      "product-management": 3,
      "law-legal": 3,
      "business-entrepreneurship": 3,
      "education-social-work": 3,
      automotive: 3,
      "digital-marketing": 2,
      fintech: 2,
    },
  },
  {
    id: "adaptability",
    name: "Adaptability",
    icon: "🌀",
    description: "Thriving in changing environments and embracing new challenges",
    careerWeights: {
      "business-entrepreneurship": 5,
      "product-management": 4,
      "digital-marketing": 4,
      telecommunications: 4,
      "hospitality-management": 4,
      "retail-logistics": 4,
      "clean-tech": 4,
      "human-resources": 3,
      "real-estate": 3,
      "healthcare-management": 3,
    },
  },
];

// ============================================================================
// 3. DECISION TREE FOR CAREER NAVIGATOR
// ============================================================================

export interface DecisionNode {
  id: string;
  question: string;
  description: string;
  options: {
    label: string;
    icon: string;
    nextNode: string | null;
    clusterBoost: Partial<Record<Cluster, number>>;
    careerBoost?: Partial<Record<CareerSlug, number>>;
  }[];
}

export const decisionTree: DecisionNode[] = [
  {
    id: "start",
    question: "What excites you most about a career?",
    description: "Let's find your ideal path by understanding what drives you",
    options: [
      {
        label: "Building & Innovation",
        icon: "🚀",
        nextNode: "tech-path",
        clusterBoost: { tech: 3 },
      },
      {
        label: "People & Impact",
        icon: "🤝",
        nextNode: "people-path",
        clusterBoost: { business: 2, science: 1 },
      },
      {
        label: "Discovery & Analysis",
        icon: "🔬",
        nextNode: "science-path",
        clusterBoost: { science: 3 },
      },
      {
        label: "Expression & Design",
        icon: "🎭",
        nextNode: "creative-path",
        clusterBoost: { creative: 3 },
      },
    ],
  },

  // TECH PATH (nodes: tech-path, tech-specifics, tech-final)
  {
    id: "tech-path",
    question: "What's your tech sweet spot?",
    description: "Building the future requires different skill sets",
    options: [
      {
        label: "Code & Software",
        icon: "💻",
        nextNode: "tech-coding",
        clusterBoost: { tech: 2 },
        careerBoost: { "software-development": 3, "ai-data-science": 1 },
      },
      {
        label: "Data & AI",
        icon: "🤖",
        nextNode: "tech-data",
        clusterBoost: { tech: 2 },
        careerBoost: { "ai-data-science": 3, fintech: 1 },
      },
      {
        label: "Money & Markets",
        icon: "💰",
        nextNode: "tech-finance",
        clusterBoost: { business: 2 },
        careerBoost: { fintech: 3, telecommunications: 1 },
      },
      {
        label: "Connecting People",
        icon: "🌐",
        nextNode: "tech-connect",
        clusterBoost: { tech: 2 },
        careerBoost: { telecommunications: 3, "digital-marketing": 1 },
      },
    ],
  },
  {
    id: "tech-coding",
    question: "Starting fresh or leading teams?",
    description: "Both are crucial in software development",
    options: [
      {
        label: "Build independently",
        icon: "🛠️",
        nextNode: "tech-coding-final",
        clusterBoost: { tech: 1 },
        careerBoost: { "software-development": 2 },
      },
      {
        label: "Manage & mentor",
        icon: "📈",
        nextNode: "tech-coding-final",
        clusterBoost: { tech: 1 },
        careerBoost: { "product-management": 2 },
      },
      {
        label: "Start my own thing",
        icon: "🏢",
        nextNode: "tech-coding-final",
        clusterBoost: { business: 1 },
        careerBoost: { "business-entrepreneurship": 2 },
      },
    ],
  },
  {
    id: "tech-data",
    question: "What draws you to data?",
    description: "Data scientists wear many hats",
    options: [
      {
        label: "Pure analysis",
        icon: "📊",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "ai-data-science": 2 },
      },
      {
        label: "Predictive models",
        icon: "🧠",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "ai-data-science": 2 },
      },
      {
        label: "Real-world impact",
        icon: "🌍",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "clean-tech": 1, "ai-data-science": 1 },
      },
    ],
  },
  {
    id: "tech-finance",
    question: "Financial systems interest you because?",
    description: "Fintech combines tech and finance",
    options: [
      {
        label: "Building platforms",
        icon: "🏗️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { fintech: 2 },
      },
      {
        label: "Preventing fraud",
        icon: "🔒",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { fintech: 2 },
      },
      {
        label: "Investment strategy",
        icon: "📈",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { fintech: 2 },
      },
    ],
  },
  {
    id: "tech-connect",
    question: "Connecting people means?",
    description: "Telecommunications or marketing?",
    options: [
      {
        label: "Infrastructure & networks",
        icon: "📡",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { telecommunications: 2 },
      },
      {
        label: "Reaching audiences",
        icon: "📢",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "digital-marketing": 2 },
      },
      {
        label: "Managing products",
        icon: "🎯",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "product-management": 2 },
      },
    ],
  },
  {
    id: "tech-coding-final",
    question: "Environment preference?",
    description: "Where do you thrive?",
    options: [
      {
        label: "Startup energy",
        icon: "⚡",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "software-development": 1 },
      },
      {
        label: "Corporate stability",
        icon: "🏢",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "software-development": 1 },
      },
      {
        label: "Freedom to innovate",
        icon: "🚀",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "software-development": 1 },
      },
    ],
  },

  // PEOPLE PATH (nodes: people-path, people-specifics, people-final)
  {
    id: "people-path",
    question: "How do you want to impact people?",
    description: "Careers in business and science often focus on human wellbeing",
    options: [
      {
        label: "Health & Wellness",
        icon: "💊",
        nextNode: "people-health",
        clusterBoost: { science: 2 },
        careerBoost: { "healthcare-management": 2, "biotech-pharma": 1 },
      },
      {
        label: "Education & Growth",
        icon: "📚",
        nextNode: "people-education",
        clusterBoost: { business: 2 },
        careerBoost: { "education-social-work": 2, "human-resources": 1 },
      },
      {
        label: "Business & Strategy",
        icon: "🎯",
        nextNode: "people-business",
        clusterBoost: { business: 2 },
        careerBoost: { "business-entrepreneurship": 2, "product-management": 1 },
      },
      {
        label: "Hospitality & Experience",
        icon: "🏨",
        nextNode: "people-hospitality",
        clusterBoost: { business: 2 },
        careerBoost: { "hospitality-management": 2, "retail-logistics": 1 },
      },
    ],
  },
  {
    id: "people-health",
    question: "In healthcare, where do you fit?",
    description: "Direct care or management?",
    options: [
      {
        label: "Hospital management",
        icon: "🏥",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "healthcare-management": 2 },
      },
      {
        label: "Pharmaceutical innovation",
        icon: "🧪",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "biotech-pharma": 2 },
      },
      {
        label: "Patient experience",
        icon: "❤️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "healthcare-management": 2 },
      },
    ],
  },
  {
    id: "people-education",
    question: "Education or HR?",
    description: "Both develop human potential differently",
    options: [
      {
        label: "Teaching & social work",
        icon: "🍎",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "education-social-work": 2 },
      },
      {
        label: "Corporate HR",
        icon: "👥",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "human-resources": 2 },
      },
      {
        label: "Community development",
        icon: "🤗",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "education-social-work": 2 },
      },
    ],
  },
  {
    id: "people-business",
    question: "Your business style?",
    description: "Entrepreneur or strategist?",
    options: [
      {
        label: "Start something new",
        icon: "🚀",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "business-entrepreneurship": 3 },
      },
      {
        label: "Guide products",
        icon: "📦",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "product-management": 2 },
      },
      {
        label: "Build organizations",
        icon: "🏗️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "business-entrepreneurship": 2 },
      },
    ],
  },
  {
    id: "people-hospitality",
    question: "Hospitality appeal?",
    description: "Customer experience matters",
    options: [
      {
        label: "Hotel & lodging",
        icon: "🏨",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "hospitality-management": 2 },
      },
      {
        label: "Restaurant & food",
        icon: "🍽️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "hospitality-management": 2 },
      },
      {
        label: "Event planning",
        icon: "🎉",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "hospitality-management": 2 },
      },
    ],
  },

  // SCIENCE PATH (nodes: science-path, science-specifics, science-final)
  {
    id: "science-path",
    question: "What scientific domain fascinates you?",
    description: "Discovery requires focus and passion",
    options: [
      {
        label: "Life Sciences",
        icon: "🧬",
        nextNode: "science-bio",
        clusterBoost: { science: 2 },
        careerBoost: { "biotech-pharma": 3 },
      },
      {
        label: "Environmental Science",
        icon: "🌱",
        nextNode: "science-env",
        clusterBoost: { science: 2 },
        careerBoost: { "clean-tech": 2, automotive: 1 },
      },
      {
        label: "Data & Computation",
        icon: "💾",
        nextNode: "science-data",
        clusterBoost: { tech: 2 },
        careerBoost: { "ai-data-science": 3 },
      },
      {
        label: "Engineering & Design",
        icon: "⚙️",
        nextNode: "science-eng",
        clusterBoost: { science: 2 },
        careerBoost: { automotive: 2, "architecture-planning": 1 },
      },
    ],
  },
  {
    id: "science-bio",
    question: "Biotech focus?",
    description: "Research, development, or applications?",
    options: [
      {
        label: "Drug discovery",
        icon: "🧪",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "biotech-pharma": 2 },
      },
      {
        label: "Genetic engineering",
        icon: "🧬",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "biotech-pharma": 2 },
      },
      {
        label: "Clinical trials",
        icon: "📋",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "biotech-pharma": 2 },
      },
    ],
  },
  {
    id: "science-env",
    question: "Environmental passion?",
    description: "Clean tech or traditional science?",
    options: [
      {
        label: "Renewable energy",
        icon: "☀️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "clean-tech": 2 },
      },
      {
        label: "Electric vehicles",
        icon: "🚗",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { automotive: 2 },
      },
      {
        label: "Sustainability",
        icon: "🌍",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "clean-tech": 2 },
      },
    ],
  },
  {
    id: "science-data",
    question: "Data application?",
    description: "Research-focused or applied?",
    options: [
      {
        label: "AI research",
        icon: "🤖",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "ai-data-science": 2 },
      },
      {
        label: "Machine learning",
        icon: "🧠",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "ai-data-science": 2 },
      },
      {
        label: "Big data analytics",
        icon: "📊",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "ai-data-science": 2 },
      },
    ],
  },
  {
    id: "science-eng",
    question: "Engineering specialization?",
    description: "Mechanical, civil, or automotive?",
    options: [
      {
        label: "Automotive engineering",
        icon: "🚗",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { automotive: 2 },
      },
      {
        label: "Structural design",
        icon: "🏗️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "architecture-planning": 2 },
      },
      {
        label: "Mechanical systems",
        icon: "⚙️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { automotive: 2 },
      },
    ],
  },

  // CREATIVE PATH (nodes: creative-path, creative-specifics, creative-final)
  {
    id: "creative-path",
    question: "How do you want to create?",
    description: "Creative careers take many forms",
    options: [
      {
        label: "Visual & Fashion",
        icon: "👗",
        nextNode: "creative-visual",
        clusterBoost: { creative: 2 },
        careerBoost: { "fashion-design": 3 },
      },
      {
        label: "Art & Performance",
        icon: "🎭",
        nextNode: "creative-art",
        clusterBoost: { creative: 2 },
        careerBoost: { "creative-arts": 3 },
      },
      {
        label: "Design & Planning",
        icon: "🏛️",
        nextNode: "creative-design",
        clusterBoost: { creative: 2 },
        careerBoost: { "architecture-planning": 2, "real-estate": 1 },
      },
      {
        label: "Marketing & Brand",
        icon: "🎨",
        nextNode: "creative-marketing",
        clusterBoost: { business: 2 },
        careerBoost: { "digital-marketing": 3 },
      },
    ],
  },
  {
    id: "creative-visual",
    question: "Fashion interests?",
    description: "Design, production, or retail?",
    options: [
      {
        label: "Fashion design",
        icon: "✂️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "fashion-design": 3 },
      },
      {
        label: "Styling & curation",
        icon: "👠",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "fashion-design": 2 },
      },
      {
        label: "Fashion retail",
        icon: "🛍️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "retail-logistics": 2 },
      },
    ],
  },
  {
    id: "creative-art",
    question: "Your artistic medium?",
    description: "Expression first or commercial appeal?",
    options: [
      {
        label: "Fine arts & gallery",
        icon: "🖼️",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "creative-arts": 3 },
      },
      {
        label: "Performing arts",
        icon: "🎬",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "creative-arts": 3 },
      },
      {
        label: "Digital art & media",
        icon: "🎨",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "creative-arts": 2, "digital-marketing": 1 },
      },
    ],
  },
  {
    id: "creative-design",
    question: "Design scale?",
    description: "Buildings, spaces, or communities?",
    options: [
      {
        label: "Architecture",
        icon: "🏢",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "architecture-planning": 3 },
      },
      {
        label: "Urban planning",
        icon: "🌆",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "architecture-planning": 2 },
      },
      {
        label: "Real estate development",
        icon: "🏠",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "real-estate": 2 },
      },
    ],
  },
  {
    id: "creative-marketing",
    question: "Marketing approach?",
    description: "Strategy, content, or brand?",
    options: [
      {
        label: "Content creation",
        icon: "📝",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "digital-marketing": 2 },
      },
      {
        label: "Campaign strategy",
        icon: "🎯",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "digital-marketing": 2 },
      },
      {
        label: "Brand building",
        icon: "✨",
        nextNode: null,
        clusterBoost: {},
        careerBoost: { "digital-marketing": 2 },
      },
    ],
  },
];

// ============================================================================
// 4. EXTENDED CAREER DATA FOR EXPLORER
// ============================================================================

export interface ExtendedCareerData {
  slug: CareerSlug;
  salaryRange: { min: number; max: number };
  educationLevels: string[];
  keySkills: string[];
  workEnvironment: string;
  demandLevel: "High" | "Very High" | "Moderate" | "Growing";
  entryPaths: string[];
}

export const extendedCareerData: ExtendedCareerData[] = [
  {
    slug: "ai-data-science",
    salaryRange: { min: 85000, max: 200000 },
    educationLevels: [
      "Bachelor's in CS/Math",
      "Master's in Data Science",
      "PhD in related field",
    ],
    keySkills: [
      "Python/R",
      "Machine Learning",
      "Statistical Analysis",
      "SQL",
      "Data Visualization",
    ],
    workEnvironment:
      "Tech companies, finance, startups; mix of remote and office",
    demandLevel: "Very High",
    entryPaths: [
      "Data Science bootcamp",
      "Internal promotion from analyst role",
      "Master's degree entry",
      "Self-taught with portfolio",
    ],
  },
  {
    slug: "software-development",
    salaryRange: { min: 80000, max: 180000 },
    educationLevels: [
      "Bachelor's in CS",
      "Coding bootcamp",
      "Self-taught with portfolio",
    ],
    keySkills: [
      "Programming languages",
      "System design",
      "Git",
      "Testing",
      "Problem solving",
    ],
    workEnvironment:
      "Tech companies, startups, enterprises; highly flexible, often remote",
    demandLevel: "Very High",
    entryPaths: [
      "Bootcamp graduate",
      "CS degree",
      "Open source contributor",
      "Internship conversion",
    ],
  },
  {
    slug: "fintech",
    salaryRange: { min: 90000, max: 250000 },
    educationLevels: [
      "Bachelor's in Finance/CS",
      "MBA",
      "Financial certifications",
    ],
    keySkills: [
      "Financial modeling",
      "Risk analysis",
      "Blockchain",
      "API development",
      "Compliance",
    ],
    workEnvironment:
      "Banks, fintech startups, trading firms; fast-paced, deadline-driven",
    demandLevel: "Very High",
    entryPaths: [
      "Banking internship",
      "Finance degree + tech skills",
      "Fintech bootcamp",
      "Trading floor experience",
    ],
  },
  {
    slug: "business-entrepreneurship",
    salaryRange: { min: 50000, max: 500000 },
    educationLevels: ["Bachelor's degree", "MBA", "No degree required"],
    keySkills: [
      "Business planning",
      "Leadership",
      "Finance",
      "Sales",
      "Adaptability",
    ],
    workEnvironment:
      "Your own company or early-stage startups; dynamic, high-risk high-reward",
    demandLevel: "Growing",
    entryPaths: [
      "Corporate experience first",
      "Industry expertise",
      "Startup accelerator",
      "Self-funded venture",
    ],
  },
  {
    slug: "clean-tech",
    salaryRange: { min: 75000, max: 180000 },
    educationLevels: [
      "Bachelor's in Engineering/Environmental Science",
      "Master's in Sustainability",
    ],
    keySkills: [
      "Environmental science",
      "System design",
      "Project management",
      "Innovation",
      "Policy knowledge",
    ],
    workEnvironment:
      "Green energy companies, environmental orgs, startups; mission-driven",
    demandLevel: "Very High",
    entryPaths: [
      "Environmental science degree",
      "Engineering background + passion",
      "Sustainability bootcamp",
      "NGO experience",
    ],
  },
  {
    slug: "telecommunications",
    salaryRange: { min: 70000, max: 160000 },
    educationLevels: [
      "Bachelor's in Electrical Engineering",
      "Bachelor's in CS",
      "Network certifications",
    ],
    keySkills: [
      "Network architecture",
      "5G/6G knowledge",
      "Infrastructure design",
      "Troubleshooting",
      "Cybersecurity",
    ],
    workEnvironment:
      "Telecom companies, infrastructure providers; office and field work",
    demandLevel: "Growing",
    entryPaths: [
      "Engineering degree",
      "Network technician role",
      "IT background + specialization",
      "Technical certifications",
    ],
  },
  {
    slug: "biotech-pharma",
    salaryRange: { min: 75000, max: 200000 },
    educationLevels: [
      "Bachelor's in Biology/Chemistry",
      "Master's in Biotechnology",
      "PhD in related science",
    ],
    keySkills: [
      "Laboratory techniques",
      "Drug development",
      "Research design",
      "Regulatory knowledge",
      "Data analysis",
    ],
    workEnvironment:
      "Pharma companies, research labs, biotech startups; structured, regulated",
    demandLevel: "High",
    entryPaths: [
      "Science degree + lab internships",
      "PhD in biology/chemistry",
      "Pharmaceutical technician role",
      "Research assistant position",
    ],
  },
  {
    slug: "automotive",
    salaryRange: { min: 70000, max: 180000 },
    educationLevels: [
      "Bachelor's in Mechanical Engineering",
      "Bachelor's in Electrical Engineering",
    ],
    keySkills: [
      "CAD software",
      "Mechanical design",
      "EV technology",
      "Manufacturing",
      "Testing protocols",
    ],
    workEnvironment:
      "Auto manufacturers, EV startups, supplier companies; blend of office and lab",
    demandLevel: "High",
    entryPaths: [
      "Engineering degree + internship",
      "Manufacturing technician role",
      "Design engineer apprenticeship",
      "EV startup participation",
    ],
  },
  {
    slug: "retail-logistics",
    salaryRange: { min: 50000, max: 140000 },
    educationLevels: ["Bachelor's in Supply Chain", "High school + certifications"],
    keySkills: [
      "Supply chain management",
      "Inventory control",
      "Logistics software",
      "Leadership",
      "Process optimization",
    ],
    workEnvironment:
      "Retail companies, logistics firms, warehouses; mix of office and field",
    demandLevel: "High",
    entryPaths: [
      "Warehouse associate promotion",
      "Supply chain degree",
      "Logistics coordinator role",
      "Operations management background",
    ],
  },
  {
    slug: "digital-marketing",
    salaryRange: { min: 55000, max: 160000 },
    educationLevels: [
      "Bachelor's in Marketing/Communications",
      "Marketing bootcamp",
      "Self-taught with portfolio",
    ],
    keySkills: [
      "SEO/SEM",
      "Social media",
      "Analytics",
      "Content creation",
      "Copywriting",
    ],
    workEnvironment:
      "Marketing agencies, tech companies, e-commerce; creative and collaborative",
    demandLevel: "Very High",
    entryPaths: [
      "Marketing degree",
      "Social media coordinator role",
      "Marketing bootcamp",
      "Content creator portfolio",
    ],
  },
  {
    slug: "product-management",
    salaryRange: { min: 90000, max: 200000 },
    educationLevels: [
      "Bachelor's degree (any field)",
      "MBA optional",
      "Product bootcamp",
    ],
    keySkills: [
      "User research",
      "Product strategy",
      "Data analysis",
      "Leadership",
      "Communication",
    ],
    workEnvironment:
      "Tech companies, startups, enterprises; cross-functional collaboration",
    demandLevel: "Very High",
    entryPaths: [
      "APM (Associate PM) program",
      "Internal move from engineering/marketing",
      "Startup PM role",
      "Product bootcamp",
    ],
  },
  {
    slug: "real-estate",
    salaryRange: { min: 50000, max: 300000 },
    educationLevels: ["High school + real estate license", "Bachelor's degree"],
    keySkills: [
      "Client relationship",
      "Market analysis",
      "Negotiation",
      "Property valuation",
      "Sales",
    ],
    workEnvironment:
      "Real estate agencies, development firms, independent; variable schedule",
    demandLevel: "Moderate",
    entryPaths: [
      "Real estate license",
      "Real estate agent role",
      "Property management position",
      "Development company role",
    ],
  },
  {
    slug: "law-legal",
    salaryRange: { min: 70000, max: 250000 },
    educationLevels: ["Juris Doctor (JD)", "Bar exam passage"],
    keySkills: [
      "Legal research",
      "Writing",
      "Negotiation",
      "Case analysis",
      "Client management",
    ],
    workEnvironment: "Law firms, corporate legal, government; deadline-intensive",
    demandLevel: "Moderate",
    entryPaths: [
      "Law school graduate",
      "Law clerk position",
      "Corporate legal internship",
      "Government legal role",
    ],
  },
  {
    slug: "fashion-design",
    salaryRange: { min: 50000, max: 180000 },
    educationLevels: [
      "Bachelor's in Fashion Design",
      "Fashion design school",
      "Portfolio-based entry",
    ],
    keySkills: [
      "Pattern making",
      "Design software",
      "Trend forecasting",
      "Sketching",
      "Garment construction",
    ],
    workEnvironment:
      "Fashion houses, design studios, startups; creative and collaborative",
    demandLevel: "Moderate",
    entryPaths: [
      "Fashion design degree",
      "Design school graduate",
      "Fashion intern conversion",
      "Self-taught designer portfolio",
    ],
  },
  {
    slug: "human-resources",
    salaryRange: { min: 60000, max: 150000 },
    educationLevels: [
      "Bachelor's in HR/Business",
      "HR certification (SHRM, CIPD)",
    ],
    keySkills: [
      "Employee relations",
      "Recruiting",
      "Compliance",
      "Training & development",
      "Communication",
    ],
    workEnvironment:
      "All industries; corporate offices, mix of strategic and administrative work",
    demandLevel: "High",
    entryPaths: [
      "HR coordinator role",
      "HR degree + entry-level position",
      "SHRM certification",
      "Internal HR transition",
    ],
  },
  {
    slug: "architecture-planning",
    salaryRange: { min: 70000, max: 200000 },
    educationLevels: [
      "Bachelor's in Architecture",
      "Master's in Architecture",
      "Professional licensure",
    ],
    keySkills: [
      "Design software (CAD/BIM)",
      "Building codes",
      "Visualization",
      "Project management",
      "Client communication",
    ],
    workEnvironment:
      "Architecture firms, real estate development, design studios; creative and technical",
    demandLevel: "Moderate",
    entryPaths: [
      "Architecture degree + internship",
      "Design firm junior architect",
      "Engineering background + specialization",
      "Architectural technologist role",
    ],
  },
  {
    slug: "healthcare-management",
    salaryRange: { min: 70000, max: 180000 },
    educationLevels: ["Bachelor's in Healthcare Admin", "MBA with healthcare focus"],
    keySkills: [
      "Health policy",
      "Financial management",
      "Leadership",
      "HIPAA compliance",
      "Process improvement",
    ],
    workEnvironment:
      "Hospitals, clinics, insurance companies, health systems; structured, mission-driven",
    demandLevel: "High",
    entryPaths: [
      "Healthcare admin degree",
      "Clinical background + management training",
      "Healthcare MBA",
      "Hospital administration internship",
    ],
  },
  {
    slug: "hospitality-management",
    salaryRange: { min: 50000, max: 140000 },
    educationLevels: [
      "Bachelor's in Hospitality Management",
      "High school + on-the-job training",
    ],
    keySkills: [
      "Customer service",
      "Operations management",
      "Staff leadership",
      "Problem solving",
      "Financial management",
    ],
    workEnvironment:
      "Hotels, restaurants, event venues, travel companies; dynamic, guest-focused",
    demandLevel: "High",
    entryPaths: [
      "Front-line hospitality role + promotion",
      "Hospitality management degree",
      "Hotel management trainee program",
      "Culinary/events background",
    ],
  },
  {
    slug: "education-social-work",
    salaryRange: { min: 45000, max: 120000 },
    educationLevels: [
      "Bachelor's in Education/Social Work",
      "Master's in relevant field",
      "Teaching certification",
    ],
    keySkills: [
      "Communication",
      "Empathy",
      "Curriculum design",
      "Community engagement",
      "Crisis management",
    ],
    workEnvironment:
      "Schools, nonprofits, community centers, government agencies; rewarding, varied",
    demandLevel: "High",
    entryPaths: [
      "Education degree + certification",
      "Social work degree + licensing",
      "Teaching credential program",
      "Community organization role",
    ],
  },
  {
    slug: "creative-arts",
    salaryRange: { min: 40000, max: 200000 },
    educationLevels: [
      "Bachelor's in Fine Arts/MFA",
      "Portfolio-based",
      "Self-taught with experience",
    ],
    keySkills: [
      "Artistic ability",
      "Creativity",
      "Portfolio development",
      "Self-promotion",
      "Technical skills in medium",
    ],
    workEnvironment:
      "Studios, galleries, freelance, entertainment industry; highly variable",
    demandLevel: "Growing",
    entryPaths: [
      "Arts degree + portfolio",
      "Gallery/museum assistant role",
      "Freelance artist establishment",
      "Entertainment industry entry",
    ],
  },
];

// ============================================================================
// 5. ROULETTE FUN FACTS
// ============================================================================

export const rouletteFunFacts: Record<CareerSlug, string[]> = {
  "ai-data-science": [
    "Data scientists spend 80% of their time cleaning data, not modeling!",
    "The average data scientist changes jobs every 3-4 years due to high demand.",
    "AI/ML roles didn't exist 15 years ago—it's one of the newest career fields.",
  ],
  "software-development": [
    "There are more than 700 programming languages, but only ~10 are widely used.",
    "A single typo in code can crash an entire system—attention to detail matters!",
    "The first computer programmer was Ada Lovelace in 1843, over 100 years before modern computers.",
  ],
  fintech: [
    "Fintech has reduced the time to send international money from days to seconds.",
    "The global fintech market is projected to exceed $300 billion by 2025.",
    "Cryptocurrency engineers earn some of the highest salaries in tech ($200k+).",
  ],
  "business-entrepreneurship": [
    "90% of startups fail, but the other 10% can become billion-dollar companies.",
    "The average successful entrepreneur has started 3.8 businesses before their big success.",
    "Serial entrepreneurs have a 20% success rate vs 10% for first-timers.",
  ],
  "clean-tech": [
    "Solar panel costs have dropped 90% in the last 10 years—making clean energy competitive.",
    "A wind turbine produces about 5,000 tonnes of CO2 equivalent offset in its lifetime.",
    "Electric vehicles now cost less to operate than gas cars when you include maintenance.",
  ],
  telecommunications: [
    "5G networks are 100x faster than 4G and pave the way for autonomous vehicles.",
    "The first mobile phone call was made in 1973—only 50 years ago!",
    "Submarine cables carry 99% of intercontinental data traffic, buried under oceans.",
  ],
  "biotech-pharma": [
    "It takes 10-15 years and $2.6 billion to bring a single drug to market.",
    "CRISPR gene editing technology has won Nobel Prizes and revolutionized medicine.",
    "mRNA vaccine technology (COVID) was developed decades before being needed.",
  ],
  automotive: [
    "Electric vehicles have fewer moving parts (20 vs 2,000), so less can break.",
    "Tesla produced the first mass-market EV with 300+ mile range in 2012.",
    "Self-driving cars must process 1 terabyte of sensor data per 8 hours of driving.",
  ],
  "retail-logistics": [
    "Amazon's supply chain processes 1.7 million parcels per day globally.",
    "Last-mile delivery accounts for 53% of total shipping costs.",
    "Autonomous drones are being tested for package delivery in remote areas.",
  ],
  "digital-marketing": [
    "TikTok became a $75B company in just 7 years—faster than any previous company.",
    "Instagram influencers can earn $10,000+ per post with engaged audiences.",
    "Video marketing generates 1200% more shares than text and images combined.",
  ],
  "product-management": [
    "Product managers are often called 'mini-CEOs' of their product.",
    "80% of product success comes from user research, not from gut instinct.",
    "The average PM juggles 15+ projects and stakeholder groups simultaneously.",
  ],
  "real-estate": [
    "Real estate accounts for 29% of the world's total asset value.",
    "The median home price increased 100% over the past 10 years in many markets.",
    "Real estate agents with social media presence earn 40% more than those without.",
  ],
  "law-legal": [
    "The first lawyer in America graduated in 1688—nearly 100 years after colonization.",
    "Legal AI is now automating contract review, saving lawyers thousands of hours.",
    "Entertainment lawyers negotiate deals for celebrities worth hundreds of millions.",
  ],
  "fashion-design": [
    "Fashion design school graduates have a 70% employment rate within 6 months.",
    "A single fashion show can cost $500K-$5M to produce for established brands.",
    "Sustainable fashion is growing 3x faster than the traditional fashion industry.",
  ],
  "human-resources": [
    "HR professionals reduce employee turnover by 25% on average.",
    "HR tech platforms now use AI to predict which employees might leave.",
    "Companies with strong HR cultures have 22% lower turnover.",
  ],
  "architecture-planning": [
    "The tallest building in the world (Burj Khalifa) took 6 years and 22,000 workers.",
    "BIM (Building Information Modeling) can save construction projects 20% on costs.",
    "Architects must consider climate, culture, and sustainability in every design.",
  ],
  "healthcare-management": [
    "Healthcare administrators manage budgets that can exceed $1 billion annually.",
    "Patient experience improvements directly correlate with hospital ratings and revenue.",
    "The healthcare industry is the #2 employer in the US with 20M+ jobs.",
  ],
  "hospitality-management": [
    "Hotel managers work all shifts, including nights, weekends, and holidays.",
    "A 5-star hotel can charge $500+ per night and still have high demand.",
    "Hospitality now embraces AI chatbots for 24/7 customer service.",
  ],
  "education-social-work": [
    "Teachers earn 20% less than college graduates in other fields, yet report high satisfaction.",
    "Social workers help over 20 million people annually in the US.",
    "EdTech startups are disrupting education faster than traditional institutions adapt.",
  ],
  "creative-arts": [
    "Artists who build personal brands online can reach millions of fans globally.",
    "NFTs have created a new revenue stream for digital artists ($25B market in 2021).",
    "Creative industries generate $2.25 trillion in global economic value annually.",
  ],
};
