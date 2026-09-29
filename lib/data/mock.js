// Sgital Website Mock Data

export const companyInfo = {
  name: "Sgital",
  tagline: "AI Workflows",
  description: "Premier ServiceNow Partner delivering digital transformation through AI-powered workflows",
  founded: "2017",
  headquarters: "Singapore",
  globalPresence: ["Singapore", "India", "Malaysia", "Australia", "New Zealand", "United Kingdom"]
};

export const stats = [
  { value: "9+", label: "Years", suffix: "" },
  { value: "2,000+", label: "AI Workflows Delivered", suffix: "" },
  { value: "60+", label: "Certified Consultants", suffix: "" },
  { value: "40+", label: "Enterprise Customers", suffix: "" }
];

export const services = [
  {
    id: 1,
    category: "Technology Workflows",
    title: "IT Service Management",
    description: "Transform IT operations with AI-powered service delivery. Incident, Problem, Change, Service Request, Knowledge Base, Virtual Agent, and Performance Analytics.",
    icon: "Server",
    color: "amber"
  },
  {
    id: 2,
    category: "Technology Workflows",
    title: "IT Operations Management",
    description: "Proactive IT operations with Discovery, Service Mapping, Event Management, Certificate Management, and Cloud Provisioning & Governance.",
    icon: "Settings",
    color: "amber"
  },
  {
    id: 3,
    category: "Technology Workflows",
    title: "IT Asset Management",
    description: "Complete visibility into your IT assets with CMDB, Hardware Asset Management, Software Asset Management, and lifecycle workflows.",
    icon: "Database",
    color: "amber"
  },
  {
    id: 4,
    category: "Technology Workflows",
    title: "Strategic Portfolio Management",
    description: "Align IT investments with business strategy. Demand Management, Portfolio Management, Project Management, Resource Management, and Jira/Azure integrations.",
    icon: "BarChart3",
    color: "amber"
  },
  {
    id: 5,
    category: "Employee Workflows",
    title: "HR Service Delivery",
    description: "Empower employees with AI-driven self-service. Onboarding, Lifecycle Events, Employee Service Center, and integrations with Workday & SuccessFactors.",
    icon: "Users",
    color: "cyan"
  },
  {
    id: 6,
    category: "Employee Workflows",
    title: "Workplace Service Delivery",
    description: "Unified workplace services for facilities, safety, and workplace management to create exceptional employee experiences.",
    icon: "Building2",
    color: "cyan"
  },
  {
    id: 7,
    category: "Customer Workflows",
    title: "Customer Service Management",
    description: "Transform customer experiences with AI. Case Management, Multi-channel support, Product Entitlements, Self-Service Portal, and Performance Analytics.",
    icon: "Headphones",
    color: "emerald"
  },
  {
    id: 8,
    category: "Customer Workflows",
    title: "Field Service Management",
    description: "Optimize field operations with intelligent scheduling, mobile workforce management, work order automation, and real-time visibility.",
    icon: "MapPin",
    color: "emerald"
  },
  {
    id: 9,
    category: "Security & Risk",
    title: "Security Operations",
    description: "Accelerate threat response with Security Incident Response, Vulnerability Response, Threat Intelligence, and automated remediation workflows.",
    icon: "Shield",
    color: "rose"
  },
  {
    id: 10,
    category: "Security & Risk",
    title: "Integrated Risk Management",
    description: "Comprehensive GRC with Policy & Compliance, Audit Management, Third Party Risk Management, Vendor Risk, and Business Continuity.",
    icon: "ShieldCheck",
    color: "rose"
  },
  {
    id: 11,
    category: "Creator Workflows",
    title: "App Engine",
    description: "Build intelligent apps with low-code development. Custom workflows, integrations, and AI-powered automation for any business process.",
    icon: "Layers",
    color: "violet"
  },
  {
    id: 12,
    category: "Creator Workflows",
    title: "ServiceNow Training",
    description: "Certified training programs for Fundamentals, ITSM, HRSD, CSM, IRM, Application Development, Scripting, and Portal Development.",
    icon: "GraduationCap",
    color: "violet"
  }
];

export const goAIFeatures = [
  {
    phase: "Phase 1",
    title: "Readiness Audit",
    description: "Assess instance, processes & skills with tailored adoption strategy"
  },
  {
    phase: "Phase 2",
    title: "MVP Pilot",
    description: "Implement 1-2 high-value use cases, validate ROI & refine design"
  },
  {
    phase: "Phase 3",
    title: "Enterprise Roll-out",
    description: "Scale AI automation across teams with end-to-end workflows live"
  },
  {
    phase: "Phase 4",
    title: "Continuous Optimization",
    description: "Monitor, tune & expand models for sustained accuracy & growth"
  }
];

