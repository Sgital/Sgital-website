// Sgital Website Mock Data

export const companyInfo = {
  name: "Sgital",
  tagline: "AI Workflows",
  description: "Premier ServiceNow Partner delivering digital transformation through AI-powered workflows",
  founded: "2018",
  headquarters: "Singapore",
  globalPresence: ["APAC", "ANZ", "EMEA"]
};

export const stats = [
  { value: "80+", label: "Successful Projects", suffix: "" },
  { value: "1500+", label: "Workflows Delivered", suffix: "" },
  { value: "60+", label: "Certified Consultants", suffix: "" },
  { value: "3", label: "Global Regions", suffix: "" }
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
  {
    id: 1,
    client: "Global Chemicals Manufacturer",
    industry: "Chemicals & Industrial Gas",
    title: "Digital Transformation & Finance Automation",
    description: "End-to-end digital transformation including Finance Shared Service Centre, workflows for China and Japan, E-Finance workflows, and EAGLE Project.",
    metrics: "200 to 1000 active users in 4 years",
    tags: ["Finance", "Low Code Apps", "Integration"]
  },
  {
    id: 2,
    client: "SPH Media Group",
    industry: "Media & Publishing",
    title: "ITSM Pro & Employee Center Implementation",
    description: "Comprehensive ITSM Pro implementation with Employee Center Portal, Jira integration, Virtual Agent, and GoAI framework for ITOM.",
    metrics: "37 workflows across 5 business units",
    tags: ["ITSM", "Virtual Agent", "ITOM"]
  },
  {
    id: 3,
    client: "Leading Utilities Group",
    industry: "Energy & Utilities",
    title: "Customer Service Management Platform",
    description: "Single online platform with legacy system integrations, billing generation, customer contracts, case management, and single view dashboard.",
    metrics: "70 Stories, 4 Months, 5 Integrations",
    tags: ["CSM", "App Engine", "Integration"]
  },
  {
    id: 4,
    client: "Digital Bank Malaysia",
    industry: "Financial Services",
    title: "Governance, Risk & Compliance Implementation",
    description: "Comprehensive IRM framework covering risk identification, assessment, mitigation, policy management, audit automation, and business continuity.",
    metrics: "28 Sprints, Full GRC Implementation",
    tags: ["IRM", "GRC", "Compliance"]
  },
  {
    id: 5,
    client: "Global IT Services Company",
    industry: "Technology",
    title: "Integrated Risk & Security Operations",
    description: "Single platform for Risk Identification, IT/Enterprise/Vendor Risk Assessments, Policy Compliance, Vulnerability Response, and Threat Intelligence.",
    metrics: "11 Applications, 18 Integrations",
    tags: ["IRM", "SecOps", "Security"]
  },
  {
    id: 6,
    client: "National Aviation Authority",
    industry: "Aviation",
    title: "Custom Workflows & Workday Integration",
    description: "Custom applications blending with out-of-the-box features for contractor onboarding, training, site access, project tracking, and licensing.",
    metrics: "15 Departments, 12 Sprints, 6 Months",
    tags: ["App Engine", "Custom Workflows", "HR"]
  }
];

export const testimonials = [
  {
    quote: "The quality of deliverables and timely completion. Sachin's team is very professional and understand client's needs and never fails to exceed our expectation. Keep up the good work.",
    author: "Senior IT Manager",
    company: "TotalEnergies",
    role: "IT Leadership"
  },
  {
    quote: "Fully committed team.",
    author: "Head of Technology Infrastructure & Operations",
    company: "Enterprise Client",
    role: "Technology Leadership"
  },
  {
    quote: "The team is prompt and friendly.",
    author: "Service Delivery Manager",
    company: "Global Corporation",
    role: "Service Delivery"
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
  "Keppel",
  "International SOS",
  "SPH Media",
  "Core Group"
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

export const contactInfo = {
  email: "info@sgital.com",
  phone: "+65 9810 7986",
  address: "68 Chestnut Ave, Treehouse, Singapore 679521",
  linkedin: "https://www.linkedin.com/company/sgital",
  youtube: "https://www.youtube.com/@Sgital",
  partnerFinder: "https://www.servicenow.com/partners/partner-finder/sgital-pte-ltd.html"
};
