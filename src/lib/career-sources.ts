/**
 * Career Content & Job Sources Configuration
 * Maps each of CT's 20 career sectors to:
 *   - RSS feeds for the "Latest" tab (Global + India/Asia)
 *   - Job API search keywords for the "Earn Now" tab
 *   - Content tags for API queries (Dev.to, Medium, NewsAPI)
 *
 * India/Asia sources are marked with region: "india" | "asia"
 * Global sources use region: "global" (default)
 */

import type { CareerSlug, Cluster } from "./career-config";

// ─── Types ───────────────────────────────────────────────────────────

export interface RSSFeedSource {
  url: string;
  name: string;
  type: "news" | "tutorial" | "opinion" | "career" | "community";
  /** Expected update cadence */
  frequency: "multiple-daily" | "daily" | "weekly";
  /** Audience region — used for future filtering */
  region?: "global" | "india" | "asia";
}

export interface JobSearchKeywords {
  /** Primary keywords sent to job APIs (OR-joined) */
  primary: string[];
  /** India-specific keywords (may include Hindi industry terms) */
  india?: string[];
  /** Negative keywords to exclude irrelevant results */
  exclude?: string[];
  /** Remotive API category slug (if applicable) */
  remotiveCategory?: string;
  /** Adzuna category tag */
  adzunaCategory?: string;
  /** Adzuna countries to query (default: ["us", "in"]) */
  adzunaCountries?: string[];
}

export interface ContentTags {
  /** Dev.to tags */
  devto: string[];
  /** Medium tags (used in RSS: medium.com/feed/tag/TAG) */
  medium: string[];
  /** NewsAPI query string */
  newsapiQuery: string;
  /** Reddit subreddits (without r/) */
  subreddits: string[];
}

export interface CareerSourceConfig {
  slug: CareerSlug;
  cluster: Cluster;
  feeds: RSSFeedSource[];
  jobKeywords: JobSearchKeywords;
  contentTags: ContentTags;
}

// ─── Source Configs for all 20 Careers ───────────────────────────────