export const industries = [
  { name: "Financial Services", icon: "Building2" },
  { name: "Healthcare", icon: "Heart" },
  { name: "Energy & Utilities", icon: "Zap" },
  { name: "Manufacturing", icon: "Factory" },
  { name: "Technology", icon: "Cpu" },
  { name: "Media & Publishing", icon: "Newspaper" },
  { name: "Logistics", icon: "Truck" },
  { name: "Aviation", icon: "Plane" },
  { name: "Consulting", icon: "Briefcase" },
  { name: "Retail", icon: "ShoppingBag" }
];

export const caseStudies = [
  // === NEW: 8 tiles added Jun 2026, newest / highest-impact first ===
  {
    id: 17,
    client: "A large hospitality and entertainment operator with extensive contractor reliance and strict regulatory requirements (anonymised).",
    industry: "Hospitality & Entertainment",
    title: "Asia's First ServiceNow Health & Safety Implementation",
    description: "Digitised the full Permit-to-Work lifecycle on ServiceNow HSRM. Secure Contractor Service Center for PTW submission and tracking, 14 permit types configured with record producers, checklists and lifecycle workflows, role-based ACLs for contractors and internal users, integrated Safety Register, Inspections and JSA for audit traceability.",
    metrics: "Asia's first HSRM · 14 permit types · full PTW lifecycle",
    category: "Employee",
    tags: ["HSRM", "Permit-to-Work", "Contractor Management", "JSA"]
  },
  {
    id: 16,
    client: "A leading multinational electronics and technology group with 250,000+ employees and a worldwide client network (anonymised).",
    industry: "Electronics & Technology",
    title: "Global Electronics Multinational — Enterprise-wide eWorkflows",
    description: "Unified eWork suite integrated with SAP via MuleSoft. Integrated suite of eWork applications on ServiceNow (eVendor, eCustomer, eClaim, eQuote, eTravel, eMaster, eCNDN, eInvoice) plus unified eBilling platform. Automated approvals, recurring billing, PDF generation, child-request routing and Customer Master sync from SAP.",
    metrics: "7 companies · 12 sprints · eBilling 500+ tx/month with 1.5 FTE",
    category: "Technology",
    tags: ["App Engine", "SAP Integration", "eBilling", "MuleSoft"]
  },
  {
    id: 15,
    client: "The largest New Zealand-owned bank — 400+ branches, ~3,000 corporate employees (anonymised).",
    industry: "Financial Services",
    title: "New Zealand-Owned Bank — Safety & Wellbeing HR + GRC",
    description: "Regulatory compliance for safety and wellbeing cases across every location. Online application built on ServiceNow HR Case Management and GRC with Employee Service Centre for HR cases, Risk Register and investigations. GRC Risks and Policies configured for hazard management. Dashboards for monthly trends of critical and non-critical hazards and regulatory reporting compliance.",
    metrics: "400+ branches · 100% email-reporting elimination · hundreds of hours saved",
    category: "Employee",
    results: "100% elimination of email-based reporting; hundreds of hours saved",
    tags: ["HR Case Management", "GRC", "Compliance", "Safety"]
  },
  {
    id: 14,
    client: "A Singapore-based global asset manager operating across infrastructure, real estate and digital connectivity (anonymised).",
    industry: "Diversified / Asset Management",
    title: "Singapore Global Asset Manager — Gift & Hospitality Custom App",
    description: "Governance and handling for gift & hospitality operations on Now Mobile. Custom-scoped G&H application on ServiceNow standardising governance, automating request-to-closure and providing real-time visibility. Dynamic approvals routed by country, division, currency, amount and department; mobile approvals through Now Mobile; real-time dashboards for KPIs, SLAs and bottleneck analysis.",
    metrics: "Country-aware approvals · mobile-first · real-time dashboards",
    category: "Risk & Security",
    tags: ["App Engine", "Custom App", "Now Mobile", "Governance"]
  },
  {
    id: 13,
    client: "A leading global ICT solutions provider spanning integrated ICT, regional communications, global solutions, real estate and energy (anonymised).",
    industry: "Technology / ICT Services",
    title: "Global ICT Solutions Leader — Strategic Portfolio Management",
    description: "PMO and delivery activities on a single platform. ServiceNow SPM implementation removing information silos and consolidating project and program management onto a single system of record. Portfolio, Program, Demand, Project, Resource and Timecard Management configured with JIRA Agile and JIRA integration enabled.",
    metrics: "Single source of record · 6 SPM modules · JIRA integrated",
    category: "Technology",
    tags: ["SPM", "JIRA", "PPM", "Enterprise Delivery"]
  },
  {
    id: 12,
    client: "A global leader in IT and communications services operating in 190+ countries (anonymised).",
    industry: "IT & Communications Services",
    title: "Global IT & Communications Group — SPM at Scale",
    description: "Enterprise SPM across 190+ countries with JIRA and Azure DevOps. ServiceNow SPM with configured demand and project workflows integrated with JIRA and Azure DevOps for enterprise-wide delivery teams. Agility built across the organisation with outcomes and value tracked across methodologies, real-time KPIs on time, budget and quality, and project-level risk drill-down.",
    metrics: "190+ countries · JIRA + Azure DevOps · real-time portfolio KPIs",
    category: "Technology",
    tags: ["SPM", "JIRA", "Azure DevOps", "Global"]
  },
  {
    id: 11,
    client: "A multinational in the energy trading sector — oil, bunkering, freight, hedging and energy transition (anonymised).",
    industry: "Energy Trading",
    title: "Global Energy Trader — IRM across Front, Middle & Back Office",
    description: "Enterprise-wide IRM centralising risk, compliance and audit in 4 months. ServiceNow IRM implementation centralising Enterprise Risk Assessments, Risk Incident Management, Policy Compliance, Controls/KRI/KCI tracking, attestations, testing and audits across front, middle and back offices. 15+ policies consolidated into a single controls-linked repository; standardised risk assessment workflow with built-in approvals and reassessment.",
    metrics: "10 workflows · 4 months · 8 sprints · 3 business functions",
    category: "Risk & Security",
    tags: ["IRM", "Risk", "Compliance", "Audit"]
  },
  {
    id: 10,
    client: "A Malaysia-headquartered international port and logistics operator, running a global network of ports and warehouse facilities (anonymised).",
    industry: "Logistics",
    title: "Malaysian Port Group — ITSM for Global Logistics",
    description: "ITSM go-live centralising incident management and employee services. ServiceNow ITSM implementation with OOTB Incident Management, Service Catalog requests and workflows, Employee Service Center, Now Mobile, dashboards, SLAs and Azure AD / SSO integration.",
    metrics: "Global ports network · single ITSM platform · Azure AD SSO",
    category: "Technology",
    tags: ["ITSM", "CMDB", "Now Mobile", "Azure AD"]
  },

  // === Existing 9 tiles, metrics refreshed to 3 concrete numbers where possible ===
  {
    id: 9,
    client: "Leading Semiconductor Manufacturer, Singapore",
    industry: "Semiconductor & Advanced Packaging",
    title: "Automated eQuality Management System (eQMS)",
    description: "Replaced fragmented document storage and email-driven approvals with a centralised ServiceNow eQMS — automating document categorisation, role-based access, version control, record linking, approvals, and one-click PDF generation. Delivers ISO 9001 / IATF 16949 audit-readiness at scale.",
    metrics: "8 quality processes · 10 sprints · 40% faster retrieval · 50% faster approvals",
    category: "Technology",
    results: "40% faster document retrieval; 50% faster approvals",
    tags: ["eQMS", "App Engine", "Custom Workflows", "Compliance"]
  },
  {
    id: 7,
    client: "Leading Gaming Peripherals Company, Singapore",
    industry: "Gaming & Consumer Electronics",
    title: "AI-Powered Vendor Document Extraction",
    description: "Deployed NowAssist + GenAI + OCR to auto-extract vendor data (phone, address, contact & bank info) from uploaded documents and populate ServiceNow forms instantly — eliminating manual entry and accelerating vendor onboarding end-to-end.",
    metrics: "Zero manual entry · Full data accuracy · Vendor onboarding accelerated",
    category: "AI & GenAI",
    tags: ["AI & GenAI", "NowAssist", "GenAI", "OCR", "Finance Automation"]
  },
  {
    id: 8,
    client: "A Singapore-based global asset manager operating across 20+ countries (anonymised).",
    industry: "Diversified / Asset Management",
    title: "Singapore Global Asset Manager · 20+ Countries — ITSM Pro Plus + NowAssist",
    description: "Replaced manual PDF-based service requests with automated ITSM workflows, CMDB, and integrations with Intune, Saviynt & eBonding — with full NowAssist enablement: Virtual Agent for self-service, auto-generated KB articles from incident clusters, sidebar chat summarisation for fulfiller context, and one-click dashboard export.",
    metrics: "20+ countries · NowAssist enabled · 3 enterprise integrations",
    category: "AI & GenAI",
    tags: ["AI & GenAI", "ITSM Pro Plus", "NowAssist", "CMDB", "Integrations"]
  },
  {
    id: 1,
    client: "Global Chemicals Manufacturer",
    industry: "Chemicals & Industrial Gas",
    title: "Digital Transformation & Finance Automation",
    description: "End-to-end digital transformation including Finance Shared Service Centre, workflows for China and Japan, E-Finance workflows, and EAGLE Project.",
    metrics: "200 → 1000 active users · 4 years · Multi-country rollout",
    category: "Technology",
    results: "Active users grew from 200 to 1,000",
    tags: ["Finance", "Low Code Apps", "Integration"]
  },
  {
    id: 2,
    client: "SPH Media Group",
    industry: "Media & Publishing",
    title: "ITSM Pro & Employee Center Implementation",
    description: "Comprehensive ITSM Pro implementation with Employee Center Portal, Jira integration, Virtual Agent, and GoAI framework for ITOM.",
    metrics: "37 workflows · 5 business units · JIRA + ITOM integrated",
    category: "Technology",
    tags: ["ITSM", "Virtual Agent", "ITOM"]
  },
  {
    id: 3,
    client: "Leading Utilities Group",
    industry: "Energy & Utilities",
    title: "Customer Service Management Platform",
    description: "Single online platform with legacy system integrations, billing generation, customer contracts, case management, and single view dashboard.",
    metrics: "70 stories · 4 months · 5 integrations",
    category: "Customer",
    tags: ["CSM", "App Engine", "Integration"]
  },
  {
    id: 4,
    client: "Digital Bank Malaysia",
    industry: "Financial Services",
    title: "Governance, Risk & Compliance Implementation",
    description: "Comprehensive IRM framework covering risk identification, assessment, mitigation, policy management, audit automation, and business continuity.",
    metrics: "28 sprints · Full GRC implementation · Audit-ready",
    category: "Risk & Security",
    tags: ["IRM", "GRC", "Compliance"]
  },
  {
    id: 5,
    client: "Global IT Services Company",
    industry: "Technology",
    title: "Integrated Risk & Security Operations",
    description: "Single platform for Risk Identification, IT/Enterprise/Vendor Risk Assessments, Policy Compliance, Vulnerability Response, and Threat Intelligence.",
    metrics: "11 applications · 18 integrations · Unified risk + SecOps",
    category: "Risk & Security",
    tags: ["IRM", "SecOps", "Security"]
  },
  {
    id: 6,
    client: "National Aviation Authority",
    industry: "Aviation",
    title: "Custom Workflows & Workday Integration",
    description: "Custom applications blending with out-of-the-box features for contractor onboarding, training, site access, project tracking, and licensing.",
    metrics: "15 departments · 12 sprints · 6 months to go-live",
    category: "Employee",
    tags: ["App Engine", "Custom Workflows", "HR"]
  }
];

