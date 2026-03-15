import type { CareerSlug, Cluster } from "./career-config";

// ============================================================================
// STREAM & SUBJECT TYPES
// ============================================================================

export type StreamId =
  | "science-pcm"
  | "science-pcb"
  | "science-pcmb"
  | "commerce-math"
  | "commerce"
  | "humanities"
  | "vocational";

export interface SubjectStream {
  id: StreamId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  coreSubjects: string[];
  optionalSubjects: string[];
  entranceExams: string[];
  careerPaths: CareerSlug[];
}

// ============================================================================
// CAREER PROGRESSION TYPES
// ============================================================================

export type ProgressionContext = "india" | "global";

export interface CareerStage {
  stage: number;
  title: string;
  yearRange: string;
  salary: { india: string; global: string };
  keySkills: string[];
  description: string;
  milestone: string;
}

export interface SpecializationOption {
  label: string;
  icon: string;
  description: string;
  stages: CareerStage[];
}

export interface SpecializationFork {
  question: string;
  options: SpecializationOption[];
}

export interface CareerProgression {
  slug: CareerSlug;
  stages: CareerStage[];
  fork: SpecializationFork;
  topCompanies: { india: string[]; global: string[] };
  educationPath: { india: string; global: string };
}

// ============================================================================
// SUBJECT STREAMS DATA
// ============================================================================

export const subjectStreams: SubjectStream[] = [
  {
    id: "science-pcm",
    name: "Science (PCM)",
    shortName: "PCM",
    icon: "🧮",
    color: "#3B82F6",
    description:
      "Physics, Chemistry, Mathematics focus for engineering and technology careers",
    coreSubjects: ["Physics", "Chemistry", "Mathematics"],
    optionalSubjects: ["Computer Science", "Economics", "Information Technology"],
    entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "NDA"],
    careerPaths: [
      "ai-data-science",
      "software-development",
      "fintech",
      "clean-tech",
      "telecommunications",
      "automotive",
      "architecture-planning",
      "product-management",
    ],
  },
  {
    id: "science-pcb",
    name: "Science (PCB)",
    shortName: "PCB",
    icon: "🧬",
    color: "#10B981",
    description:
      "Physics, Chemistry, Biology focus for medical and life sciences careers",
    coreSubjects: ["Physics", "Chemistry", "Biology"],
    optionalSubjects: ["Psychology", "Biotechnology"],
    entranceExams: ["NEET", "AIIMS", "JIPMER", "AFMC"],
    careerPaths: ["biotech-pharma", "healthcare-management"],
  },
  {
    id: "science-pcmb",
    name: "Science (PCMB)",
    shortName: "PCMB",
    icon: "🔬",
    color: "#8B5CF6",
    description:
      "All sciences combined for maximum flexibility across engineering, medicine, and research",
    coreSubjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    optionalSubjects: ["Computer Science", "Psychology", "Biotechnology"],
    entranceExams: ["JEE", "NEET", "BITSAT", "VITEEE", "AIIMS"],
    careerPaths: [
      "ai-data-science",
      "software-development",
      "fintech",
      "clean-tech",
      "telecommunications",
      "automotive",
      "biotech-pharma",
      "healthcare-management",
      "architecture-planning",
      "product-management",
    ],
  },
  {
    id: "commerce-math",
    name: "Commerce (with Maths)",
    shortName: "Commerce + Maths",
    icon: "📊",
    color: "#F59E0B",
    description: "Accounting, Business, Economics, and Mathematics for finance-focused careers",
    coreSubjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    optionalSubjects: ["Informatics Practices", "Legal Studies"],
    entranceExams: ["CA Foundation", "CMA Foundation", "CS Foundation", "CUET"],
    careerPaths: [
      "fintech",
      "business-entrepreneurship",
      "retail-logistics",
      "real-estate",
      "product-management",
      "digital-marketing",
    ],
  },
  {
    id: "commerce",
    name: "Commerce (without Maths)",
    shortName: "Commerce",
    icon: "💼",
    color: "#F97316",
    description: "Accounting, Business, and Economics for business and management careers",
    coreSubjects: ["Accountancy", "Business Studies", "Economics"],
    optionalSubjects: ["Informatics Practices", "Legal Studies"],
    entranceExams: ["CA Foundation", "CS Foundation", "CUET"],
    careerPaths: [
      "business-entrepreneurship",
      "retail-logistics",
      "human-resources",
      "hospitality-management",
      "digital-marketing",
      "real-estate",
    ],
  },
  {
    id: "humanities",
    name: "Humanities / Arts",
    shortName: "Humanities",
    icon: "📚",
    color: "#EC4899",
    description:
      "History, Politics, Sociology, and Languages for law, education, and social impact careers",
    coreSubjects: ["History", "Political Science", "Sociology or Psychology", "Languages"],
    optionalSubjects: [
      "Fine Arts",
      "Music",
      "Media Studies",
      "Philosophy",
      "Geography",
    ],
    entranceExams: ["CLAT", "CUET", "NID Entrance", "NIFT Entrance", "UPSC"],
    careerPaths: [
      "law-legal",
      "education-social-work",
      "creative-arts",
      "digital-marketing",
      "fashion-design",
      "hospitality-management",
    ],
  },
  {
    id: "vocational",
    name: "Vocational / Skill-based",
    shortName: "Vocational",
    icon: "🛠️",
    color: "#14B8A6",
    description:
      "Practical skill training in IT, Hospitality, Media, Retail, and Fashion for direct employment",
    coreSubjects: [
      "Industry-specific modules",
      "Soft skills",
      "Practical training",
    ],
    optionalSubjects: ["Entrepreneurship", "Digital Marketing"],
    entranceExams: ["Sector-specific certifications", "Trade tests"],
    careerPaths: [
      "hospitality-management",
      "retail-logistics",
      "fashion-design",
      "digital-marketing",
      "creative-arts",
      "telecommunications",
    ],
  },
];

// ============================================================================
// CAREER PROGRESSION DATA (ALL 20 CAREERS)
// ============================================================================

