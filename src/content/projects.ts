export type ProjectMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type ProjectCategory = "enterprise" | "b2c" | "b2b-saas";

export type ProjectFilter = "all" | ProjectCategory;

export type Project = {
  id: string;
  slug: string;
  company: string;
  headline: string;
  metadata: string[];
  categories: ProjectCategory[];
  href: string;
  media: ProjectMedia;
  /** Overrides the cursor chip text, which otherwise reads "View {company}". */
  cursorLabel?: string;
};

export const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "enterprise", label: "Enterprise" },
  { id: "b2c", label: "B2C" },
  { id: "b2b-saas", label: "B2B SaaS" },
];

export const projects: Project[] = [
  {
    id: "ProjectCardAude",
    slug: "coaching-experience",
    company: "Aude.ai",
    headline:
      "Turned AI performance insights into a manager-led coaching session engineers trusted, recovering 40% adoption",
    metadata: ["AUDE.AI", "ENTERPRISE", "SHIPPED"],
    categories: ["enterprise", "b2b-saas"],
    href: "/case-studies/coaching-experience/",
    media: {
      type: "video",
      src: "/videos/project-aude.mp4",
    },
  },
  {
    id: "ProjectCardMakeMyTrip",
    slug: "confirmation-flow",
    company: "MakeMyTrip",
    headline:
      "Redesigned post-booking confirmation across 3 platforms so status was always clear, reducing support query by 25.8%",
    metadata: ["MAKEMYTRIP", "POST BOOKING", "SHIPPED"],
    categories: ["b2c"],
    href: "/case-studies/confirmation-flow/",
    media: {
      type: "image",
      src: "/images/project-makemytrip.png",
    },
  },
  {
    id: "ProjectCardAccolade",
    slug: "broker-crm-workflow",
    company: "Accolade",
    headline:
      "Designed a broker CRM showing the evidence behind every lead score, cutting lead management steps 68%",
    metadata: ["ACCOLADE", "MVP DESIGN", "SHIPPED"],
    categories: ["enterprise", "b2c"],
    href: "/case-studies/broker-crm-workflow/",
    media: {
      type: "video",
      src: "/videos/project-accolade.mp4",
      poster: "/images/project-accolade-poster.png",
    },
  },
  {
    id: "ProjectCardGradientFI",
    slug: "email-design-fintech",
    company: "GradientFI",
    headline:
      "Merchant Statements Email Design for Faster Financial Analysis",
    metadata: ["GRADIENTFI", "FINTECH STATEMENT", "SHIPPED"],
    categories: ["enterprise", "b2b-saas"],
    href: "/case-studies/email-design-fintech/",
    media: {
      type: "image",
      src: "/images/project-gradientfi.png",
    },
  },
];

export function filterProjects(active: ProjectFilter): Project[] {
  if (active === "all") return projects;
  return projects.filter((project) => project.categories.includes(active));
}

export const latestWorkHref = projects[0].href;