export const testimonials = [
  {
    quote: "The quality of deliverables and timely completion. Sachin's team is very professional and understand client's needs and never fails to exceed our expectation. Keep up the good work.",
    author: "Senior IT Manager",
    company: "TotalEnergies",
    role: "IT Leadership"
  }
];

export const certifications = [
  "Services Partner",
  "Authorized Reseller",
  "Authorized Training Partner",
  "Built with Now Partner"
];

export const specializations = [
  "Customer Service Management",
  "HR Service Delivery",
  "IT Operations Management",
  "Now Platform App Engine",
  "IT Service Management",
  "Governance Risk & Compliance",
  "Strategic Portfolio Management",
  "NowAssist AI Agents"
];

export const productCertifications = [
  { category: "ITSM & ITOM", items: ["ITSM Professional", "CMDB Health", "Service Portal", "DevOps Change Velocity"] },
  { category: "Customer & Employee Experience", items: ["CSM Professional", "HR Professional", "Workplace Service Delivery"] },
  { category: "AI & Automation", items: ["Now Assist for ITSM Pro Plus", "Now Assist for CSM Pro Plus", "Now Assist for Creator"] },
  { category: "Risk & Compliance", items: ["Risk and Compliance (CIS-RC)", "Third-party Risk Management (CIS-TPRM)", "IRM Suite"] },
  { category: "Industry Solutions", items: ["Healthcare & Life Sciences Management", "Financial Services Operations - Banking", "Public Sector Digital Services"] },
  { category: "Development & Integration", items: ["Application Developer (CAD)", "App Engine", "Workflow Data Fabric"] },
  { category: "Enterprise Management", items: ["Strategic Portfolio Management (CIS-SPM)", "Agile and Test Management", "Enterprise Architecture"] },
  { category: "Specialized Services", items: ["Technology Provider Service Management", "Telecom Service Management"] }
];