export const careerProgressions: CareerProgression[] = [
  // 1. AI & DATA SCIENCE
  {
    slug: "ai-data-science",
    stages: [
      {
        stage: 1,
        title: "Data Analyst",
        yearRange: "0–2 years",
        salary: { india: "₹4–8 LPA", global: "$55–75K" },
        keySkills: ["SQL", "Python", "Data Visualization", "Excel"],
        description:
          "Extract insights from structured data using analytics tools and create actionable business reports.",
        milestone: "Built first dashboard tracking product metrics used by stakeholders",
      },
      {
        stage: 2,
        title: "Data Scientist",
        yearRange: "2–4 years",
        salary: { india: "₹10–18 LPA", global: "$85–120K" },
        keySkills: [
          "Machine Learning",
          "Statistical Modeling",
          "Python/R",
          "Data Engineering",
        ],
        description:
          "Design and deploy machine learning models that drive product decisions and business outcomes.",
        milestone:
          "Deployed ML model improving recommendation accuracy by 15% in production",
      },
    ],
    fork: {
      question: "Where will your data expertise lead you?",
      options: [
        {
          label: "ML Engineer",
          icon: "🤖",
          description:
            "Build scalable ML systems and infrastructure for production AI applications",
          stages: [
            {
              stage: 3,
              title: "ML Engineer",
              yearRange: "4–7 years",
              salary: { india: "₹18–28 LPA", global: "$120–160K" },
              keySkills: [
                "Deep Learning",
                "ML Ops",
                "System Design",
                "Cloud Platforms",
              ],
              description:
                "Engineer end-to-end ML pipelines, optimize models for production, and mentor junior data scientists.",
              milestone:
                "Architected ML infrastructure handling 100M+ daily predictions",
            },
            {
              stage: 4,
              title: "ML Director / Head of AI",
              yearRange: "7+ years",
              salary: { india: "₹28–50 LPA", global: "$160–250K" },
              keySkills: [
                "Strategic Vision",
                "Team Leadership",
                "Research Innovation",
                "Business Acumen",
              ],
              description:
                "Lead AI/ML strategy, manage engineering teams, and shape organizational data-driven culture.",
              milestone:
                "Established AI CoE driving $10M+ value through ML initiatives",
            },
          ],
        },
        {
          label: "AI Researcher",
          icon: "🔬",
          description:
            "Advance state-of-the-art ML and conduct cutting-edge research in AI domains",
          stages: [
            {
              stage: 3,
              title: "Senior Researcher",
              yearRange: "4–7 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Research Design",
                "Advanced ML/DL",
                "Publications",
                "Technical Writing",
              ],
              description:
                "Conduct novel research, publish papers, and contribute to open-source AI projects.",
              milestone:
                "Published 3 papers in top-tier ML conferences (NeurIPS, ICML)",
              },
              {
                stage: 4,
                title: "Principal Researcher / Lab Head",
                yearRange: "7+ years",
                salary: { india: "₹26–45 LPA", global: "$150–220K" },
                keySkills: [
                  "Research Leadership",
                  "Grant Writing",
                  "Mentoring",
                  "Strategic Planning",
                ],
                description:
                  "Lead research lab, secure funding, set research directions, and mentor PhD candidates.",
                milestone:
                  "Established research lab with 5+ PhD students; $2M+ in research grants",
              },
            ],
        },
        {
          label: "Data Engineering Lead",
          icon: "🏗️",
          description:
            "Lead data infrastructure and pipelines enabling data science at scale",
          stages: [
            {
              stage: 3,
              title: "Data Engineering Lead",
              yearRange: "4–7 years",
              salary: { india: "₹18–28 LPA", global: "$120–160K" },
              keySkills: [
                "Big Data (Spark, Hadoop)",
                "Data Warehousing",
                "Architecture",
                "Team Leadership",
              ],
              description:
                "Design scalable data platforms, lead data infrastructure team, and optimize data pipelines.",
              milestone:
                "Built data warehouse handling 50TB+ data with sub-second query latency",
            },
            {
              stage: 4,
              title: "VP/Head of Data Infrastructure",
              yearRange: "7+ years",
              salary: { india: "₹28–50 LPA", global: "$160–250K" },
              keySkills: [
                "Strategic Leadership",
                "Enterprise Architecture",
                "Budget Management",
                "Cross-functional Alignment",
              ],
              description:
                "Own organization's data platform strategy, manage budgets, and align with business goals.",
              milestone:
                "Reduced data infrastructure costs by 40% while improving availability to 99.99%",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Amazon", "Google", "Microsoft", "Flipkart"],
      global: ["OpenAI", "DeepMind", "Meta AI", "Tesla"],
    },
    educationPath: {
      india: "B.Tech (CS/IT) → M.Tech in ML/AI or Data Science (IITB, IIITH)",
      global: "BS Computer Science → MS in Machine Learning or Data Science (Stanford, CMU, MIT)",
    },
  },

  // 2. SOFTWARE DEVELOPMENT
  {
    slug: "software-development",
    stages: [
      {
        stage: 1,
        title: "Junior Developer",
        yearRange: "0–2 years",
        salary: { india: "₹4–10 LPA", global: "$60–80K" },
        keySkills: ["Web Development", "APIs", "Version Control", "Code Quality"],
        description:
          "Write clean, tested code for features under senior guidance and learn best practices.",
        milestone:
          "Shipped first complete feature (frontend + backend) to production",
      },
      {
        stage: 2,
        title: "Senior Developer",
        yearRange: "2–5 years",
        salary: { india: "₹12–22 LPA", global: "$90–130K" },
        keySkills: [
          "System Design",
          "Mentoring",
          "Performance Optimization",
          "Architecture Patterns",
        ],
        description:
          "Design systems, mentor juniors, and drive technical decisions for product features.",
        milestone:
          "Led architecture redesign reducing API latency by 50% and improving scalability",
      },
    ],
    fork: {
      question: "Which path will define your engineering journey?",
      options: [
        {
          label: "Tech Lead & Architect",
          icon: "🏗️",
          description:
            "Shape technical vision, guide architecture decisions, and lead engineering teams",
          stages: [
            {
              stage: 3,
              title: "Tech Lead / Staff Engineer",
              yearRange: "5–8 years",
              salary: { india: "₹22–35 LPA", global: "$130–170K" },
              keySkills: [
                "System Architecture",
                "Technical Leadership",
                "Project Management",
                "Strategic Planning",
              ],
              description:
                "Own critical system design, set technical direction, and unblock teams across org.",
              milestone:
                "Architected microservices platform serving 50M+ daily users",
            },
            {
              stage: 4,
              title: "Principal Architect / VP Engineering",
              yearRange: "8+ years",
              salary: { india: "₹35–60 LPA", global: "$170–280K" },
              keySkills: [
                "Enterprise Architecture",
                "Executive Leadership",
                "Innovation Strategy",
                "Organizational Design",
              ],
              description:
                "Define long-term technical strategy, build high-performance teams, partner with C-suite.",
              milestone:
                "Scaled engineering from 20 to 200 engineers; established engineering culture",
            },
          ],
        },
        {
          label: "Product Engineering",
          icon: "📦",
          description:
            "Focus on user-facing products, shipping features fast, and customer impact",
          stages: [
            {
              stage: 3,
              title: "Lead Product Engineer",
              yearRange: "5–8 years",
              salary: { india: "₹20–32 LPA", global: "$120–160K" },
              keySkills: [
                "Product Thinking",
                "Full-Stack Skills",
                "User Empathy",
                "Rapid Iteration",
              ],
              description:
                "Partner with product managers to ship features customers love; drive adoption metrics.",
              milestone:
                "Led feature launch that increased user engagement by 40%",
            },
            {
              stage: 4,
              title: "Engineering Manager / Senior Product Lead",
              yearRange: "8+ years",
              salary: { india: "₹28–45 LPA", global: "$150–210K" },
              keySkills: [
                "Team Management",
                "Product Strategy",
                "Stakeholder Management",
                "Hiring & Culture",
              ],
              description:
                "Manage product engineering team, shape product roadmap, and drive business metrics.",
              milestone:
                "Built and scaled product team shipping $50M+ annual revenue",
            },
          ],
        },
        {
          label: "Startup / Indie Developer",
          icon: "🚀",
          description:
            "Build your own products or join early-stage startups with equity upside",
          stages: [
            {
              stage: 3,
              title: "Founding Engineer / Early Startup Developer",
              yearRange: "5–8 years",
              salary: { india: "₹15–25 LPA + Equity", global: "$100–140K + Equity" },
              keySkills: [
                "Full-Stack Development",
                "Entrepreneurship",
                "Rapid MVP Building",
                "Adaptability",
              ],
              description:
                "Build products from scratch, wear multiple hats, and directly impact company direction.",
              milestone:
                "Helped startup raise Series A funding with product built in 3 months",
            },
            {
              stage: 4,
              title: "CTO / Co-Founder",
              yearRange: "8+ years",
              salary: {
                india: "₹0–20 LPA + Significant Equity",
                global: "$0–150K + Significant Equity",
              },
              keySkills: [
                "Product Vision",
                "Team Building",
                "Fundraising",
                "Business Strategy",
              ],
              description:
                "Co-found company or lead technology strategy; shape product vision and culture.",
              milestone:
                "Scaled startup from idea to $5M+ ARR; raised $10M+ funding",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Flipkart", "Amazon", "Microsoft", "Zomato"],
      global: ["Google", "Meta", "Apple", "Stripe"],
    },
    educationPath: {
      india: "B.Tech (CS/IT) → internships and side projects; bootcamps optional",
      global: "BS Computer Science or Self-taught → GitHub portfolio; bootcamps optional",
    },
  },

  // 3. FINTECH
  {
    slug: "fintech",
    stages: [
      {
        stage: 1,
        title: "FinTech Analyst",
        yearRange: "0–2 years",
        salary: { india: "₹5–9 LPA", global: "$55–75K" },
        keySkills: [
          "Financial Analysis",
          "Python/SQL",
          "Regulatory Knowledge",
          "Problem Solving",
        ],
        description:
          "Analyze financial data, support product teams, and ensure regulatory compliance.",
        milestone:
          "Identified compliance gap and documented remediation plan adopted by company",
      },
      {
        stage: 2,
        title: "Product Manager / Engineer",
        yearRange: "2–4 years",
        salary: { india: "₹12–20 LPA", global: "$90–120K" },
        keySkills: [
          "Product Strategy",
          "Financial Systems",
          "User Research",
          "Technical Depth",
        ],
        description:
          "Build fintech products combining financial expertise with technology to solve customer problems.",
        milestone:
          "Launched payments product processing $100M+ annual transaction volume",
      },
    ],
    fork: {
      question: "Which fintech domain excites you most?",
      options: [
        {
          label: "Payments & Banking",
          icon: "💳",
          description:
            "Build payment systems, digital wallets, and banking infrastructure",
          stages: [
            {
              stage: 3,
              title: "Senior Product Manager / Architecture Lead",
              yearRange: "4–7 years",
              salary: { india: "₹20–32 LPA", global: "$120–160K" },
              keySkills: [
                "Payments Architecture",
                "Banking Regulations",
                "Team Leadership",
                "Risk Management",
              ],
              description:
                "Lead payments platform development, manage stakeholder relationships, ensure security and compliance.",
              milestone:
                "Built payments infrastructure processing 10M+ daily transactions securely",
            },
            {
              stage: 4,
              title: "VP Payments / Banking Product",
              yearRange: "7+ years",
              salary: { india: "₹32–55 LPA", global: "$160–250K" },
              keySkills: [
                "Strategic Leadership",
                "Regulatory Navigation",
                "P&L Ownership",
                "Stakeholder Alignment",
              ],
              description:
                "Own payments/banking business P&L, shape regulatory strategy, drive innovation.",
              milestone:
                "Grew payments business to $500M+ annual volume; expanded to 5 countries",
            },
          ],
        },
        {
          label: "Investment Tech",
          icon: "📈",
          description:
            "Create tools and platforms for investing, trading, and wealth management",
          stages: [
            {
              stage: 3,
              title: "Senior Product Manager / Engineering Lead",
              yearRange: "4–7 years",
              salary: { india: "₹20–32 LPA", global: "$120–160K" },
              keySkills: [
                "Investment Strategies",
                "Markets Knowledge",
                "Data Analysis",
                "Technical Product Management",
              ],
              description:
                "Build investment platforms, define trading logic, and create user-friendly wealth tools.",
              milestone:
                "Launched robo-advisor managing $200M+ in client assets",
            },
            {
              stage: 4,
              title: "Chief Product Officer / Investment Head",
              yearRange: "7+ years",
              salary: { india: "₹32–55 LPA", global: "$160–250K" },
              keySkills: [
                "Investment Vision",
                "Risk Management",
                "Board Engagement",
                "Strategic Planning",
              ],
              description:
                "Define investment strategy, manage risk frameworks, partner with executives.",
              milestone:
                "Scaled invested AUM from $500M to $2B+ under management",
            },
          ],
        },
        {
          label: "RegTech & Compliance",
          icon: "⚖️",
          description:
            "Build compliance, regulatory reporting, and risk management solutions",
          stages: [
            {
              stage: 3,
              title: "Lead Compliance Officer / RegTech Manager",
              yearRange: "4–7 years",
              salary: { india: "₹18–30 LPA", global: "$110–150K" },
              keySkills: [
                "Regulatory Expertise",
                "Risk Assessment",
                "Audit & Control",
                "Strategic Planning",
              ],
              description:
                "Build compliance infrastructure, manage regulatory audits, implement policy frameworks.",
              milestone:
                "Successfully navigated $500M company through RBI audit with zero findings",
            },
            {
              stage: 4,
              title: "Chief Compliance Officer / Regulatory Head",
              yearRange: "7+ years",
              salary: { india: "₹30–50 LPA", global: "$150–220K" },
              keySkills: [
                "Executive Leadership",
                "Regulatory Strategy",
                "Board Reporting",
                "Crisis Management",
              ],
              description:
                "Own regulatory strategy, report to board, shape company-wide compliance culture.",
              milestone:
                "Guided company through regulatory expansion into 3 new geographies",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Paytm", "PhonePe", "CRED", "BharatPe"],
      global: ["Stripe", "Square", "Revolut", "Robinhood"],
    },
    educationPath: {
      india: "B.Tech/B.Comm + Financial Certifications (CFA, FRM) or MBA Finance",
      global: "BS Finance/Economics + Financial Certifications or MBA",
    },
  },

  // 4. BUSINESS & ENTREPRENEURSHIP
  {
    slug: "business-entrepreneurship",
    stages: [
      {
        stage: 1,
        title: "Business Analyst / Trainee",
        yearRange: "0–2 years",
        salary: { india: "₹4–7 LPA", global: "$50–65K" },
        keySkills: [
          "Business Analysis",
          "Data Interpretation",
          "Communication",
          "Problem Solving",
        ],
        description:
          "Analyze market trends, support business decisions, and learn operational dynamics.",
        milestone:
          "Completed market analysis that identified $2M revenue opportunity",
      },
      {
        stage: 2,
        title: "Manager / Business Consultant",
        yearRange: "2–4 years",
        salary: { india: "₹10–18 LPA", global: "$75–110K" },
        keySkills: [
          "Strategy Development",
          "Team Management",
          "Financial Analysis",
          "Client Relationships",
        ],
        description:
          "Lead business initiatives, manage teams, and drive revenue growth through strategic execution.",
        milestone:
          "Led expansion initiative resulting in 35% revenue growth in new market",
      },
    ],
    fork: {
      question: "What business path calls to you?",
      options: [
        {
          label: "Corporate Strategy",
          icon: "🏢",
          description:
            "Shape company direction through strategic planning and organizational transformation",
          stages: [
            {
              stage: 3,
              title: "Senior Manager / Strategy Lead",
              yearRange: "4–7 years",
              salary: { india: "₹18–28 LPA", global: "$110–150K" },
              keySkills: [
                "Strategic Planning",
                "Market Analysis",
                "Leadership",
                "Change Management",
              ],
              description:
                "Develop corporate strategy, oversee transformation initiatives, guide business decisions.",
              milestone:
                "Executed digital transformation strategy increasing margins by 20%",
            },
            {
              stage: 4,
              title: "VP / Chief Strategy Officer",
              yearRange: "7+ years",
              salary: { india: "₹28–50 LPA", global: "$150–230K" },
              keySkills: [
                "Executive Leadership",
                "M&A Strategy",
                "Board Engagement",
                "Long-term Vision",
              ],
              description:
                "Lead strategic planning at C-level, manage M&A, shape organizational future.",
              milestone:
                "Orchestrated two acquisitions resulting in $500M+ synergies",
            },
          ],
        },
        {
          label: "Startup Founder",
          icon: "🚀",
          description:
            "Build your own venture from idea to scale with vision and execution",
          stages: [
            {
              stage: 3,
              title: "Early-Stage Founder / CEO",
              yearRange: "4–7 years",
              salary: { india: "₹0–15 LPA + Equity", global: "$0–100K + Equity" },
              keySkills: [
                "Vision & Execution",
                "Fundraising",
                "Team Building",
                "Resilience",
              ],
              description:
                "Build company culture, secure funding, hire talented team, achieve product-market fit.",
              milestone:
                "Raised $2M seed funding and grew startup to $1M ARR in 18 months",
            },
            {
              stage: 4,
              title: "Growth-Stage Founder / CEO",
              yearRange: "7+ years",
              salary: {
                india: "₹10–30 LPA + Significant Equity",
                global: "$100–200K + Significant Equity",
              },
              keySkills: [
                "Scaling Operations",
                "Series Fundraising",
                "Org Building",
                "Board Management",
              ],
              description:
                "Scale operations to hundreds of employees, lead Series B/C fundraising, build unicorn vision.",
              milestone:
                "Scaled startup to $50M ARR; raised $25M Series C; 150+ team members",
            },
          ],
        },
        {
          label: "Consulting",
          icon: "📊",
          description:
            "Guide organizations through complex challenges and transformation",
          stages: [
            {
              stage: 3,
              title: "Senior Consultant / Project Lead",
              yearRange: "4–7 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Problem Solving",
                "Client Management",
                "Industry Expertise",
                "Presentation Skills",
              ],
              description:
                "Lead high-impact consulting projects, manage client relationships, develop industry expertise.",
              milestone:
                "Led $5M+ portfolio of consulting engagements with 95%+ client satisfaction",
            },
            {
              stage: 4,
              title: "Partner / Managing Director",
              yearRange: "7+ years",
              salary: { india: "₹26–45 LPA", global: "$150–250K" },
              keySkills: [
                "Practice Leadership",
                "Business Development",
                "People Management",
                "Thought Leadership",
              ],
              description:
                "Own consulting practice, develop business, mentor consultants, establish thought leadership.",
              milestone:
                "Built $20M+ practice; recognized as industry expert; led 50+ senior consultants",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["McKinsey", "Bain", "Boston Consulting Group", "Deloitte"],
      global: ["Goldman Sachs", "Sequoia Capital", "Stripe", "Airbnb"],
    },
    educationPath: {
      india: "B.Com/B.Tech → MBA from IIM/ISB",
      global: "Bachelor's degree → MBA from top business school",
    },
  },

  // 5. CLEAN TECH & SUSTAINABILITY
  {
    slug: "clean-tech",
    stages: [
      {
        stage: 1,
        title: "Sustainability Analyst",
        yearRange: "0–2 years",
        salary: { india: "₹4–7 LPA", global: "$50–65K" },
        keySkills: [
          "Environmental Science",
          "Data Analysis",
          "Sustainability Standards",
          "Research",
        ],
        description:
          "Assess environmental impact, track sustainability metrics, and support green initiatives.",
        milestone:
          "Identified waste reduction opportunity saving company ₹50L annually",
      },
      {
        stage: 2,
        title: "Project Engineer / Sustainability Manager",
        yearRange: "2–4 years",
        salary: { india: "₹8–15 LPA", global: "$70–95K" },
        keySkills: [
          "Project Management",
          "Clean Technology",
          "Regulatory Compliance",
          "Stakeholder Engagement",
        ],
        description:
          "Implement clean tech projects, manage timelines, and drive environmental compliance.",
        milestone:
          "Implemented solar project reducing energy costs by 40% across facilities",
      },
    ],
    fork: {
      question: "Which sustainability path fuels your passion?",
      options: [
        {
          label: "Renewable Energy",
          icon: "⚡",
          description:
            "Develop solar, wind, and other renewable energy systems at scale",
          stages: [
            {
              stage: 3,
              title: "Senior Project Manager / Engineering Lead",
              yearRange: "4–7 years",
              salary: { india: "₹15–25 LPA", global: "$100–140K" },
              keySkills: [
                "Energy Systems",
                "Project Delivery",
                "Technical Design",
                "Team Leadership",
              ],
              description:
                "Lead large-scale renewable projects, manage engineering teams, ensure technical excellence.",
              milestone:
                "Delivered 100MW solar farm project on time and under budget",
            },
            {
              stage: 4,
              title: "VP Projects / Chief Technology Officer",
              yearRange: "7+ years",
              salary: { india: "₹25–45 LPA", global: "$140–220K" },
              keySkills: [
                "Strategic Planning",
                "Innovation Leadership",
                "P&L Ownership",
                "Board Engagement",
              ],
              description:
                "Oversee company-wide renewable projects, drive R&D, shape clean energy strategy.",
              milestone:
                "Built renewable energy portfolio generating 500MW+ capacity and $50M+ revenue",
            },
          ],
        },
        {
          label: "ESG & Policy",
          icon: "🌍",
          description:
            "Shape environmental policy, ESG frameworks, and climate action strategies",
          stages: [
            {
              stage: 3,
              title: "Senior ESG Manager / Policy Expert",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$95–135K" },
              keySkills: [
                "ESG Framework",
                "Policy Writing",
                "Stakeholder Engagement",
                "Impact Measurement",
              ],
              description:
                "Develop ESG strategies, influence policy, measure environmental impact, engage stakeholders.",
              milestone:
                "Built ESG framework adopted by company; achieved carbon neutrality commitment",
            },
            {
              stage: 4,
              title: "Chief Sustainability Officer",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$135–210K" },
              keySkills: [
                "Executive Leadership",
                "Climate Strategy",
                "Board Reporting",
                "Public Advocacy",
              ],
              description:
                "Lead organization's sustainability vision, report to board, shape industry standards.",
              milestone:
                "Established company as net-zero leader; influenced $1B+ climate investment",
            },
          ],
        },
        {
          label: "CleanTech Startup",
          icon: "🚀",
          description:
            "Build innovative clean tech ventures solving environmental challenges",
          stages: [
            {
              stage: 3,
              title: "Co-Founder / Growth Lead",
              yearRange: "4–7 years",
              salary: { india: "₹10–20 LPA + Equity", global: "$80–120K + Equity" },
              keySkills: [
                "Innovation",
                "Fundraising",
                "Team Building",
                "Market Development",
              ],
              description:
                "Scale cleantech startup, raise funding, build team, achieve product-market fit.",
              milestone:
                "Raised $5M in funding; deployed technology reducing emissions by 100K tons annually",
            },
            {
              stage: 4,
              title: "CEO / Series C Founder",
              yearRange: "7+ years",
              salary: {
                india: "₹15–30 LPA + Significant Equity",
                global: "$120–200K + Significant Equity",
              },
              keySkills: [
                "Vision & Leadership",
                "Series Fundraising",
                "Impact Creation",
                "Strategic Partnerships",
              ],
              description:
                "Lead cleantech unicorn, secure Series B/C, create measurable environmental impact.",
              milestone:
                "Built $100M+ cleantech unicorn; prevented 1M tons CO2 emissions globally",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["ReNew Power", "Avaada Energy", "Sprout India", "Exxaro Resources"],
      global: ["NextEra Energy", "Tesla Energy", "Brookfield Renewable", "Ørsted"],
    },
    educationPath: {
      india: "B.Tech (Civil/Mechanical/Electrical) → MSc Environmental Science or MBA Sustainability",
      global: "BS Environmental Science/Engineering → MS Renewable Energy or MBA Sustainability",
    },
  },

  // 6. TELECOMMUNICATIONS
  {
    slug: "telecommunications",
    stages: [
      {
        stage: 1,
        title: "Network Engineer",
        yearRange: "0–2 years",
        salary: { india: "₹4–8 LPA", global: "$55–70K" },
        keySkills: [
          "Networking Protocols",
          "Telecom Systems",
          "Troubleshooting",
          "Linux/Unix",
        ],
        description:
          "Deploy and maintain telecom networks, resolve technical issues, and support infrastructure.",
        milestone:
          "Implemented network optimization reducing latency by 25% for 5M+ users",
      },
      {
        stage: 2,
        title: "Systems Architect",
        yearRange: "2–5 years",
        salary: { india: "₹10–18 LPA", global: "$80–110K" },
        keySkills: [
          "Network Architecture",
          "System Design",
          "Scalability Planning",
          "Security",
        ],
        description:
          "Design telecom systems, plan network capacity, and lead engineering initiatives.",
        milestone:
          "Architected 5G network deployment serving 10M+ subscribers across region",
      },
    ],
    fork: {
      question: "Where will telecom innovation take you?",
      options: [
        {
          label: "5G & IoT",
          icon: "📡",
          description:
            "Build next-gen 5G networks and Internet of Things infrastructure",
          stages: [
            {
              stage: 3,
              title: "Senior Architect / 5G Lead",
              yearRange: "5–8 years",
              salary: { india: "₹18–28 LPA", global: "$120–160K" },
              keySkills: [
                "5G Technology",
                "IoT Architecture",
                "Network Slicing",
                "Team Leadership",
              ],
              description:
                "Lead 5G network rollout, define IoT strategy, architect advanced connectivity solutions.",
              milestone:
                "Led 5G deployment across 50+ cities; enabled IoT platform connecting 100M+ devices",
            },
            {
              stage: 4,
              title: "VP / Chief Technology Officer",
              yearRange: "8+ years",
              salary: { india: "₹28–50 LPA", global: "$160–250K" },
              keySkills: [
                "Strategic Vision",
                "Innovation Leadership",
                "Executive Management",
                "Vendor Relations",
              ],
              description:
                "Set 5G/IoT strategy for company, manage vendor relationships, shape telecom future.",
              milestone:
                "Established 5G leadership; generated $500M+ revenue from new services",
            },
          ],
        },
        {
          label: "Cloud Infrastructure",
          icon: "☁️",
          description:
            "Build cloud platforms and edge computing infrastructure for telecom",
          stages: [
            {
              stage: 3,
              title: "Senior Engineer / Cloud Architect",
              yearRange: "5–8 years",
              salary: { india: "₹18–28 LPA", global: "$120–160K" },
              keySkills: [
                "Cloud Architecture",
                "Edge Computing",
                "Virtualization",
                "DevOps",
              ],
              description:
                "Design cloud platforms, implement edge computing, ensure reliability and scalability.",
              milestone:
                "Built cloud platform handling 100M+ API requests daily with 99.99% uptime",
            },
            {
              stage: 4,
              title: "Director / Head of Cloud Services",
              yearRange: "8+ years",
              salary: { india: "₹28–45 LPA", global: "$160–230K" },
              keySkills: [
                "Service Strategy",
                "P&L Ownership",
                "Team Leadership",
                "Market Expansion",
              ],
              description:
                "Own cloud services business, manage P&L, expand market presence, drive innovation.",
              milestone:
                "Scaled cloud services to $200M+ annual revenue; opened services in 10 countries",
            },
          ],
        },
        {
          label: "Telecom Product",
          icon: "📱",
          description:
            "Develop consumer and enterprise telecom products and services",
          stages: [
            {
              stage: 3,
              title: "Senior Product Manager",
              yearRange: "5–8 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Product Strategy",
                "Market Analysis",
                "Consumer Insights",
                "Go-to-Market",
              ],
              description:
                "Lead product strategy, define features, drive adoption, measure impact.",
              milestone:
                "Launched telecom product acquiring 5M+ subscribers in first year",
            },
            {
              stage: 4,
              title: "Chief Product Officer / VP Products",
              yearRange: "8+ years",
              salary: { india: "₹26–45 LPA", global: "$150–220K" },
              keySkills: [
                "Product Vision",
                "Executive Leadership",
                "Innovation Strategy",
                "Market Leadership",
              ],
              description:
                "Own company product portfolio, define strategy, lead product teams.",
              milestone:
                "Built product portfolio generating $1B+ annual revenue from new offerings",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Jio (Reliance)", "Airtel", "Vodafone Idea", "Ericsson India"],
      global: ["Verizon", "AT&T", "Deutsche Telekom", "Nokia"],
    },
    educationPath: {
      india: "B.Tech (Electronics/ECE/IT) → specialization in telecom networks or M.Tech",
      global: "BS Electrical Engineering or Computer Science → MS in Telecommunications",
    },
  },

  // 7. BIOTECH & PHARMA
  {
    slug: "biotech-pharma",
    stages: [
      {
        stage: 1,
        title: "Research Associate",
        yearRange: "0–2 years",
        salary: { india: "₹4–7 LPA", global: "$50–65K" },
        keySkills: [
          "Lab Techniques",
          "Data Management",
          "Scientific Writing",
          "Protocol Adherence",
        ],
        description:
          "Conduct experiments, collect data, support research scientists in drug development.",
        milestone:
          "Contributed to research paper published in peer-reviewed journal",
      },
      {
        stage: 2,
        title: "Scientist / Research Manager",
        yearRange: "2–5 years",
        salary: { india: "₹8–16 LPA", global: "$75–100K" },
        keySkills: [
          "Advanced Research",
          "Project Leadership",
          "Regulatory Knowledge",
          "Innovation",
        ],
        description:
          "Lead research projects, manage teams, drive innovation in drug development.",
        milestone:
          "Led preclinical study that advanced drug candidate to clinical trials",
      },
    ],
    fork: {
      question: "Which biotech path will advance medicine?",
      options: [
        {
          label: "Drug Discovery R&D",
          icon: "🧪",
          description:
            "Lead research to discover and develop new pharmaceutical drugs",
          stages: [
            {
              stage: 3,
              title: "Senior Scientist / Research Director",
              yearRange: "5–8 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Drug Discovery",
                "Research Leadership",
                "Innovation Strategy",
                "Regulatory Navigation",
              ],
              description:
                "Direct drug discovery programs, manage research team, advance candidates to clinic.",
              milestone:
                "Discovered 2 drug candidates; one in Phase II clinical trials",
            },
            {
              stage: 4,
              title: "VP R&D / Chief Scientific Officer",
              yearRange: "8+ years",
              salary: { india: "₹26–45 LPA", global: "$150–230K" },
              keySkills: [
                "Strategic R&D Vision",
                "Executive Leadership",
                "Board Engagement",
                "Innovation Portfolio",
              ],
              description:
                "Lead R&D strategy, manage research portfolio, partner with executives.",
              milestone:
                "Built R&D pipeline with 5 candidates in development; filed 20+ patents",
            },
          ],
        },
        {
          label: "Biotech Business & BD",
          icon: "💼",
          description:
            "Build business strategy, partnerships, and commercialization for biotech",
          stages: [
            {
              stage: 3,
              title: "Business Development Manager / Strategy Lead",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Business Development",
                "Partnership Negotiation",
                "Financial Analysis",
                "Strategic Planning",
              ],
              description:
                "Lead partnerships, negotiate deals, develop business strategy for growth.",
              milestone:
                "Negotiated $50M+ in partnership and licensing deals",
            },
            {
              stage: 4,
              title: "VP Business Development / Chief Commercial Officer",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–220K" },
              keySkills: [
                "Commercial Strategy",
                "Executive Leadership",
                "M&A Strategy",
                "Board Engagement",
              ],
              description:
                "Own commercial strategy, lead M&A, manage partnerships at executive level.",
              milestone:
                "Scaled revenue to $200M+ through partnerships and product launches",
            },
          ],
        },
        {
          label: "Regulatory Affairs",
          icon: "⚖️",
          description:
            "Navigate regulatory pathways and ensure compliance for drug approvals",
          stages: [
            {
              stage: 3,
              title: "Senior Regulatory Manager / Regional Head",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Regulatory Strategy",
                "Submission Expertise",
                "Compliance",
                "Global Regulations",
              ],
              description:
                "Lead regulatory submissions, manage compliance, navigate approval process.",
              milestone:
                "Secured FDA approval for 2 drug candidates; guided submissions in 5 countries",
            },
            {
              stage: 4,
              title: "VP Regulatory Affairs / Chief Compliance Officer",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Regulatory Leadership",
                "Strategic Planning",
                "Global Strategy",
                "Board Reporting",
              ],
              description:
                "Lead global regulatory strategy, ensure company-wide compliance, board reporting.",
              milestone:
                "Built regulatory function guiding company through FDA and EMA approvals",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Cipla", "Dr. Reddy's Labs", "Serum Institute of India", "Lupin"],
      global: ["Pfizer", "Moderna", "Roche", "Amgen"],
    },
    educationPath: {
      india: "B.Pharm or B.Tech (Biotech) → M.Pharm or PhD in relevant field",
      global: "BS Biology/Biochemistry → MS/PhD in Pharmacology or Molecular Biology",
    },
  },

  // 8. AUTOMOTIVE
  {
    slug: "automotive",
    stages: [
      {
        stage: 1,
        title: "Graduate Engineer",
        yearRange: "0–2 years",
        salary: { india: "₹4–8 LPA", global: "$55–70K" },
        keySkills: [
          "CAD Design",
          "Engineering Analysis",
          "Prototyping",
          "Technical Documentation",
        ],
        description:
          "Design components, conduct analysis, support manufacturing of vehicle systems.",
        milestone:
          "Completed first full vehicle design cycle from concept to prototype",
      },
      {
        stage: 2,
        title: "Lead Engineer",
        yearRange: "2–5 years",
        salary: { india: "₹10–18 LPA", global: "$80–110K" },
        keySkills: [
          "System Design",
          "Project Management",
          "Testing & Validation",
          "Team Leadership",
        ],
        description:
          "Lead engineering projects, manage teams, and drive vehicle subsystem development.",
        milestone:
          "Led development of safety system reducing crash impact by 35%",
      },
    ],
    fork: {
      question: "Which automotive frontier excites you most?",
      options: [
        {
          label: "EV & Autonomous",
          icon: "🚗",
          description:
            "Build electric and self-driving vehicles powering the automotive future",
          stages: [
            {
              stage: 3,
              title: "Senior Engineer / EV Program Lead",
              yearRange: "5–8 years",
              salary: { india: "₹18–28 LPA", global: "$120–160K" },
              keySkills: [
                "EV Architecture",
                "Autonomous Systems",
                "Battery Technology",
                "Team Leadership",
              ],
              description:
                "Lead EV/autonomous vehicle development, manage engineering teams, drive innovation.",
              milestone:
                "Led development of EV with 600+ km range; 99.9% autonomous capability",
            },
            {
              stage: 4,
              title: "VP Engineering / Chief Technology Officer",
              yearRange: "8+ years",
              salary: { india: "₹28–50 LPA", global: "$160–250K" },
              keySkills: [
                "Strategic Vision",
                "Innovation Leadership",
                "Executive Management",
                "Product Strategy",
              ],
              description:
                "Set EV/autonomous strategy, manage engineering teams, shape company vision.",
              milestone:
                "Built EV company achieving $10B+ valuation; launched 5 autonomous vehicles",
            },
          ],
        },
        {
          label: "Design & Manufacturing",
          icon: "🏭",
          description:
            "Create beautiful, efficient vehicle designs and manufacturing processes",
          stages: [
            {
              stage: 3,
              title: "Senior Designer / Manufacturing Lead",
              yearRange: "5–8 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Vehicle Design",
                "Manufacturing Engineering",
                "Cost Optimization",
                "Quality Control",
              ],
              description:
                "Lead design and manufacturing of vehicles, optimize processes, ensure quality.",
              milestone:
                "Designed vehicle reducing manufacturing cost by 20% while improving aesthetics",
            },
            {
              stage: 4,
              title: "VP Design / VP Manufacturing",
              yearRange: "8+ years",
              salary: { india: "₹26–45 LPA", global: "$150–220K" },
              keySkills: [
                "Design Leadership",
                "Operations Management",
                "Strategic Planning",
                "Supply Chain",
              ],
              description:
                "Lead design or manufacturing organization, manage P&L, drive efficiency.",
              milestone:
                "Scaled manufacturing to 500K vehicles annually; established 3 new plants",
            },
          ],
        },
        {
          label: "Motorsport & Testing",
          icon: "🏎️",
          description:
            "Push automotive performance limits through racing and advanced testing",
          stages: [
            {
              stage: 3,
              title: "Senior Performance Engineer / Motorsport Lead",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Performance Optimization",
                "Race Engineering",
                "Data Analysis",
                "Innovation",
              ],
              description:
                "Lead racing program, optimize vehicle performance, conduct advanced testing.",
              milestone:
                "Led Formula racing team to 3 championship wins; improved road vehicle performance",
            },
            {
              stage: 4,
              title: "Chief Technology Officer / Performance Division Head",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Strategic Vision",
                "Program Leadership",
                "Innovation Strategy",
                "Brand Development",
              ],
              description:
                "Own performance division strategy, lead motorsport programs, build brand.",
              milestone:
                "Built high-performance brand generating $500M+ revenue; 5 world records",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Maruti Suzuki", "Mahindra & Mahindra", "Tata Motors", "Bajaj Auto"],
      global: ["Tesla", "BMW", "Porsche", "Ferrari"],
    },
    educationPath: {
      india: "B.Tech (Mechanical/Automobile Engineering) → internships at OEMs",
      global: "BS Mechanical Engineering → internships at automotive companies",
    },
  },

  // 9. RETAIL & LOGISTICS
  {
    slug: "retail-logistics",
    stages: [
      {
        stage: 1,
        title: "Operations Executive",
        yearRange: "0–2 years",
        salary: { india: "₹3–6 LPA", global: "$40–55K" },
        keySkills: [
          "Supply Chain Basics",
          "Inventory Management",
          "Process Documentation",
          "Communication",
        ],
        description:
          "Manage store/warehouse operations, coordinate inventory, support supply chain.",
        milestone:
          "Improved inventory accuracy to 98% across 20-store region",
      },
      {
        stage: 2,
        title: "Category / Supply Chain Manager",
        yearRange: "2–4 years",
        salary: { india: "₹8–14 LPA", global: "$65–90K" },
        keySkills: [
          "Supply Chain Optimization",
          "Category Management",
          "Vendor Management",
          "Analytics",
        ],
        description:
          "Manage product categories, optimize supply chains, drive sales and profitability.",
        milestone:
          "Reduced supply chain costs by 18% while improving product availability",
      },
    ],
    fork: {
      question: "Where will your retail/logistics expertise take you?",
      options: [
        {
          label: "E-Commerce",
          icon: "📦",
          description:
            "Build online retail operations and digital commerce platforms",
          stages: [
            {
              stage: 3,
              title: "Senior Operations Manager / E-Comm Lead",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "E-Commerce Operations",
                "Marketplace Strategy",
                "Fulfillment Optimization",
                "Team Leadership",
              ],
              description:
                "Lead e-commerce platform operations, optimize fulfillment, drive conversion.",
              milestone:
                "Scaled e-commerce business to $200M+ GMV; improved delivery speed by 40%",
            },
            {
              stage: 4,
              title: "VP E-Commerce / Chief Commercial Officer",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–220K" },
              keySkills: [
                "Strategic Leadership",
                "P&L Ownership",
                "Tech Integration",
                "Growth Strategy",
              ],
              description:
                "Own e-commerce P&L, drive growth, integrate technology, shape strategy.",
              milestone:
                "Built e-commerce business to $1B+ GMV across 5 countries",
            },
          ],
        },
        {
          label: "Supply Chain Technology",
          icon: "🔧",
          description:
            "Build tech platforms and automation for supply chain optimization",
          stages: [
            {
              stage: 3,
              title: "Senior Supply Chain Engineer / Tech Lead",
              yearRange: "4–7 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Supply Chain Systems",
                "Automation",
                "Data Analytics",
                "Technical Leadership",
              ],
              description:
                "Build supply chain platforms, implement automation, optimize networks.",
              milestone:
                "Implemented AI-powered demand forecasting improving accuracy by 25%",
            },
            {
              stage: 4,
              title: "VP Supply Chain / Chief Technology Officer",
              yearRange: "7+ years",
              salary: { india: "₹26–45 LPA", global: "$150–220K" },
              keySkills: [
                "Strategic Innovation",
                "Executive Leadership",
                "Digital Transformation",
                "Business Strategy",
              ],
              description:
                "Lead supply chain transformation, drive digital initiatives, set strategy.",
              milestone:
                "Digitalized supply chain reducing costs by $100M+ annually",
            },
          ],
        },
        {
          label: "Retail Brand Management",
          icon: "🏪",
          description:
            "Build and scale retail brands through marketing and customer experience",
          stages: [
            {
              stage: 3,
              title: "Senior Brand Manager / Retail Director",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$95–135K" },
              keySkills: [
                "Brand Strategy",
                "Retail Operations",
                "Customer Experience",
                "Marketing",
              ],
              description:
                "Build brand strategy, optimize retail experience, drive customer loyalty.",
              milestone:
                "Grew retail brand to 100+ stores; increased brand value by 50%",
            },
            {
              stage: 4,
              title: "Chief Brand Officer / VP Retail",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Brand Leadership",
                "Retail Strategy",
                "Organizational Leadership",
                "Growth Strategy",
              ],
              description:
                "Own brand strategy and retail expansion, lead teams, drive growth.",
              milestone:
                "Scaled retail brand to $500M+ revenue across 300+ stores",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Amazon India", "Flipkart", "Reliance Retail", "Future Group"],
      global: ["Walmart", "Target", "Amazon", "DHL"],
    },
    educationPath: {
      india: "B.Com or B.Tech → MBA in Operations or Supply Chain Management",
      global: "Bachelor's degree → MBA in Supply Chain or Operations",
    },
  },

  // 10. DIGITAL MARKETING
  {
    slug: "digital-marketing",
    stages: [
      {
        stage: 1,
        title: "Marketing Executive",
        yearRange: "0–2 years",
        salary: { india: "₹3–6 LPA", global: "$40–55K" },
        keySkills: [
          "Digital Channels",
          "Content Creation",
          "Analytics Tools",
          "Social Media",
        ],
        description:
          "Create content, manage social channels, analyze campaign performance.",
        milestone:
          "Launched campaign generating 5M+ impressions and 50K+ engagements",
      },
      {
        stage: 2,
        title: "Marketing Manager",
        yearRange: "2–4 years",
        salary: { india: "₹8–14 LPA", global: "$65–90K" },
        keySkills: [
          "Campaign Management",
          "Marketing Strategy",
          "Analytics & ROI",
          "Team Leadership",
        ],
        description:
          "Manage marketing campaigns, optimize spending, and drive customer acquisition.",
        milestone:
          "Managed $2M+ marketing budget increasing customer acquisition by 40%",
      },
    ],
    fork: {
      question: "Which marketing specialty will you master?",
      options: [
        {
          label: "Performance Marketing",
          icon: "📊",
          description:
            "Drive measurable ROI through data-driven digital marketing campaigns",
          stages: [
            {
              stage: 3,
              title: "Senior Performance Marketing Manager",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Performance Analytics",
                "Paid Advertising",
                "Optimization",
                "Team Leadership",
              ],
              description:
                "Manage performance marketing team, optimize campaigns, drive revenue growth.",
              milestone:
                "Achieved 300% ROAS across $5M+ annual ad spend",
            },
            {
              stage: 4,
              title: "VP Growth Marketing / Chief Marketing Officer",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Growth Strategy",
                "Executive Leadership",
                "Marketing Innovation",
                "P&L Ownership",
              ],
              description:
                "Lead marketing organization, set growth strategy, manage P&L.",
              milestone:
                "Scaled company from 1M to 100M+ users through growth marketing",
            },
          ],
        },
        {
          label: "Brand & Content",
          icon: "🎨",
          description:
            "Build memorable brands and create compelling content that resonates",
          stages: [
            {
              stage: 3,
              title: "Senior Content Manager / Brand Lead",
              yearRange: "4–7 years",
              salary: { india: "₹12–22 LPA", global: "$90–130K" },
              keySkills: [
                "Brand Strategy",
                "Content Creation",
                "Storytelling",
                "Creative Leadership",
              ],
              description:
                "Build brand narrative, create engaging content, lead creative teams.",
              milestone:
                "Built brand from scratch to 10M+ social followers; launched viral campaigns",
            },
            {
              stage: 4,
              title: "Chief Content Officer / VP Brand",
              yearRange: "7+ years",
              salary: { india: "₹22–40 LPA", global: "$130–210K" },
              keySkills: [
                "Brand Leadership",
                "Content Strategy",
                "Organizational Leadership",
                "Creative Vision",
              ],
              description:
                "Own brand and content strategy, lead teams, shape company brand identity.",
              milestone:
                "Established brand as industry leader; consistent +30% YoY brand value growth",
            },
          ],
        },
        {
          label: "Marketing Technology",
          icon: "🛠️",
          description:
            "Build marketing automation and analytics platforms enabling growth",
          stages: [
            {
              stage: 3,
              title: "Marketing Technology Lead / Product Manager",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "MarTech Stack",
                "Automation",
                "Analytics",
                "Product Thinking",
              ],
              description:
                "Build marketing platforms, implement automation, drive efficiency.",
              milestone:
                "Built marketing automation platform saving team 2000+ hours annually",
            },
            {
              stage: 4,
              title: "VP MarTech / Chief Digital Officer",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Digital Strategy",
                "Executive Leadership",
                "Technology Integration",
                "Innovation",
              ],
              description:
                "Own digital transformation, lead marketing technology strategy.",
              milestone:
                "Built MarTech infrastructure enabling $500M+ digital revenue",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["HubSpot", "Google India", "Facebook India", "Oyo"],
      global: ["Google", "Meta", "Amazon", "Netflix"],
    },
    educationPath: {
      india: "B.Com or B.Tech → Digital Marketing Certifications (Google, HubSpot, Facebook)",
      global: "Bachelor's degree → Digital Marketing Certifications",
    },
  },

  // 11. PRODUCT MANAGEMENT
  {
    slug: "product-management",
    stages: [
      {
        stage: 1,
        title: "Associate / APM",
        yearRange: "0–2 years",
        salary: { india: "₹6–10 LPA", global: "$70–90K" },
        keySkills: [
          "Product Thinking",
          "User Research",
          "Analytics",
          "Communication",
        ],
        description:
          "Support product managers, conduct user research, and own small features.",
        milestone:
          "Shipped feature adopted by 100K+ users; achieved 4.5-star rating",
      },
      {
        stage: 2,
        title: "Product Manager",
        yearRange: "2–4 years",
        salary: { india: "₹14–24 LPA", global: "$100–140K" },
        keySkills: [
          "Strategy & Vision",
          "User Research",
          "Analytics Mastery",
          "Leadership",
        ],
        description:
          "Own product roadmap, drive strategy, and lead teams to build impactful products.",
        milestone:
          "Grew product revenue by 60% through strategic feature development",
      },
    ],
    fork: {
      question: "Which product path excites your vision?",
      options: [
        {
          label: "Platform / Infrastructure",
          icon: "🏗️",
          description:
            "Build foundational platforms enabling company and ecosystem growth",
          stages: [
            {
              stage: 3,
              title: "Senior PM / Platform Lead",
              yearRange: "4–7 years",
              salary: { india: "₹24–36 LPA", global: "$140–180K" },
              keySkills: [
                "Platform Thinking",
                "Ecosystem Strategy",
                "Technical Depth",
                "Stakeholder Management",
              ],
              description:
                "Own platform product, manage stakeholder complexity, drive ecosystem growth.",
              milestone:
                "Built platform supporting 10K+ partner integrations",
            },
            {
              stage: 4,
              title: "Director / Senior Director of Product",
              yearRange: "7+ years",
              salary: { india: "₹36–55 LPA", global: "$180–250K" },
              keySkills: [
                "Strategic Vision",
                "Organization Leadership",
                "Executive Partnership",
                "Long-term Planning",
              ],
              description:
                "Lead product organization, set multi-year strategy, shape company direction.",
              milestone:
                "Scaled platform to $500M+ revenue; 50+ platform products",
            },
          ],
        },
        {
          label: "Consumer Product",
          icon: "📱",
          description:
            "Create consumer products with millions of users and viral adoption",
          stages: [
            {
              stage: 3,
              title: "Senior PM / Head of Consumer",
              yearRange: "4–7 years",
              salary: { india: "₹22–34 LPA", global: "$130–170K" },
              keySkills: [
                "Consumer Insights",
                "Growth Hacking",
                "Viral Product Design",
                "Analytics Mastery",
              ],
              description:
                "Own consumer product strategy, drive growth, optimize engagement.",
              milestone:
                "Grew consumer product from 0 to 50M+ monthly active users",
            },
            {
              stage: 4,
              title: "Chief Product Officer / VP Consumer",
              yearRange: "7+ years",
              salary: { india: "₹34–55 LPA", global: "$170–250K" },
              keySkills: [
                "Product Visioning",
                "Executive Leadership",
                "Company Strategy",
                "User Obsession",
              ],
              description:
                "Lead company product vision, manage multiple consumer teams.",
              milestone:
                "Built consumer empire with 500M+ users across 5 products",
            },
          ],
        },
        {
          label: "Product Strategy & Analytics",
          icon: "📈",
          description:
            "Guide organization through data and create strategic product vision",
          stages: [
            {
              stage: 3,
              title: "Senior Product Strategist / Analytics Lead",
              yearRange: "4–7 years",
              salary: { india: "₹20–32 LPA", global: "$120–160K" },
              keySkills: [
                "Strategic Thinking",
                "Advanced Analytics",
                "Market Analysis",
                "Executive Communication",
              ],
              description:
                "Shape product strategy through data, guide executive decisions.",
              milestone:
                "Delivered strategic analysis driving $100M+ company decisions",
            },
            {
              stage: 4,
              title: "Chief Strategy Officer / Chief Product Officer",
              yearRange: "7+ years",
              salary: { india: "₹32–55 LPA", global: "$160–250K" },
              keySkills: [
                "Strategic Vision",
                "Executive Leadership",
                "Board Engagement",
                "Business Acumen",
              ],
              description:
                "Set company strategy, partner with C-suite, shape organizational future.",
              milestone:
                "Shaped company strategy leading to $5B+ valuation increase",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Flipkart", "Amazon", "Zomato", "Airbnb"],
      global: ["Google", "Meta", "Apple", "Netflix"],
    },
    educationPath: {
      india: "B.Tech or B.Com → Internships in product roles; MBA optional but helpful",
      global: "Bachelor's degree → Product Manager internships; MBA from top school optional",
    },
  },

  // 12. REAL ESTATE
  {
    slug: "real-estate",
    stages: [
      {
        stage: 1,
        title: "Property Analyst",
        yearRange: "0–2 years",
        salary: { india: "₹3–6 LPA", global: "$45–60K" },
        keySkills: [
          "Real Estate Analysis",
          "Market Research",
          "Financial Modeling",
          "Communication",
        ],
        description:
          "Analyze property markets, support acquisition decisions, manage deals.",
        milestone:
          "Identified investment opportunity resulting in ₹20 Cr acquisition",
      },
      {
        stage: 2,
        title: "Project Manager",
        yearRange: "2–5 years",
        salary: { india: "₹8–15 LPA", global: "$70–95K" },
        keySkills: [
          "Project Management",
          "Construction Management",
          "Regulatory Navigation",
          "Stakeholder Management",
        ],
        description:
          "Manage development projects, oversee construction, ensure regulatory compliance.",
        milestone:
          "Delivered 200-acre mixed-use project on time and within budget",
      },
    ],
    fork: {
      question: "Which real estate opportunity excites you?",
      options: [
        {
          label: "Commercial Real Estate",
          icon: "🏢",
          description:
            "Develop and manage commercial properties driving business value",
          stages: [
            {
              stage: 3,
              title: "Senior Manager / Development Lead",
              yearRange: "5–8 years",
              salary: { india: "₹15–25 LPA", global: "$100–140K" },
              keySkills: [
                "Commercial Strategy",
                "Tenant Management",
                "Development P&L",
                "Team Leadership",
              ],
              description:
                "Lead commercial development, manage properties, drive tenant value.",
              milestone:
                "Developed office complex generating $50M+ annual revenue",
            },
            {
              stage: 4,
              title: "VP / Chief Development Officer",
              yearRange: "8+ years",
              salary: { india: "₹25–45 LPA", global: "$140–220K" },
              keySkills: [
                "Strategic Leadership",
                "Portfolio Management",
                "Executive Partnership",
                "Growth Strategy",
              ],
              description:
                "Own commercial real estate portfolio, manage development strategy.",
              milestone:
                "Built $500M+ commercial real estate portfolio across 10 cities",
            },
          ],
        },
        {
          label: "PropTech",
          icon: "💻",
          description:
            "Build technology platforms transforming real estate transactions",
          stages: [
            {
              stage: 3,
              title: "Product Manager / Technology Lead",
              yearRange: "5–8 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Product Strategy",
                "RE Technology",
                "User Research",
                "Tech Leadership",
              ],
              description:
                "Build PropTech products, drive digital transformation of real estate.",
              milestone:
                "Built platform enabling $1B+ in property transactions annually",
            },
            {
              stage: 4,
              title: "Chief Product Officer / Founder",
              yearRange: "8+ years",
              salary: { india: "₹26–45 LPA", global: "$150–230K" },
              keySkills: [
                "Product Vision",
                "Fundraising",
                "Market Strategy",
                "Leadership",
              ],
              description:
                "Lead PropTech company, set strategy, drive market disruption.",
              milestone:
                "Built PropTech unicorn valued at $1B+ disrupting industry",
            },
          ],
        },
        {
          label: "Real Estate Investment",
          icon: "📊",
          description:
            "Manage investment portfolios and build wealth through real estate",
          stages: [
            {
              stage: 3,
              title: "Senior Investment Manager / Portfolio Lead",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Investment Strategy",
                "Financial Analysis",
                "Risk Management",
                "Portfolio Management",
              ],
              description:
                "Manage investment portfolio, identify opportunities, drive returns.",
              milestone:
                "Managed $200M+ real estate portfolio delivering 15% annual returns",
            },
            {
              stage: 4,
              title: "Chief Investment Officer / Managing Partner",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Strategic Vision",
                "Fund Management",
                "Investor Relations",
                "Business Leadership",
              ],
              description:
                "Lead investment firm, manage funds, drive investor returns.",
              milestone:
                "Managed $1B+ real estate fund with 18% average annual returns",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["DLF", "Lodha", "Prestige Group", "Brigade Group"],
      global: ["CBRE", "Cushman & Wakefield", "JLL", "Berkshire Hathaway"],
    },
    educationPath: {
      india: "B.Com/B.Tech → Real Estate Management Diploma or MBA in Real Estate",
      global: "Bachelor's degree → MBA in Real Estate or Real Estate Finance",
    },
  },

  // 13. LAW & LEGAL
  {
    slug: "law-legal",
    stages: [
      {
        stage: 1,
        title: "Junior Associate",
        yearRange: "0–2 years",
        salary: { india: "₹5–9 LPA", global: "$60–80K" },
        keySkills: [
          "Legal Research",
          "Legal Writing",
          "Case Analysis",
          "Client Interaction",
        ],
        description:
          "Conduct legal research, draft documents, support senior lawyers on cases.",
        milestone:
          "Successfully argued motion resulting in favorable ruling for client",
      },
      {
        stage: 2,
        title: "Associate / Senior Associate",
        yearRange: "2–5 years",
        salary: { india: "₹10–20 LPA", global: "$90–130K" },
        keySkills: [
          "Legal Expertise",
          "Client Management",
          "Deal Execution",
          "Leadership",
        ],
        description:
          "Lead cases, manage client relationships, and negotiate complex legal matters.",
        milestone:
          "Negotiated $50M acquisition including all legal due diligence",
      },
    ],
    fork: {
      question: "Which legal specialization will you pursue?",
      options: [
        {
          label: "Corporate Law & M&A",
          icon: "💼",
          description:
            "Guide companies through mergers, acquisitions, and corporate transactions",
          stages: [
            {
              stage: 3,
              title: "Senior Associate / Counsel",
              yearRange: "5–8 years",
              salary: { india: "₹20–35 LPA", global: "$130–180K" },
              keySkills: [
                "M&A Law",
                "Corporate Governance",
                "Deal Structuring",
                "Executive Advising",
              ],
              description:
                "Lead M&A transactions, advise executives, manage complex deals.",
              milestone:
                "Closed $500M+ in M&A transactions; advised Fortune 500 company",
            },
            {
              stage: 4,
              title: "Partner / Senior Counsel",
              yearRange: "8+ years",
              salary: { india: "₹35–60 LPA", global: "$180–300K" },
              keySkills: [
                "M&A Leadership",
                "Client Relationships",
                "Practice Management",
                "Thought Leadership",
              ],
              description:
                "Lead M&A practice, manage client relationships, drive firm growth.",
              milestone:
                "Built M&A practice generating $5M+ annual revenue; 100+ deals",
            },
          ],
        },
        {
          label: "Litigation",
          icon: "⚖️",
          description:
            "Represent clients in courts and resolve complex legal disputes",
          stages: [
            {
              stage: 3,
              title: "Senior Litigator / Counsel",
              yearRange: "5–8 years",
              salary: { india: "₹18–32 LPA", global: "$120–170K" },
              keySkills: [
                "Trial Skills",
                "Legal Strategy",
                "Persuasion",
                "Client Advocacy",
              ],
              description:
                "Lead litigation matters, represent clients in court, develop legal strategy.",
              milestone:
                "Won 8 major cases resulting in $200M+ in client awards",
            },
            {
              stage: 4,
              title: "Partner / Litigation Lead",
              yearRange: "8+ years",
              salary: { india: "₹32–55 LPA", global: "$170–280K" },
              keySkills: [
                "Litigation Leadership",
                "Client Management",
                "Business Development",
                "Practice Building",
              ],
              description:
                "Lead litigation practice, manage high-stakes cases, build client base.",
              milestone:
                "Built litigation practice with $3M+ annual revenue; landmark cases",
            },
          ],
        },
        {
          label: "Legal Technology & Policy",
          icon: "🏛️",
          description:
            "Shape legal systems through technology, policy, and legal innovation",
          stages: [
            {
              stage: 3,
              title: "Senior Legal Tech / Policy Manager",
              yearRange: "5–8 years",
              salary: { india: "₹16–28 LPA", global: "$110–150K" },
              keySkills: [
                "Legal Innovation",
                "Policy Development",
                "Stakeholder Engagement",
                "Systems Thinking",
              ],
              description:
                "Develop legal technology platforms, influence policy, drive innovation.",
              milestone:
                "Built legal tech platform serving 10K+ users; influenced policy change",
            },
            {
              stage: 4,
              title: "Chief Legal Officer / Policy Head",
              yearRange: "8+ years",
              salary: { india: "₹28–45 LPA", global: "$150–230K" },
              keySkills: [
                "Strategic Leadership",
                "Policy Expertise",
                "Executive Engagement",
                "Innovation Vision",
              ],
              description:
                "Lead legal innovation strategy, influence policy at scale, shape systems.",
              milestone:
                "Guided 3 policy changes affecting legal industry; built $50M+ tech business",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Cyril Amarchand Mangaldas", "Trilegal", "AZB & Partners", "Shardul Amarchand"],
      global: ["Baker McKenzie", "DLA Piper", "Sullivan & Cromwell", "Wachtell Lipton"],
    },
    educationPath: {
      india: "LLB (5-year integrated or 3-year after 12th) → Internships at law firms",
      global: "JD (Juris Doctor) from law school → Legal internships",
    },
  },

  // 14. FASHION DESIGN
  {
    slug: "fashion-design",
    stages: [
      {
        stage: 1,
        title: "Design Assistant",
        yearRange: "0–2 years",
        salary: { india: "₹3–5 LPA", global: "$35–50K" },
        keySkills: [
          "Fashion Design",
          "CAD/Illustration",
          "Pattern Making",
          "Trend Research",
        ],
        description:
          "Assist designers, create sketches, support collection development.",
        milestone:
          "Designed 20-piece collection shown in regional fashion show",
      },
      {
        stage: 2,
        title: "Designer",
        yearRange: "2–4 years",
        salary: { india: "₹6–12 LPA", global: "$55–80K" },
        keySkills: [
          "Collection Design",
          "Creative Direction",
          "Brand Aesthetics",
          "Trend Setting",
        ],
        description:
          "Design collections, set brand aesthetic, collaborate with production.",
        milestone:
          "Designed 2 seasons; collection sold to 50+ retail stores",
      },
    ],
    fork: {
      question: "Which fashion path will showcase your creativity?",
      options: [
        {
          label: "Luxury & Haute Couture",
          icon: "👑",
          description:
            "Create exclusive, high-end fashion for discerning clientele",
          stages: [
            {
              stage: 3,
              title: "Senior Designer / Creative Lead",
              yearRange: "4–7 years",
              salary: { india: "₹12–22 LPA", global: "$80–120K" },
              keySkills: [
                "Haute Couture Design",
                "Luxury Brand Building",
                "Craftsmanship",
                "Creative Vision",
              ],
              description:
                "Design luxury collections, build brand prestige, lead design team.",
              milestone:
                "Built luxury brand with ₹5 Cr+ annual revenue; flagship store in Delhi",
            },
            {
              stage: 4,
              title: "Chief Designer / Creative Director",
              yearRange: "7+ years",
              salary: { india: "₹22–40 LPA", global: "$120–200K" },
              keySkills: [
                "Design Vision",
                "Brand Leadership",
                "Innovation",
                "Industry Influence",
              ],
              description:
                "Own brand creative direction, set industry trends, build legacy.",
              milestone:
                "Established luxury brand with ₹50 Cr+ revenue; international presence",
            },
          ],
        },
        {
          label: "Fashion Technology & Sustainability",
          icon: "♻️",
          description:
            "Build sustainable and tech-enabled fashion solutions",
          stages: [
            {
              stage: 3,
              title: "Sustainable Fashion Manager / Innovation Lead",
              yearRange: "4–7 years",
              salary: { india: "₹10–20 LPA", global: "$75–115K" },
              keySkills: [
                "Sustainable Design",
                "Material Innovation",
                "Supply Chain",
                "Tech Integration",
              ],
              description:
                "Design sustainable collections, innovate materials, drive eco-fashion.",
              milestone:
                "Launched sustainable brand using 100% organic materials; 50K+ customers",
            },
            {
              stage: 4,
              title: "VP Sustainability / Chief Innovation Officer",
              yearRange: "7+ years",
              salary: { india: "₹20–35 LPA", global: "$115–195K" },
              keySkills: [
                "Sustainability Vision",
                "Innovation Strategy",
                "Leadership",
                "Impact Creation",
              ],
              description:
                "Lead sustainable fashion movement, innovate business models.",
              milestone:
                "Built sustainable fashion company valued at $50M; industry awards",
            },
          ],
        },
        {
          label: "Own Label & Entrepreneurship",
          icon: "🎨",
          description:
            "Build your own fashion brand from design to retail",
          stages: [
            {
              stage: 3,
              title: "Brand Owner / Founder",
              yearRange: "4–7 years",
              salary: { india: "₹5–15 LPA + Business", global: "$40–100K + Business" },
              keySkills: [
                "Design + Entrepreneurship",
                "Brand Building",
                "Marketing",
                "Business Management",
              ],
              description:
                "Build fashion brand, manage operations, drive growth and brand loyalty.",
              milestone:
                "Bootstrapped fashion brand to ₹2 Cr+ revenue; 5 retail outlets",
            },
            {
              stage: 4,
              title: "Fashion Entrepreneur / Design House Leader",
              yearRange: "7+ years",
              salary: {
                india: "₹15–30 LPA + Significant Business Equity",
                global: "$100–200K + Significant Business Equity",
              },
              keySkills: [
                "Vision & Leadership",
                "Brand Strategy",
                "Scaling Operations",
                "Market Leadership",
              ],
              description:
                "Scale fashion house into multi-brand portfolio with national presence.",
              milestone:
                "Built fashion empire with ₹20 Cr+ revenue across 3 brands",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Sabyasachi", "Anita Dongre", "Ajio", "Nykaa Fashion"],
      global: ["LVMH", "Hermès", "Gucci", "Adidas Design Studio"],
    },
    educationPath: {
      india: "Bachelor's in Fashion Design (NIFT, Pearl Academy) → Internships at design houses",
      global: "BFA Fashion Design (Parsons, FIT, Central Saint Martins) → Design studio internships",
    },
  },

  // 15. HUMAN RESOURCES
  {
    slug: "human-resources",
    stages: [
      {
        stage: 1,
        title: "HR Executive",
        yearRange: "0–2 years",
        salary: { india: "₹3–6 LPA", global: "$45–60K" },
        keySkills: [
          "Recruitment",
          "Employee Relations",
          "Compliance",
          "HR Systems",
        ],
        description:
          "Support recruitment, manage employee issues, ensure HR compliance.",
        milestone:
          "Hired 100+ employees for company expansion into new market",
      },
      {
        stage: 2,
        title: "HR Manager / HRBP",
        yearRange: "2–4 years",
        salary: { india: "₹8–15 LPA", global: "$70–95K" },
        keySkills: [
          "Strategic HR",
          "Talent Management",
          "Organizational Development",
          "Leadership Coaching",
        ],
        description:
          "Partner with business leaders, drive talent initiatives, shape culture.",
        milestone:
          "Implemented talent development program improving retention by 25%",
      },
    ],
    fork: {
      question: "Which HR domain will you lead?",
      options: [
        {
          label: "HR Technology & Analytics",
          icon: "📊",
          description:
            "Build HR technology and people analytics driving organizational decisions",
          stages: [
            {
              stage: 3,
              title: "Senior HR Tech Manager / Analytics Lead",
              yearRange: "4–7 years",
              salary: { india: "₹15–25 LPA", global: "$100–140K" },
              keySkills: [
                "HR Technology",
                "People Analytics",
                "Data-Driven HR",
                "Systems Thinking",
              ],
              description:
                "Implement HR platforms, develop people analytics, drive data-driven decisions.",
              milestone:
                "Built people analytics platform improving hiring quality by 40%",
            },
            {
              stage: 4,
              title: "VP / Chief People Officer",
              yearRange: "7+ years",
              salary: { india: "₹25–45 LPA", global: "$140–220K" },
              keySkills: [
                "Strategic Leadership",
                "Technology Vision",
                "Organizational Design",
                "Executive Partnership",
              ],
              description:
                "Lead HR transformation through technology and analytics; shape org strategy.",
              milestone:
                "Scaled HR function to support 5000+ employees; 99% employee engagement",
            },
          ],
        },
        {
          label: "Talent & Organizational Development",
          icon: "🚀",
          description:
            "Build talent and develop high-performing organizations",
          stages: [
            {
              stage: 3,
              title: "Senior Talent Manager / OD Lead",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$95–135K" },
              keySkills: [
                "Talent Development",
                "Organizational Change",
                "Coaching",
                "Culture Building",
              ],
              description:
                "Develop talent pipelines, drive organizational transformation, build culture.",
              milestone:
                "Implemented succession planning for 50+ leadership roles",
            },
            {
              stage: 4,
              title: "VP Talent & Culture / Chief People Officer",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Executive Leadership",
                "Talent Vision",
                "Culture Strategy",
                "Organizational Architecture",
              ],
              description:
                "Lead talent and culture strategy at scale; partner with C-suite.",
              milestone:
                "Built talent infrastructure supporting unicorn scaling from 50 to 1000 employees",
            },
          ],
        },
        {
          label: "Total Rewards & Compensation",
          icon: "💰",
          description:
            "Design compensation and benefits strategies driving retention and engagement",
          stages: [
            {
              stage: 3,
              title: "Senior Compensation Manager / Rewards Lead",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$95–135K" },
              keySkills: [
                "Compensation Design",
                "Market Analysis",
                "Benefits Strategy",
                "Analytics",
              ],
              description:
                "Design compensation strategies, conduct market analysis, optimize benefits.",
              milestone:
                "Redesigned compensation improving competitiveness; reduced turnover by 20%",
            },
            {
              stage: 4,
              title: "VP Total Rewards / Chief People Officer",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Strategic Leadership",
                "Rewards Vision",
                "Executive Engagement",
                "Change Management",
              ],
              description:
                "Lead organization-wide rewards strategy; drive engagement and retention.",
              milestone:
                "Implemented global rewards strategy improving engagement scores by 35%",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Accenture India", "Google India", "Microsoft India", "Amazon India"],
      global: ["McKinsey", "Google", "Amazon", "Salesforce"],
    },
    educationPath: {
      india: "B.Com/B.A. → MBA HR or PGDM HR from XLRI/FLAME",
      global: "Bachelor's degree → MBA or Master's in Human Resources",
    },
  },

  // 16. ARCHITECTURE & PLANNING
  {
    slug: "architecture-planning",
    stages: [
      {
        stage: 1,
        title: "Junior Architect",
        yearRange: "0–2 years",
        salary: { india: "₹3–6 LPA", global: "$50–65K" },
        keySkills: ["Building Design", "CAD", "Site Planning", "Code Compliance"],
        description:
          "Develop designs, create drawings, support senior architects on projects.",
        milestone:
          "Designed residential building approved by municipal corporation",
      },
      {
        stage: 2,
        title: "Architect",
        yearRange: "2–5 years",
        salary: { india: "₹8–15 LPA", global: "$70–95K" },
        keySkills: [
          "Project Design",
          "Client Management",
          "Construction Supervision",
          "Innovation",
        ],
        description:
          "Lead architectural projects, manage clients, ensure design excellence.",
        milestone:
          "Designed 10-story commercial complex; won architectural award",
      },
    ],
    fork: {
      question: "Which architectural specialty will you master?",
      options: [
        {
          label: "Sustainable & Green Architecture",
          icon: "🌱",
          description:
            "Design buildings that minimize environmental impact and maximize wellness",
          stages: [
            {
              stage: 3,
              title: "Senior Green Architect / Sustainability Lead",
              yearRange: "5–8 years",
              salary: { india: "₹15–25 LPA", global: "$100–140K" },
              keySkills: [
                "Green Design",
                "Sustainability Standards",
                "Energy Efficiency",
                "Material Innovation",
              ],
              description:
                "Lead green building projects, achieve LEED certifications, drive sustainability.",
              milestone:
                "Designed 5 green buildings reducing energy consumption by 50%",
            },
            {
              stage: 4,
              title: "Principal Architect / Chief Sustainability Officer",
              yearRange: "8+ years",
              salary: { india: "₹25–45 LPA", global: "$140–220K" },
              keySkills: [
                "Design Vision",
                "Sustainability Strategy",
                "Practice Leadership",
                "Innovation",
              ],
              description:
                "Lead sustainable architecture practice, set industry standards.",
              milestone:
                "Built green architecture firm with ₹20 Cr+ annual projects",
            },
          ],
        },
        {
          label: "Urban Planning & Design",
          icon: "🏙️",
          description:
            "Shape cities through strategic planning and urban design",
          stages: [
            {
              stage: 3,
              title: "Senior Urban Planner / Design Lead",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$95–135K" },
              keySkills: [
                "Urban Design",
                "Master Planning",
                "Stakeholder Engagement",
                "Policy Understanding",
              ],
              description:
                "Lead master planning projects, shape urban development, engage stakeholders.",
              milestone:
                "Designed master plan for 500-acre smart city development",
            },
            {
              stage: 4,
              title: "Chief Urban Planner / Design Director",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Vision & Leadership",
                "Policy Influence",
                "Stakeholder Management",
                "Practice Building",
              ],
              description:
                "Lead urban planning initiatives, influence city policies, shape future cities.",
              milestone:
                "Shaped urban plans for 5 cities; influenced ₹10,000 Cr+ development",
            },
          ],
        },
        {
          label: "Computational & Parametric Design",
          icon: "💻",
          description:
            "Use technology and algorithms to create innovative architectural forms",
          stages: [
            {
              stage: 3,
              title: "Senior Computational Designer / Tech Lead",
              yearRange: "5–8 years",
              salary: { india: "₹16–26 LPA", global: "$110–150K" },
              keySkills: [
                "Parametric Design",
                "Programming",
                "Digital Tools",
                "Innovation",
              ],
              description:
                "Design computationally optimized buildings, push architectural boundaries.",
              milestone:
                "Designed parametric building reducing construction waste by 40%",
            },
            {
              stage: 4,
              title: "Principal / Innovation Director",
              yearRange: "8+ years",
              salary: { india: "₹26–45 LPA", global: "$150–230K" },
              keySkills: [
                "Design Vision",
                "Tech Leadership",
                "Innovation Strategy",
                "Practice Building",
              ],
              description:
                "Lead computational design practice, drive architectural innovation.",
              milestone:
                "Established computational design studio recognized globally",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["NRIPL", "Hafeez Contractor & Associates", "Malik Architecture", "Morphogenesis"],
      global: ["Zaha Hadid Architects", "OMA", "SOM", "Gensler"],
    },
    educationPath: {
      india: "B.Arch (5-year) from NID/CEPT → Internships at architecture firms",
      global: "B.Arch or M.Arch from top design school → Architecture firm internships",
    },
  },

  // 17. HEALTHCARE MANAGEMENT
  {
    slug: "healthcare-management",
    stages: [
      {
        stage: 1,
        title: "Healthcare Coordinator",
        yearRange: "0–2 years",
        salary: { india: "₹3–6 LPA", global: "$45–60K" },
        keySkills: [
          "Healthcare Operations",
          "Patient Management",
          "Data Handling",
          "Compliance",
        ],
        description:
          "Coordinate healthcare operations, manage patient flow, support administration.",
        milestone:
          "Improved hospital patient satisfaction scores from 75% to 88%",
      },
      {
        stage: 2,
        title: "Manager / Administrator",
        yearRange: "2–5 years",
        salary: { india: "₹8–14 LPA", global: "$65–90K" },
        keySkills: [
          "Healthcare Administration",
          "Finance Management",
          "Quality Assurance",
          "Leadership",
        ],
        description:
          "Manage healthcare facility operations, ensure quality, drive efficiency.",
        milestone:
          "Led hospital achieving JCI accreditation on first attempt",
      },
    ],
    fork: {
      question: "Which healthcare path will you lead?",
      options: [
        {
          label: "Hospital Administration",
          icon: "🏥",
          description:
            "Manage hospital operations ensuring quality care and financial sustainability",
          stages: [
            {
              stage: 3,
              title: "Senior Hospital Manager / Medical Director",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Hospital Management",
                "Clinical Leadership",
                "Financial Management",
                "Quality Improvement",
              ],
              description:
                "Lead hospital operations, manage staff, ensure quality and compliance.",
              milestone:
                "Managed 500-bed hospital with ₹100 Cr+ annual revenue",
            },
            {
              stage: 4,
              title: "Chief Executive Officer / Healthcare Group Leader",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Strategic Leadership",
                "Healthcare Vision",
                "Board Engagement",
                "Growth Strategy",
              ],
              description:
                "Lead healthcare group, set strategy, manage hospital network.",
              milestone:
                "Built healthcare chain with 10+ hospitals serving 1M+ patients annually",
            },
          ],
        },
        {
          label: "HealthTech & Digital Health",
          icon: "📱",
          description:
            "Transform healthcare through digital technology and innovative platforms",
          stages: [
            {
              stage: 3,
              title: "Senior HealthTech Manager / Product Lead",
              yearRange: "5–8 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "HealthTech Strategy",
                "Product Management",
                "Healthcare Expertise",
                "Regulatory Knowledge",
              ],
              description:
                "Build digital health platforms, drive healthcare digitization.",
              milestone:
                "Built telemedicine platform serving 100K+ patients monthly",
            },
            {
              stage: 4,
              title: "Chief Product Officer / Founder",
              yearRange: "8+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Product Vision",
                "Healthcare Innovation",
                "Fundraising",
                "Market Leadership",
              ],
              description:
                "Lead HealthTech company, drive healthcare transformation.",
              milestone:
                "Built HealthTech unicorn valued at $100M+; serving 5M+ patients",
            },
          ],
        },
        {
          label: "Public Health & Policy",
          icon: "🌍",
          description:
            "Improve population health through policy, programs, and public health initiatives",
          stages: [
            {
              stage: 3,
              title: "Senior Public Health Manager / Policy Lead",
              yearRange: "5–8 years",
              salary: { india: "₹12–22 LPA", global: "$90–130K" },
              keySkills: [
                "Public Health",
                "Policy Development",
                "Program Management",
                "Epidemiology",
              ],
              description:
                "Lead public health programs, develop policies, improve population health.",
              milestone:
                "Led immunization program reaching 1M+ children",
            },
            {
              stage: 4,
              title: "Chief Public Health Officer / Policy Director",
              yearRange: "8+ years",
              salary: { india: "₹22–38 LPA", global: "$130–200K" },
              keySkills: [
                "Public Health Leadership",
                "Policy Expertise",
                "Government Relations",
                "Impact Creation",
              ],
              description:
                "Lead public health organization, shape healthcare policy at scale.",
              milestone:
                "Directed public health initiatives impacting 10M+ population",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Apollo Hospitals", "Max Healthcare", "Fortis Healthcare", "Narayana Health"],
      global: ["Mayo Clinic", "Cleveland Clinic", "Kaiser Permanente", "CVS Health"],
    },
    educationPath: {
      india: "B.Sc (Health Management) or MBA Healthcare Management",
      global: "Bachelor's degree + MBA in Healthcare Management or MHA",
    },
  },

  // 18. HOSPITALITY MANAGEMENT
  {
    slug: "hospitality-management",
    stages: [
      {
        stage: 1,
        title: "Trainee / Executive",
        yearRange: "0–2 years",
        salary: { india: "₹3–5 LPA", global: "$35–50K" },
        keySkills: [
          "Customer Service",
          "Operations",
          "Hospitality Standards",
          "Communication",
        ],
        description:
          "Support hospitality operations, deliver guest experiences, learn industry.",
        milestone:
          "Achieved 95% guest satisfaction rating at property",
      },
      {
        stage: 2,
        title: "Manager",
        yearRange: "2–4 years",
        salary: { india: "₹6–12 LPA", global: "$55–75K" },
        keySkills: [
          "Property Management",
          "Staff Leadership",
          "Revenue Optimization",
          "Guest Relations",
        ],
        description:
          "Manage hospitality property, lead teams, ensure guest satisfaction.",
        milestone:
          "Managed 200-room hotel achieving ₹20 Cr annual revenue",
      },
    ],
    fork: {
      question: "Which hospitality domain excites you?",
      options: [
        {
          label: "Luxury Hotels & Resorts",
          icon: "⭐",
          description:
            "Create exceptional luxury experiences for affluent travelers",
          stages: [
            {
              stage: 3,
              title: "Senior Manager / Resort Director",
              yearRange: "4–7 years",
              salary: { india: "₹12–22 LPA", global: "$80–120K" },
              keySkills: [
                "Luxury Hospitality",
                "Guest Experience Design",
                "Revenue Management",
                "Team Leadership",
              ],
              description:
                "Lead luxury property, create exceptional experiences, maximize revenue.",
              milestone:
                "Managed luxury resort generating ₹50 Cr+ annual revenue with 98% occupancy",
            },
            {
              stage: 4,
              title: "VP Operations / Regional Director",
              yearRange: "7+ years",
              salary: { india: "₹22–38 LPA", global: "$120–190K" },
              keySkills: [
                "Regional Leadership",
                "Brand Strategy",
                "Multi-property Management",
                "Growth Strategy",
              ],
              description:
                "Lead luxury hotel portfolio, expand brand, drive growth.",
              milestone:
                "Scaled luxury brand to 10 properties across 5 countries",
            },
          ],
        },
        {
          label: "Food & Beverage / Restaurant Chains",
          icon: "🍽️",
          description:
            "Build restaurant and food service brands with exceptional dining experiences",
          stages: [
            {
              stage: 3,
              title: "Senior F&B Manager / Regional Manager",
              yearRange: "4–7 years",
              salary: { india: "₹10–20 LPA", global: "$75–115K" },
              keySkills: [
                "F&B Operations",
                "Menu Development",
                "Restaurant Management",
                "Multi-unit Leadership",
              ],
              description:
                "Manage F&B operations, develop menus, lead multiple locations.",
              milestone:
                "Managed F&B portfolio with ₹30 Cr+ annual revenue across 15 restaurants",
            },
            {
              stage: 4,
              title: "Chief Operating Officer / Brand Director",
              yearRange: "7+ years",
              salary: { india: "₹20–35 LPA", global: "$115–195K" },
              keySkills: [
                "Restaurant Chain Leadership",
                "Brand Development",
                "Franchising",
                "Growth Strategy",
              ],
              description:
                "Lead F&B brand expansion, manage franchises, drive growth.",
              milestone:
                "Built restaurant chain to 100+ locations; ₹100 Cr+ annual revenue",
            },
          ],
        },
        {
          label: "Travel & Hospitality Technology",
          icon: "🗺️",
          description:
            "Build platforms and technology transforming travel and hospitality",
          stages: [
            {
              stage: 3,
              title: "Senior Product Manager / Travel Tech Lead",
              yearRange: "4–7 years",
              salary: { india: "₹14–24 LPA", global: "$100–140K" },
              keySkills: [
                "Travel Technology",
                "Product Strategy",
                "Hospitality Knowledge",
                "User Experience",
              ],
              description:
                "Build travel platforms, enhance customer experience, drive adoption.",
              milestone:
                "Built booking platform with 1M+ monthly transactions",
            },
            {
              stage: 4,
              title: "Chief Product Officer / Founder",
              yearRange: "7+ years",
              salary: { india: "₹24–40 LPA", global: "$140–210K" },
              keySkills: [
                "Travel Industry Vision",
                "Platform Leadership",
                "Market Strategy",
                "Innovation",
              ],
              description:
                "Lead travel technology company, shape hospitality industry.",
              milestone:
                "Built travel tech company valued at $200M+ with global reach",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Taj Hotels", "ITC Hotels", "Oberoi Group", "Marriott India"],
      global: ["Four Seasons", "Ritz-Carlton", "Hilton", "Marriott International"],
    },
    educationPath: {
      india: "Bachelor's in Hotel Management (IHM, IHMR) or Diploma",
      global: "Bachelor's or Associate degree in Hospitality Management",
    },
  },

  // 19. EDUCATION & SOCIAL WORK
  {
    slug: "education-social-work",
    stages: [
      {
        stage: 1,
        title: "Teacher / Social Worker",
        yearRange: "0–2 years",
        salary: { india: "₹3–5 LPA", global: "$40–55K" },
        keySkills: [
          "Teaching / Counseling",
          "Community Engagement",
          "Empathy",
          "Program Design",
        ],
        description:
          "Teach students or support communities, create positive impact.",
        milestone:
          "Helped 100+ students improve academic performance by 30%",
      },
      {
        stage: 2,
        title: "Senior Educator / Program Manager",
        yearRange: "2–5 years",
        salary: { india: "₹6–12 LPA", global: "$55–75K" },
        keySkills: [
          "Curriculum Development",
          "Program Leadership",
          "Mentoring",
          "Impact Measurement",
        ],
        description:
          "Lead educational programs, mentor educators, drive social impact.",
        milestone:
          "Developed curriculum adopted by 50+ schools; 5000+ students impacted",
      },
    ],
    fork: {
      question: "Which education path will transform lives?",
      options: [
        {
          label: "EdTech",
          icon: "📚",
          description:
            "Build technology platforms making quality education accessible",
          stages: [
            {
              stage: 3,
              title: "Senior EdTech Manager / Product Lead",
              yearRange: "5–8 years",
              salary: { india: "₹12–22 LPA", global: "$90–130K" },
              keySkills: [
                "EdTech Product",
                "Learning Science",
                "Platform Development",
                "User Research",
              ],
              description:
                "Build educational platforms, drive learning outcomes, expand access.",
              milestone:
                "Built EdTech platform serving 1M+ students globally",
            },
            {
              stage: 4,
              title: "Chief Education Officer / Founder",
              yearRange: "8+ years",
              salary: { india: "₹22–38 LPA", global: "$130–200K" },
              keySkills: [
                "Education Vision",
                "EdTech Leadership",
                "Scale & Impact",
                "Fundraising",
              ],
              description:
                "Lead EdTech company, shape education transformation.",
              milestone:
                "Built EdTech unicorn impacting 10M+ learners in 50+ countries",
            },
          ],
        },
        {
          label: "Education Leadership",
          icon: "🎓",
          description:
            "Lead schools and educational institutions creating excellent outcomes",
          stages: [
            {
              stage: 3,
              title: "Principal / Education Director",
              yearRange: "5–8 years",
              salary: { india: "₹10–20 LPA", global: "$80–120K" },
              keySkills: [
                "School Leadership",
                "Curriculum Development",
                "Stakeholder Management",
                "Educational Vision",
              ],
              description:
                "Lead school, improve outcomes, build excellence.",
              milestone:
                "Led school achieving top national rankings; 90%+ college enrollment",
            },
            {
              stage: 4,
              title: "Regional Director / Education Group Head",
              yearRange: "8+ years",
              salary: { india: "₹20–35 LPA", global: "$120–190K" },
              keySkills: [
                "Multi-school Leadership",
                "Education Strategy",
                "Systems Thinking",
                "Impact Creation",
              ],
              description:
                "Lead education group, scale excellence, drive systemic change.",
              milestone:
                "Scaled education network to 50 schools; 20K+ students; national awards",
            },
          ],
        },
        {
          label: "NGO & Social Enterprise",
          icon: "🤝",
          description:
            "Create social impact through nonprofits and social enterprises",
          stages: [
            {
              stage: 3,
              title: "Program Director / NGO Head",
              yearRange: "5–8 years",
              salary: { india: "₹8–16 LPA", global: "$70–110K" },
              keySkills: [
                "Social Impact",
                "Program Management",
                "Community Leadership",
                "Fundraising",
              ],
              description:
                "Lead NGO programs, measure impact, drive social change.",
              milestone:
                "Led program impacting 100K+ lives; raised ₹5 Cr+ funding",
            },
            {
              stage: 4,
              title: "Executive Director / Founder",
              yearRange: "8+ years",
              salary: { india: "₹16–28 LPA", global: "$110–180K" },
              keySkills: [
                "Social Vision",
                "NGO Leadership",
                "Systems Change",
                "Scale Building",
              ],
              description:
                "Lead social enterprise, scale impact, create systemic change.",
              milestone:
                "Built NGO creating measurable impact for 1M+ beneficiaries",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["Teach for India", "Akshara Foundation", "NASSCOM Foundation", "Pratham"],
      global: ["Khan Academy", "Coursera", "EdX", "Teach for America"],
    },
    educationPath: {
      india: "B.Ed or B.A. + Social Science → M.Ed or MSW for advanced roles",
      global: "Bachelor's degree → Teaching credential or Master's in Education",
    },
  },

  // 20. CREATIVE ARTS
  {
    slug: "creative-arts",
    stages: [
      {
        stage: 1,
        title: "Junior Creative",
        yearRange: "0–2 years",
        salary: { india: "₹3–5 LPA", global: "$35–50K" },
        keySkills: [
          "Creative Skills",
          "Design Tools",
          "Collaboration",
          "Communication",
        ],
        description:
          "Create content, assist senior creatives, develop artistic skills.",
        milestone:
          "Designed campaign assets viewed by 5M+ people",
      },
      {
        stage: 2,
        title: "Creative Lead",
        yearRange: "2–4 years",
        salary: { india: "₹6–12 LPA", global: "$55–80K" },
        keySkills: [
          "Creative Direction",
          "Team Leadership",
          "Brand Storytelling",
          "Innovation",
        ],
        description:
          "Lead creative projects, direct teams, create award-winning work.",
        milestone:
          "Won 3 industry awards for creative campaigns",
      },
    ],
    fork: {
      question: "Which creative path will showcase your talent?",
      options: [
        {
          label: "Film & Animation Studio",
          icon: "🎬",
          description:
            "Create compelling films and animations for global audiences",
          stages: [
            {
              stage: 3,
              title: "Director / Creative Producer",
              yearRange: "4–7 years",
              salary: { india: "₹10–20 LPA", global: "$80–130K" },
              keySkills: [
                "Direction",
                "Storytelling",
                "Production Management",
                "Creative Vision",
              ],
              description:
                "Direct films/animations, lead production teams, create compelling stories.",
              milestone:
                "Directed film viewed by 100M+ globally; international festival selection",
            },
            {
              stage: 4,
              title: "Studio Head / Creative Director",
              yearRange: "7+ years",
              salary: { india: "₹20–35 LPA", global: "$130–210K" },
              keySkills: [
                "Studio Leadership",
                "Creative Vision",
                "Business Development",
                "Talent Development",
              ],
              description:
                "Lead film/animation studio, manage portfolio, shape industry.",
              milestone:
                "Built studio with 100+ employees; ₹50 Cr+ annual production",
            },
          ],
        },
        {
          label: "Freelance & Independent Creator",
          icon: "🎨",
          description:
            "Build independent creative business and personal brand",
          stages: [
            {
              stage: 3,
              title: "Established Creator / Influencer",
              yearRange: "4–7 years",
              salary: { india: "₹10–20 LPA + Business", global: "$70–130K + Business" },
              keySkills: [
                "Content Creation",
                "Community Building",
                "Personal Branding",
                "Business Management",
              ],
              description:
                "Build audience, create monetized content, establish brand.",
              milestone:
                "Built 2M+ followers; ₹1 Cr+ annual income from content creation",
            },
            {
              stage: 4,
              title: "Creator Entrepreneur / Media Mogul",
              yearRange: "7+ years",
              salary: {
                india: "₹20–40 LPA + Significant Business",
                global: "$130–250K + Significant Business",
              },
              keySkills: [
                "Creative Entrepreneurship",
                "Brand Building",
                "Media Strategy",
                "Talent Management",
              ],
              description:
                "Build media brand, create content empire, scale audience.",
              milestone:
                "Built media brand valued at ₹50 Cr+; 10M+ followers; multiple revenue streams",
            },
          ],
        },
        {
          label: "Creative Direction & Agency",
          icon: "🏢",
          description:
            "Lead creative teams and agencies creating transformative work",
          stages: [
            {
              stage: 3,
              title: "Creative Director",
              yearRange: "4–7 years",
              salary: { india: "₹12–22 LPA", global: "$100–140K" },
              keySkills: [
                "Creative Leadership",
                "Brand Direction",
                "Team Building",
                "Strategic Thinking",
              ],
              description:
                "Lead creative team, set creative direction, deliver award-winning work.",
              milestone:
                "Won 10+ awards; led team of 20+ creatives",
            },
            {
              stage: 4,
              title: "Chief Creative Officer / Agency Founder",
              yearRange: "7+ years",
              salary: { india: "₹22–40 LPA", global: "$140–230K" },
              keySkills: [
                "Agency Leadership",
                "Creative Vision",
                "Business Development",
                "Talent Attraction",
              ],
              description:
                "Lead creative agency, build talent, establish reputation.",
              milestone:
                "Built agency with ₹20 Cr+ annual revenue; 100+ awards",
            },
          ],
        },
      ],
    },
    topCompanies: {
      india: ["RK Studios", "Excel Entertainment", "Bollywood Companies", "Disney Hotstar"],
      global: ["Pixar", "Disney", "Netflix Studios", "A24"],
    },
    educationPath: {
      india: "Bachelor's in Fine Arts, Film, Animation, or Design + Portfolio development",
      global: "BFA or MFA in Fine Arts, Film, or Animation + Portfolio",
    },
  },
];

// ============================================================================
// EXPORT HELPER FUNCTIONS
// ============================================================================

export function getStreamById(id: StreamId): SubjectStream | undefined {
  return subjectStreams.find((stream) => stream.id === id);
}

export function getCareerProgressionBySlug(slug: CareerSlug): CareerProgression | undefined {
  return careerProgressions.find((progression) => progression.slug === slug);
}

export function getCareersByStream(streamId: StreamId): CareerSlug[] {
  const stream = getStreamById(streamId);
  return stream ? stream.careerPaths : [];
}

export function getStreamsByCareer(careerSlug: CareerSlug): StreamId[] {
  return subjectStreams
    .filter((stream) => stream.careerPaths.includes(careerSlug))
    .map((stream) => stream.id);
}
