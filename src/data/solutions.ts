export type SolutionSlug =
  | "ai-strategy-consulting"
  | "machine-learning-solutions"
  | "data-analytics-insights"
  | "ai-chatbots-assistants"
  | "process-automation"
  | "ai-security-compliance";

export interface Solution {
  slug: SolutionSlug;
  icon: "brain" | "zap" | "chart" | "bot" | "target" | "shield";
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  outcomes: string[];
  helpsWith: string[];
  process: string[];
  bestFor: string;
}

export const CALENDLY_URL = "https://calendly.com/nnesbitiv/30min";

export const solutions: Solution[] = [
  {
    slug: "ai-strategy-consulting",
    icon: "brain",
    title: "AI Strategy Consulting",
    eyebrow: "Clarity before implementation",
    description: "Develop a practical AI roadmap aligned with your goals, team capacity, and highest-value opportunities.",
    summary:
      "We identify where AI can create measurable leverage, then turn that into a phased plan your business can actually execute.",
    outcomes: [
      "A clear AI opportunity map ranked by impact and effort",
      "Recommended tools, workflows, and implementation priorities",
      "Risk, privacy, and team adoption guidance before you invest",
    ],
    helpsWith: [
      "Choosing the right first AI project",
      "Reducing wasted time on disconnected tools",
      "Giving leadership a realistic execution plan",
    ],
    process: ["Discovery call", "Workflow and tool review", "AI roadmap", "Implementation handoff"],
    bestFor: "Businesses that know AI matters but need a grounded plan before spending money on tools or builds.",
  },
  {
    slug: "machine-learning-solutions",
    icon: "zap",
    title: "Machine Learning Solutions",
    eyebrow: "Custom intelligence for specific problems",
    description: "Use prediction, classification, and automation models to solve business problems that rules alone cannot handle.",
    summary:
      "We help turn messy data and repeat decisions into practical models that support forecasting, routing, scoring, and automation.",
    outcomes: [
      "Custom model recommendations based on your data maturity",
      "Prototype workflows for prediction or classification use cases",
      "Deployment guidance for reliable, maintainable ML systems",
    ],
    helpsWith: [
      "Lead scoring and demand forecasting",
      "Document or message classification",
      "Pattern detection in operational data",
    ],
    process: ["Use-case fit check", "Data review", "Prototype", "Deployment and iteration plan"],
    bestFor: "Teams with recurring decisions or data-heavy workflows that need more than a basic chatbot.",
  },
  {
    slug: "data-analytics-insights",
    icon: "chart",
    title: "Data Analytics & Insights",
    eyebrow: "Better decisions from existing data",
    description: "Transform raw data into dashboards, insights, and AI-assisted reporting that helps leaders act faster.",
    summary:
      "We organize your data sources and build insight workflows so you can spot trends, bottlenecks, and opportunities sooner.",
    outcomes: [
      "Dashboards focused on the metrics that actually drive decisions",
      "Automated reporting workflows for recurring updates",
      "AI-assisted summaries that explain what changed and why it matters",
    ],
    helpsWith: [
      "Understanding sales, operations, or marketing performance",
      "Reducing manual spreadsheet reporting",
      "Creating executive-ready insight summaries",
    ],
    process: ["Metric alignment", "Data cleanup", "Dashboard build", "Insight automation"],
    bestFor: "Businesses with useful data spread across spreadsheets, CRMs, forms, or software tools.",
  },
  {
    slug: "ai-chatbots-assistants",
    icon: "bot",
    title: "AI Chatbots & Assistants",
    eyebrow: "Helpful conversations at scale",
    description: "Build intelligent assistants for customer support, lead qualification, internal knowledge, or business operations.",
    summary:
      "We design AI assistants that answer real questions, collect useful context, and guide users toward the right next step.",
    outcomes: [
      "A chatbot strategy matched to your audience and business goals",
      "Knowledge-base and prompt architecture for accurate answers",
      "Lead capture and handoff flows for sales or support",
    ],
    helpsWith: [
      "Answering common customer questions",
      "Qualifying website visitors before a call",
      "Helping staff find internal information faster",
    ],
    process: ["Conversation design", "Knowledge setup", "Assistant build", "Testing and optimization"],
    bestFor: "Businesses that want a smarter first point of contact without adding more manual support work.",
  },
  {
    slug: "process-automation",
    icon: "target",
    title: "Process Automation",
    eyebrow: "Less manual work, fewer dropped balls",
    description: "Streamline repetitive workflows with AI-powered automations that connect your tools and reduce busywork.",
    summary:
      "We find the repetitive handoffs, messages, documents, and updates that slow your team down, then automate the highest-value pieces.",
    outcomes: [
      "Workflow automations connected to your existing tools",
      "Reduced manual follow-up, copying, and status checking",
      "Clear documentation so your team understands the system",
    ],
    helpsWith: [
      "Review responses and customer follow-up",
      "Lead intake and appointment workflows",
      "Internal notifications, summaries, and task creation",
    ],
    process: ["Workflow audit", "Automation design", "Build and test", "Team handoff"],
    bestFor: "Teams losing hours every week to repetitive tasks that should not require human attention.",
  },
  {
    slug: "ai-security-compliance",
    icon: "shield",
    title: "AI Security & Compliance",
    eyebrow: "Use AI with guardrails",
    description: "Put practical privacy, security, and usage guidelines around AI adoption so your team can move safely.",
    summary:
      "We help you define what AI can access, what your team should avoid, and how to use AI responsibly in daily work.",
    outcomes: [
      "AI usage policy and team guidance",
      "Risk review for sensitive workflows and data",
      "Tool recommendations based on privacy and compliance needs",
    ],
    helpsWith: [
      "Preventing accidental data exposure",
      "Creating internal AI rules your team can follow",
      "Choosing safer tools for regulated or sensitive work",
    ],
    process: ["Risk discovery", "Tool and workflow review", "Policy creation", "Team training"],
    bestFor: "Businesses that want AI adoption without careless data sharing or unclear internal rules.",
  },
];

export function getSolution(slug: string | undefined) {
  return solutions.find((solution) => solution.slug === slug);
}