export const accreditations = [
  { type: "Presales Accreditation", count: 28, description: "Certified ServiceNow staff who determine the appropriate products to introduce as a solution" },
  { type: "Sales Accreditation", count: 30, description: "Sales staff who understand the value of the Now Platform and are certified ServiceNow experts" },
  { type: "Delivery Accreditation", count: 25, description: "Internal implementation specialists with industry experience and proven knowledge on the Now Platform" }
];

export const values = [
  {
    title: "Customer Centricity",
    description: "Quality deliverables, value for money, and timely responses. We prioritize fairness and respect in all client interactions.",
    icon: "Heart"
  },
  {
    title: "Ethics & Communication",
    description: "Highest standards of ethical practices with transparency, honesty, and open communication fostering trust.",
    icon: "MessageCircle"
  },
  {
    title: "Innovation at Core",
    description: "Sustainable and competitive advancements ensuring solutions meet current needs and drive future success.",
    icon: "Lightbulb"
  },
  {
    title: "Giving Back",
    description: "Dedicated to health and safety of employees, stakeholders, and community. Actively contributing positively to society.",
    icon: "Globe"
  }
];

export const processSteps = [
  {
    step: 1,
    title: "Initiate",
    items: ["Understand business objectives", "Establish Program Governance", "Establish project team", "Formally Kick-Off"]
  },
  {
    step: 2,
    title: "Plan",
    items: ["Process & Integration workshops", "Define product backlog", "Release Planning", "Setup environment"]
  },
  {
    step: 3,
    title: "Build",
    items: ["Run Agile Scrum cycles", "Define support processes", "Execute roadshows", "Plan system & UAT"]
  },
  {
    step: 4,
    title: "Deploy",
    items: ["System & UAT testing", "Go-live planning", "Operational readiness", "Training & Go-Live"]
  },
  {
    step: 5,
    title: "Operate",
    items: ["Operational handover", "Hypercare Support", "Measure value", "Formally close project"]
  }
];