export const careerSources: Record<CareerSlug, CareerSourceConfig> = {
  // ═══════════════════════════════════════════════════════
  // TECH & DATA CLUSTER
  // ═══════════════════════════════════════════════════════

  "ai-data-science": {
    slug: "ai-data-science",
    cluster: "tech",
    feeds: [
      // Global
      { url: "https://www.kdnuggets.com/feed", name: "KDnuggets", type: "tutorial", frequency: "daily" },
      { url: "https://dev.to/feed/tag/ai", name: "Dev.to AI", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://dev.to/feed/tag/machinelearning", name: "Dev.to ML", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/artificialintelligence", name: "Medium AI", type: "opinion", frequency: "multiple-daily" },
      { url: "https://research.google/blog/feed.xml", name: "Google Research", type: "news", frequency: "weekly" },
      // India / Asia
      { url: "https://yourstory.com/feed", name: "YourStory", type: "news", frequency: "daily", region: "india" },
      { url: "https://inc42.com/feed/", name: "Inc42", type: "news", frequency: "daily", region: "india" },
      { url: "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms", name: "ET Tech", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["data scientist", "machine learning engineer", "AI engineer", "data analyst", "NLP engineer"],
      india: ["data scientist India", "ML engineer Bangalore", "AI engineer remote India"],
      exclude: ["senior director", "VP"],
      remotiveCategory: "ai-ml",
      adzunaCategory: "it-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["ai", "machinelearning", "datascience", "python"],
      medium: ["artificialintelligence", "datascience", "machinelearning"],
      newsapiQuery: "artificial intelligence OR machine learning OR data science",
      subreddits: ["MachineLearning", "datascience", "artificial", "developersIndia"],
    },
  },

  "software-development": {
    slug: "software-development",
    cluster: "tech",
    feeds: [
      // Global
      { url: "https://github.blog/feed/", name: "GitHub Blog", type: "news", frequency: "weekly" },
      { url: "https://dev.to/feed/tag/webdev", name: "Dev.to Web Dev", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://dev.to/feed/tag/javascript", name: "Dev.to JavaScript", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://www.freecodecamp.org/news/rss/", name: "freeCodeCamp", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/softwaredevelopment", name: "Medium Software", type: "opinion", frequency: "multiple-daily" },
      // India / Asia
      { url: "https://yourstory.com/feed", name: "YourStory", type: "news", frequency: "daily", region: "india" },
      { url: "https://inc42.com/feed/", name: "Inc42", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["software developer", "software engineer", "full stack developer", "frontend developer", "backend developer", "mobile developer"],
      india: ["software engineer India", "full stack developer Hyderabad", "React developer Pune"],
      remotiveCategory: "software-development",
      adzunaCategory: "it-jobs",
      adzunaCountries: ["us", "in", "gb", "sg", "au"],
    },
    contentTags: {
      devto: ["webdev", "javascript", "react", "typescript", "devops"],
      medium: ["softwaredevelopment", "programming", "javascript"],
      newsapiQuery: "software development OR programming OR web development",
      subreddits: ["programming", "webdev", "learnprogramming", "developersIndia"],
    },
  },

  "fintech": {
    slug: "fintech",
    cluster: "tech",
    feeds: [
      // Global
      { url: "https://www.finextra.com/rss/rss.aspx", name: "Finextra", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/fintech", name: "Dev.to FinTech", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/fintech", name: "Medium FinTech", type: "opinion", frequency: "multiple-daily" },
      { url: "https://blog.stripe.com/feed.xml", name: "Stripe Blog", type: "news", frequency: "weekly" },
      { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", name: "CoinDesk", type: "news", frequency: "multiple-daily" },
      // India — UPI, digital payments, RBI fintech ecosystem
      { url: "https://inc42.com/feed/", name: "Inc42", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.livemint.com/rss/companies", name: "LiveMint Companies", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["fintech", "financial analyst", "blockchain developer", "payments engineer", "quantitative analyst"],
      india: ["fintech India", "payments engineer UPI", "financial analyst Mumbai"],
      remotiveCategory: "finance",
      adzunaCategory: "accounting-finance-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["fintech", "blockchain", "cryptocurrency"],
      medium: ["fintech", "blockchain", "cryptocurrency"],
      newsapiQuery: "fintech OR financial technology OR digital payments OR blockchain",
      subreddits: ["fintech", "CryptoCurrency", "IndiaInvestments"],
    },
  },

  "telecommunications": {
    slug: "telecommunications",
    cluster: "tech",
    feeds: [
      // Global
      { url: "https://feeds.arstechnica.com/arstechnica/index", name: "Ars Technica", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/networking", name: "Dev.to Networking", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/telecommunication", name: "Medium Telecom", type: "opinion", frequency: "multiple-daily" },
      { url: "https://blog.google/feed/", name: "Google Blog", type: "news", frequency: "weekly" },
      // India — Jio, Airtel, TRAI, 5G rollout
      { url: "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms", name: "ET Tech", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["network engineer", "telecommunications", "5G engineer", "RF engineer", "telecom analyst"],
      india: ["telecom engineer India", "network engineer Jio", "5G engineer Airtel"],
      remotiveCategory: "devops",
      adzunaCategory: "it-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["networking", "devops", "cloud"],
      medium: ["telecommunication", "5g", "networking"],
      newsapiQuery: "telecommunications OR 5G network OR telecom industry",
      subreddits: ["telecom", "networking", "india"],
    },
  },

  "product-management": {
    slug: "product-management",
    cluster: "tech",
    feeds: [
      // Global
      { url: "https://www.mindtheproduct.com/feed/", name: "Mind the Product", type: "career", frequency: "weekly" },
      { url: "https://www.producttalk.org/feed/", name: "Product Talk", type: "tutorial", frequency: "weekly" },
      { url: "https://dev.to/feed/tag/productmanagement", name: "Dev.to PM", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/productmanagement", name: "Medium PM", type: "opinion", frequency: "multiple-daily" },
      { url: "https://www.producthunt.com/feed", name: "Product Hunt", type: "news", frequency: "daily" },
      // India — PM is huge in India's startup ecosystem
      { url: "https://inc42.com/feed/", name: "Inc42", type: "news", frequency: "daily", region: "india" },
      { url: "https://yourstory.com/feed", name: "YourStory", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["product manager", "technical product manager", "product analyst", "product owner", "product lead"],
      india: ["product manager India", "APM Bangalore", "product analyst startup India"],
      remotiveCategory: "product",
      adzunaCategory: "it-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["productmanagement", "agile", "startup"],
      medium: ["productmanagement", "product", "agile"],
      newsapiQuery: "product management OR product strategy OR product manager",
      subreddits: ["productmanagement", "ProductManagement"],
    },
  },

  // ═══════════════════════════════════════════════════════
  // BUSINESS & COMMERCE CLUSTER
  // ═══════════════════════════════════════════════════════

  "business-entrepreneurship": {
    slug: "business-entrepreneurship",
    cluster: "business",
    feeds: [
      // Global
      { url: "https://entrepreneur.com/latest.rss", name: "Entrepreneur", type: "career", frequency: "daily" },
      { url: "https://www.fastcompany.com/feed", name: "Fast Company", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/entrepreneurship", name: "Dev.to Startups", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/entrepreneurship", name: "Medium Startups", type: "opinion", frequency: "multiple-daily" },
      { url: "https://techcrunch.com/category/startups/feed/", name: "TechCrunch Startups", type: "news", frequency: "multiple-daily" },
      // India — Startup India, D2C brands, funding rounds
      { url: "https://yourstory.com/feed", name: "YourStory", type: "news", frequency: "daily", region: "india" },
      { url: "https://inc42.com/feed/", name: "Inc42", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.livemint.com/rss/companies", name: "LiveMint Companies", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["business analyst", "management consultant", "business development", "strategy analyst", "operations manager"],
      india: ["business analyst India", "management consultant Deloitte India", "BDE startup India"],
      remotiveCategory: "business",
      adzunaCategory: "consultancy-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["entrepreneurship", "startup", "business"],
      medium: ["entrepreneurship", "startup", "business"],
      newsapiQuery: "entrepreneurship OR startup funding OR business strategy",
      subreddits: ["Entrepreneur", "startups", "IndiaInvestments"],
    },
  },

  "retail-logistics": {
    slug: "retail-logistics",
    cluster: "business",
    feeds: [
      // Global
      { url: "https://www.supplychainbrain.com/rss", name: "SupplyChainBrain", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/logistics", name: "Dev.to Logistics", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/supplychain", name: "Medium Supply Chain", type: "opinion", frequency: "multiple-daily" },
      { url: "https://techcrunch.com/category/startups/feed/", name: "TechCrunch Startups", type: "news", frequency: "multiple-daily" },
      // India — quick commerce, D2C, kirana digitization
      { url: "https://retail.economictimes.indiatimes.com/rss/topstories", name: "ET Retail", type: "news", frequency: "daily", region: "india" },
      { url: "https://inc42.com/feed/", name: "Inc42 (D2C/eComm)", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["supply chain manager", "logistics analyst", "e-commerce manager", "warehouse manager", "retail operations"],
      india: ["supply chain manager India", "ecommerce operations Flipkart", "logistics Delhivery", "quick commerce Zepto"],
      remotiveCategory: "business",
      adzunaCategory: "logistics-warehouse-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["logistics", "ecommerce"],
      medium: ["supplychain", "ecommerce", "logistics"],
      newsapiQuery: "supply chain OR retail logistics OR e-commerce operations OR quick commerce India",
      subreddits: ["supplychain", "ecommerce", "india"],
    },
  },

  "digital-marketing": {
    slug: "digital-marketing",
    cluster: "business",
    feeds: [
      // Global
      { url: "https://www.searchenginejournal.com/feed/", name: "Search Engine Journal", type: "news", frequency: "daily" },
      { url: "https://feeds.feedburner.com/TechCrunch/startups", name: "TechCrunch Startups", type: "news", frequency: "multiple-daily" },
      { url: "https://dev.to/feed/tag/marketing", name: "Dev.to Marketing", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/marketing", name: "Medium Marketing", type: "opinion", frequency: "multiple-daily" },
      { url: "https://www.contentmarketinginstitute.com/feed/", name: "CMI", type: "tutorial", frequency: "weekly" },
      // India — digital marketing is a massive career track in India
      { url: "https://yourstory.com/feed", name: "YourStory", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["digital marketing", "SEO specialist", "content marketing", "social media manager", "growth marketing"],
      india: ["digital marketing India", "SEO specialist Delhi", "social media manager startup"],
      remotiveCategory: "marketing",
      adzunaCategory: "marketing-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["marketing", "seo", "contentmarketing"],
      medium: ["marketing", "digitalmarketing", "seo"],
      newsapiQuery: "digital marketing OR SEO OR content marketing OR social media marketing",
      subreddits: ["marketing", "SEO", "digital_marketing"],
    },
  },

  "real-estate": {
    slug: "real-estate",
    cluster: "business",
    feeds: [
      // Global
      { url: "https://www.realtor.com/news/rss/", name: "Realtor.com", type: "news", frequency: "daily" },
      { url: "https://medium.com/feed/tag/realestate", name: "Medium Real Estate", type: "opinion", frequency: "multiple-daily" },
      { url: "https://dev.to/feed/tag/realestate", name: "Dev.to PropTech", type: "tutorial", frequency: "multiple-daily" },
      // India — RERA, co-living, tier-2 city boom, Housing.com, 99acres
      { url: "https://realty.economictimes.indiatimes.com/rss/topstories", name: "ET Realty", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.livemint.com/rss/companies", name: "LiveMint", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["real estate analyst", "property manager", "real estate agent", "proptech", "real estate investment"],
      india: ["real estate analyst India", "property manager Mumbai", "RERA consultant", "proptech India"],
      adzunaCategory: "property-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["realestate"],
      medium: ["realestate", "proptech"],
      newsapiQuery: "real estate market OR proptech OR RERA India OR commercial real estate",
      subreddits: ["realestate", "IndiaRealEstate"],
    },
  },

  "hospitality-management": {
    slug: "hospitality-management",
    cluster: "business",
    feeds: [
      // Global
      { url: "https://www.hospitalitynet.org/rss", name: "Hospitality Net", type: "news", frequency: "daily" },
      { url: "https://medium.com/feed/tag/hospitality", name: "Medium Hospitality", type: "opinion", frequency: "multiple-daily" },
      { url: "https://techcrunch.com/feed/", name: "TechCrunch", type: "news", frequency: "multiple-daily" },
      // India — IHMs, tourism ministry, hotel chains expanding
      { url: "https://hospitality.economictimes.indiatimes.com/rss/topstories", name: "ET Hospitality", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["hotel manager", "hospitality manager", "event manager", "tourism", "restaurant manager"],
      india: ["hotel management India", "IHM placement", "hospitality manager Taj", "tourism India"],
      adzunaCategory: "hospitality-catering-jobs",
      adzunaCountries: ["us", "in", "gb", "au"],
    },
    contentTags: {
      devto: [],
      medium: ["hospitality", "hotelmanagement", "tourism"],
      newsapiQuery: "hospitality management OR hotel industry OR India tourism",
      subreddits: ["Hospitality", "india"],
    },
  },

  // ═══════════════════════════════════════════════════════
  // SCIENCE & HEALTH CLUSTER
  // ═══════════════════════════════════════════════════════

  "clean-tech": {
    slug: "clean-tech",
    cluster: "science",
    feeds: [
      // Global
      { url: "https://cleantechnica.com/feed", name: "CleanTechnica", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/sustainability", name: "Dev.to Sustainability", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/greentech", name: "Medium GreenTech", type: "opinion", frequency: "multiple-daily" },
      { url: "https://inhabitat.com/feed/", name: "Inhabitat", type: "news", frequency: "daily" },
      // India — solar boom, green hydrogen, EV policy
      { url: "https://www.livemint.com/rss/companies", name: "LiveMint", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["renewable energy", "sustainability consultant", "environmental engineer", "solar engineer", "clean energy"],
      india: ["solar engineer India", "sustainability consultant NTPC", "green energy India"],
      adzunaCategory: "energy-oil-gas-jobs",
      adzunaCountries: ["us", "in", "gb", "au"],
    },
    contentTags: {
      devto: ["sustainability", "greentech"],
      medium: ["greentech", "renewableenergy", "sustainability"],
      newsapiQuery: "clean energy OR renewable energy OR solar India OR green hydrogen",
      subreddits: ["renewable", "energy", "india"],
    },
  },

  "biotech-pharma": {
    slug: "biotech-pharma",
    cluster: "science",
    feeds: [
      // Global
      { url: "https://www.fiercebiotech.com/rss/xml", name: "Fierce Biotech", type: "news", frequency: "daily" },
      { url: "https://www.fiercepharma.com/rss/xml", name: "Fierce Pharma", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/bioinformatics", name: "Dev.to Bioinfo", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/biotechnology", name: "Medium Biotech", type: "opinion", frequency: "multiple-daily" },
      // India — pharma hub (generics, CDMO), Biocon, Serum Institute
      { url: "https://health.economictimes.indiatimes.com/rss/topstories", name: "ET Healthworld", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.expresshealthcare.in/feed/", name: "Express Healthcare", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["biotech researcher", "pharmaceutical", "clinical research", "bioinformatics", "regulatory affairs"],
      india: ["pharma India", "clinical research associate Hyderabad", "biotech Bangalore", "CDMO India"],
      adzunaCategory: "scientific-qa-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["bioinformatics", "science"],
      medium: ["biotechnology", "pharmaceuticals", "genomics"],
      newsapiQuery: "biotechnology OR pharmaceutical OR India pharma OR clinical trials",
      subreddits: ["biotech", "pharmacy", "india"],
    },
  },

  "automotive": {
    slug: "automotive",
    cluster: "science",
    feeds: [
      // Global
      { url: "https://www.greencarreports.com/rss/reviews", name: "Green Car Reports", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/iot", name: "Dev.to IoT", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/electricvehicles", name: "Medium EVs", type: "opinion", frequency: "multiple-daily" },
      { url: "https://techcrunch.com/feed/", name: "TechCrunch", type: "news", frequency: "multiple-daily" },
      // India — EV revolution (Ather, Ola Electric, Tata), FAME subsidy
      { url: "https://inc42.com/feed/", name: "Inc42 (EV/Auto)", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.livemint.com/rss/companies", name: "LiveMint", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["automotive engineer", "EV engineer", "autonomous driving", "automotive designer", "vehicle systems"],
      india: ["EV engineer India", "automotive Tata Motors", "electric vehicle Ather Ola"],
      adzunaCategory: "engineering-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["iot", "embedded", "automotive"],
      medium: ["electricvehicles", "autonomous", "automotive"],
      newsapiQuery: "electric vehicles OR autonomous driving OR India EV policy",
      subreddits: ["electricvehicles", "CarsIndia", "india"],
    },
  },

  "healthcare-management": {
    slug: "healthcare-management",
    cluster: "science",
    feeds: [
      // Global
      { url: "https://www.healthcaredive.com/feeds/news/", name: "Healthcare Dive", type: "news", frequency: "daily" },
      { url: "https://www.fiercehealthcare.com/rss/xml", name: "Fierce Healthcare", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/healthcare", name: "Dev.to Healthcare", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/healthcare", name: "Medium Healthcare", type: "opinion", frequency: "multiple-daily" },
      // India — AIIMS, Ayushman Bharat, telemedicine, hospital chains
      { url: "https://health.economictimes.indiatimes.com/rss/topstories", name: "ET Healthworld", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.expresshealthcare.in/feed/", name: "Express Healthcare", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["healthcare manager", "hospital administrator", "health informatics", "clinical manager", "public health"],
      india: ["hospital administrator India", "health informatics Apollo", "public health India", "AIIMS"],
      adzunaCategory: "healthcare-nursing-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["healthcare", "healthtech"],
      medium: ["healthcare", "healthtech", "publichealth"],
      newsapiQuery: "healthcare management OR health informatics OR Ayushman Bharat OR hospital India",
      subreddits: ["healthIT", "india"],
    },
  },

  // ═══════════════════════════════════════════════════════
  // PEOPLE & CREATIVE CLUSTER
  // ═══════════════════════════════════════════════════════

  "law-legal": {
    slug: "law-legal",
    cluster: "creative",
    feeds: [
      // Global
      { url: "https://www.abajournal.com/feed", name: "ABA Journal", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/legal", name: "Dev.to Legal Tech", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/law", name: "Medium Law", type: "opinion", frequency: "multiple-daily" },
      // India — Supreme Court, NCLT, corporate law, NLU ecosystem
      { url: "https://www.barandbench.com/feed", name: "Bar & Bench", type: "news", frequency: "daily", region: "india" },
      { url: "https://www.livemint.com/rss/companies", name: "LiveMint (Legal/Corp)", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["lawyer", "paralegal", "legal analyst", "legal tech", "compliance officer", "corporate counsel"],
      india: ["advocate India", "corporate lawyer Delhi", "legal associate Tier 1 firm", "CLAT", "NLU placement"],
      remotiveCategory: "legal",
      adzunaCategory: "legal-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["legal", "legaltech"],
      medium: ["law", "legaltech", "justice"],
      newsapiQuery: "legal technology OR India Supreme Court OR law firm OR legal industry",
      subreddits: ["law", "LegalAdviceIndia", "india"],
    },
  },

  "fashion-design": {
    slug: "fashion-design",
    cluster: "creative",
    feeds: [
      // Global
      { url: "https://www.dezeen.com/feed/", name: "Dezeen", type: "news", frequency: "daily" },
      { url: "https://glossy.co/rss.xml", name: "Glossy", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/fashion", name: "Dev.to Fashion", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/fashion", name: "Medium Fashion", type: "opinion", frequency: "multiple-daily" },
      // India — textile hub, NIFT, Lakme Fashion Week, sustainable fashion
      { url: "https://yourstory.com/feed", name: "YourStory (D2C Fashion)", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["fashion designer", "textile designer", "fashion buyer", "fashion tech", "apparel designer"],
      india: ["fashion designer India", "NIFT placement", "textile designer Surat", "fashion buyer Myntra"],
      adzunaCategory: "creative-design-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["fashion"],
      medium: ["fashion", "fashiondesign", "fashiontech"],
      newsapiQuery: "fashion design OR fashion technology OR sustainable fashion OR India fashion",
      subreddits: ["fashion", "india"],
    },
  },

  "human-resources": {
    slug: "human-resources",
    cluster: "creative",
    feeds: [
      // Global
      { url: "https://www.hrdive.com/feeds/news/", name: "HR Dive", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/hr", name: "Dev.to HR", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/humanresources", name: "Medium HR", type: "opinion", frequency: "multiple-daily" },
      { url: "https://www.workable.com/blog/feed", name: "Workable Blog", type: "career", frequency: "weekly" },
      // India — campus hiring, labour law, People Matters India
      { url: "https://hr.economictimes.indiatimes.com/rss/topstories", name: "ETHRWorld", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["human resources", "HR business partner", "talent acquisition", "people operations", "recruiter"],
      india: ["HR manager India", "talent acquisition Bangalore", "campus recruiter", "HRBP India"],
      remotiveCategory: "human-resources",
      adzunaCategory: "hr-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["hr", "hiring"],
      medium: ["humanresources", "hr", "recruitment"],
      newsapiQuery: "human resources OR talent acquisition OR HR technology OR India hiring",
      subreddits: ["humanresources", "india"],
    },
  },

  "architecture-planning": {
    slug: "architecture-planning",
    cluster: "creative",
    feeds: [
      // Global
      { url: "https://www.dezeen.com/feed/", name: "Dezeen", type: "news", frequency: "daily" },
      { url: "https://www.archdaily.com/feed", name: "ArchDaily", type: "news", frequency: "multiple-daily" },
      { url: "https://inhabitat.com/feed/", name: "Inhabitat", type: "news", frequency: "daily" },
      { url: "https://medium.com/feed/tag/architecture", name: "Medium Architecture", type: "opinion", frequency: "multiple-daily" },
      // India — Smart Cities Mission, RERA, sustainable tropical design
      { url: "https://realty.economictimes.indiatimes.com/rss/topstories", name: "ET Realty (Arch)", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["architect", "urban planner", "interior designer", "landscape architect", "BIM specialist"],
      india: ["architect India", "urban planner Smart Cities", "interior designer Mumbai", "BIM India"],
      adzunaCategory: "creative-design-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["architecture"],
      medium: ["architecture", "urbandesign", "interiordesign"],
      newsapiQuery: "architecture design OR urban planning OR Smart Cities India",
      subreddits: ["architecture", "india"],
    },
  },

  "education-social-work": {
    slug: "education-social-work",
    cluster: "creative",
    feeds: [
      // Global
      { url: "https://www.insidehighered.com/rss.xml", name: "Inside Higher Ed", type: "news", frequency: "multiple-daily" },
      { url: "https://dev.to/feed/tag/education", name: "Dev.to Education", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/education", name: "Medium Education", type: "opinion", frequency: "multiple-daily" },
      // India — NEP 2020, edtech, Byju's/Unacademy, UPSC, competitive exams
      { url: "https://yourstory.com/feed", name: "YourStory (EdTech)", type: "news", frequency: "daily", region: "india" },
      { url: "https://inc42.com/feed/", name: "Inc42 (EdTech)", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["teacher", "education coordinator", "social worker", "school counselor", "edtech", "curriculum developer"],
      india: ["teacher India", "edtech India", "education counselor", "NEP coordinator", "Teach for India"],
      remotiveCategory: "education",
      adzunaCategory: "teaching-jobs",
      adzunaCountries: ["us", "in", "gb"],
    },
    contentTags: {
      devto: ["education", "edtech"],
      medium: ["education", "teaching", "socialwork"],
      newsapiQuery: "education technology OR India NEP OR edtech OR teaching",
      subreddits: ["education", "india", "indianacademia"],
    },
  },

  "creative-arts": {
    slug: "creative-arts",
    cluster: "creative",
    feeds: [
      // Global
      { url: "https://www.creativebloq.com/feed", name: "Creative Bloq", type: "news", frequency: "daily" },
      { url: "https://www.dezeen.com/feed/", name: "Dezeen", type: "news", frequency: "daily" },
      { url: "https://dev.to/feed/tag/design", name: "Dev.to Design", type: "tutorial", frequency: "multiple-daily" },
      { url: "https://medium.com/feed/tag/design", name: "Medium Design", type: "opinion", frequency: "multiple-daily" },
      // India — design is booming (NID, Srishti, Indian UX community)
      { url: "https://yourstory.com/feed", name: "YourStory (Design)", type: "news", frequency: "daily", region: "india" },
    ],
    jobKeywords: {
      primary: ["UX designer", "UI designer", "graphic designer", "art director", "motion designer", "creative director"],
      india: ["UX designer India", "UI designer Bangalore", "graphic designer Flipkart", "NID placement"],
      remotiveCategory: "design",
      adzunaCategory: "creative-design-jobs",
      adzunaCountries: ["us", "in", "gb", "sg"],
    },
    contentTags: {
      devto: ["design", "ux", "ui", "css"],
      medium: ["design", "uxdesign", "graphicdesign"],
      newsapiQuery: "UX design OR graphic design OR creative arts OR India design",
      subreddits: ["graphic_design", "UXDesign", "developersIndia"],
    },
  },
};

// ─── Helper Functions ────────────────────────────────────────────────

/** Get all sources for a specific career */
export function getSourcesForCareer(slug: CareerSlug): CareerSourceConfig {
  return careerSources[slug];
}

/** Get all RSS feed URLs for a career (flat list) */
export function getFeedURLs(slug: CareerSlug): string[] {
  return careerSources[slug].feeds.map((f) => f.url);
}

/** Get feeds filtered by region */
export function getFeedsByRegion(slug: CareerSlug, region?: "global" | "india" | "asia"): RSSFeedSource[] {
  const feeds = careerSources[slug].feeds;
  if (!region) return feeds; // return all
  return feeds.filter((f) => (f.region || "global") === region);
}

/** Get job search keywords for a career */
export function getJobKeywords(slug: CareerSlug): string[] {
  return careerSources[slug].jobKeywords.primary;
}

/** Get India-specific job keywords */
export function getIndiaJobKeywords(slug: CareerSlug): string[] {
  return careerSources[slug].jobKeywords.india || careerSources[slug].jobKeywords.primary;
}

/** Get all careers in a cluster with their sources */
export function getSourcesByCluster(cluster: Cluster): CareerSourceConfig[] {
  return Object.values(careerSources).filter((s) => s.cluster === cluster);
}

/** Get Adzuna countries for a career (defaults to US + India) */
export function getAdzunaCountries(slug: CareerSlug): string[] {
  return careerSources[slug].jobKeywords.adzunaCountries || ["us", "in"];
}
