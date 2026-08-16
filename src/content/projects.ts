export type ProjectMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type Project = {
  id: string;
  slug: string;
  title: string;
  company: string;
  href: string;
  media: ProjectMedia;
  offset: "none" | "down" | "up";
};

export const projects: Project[] = [
  {
    id: "ProjectCardAude",
    slug: "coaching-experience",
    title: "Designing human-controlled AI coaching for software engineers",
    company: "Aude.ai",
    href: "/case-studies/coaching-experience/",
    media: {
      type: "video",
      src: "/videos/project-aude.mp4",
    },
    offset: "none",
  },
  {
    id: "ProjectCardMakeMyTrip",
    slug: "confirmation-flow",
    title: "Making Booking Outcomes Clear: Reducing Support Queries by 25.8%",
    company: "MakeMyTrip",
    href: "/case-studies/confirmation-flow/",
    media: {
      type: "image",
      src: "/images/project-makemytrip.png",
    },
    offset: "up",
  },
  {
    id: "ProjectCardAccolade",
    slug: "broker-crm-workflow",
    title: "Multi Step Broker 0->1 CRM Workflow Management",
    company: "Accolade",
    href: "/case-studies/broker-crm-workflow/",
    media: {
      type: "video",
      src: "/videos/project-accolade.mp4",
      poster: "/images/project-accolade-poster.png",
    },
    offset: "down",
  },
  {
    id: "ProjectCardGradientFI",
    slug: "email-design-fintech",
    title: "Merchant Statements Email Design for Faster Financial Analysis",
    company: "GradientFI",
    href: "/case-studies/email-design-fintech/",
    media: {
      type: "image",
      src: "/images/project-gradientfi.png",
    },
    offset: "none",
  },
];

export const latestWorkHref = projects[0].href;