export const whyChooseUs = [
  {
    title: "100% ServiceNow Focused",
    description: "Pure-play partner delivering depth and precision with 7+ years expertise"
  },
  {
    title: "Fast-Track Delivery",
    description: "Sprint-based agile methodology for rapid Go-Live and ROI realization"
  },
  {
    title: "AI-Powered Expertise",
    description: "GoAI framework bringing autonomous workflows and intelligent automation"
  },
  {
    title: "Global Delivery",
    description: "Presence across 6 regions with 50+ certified professionals"
  }
];

export const clientLogos = [
  "Air Liquide",
  "TotalEnergies",
  "Razer",
  "SiliconBox",
  "SPH Media",
  "Allianz",
  "GXBank",
  "Resorts World"
];

export const officeLocations = [
  {
    city: "Singapore",
    country: "Singapore",
    isHQ: true,
    address: "68 Chestnut Ave, Treehouse, Singapore 679521",
    mapUrl: "https://maps.app.goo.gl/H9CoEdfnZenUtYbZ8",
    region: "APAC"
  },
  {
    city: "Bengaluru",
    country: "India",
    isHQ: false,
    address: "7th Floor, Summit A, Brigade Metropolis, Mahadevapura, Bengaluru, Karnataka 560048, India",
    mapUrl: "https://maps.app.goo.gl/CsF29FJPEk7noizPA",
    region: "APAC"
  },
  {
    city: "Jodhpur",
    country: "India",
    isHQ: false,
    address: "A-59, Sector-A, Shastri Nagar, Jodhpur, Rajasthan 342003, India",
    mapUrl: "https://maps.app.goo.gl/RXsATMiHRbqsBK8b6",
    region: "APAC"
  }
];

export const partnershipBadges = [
  {
    name: "Partner Advisory Council Member 2025",
    image: "https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/p8zaou2x_PAC%202025.png",
    alt: "ServiceNow Partner Advisory Council Member 2025"
  },
  {
    name: "Premier Partner - Consulting & Implementation",
    image: "https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/7qnxe4yu_Consulting%20%26%20Implementation.png",
    alt: "ServiceNow Premier Partner - Consulting & Implementation"
  },
  {
    name: "Select Partner - Reseller",
    image: "https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/yqnhupo3_Reseller%20Select%20Badge.png",
    alt: "ServiceNow Select Partner - Reseller"
  },
  {
    name: "Authorized Training Partner",
    image: "https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/1auxrir7_Authorized%20Training%20Blue%20Badge.png",
    alt: "ServiceNow Authorized Training Partner"
  },
  {
    name: "Built with ServiceNow Offering",
    image: "https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/koz27fbo_Built%20With%20ServiceNow%20Offering.png",
    alt: "Built with ServiceNow Offering"
  }
];

export const partnershipDetails = {
  csatScore: "4.8 out of 5",
  csatSource: "ServiceNow Partner Finder, 2026",
  combinedExperience: "400+ years combined ServiceNow experience across the team",
  description: "Sgital is a premier consulting partner of ServiceNow, a reseller and an authorised training partner. We specialise in AI enabled Digital Workflows.",
  headquarters: "Singapore",
  partnerTypes: [
    {
      type: "Premier Partner",
      category: "Consulting & Implementation",
      description: "Delivers implementations, consulting, transformation, deployment, offering creation, adoption, and ongoing support."
    },
    {
      type: "Select Partner",
      category: "Reseller",
      description: "Markets and resells ServiceNow products and packaged services."
    },
    {
      type: "Registered Partner",
      category: "Build",
      description: "Builds solutions and apps/integrations made available on the ServiceNow Store."
    }
  ],
  expertise: [
    "Finance Shared Services Automation",
    "Project Portfolio Management",
    "Customer Service Management",
    "HR Service Delivery",
    "Integrated Risk Management",
    "Security Operations",
    "IT and non-IT Applications"
  ],
  coverage: {
    consulting: ["Americas (Canada, United States)", "Asia Pacific & Japan (Australia, India, Japan, South Korea, Malaysia, New Zealand, Singapore)", "Europe, Middle East & Africa (30+ countries)"],
    reseller: ["Asia Pacific & Japan (Singapore)"]
  }
};

// Combined partner-status one-liner used on homepage strap
export const partnerStrap = "ServiceNow Premier Partner · Reseller · Build · Authorized Training · Partner Advisory Council Member (2025)";

// Aggregate certification counts (source: Sgital Company Overview May 2026 deck)
export const certificationTotals = [
  { value: 117, label: "Mainline" },
  { value: 51, label: "Suite" },
  { value: 263, label: "Micro" },
  { value: 148, label: "Accreditations" }
];

export const certificationTagline =
  "Certified at every level — 117 mainline · 51 suite · 263 micro · 148 accreditations …and counting";

// Table 1 — Mainline (Total: 117)
export const mainlineCertifications = [
  { name: "Certified System Administrator (CSA)", count: 48 },
  { name: "CIS – Data Foundations (CMDB and CSDM) (CIS-DF)", count: 25 },
  { name: "Certified Application Developer (CAD)", count: 11 },
  { name: "Certified Implementation Specialist – Risk and Compliance (CIS-RC)", count: 8 },
  { name: "Certified Implementation Specialist – Customer Service Management (CIS-CSM)", count: 6 },
  { name: "Certified Implementation Specialist – IT Service Management (CIS-ITSM)", count: 6 },
  { name: "Certified Implementation Specialist – Third-party Risk Management (CIS-TPRM)", count: 4 },
  { name: "Certified Implementation Specialist – Human Resources (CIS-HR)", count: 3 },
  { name: "Certified Implementation Specialist – Strategic Portfolio Management (CIS-SPM)", count: 3 },
  { name: "CIS – Platform Analytics (CIS-PA)", count: 2 },
  { name: "Certified Implementation Specialist – Discovery (CIS-DISCO)", count: 1 }
];

// Table 2 — Suite (Total: 51)
export const suiteCertifications = [
  { name: "Suite Certification – Data Foundations (CMDB and CSDM) Professional", count: 9 },
  { name: "Suite Certification – CSM Professional", count: 6 },
  { name: "Suite Certification – ITSM Professional", count: 6 },
  { name: "Suite Certification – Now Assist for CSM Pro Plus", count: 5 },
  { name: "Suite Certification – Citizen Developer Core Skills Micro", count: 4 },
  { name: "Suite Certification – Now Assist for ITSM Pro Plus", count: 4 },
  { name: "Suite Certification – Application Developer Core Skills Micro", count: 3 },
  { name: "Public Sector Digital Services (PSDS) Suite", count: 2 },
  { name: "Suite Certification – HR Professional", count: 2 },
  { name: "Suite Certification – Workflow Data Fabric (WDF)", count: 2 },
  { name: "Banking & Wealth FSO Suite", count: 1 },
  { name: "Healthcare and Life Sciences Mgmt Suite", count: 1 },
  { name: "Insurance – Financial Service Operations Suite", count: 1 },
  { name: "Now Assist for HR Service Delivery Pro Plus Suite", count: 1 },
  { name: "Suite Certification – Order Management (Telecom, Media, Technology, Professional)", count: 1 },
  { name: "Suite Certification – Technology Provider Service Management", count: 1 },
  { name: "Suite Certification – Telecommunication and Media Service Management", count: 1 },
  { name: "Suite Certification – Workplace Service Delivery", count: 1 }
];

// Founder bio (Part 3)
export const founder = {
  name: "Sachin Khatri",
  title: "Founder & CEO, SGITAL",
  location: "Singapore",
  linkedin: "https://sg.linkedin.com/in/sachinkhatri",
  photoUrl: "https://sgital-website-assets.s3.ap-south-1.amazonaws.com/founders/sachin-khatri.jpg",
  quote: "Our customers don't need more AI experiments. They need AI that works inside the workflows they already run.",
  bio: [
    "Sachin Khatri is the Founder and CEO of Sgital, a ServiceNow and Anthropic partner headquartered in Singapore that he founded in 2017 to help enterprises across APAC put AI to work across their workflows.",
    "Over 21 years of consulting experience — including senior roles at Accenture, KPMG, PwC and TCS — Sachin has led enterprise ServiceNow transformations across financial services, manufacturing, media, aviation, energy and public sector. Under his leadership, Sgital has grown into a Premier ServiceNow Partner, Authorized Training Partner and member of the ServiceNow Partner Advisory Council, delivering 2,000+ AI workflows for 40+ enterprise customers across six countries.",
    "Sachin is a frequent contributor to the ServiceNow ecosystem — speaking at ServiceNow World Forums and Knowledge events on GoAI 2.0, AI Control Tower and enterprise agentic AI. He holds the Claude Certified Associate — Foundations certification. He is based in Singapore, with delivery hubs in Bengaluru and Jodhpur, and a growing customer footprint across APAC, ANZ, India and the UK."
  ]
};

// Customer logo wall (Part 2 — homepage). Only publicly disclosable names.
// Slots without a bundled logo file render as anonymised industry tiles.
// DO NOT surface Keppel, Panasonic or Westpac NZ by name anywhere.
export const customerLogoWall = [
  { type: "logo", name: "Air Liquide", src: "/logos/air-liquide.svg", alt: "Air Liquide" },
  { type: "logo", name: "TotalEnergies", src: "/logos/total-energies.svg", alt: "TotalEnergies" },
  { type: "logo", name: "Razer", src: "/logos/razer.png", alt: "Razer" },
  { type: "text", name: "SiliconBox" },
  { type: "text", name: "SPH Media" },
  { type: "text", name: "Allianz" },
  { type: "text", name: "GXBank" },
  { type: "text", name: "Resorts World" },
  { type: "anon", name: "Global Electronics · 250k employees" },
  { type: "anon", name: "Singapore Global Asset Manager" },
  { type: "anon", name: "New Zealand-Owned Bank" },
  { type: "anon", name: "Malaysian Port Group" },
  { type: "anon", name: "Global IT & Communications · 190+ countries" },
  { type: "anon", name: "Global ICT Solutions Leader" }
];

export const jobListings = [
  {
    id: "senior-consultant",
    title: "ServiceNow Senior Consultant",
    locations: ["Bengaluru", "Singapore"],
    type: "Full-time",
    workMode: "On-site",
    description: "SGITAL - AI Workflows is a boutique partner of the ServiceNow platform, serving clients across Singapore, Malaysia, India, Australia, and New Zealand. With expertise in ServiceNow product lines such as IT Workflows, IRM and Security Workflows, Customer Workflows, and App Engine for Enterprise Workflows, SGITAL empowers businesses to streamline and automate their processes, backed by 20+ years of experience in digital transformation.",
    responsibilities: [
      "Designing and developing solutions on the ServiceNow platform",
      "Collaborating with stakeholders to gather and understand requirements",
      "Implementing AI, CRM, IT and business workflows",
      "Ensuring seamless integration with existing systems",
      "Managing databases effectively",
      "Project planning, coordination, and delivery while maintaining quality standards"
    ],
    requirements: [
      "Strong expertise in Software Development and Integration",
      "Proficiency in at least 2 out of ServiceNow ITSM, CSM, IRM, SecOps, ITOM, App Engine and Project Management",
      "5-10 years of experience in ServiceNow consulting",
      "NowAssist experience mandatory",
      "Experience in working with Databases and developing workflows",
      "Proven ability to implement ServiceNow platform solutions",
      "Excellent problem-solving and analytical skills",
      "Strong communication and collaboration abilities for working with cross-functional teams",
      "Relevant certifications in ServiceNow, at least 2 CIS",
      "Bachelor's degree in Computer Science, Information Technology, or a related discipline"
    ]
  },
  {
    id: "business-analyst",
    title: "ServiceNow Business Analyst",
    locations: ["Bengaluru", "Singapore"],
    type: "Full-time",
    workMode: "Remote",
    description: "SGITAL is a boutique partner of the AI-driven ServiceNow platform, operating across Singapore, Malaysia, India, Australia, and New Zealand. With over 20 years of expertise in digital transformation, SGITAL has successfully delivered more than 800 workflows to enterprise customers. Through their GoAIwithSgital service offering, they empower businesses to integrate AI capabilities into the Now Platform for optimized business processes.",
    responsibilities: [
      "Understanding and analyzing business processes",
      "Gathering and documenting business requirements",
      "Translating business requirements into actionable solutions within the ServiceNow platform",
      "Collaborating with cross-functional teams",
      "Performing data analysis",
      "Preparing detailed reports",
      "Supporting implementation projects",
      "Ensuring delivered solutions align with business goals and best practices"
    ],
    requirements: [
      "Strong analytical skills, including the ability to interpret data and identify trends",
      "Proven experience in business analysis, including gathering and documenting business requirements",
      "Excellent communication skills, with the ability to effectively collaborate with stakeholders",
      "Ability to understand, analyze, and improve business processes",
      "Minimum 4 years' experience with the ServiceNow platform in a customer-facing BA/PM role",
      "Certified ServiceNow Administrator (CSA) and any 1 CIS certification",
      "Knowledge of digital transformation and workflow automation",
      "Master's degree in Business, IT, or a related discipline",
      "Extensive user of AI to manage work more effectively"
    ]
  }
];

export const globalCoverage = {
  consulting: {
    title: "Consulting & Implementation Coverage",
    regions: [
      {
        name: "Asia Pacific & Japan",
        countries: ["Australia", "India", "Japan", "South Korea", "Malaysia", "New Zealand", "Singapore"],
        offices: ["Singapore"]
      },
      {
        name: "Americas",
        countries: ["Canada", "United States"],
        offices: []
      },
      {
        name: "Europe, Middle East & Africa",
        countries: [
          "Austria", "Belgium", "Bulgaria", "Switzerland", "Cyprus", "Czech Republic", 
          "Germany", "Denmark", "Estonia", "Spain", "Finland", "France", "United Kingdom", 
          "Greece", "Croatia", "Hungary", "Ireland", "Italy", "Lithuania", "Luxembourg", 
          "Latvia", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", 
          "Sweden", "Slovenia", "Slovakia"
        ],
        offices: []
      }
    ]
  },
  reseller: {
    title: "Reseller Coverage",
    regions: [
      {
        name: "Asia Pacific & Japan",
        countries: ["Singapore"],
        offices: ["Singapore"]
      }
    ]
  }
};

export const contactInfo = {
  email: "info@sgital.com",
  phone: "+65 9810 7986",
  address: "68 Chestnut Ave, Treehouse, Singapore 679521",
  linkedin: "https://www.linkedin.com/company/sgital",
  youtube: "https://www.youtube.com/@Sgital",
  partnerFinder: "https://www.servicenow.com/partners/partner-finder/sgital-pte-ltd.html"
};
