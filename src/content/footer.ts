export type FooterDestination = {
  id: string;
  label: string;
  href?: string | null;
  targetId?: string | null;
};

export type FooterSocialLink = {
  id: "linkedin" | "instagram" | "github" | "twitter" | "substack";
  label: string;
  href: string | null;
};

export type FooterTickerHeight = "tall" | "medium" | "short";

export type FooterTickerImage = {
  id: string;
  src: string;
  alt: string;
  height: FooterTickerHeight;
  objectPosition?: string;
};

export const footerStatement =
  "Have an idea, a challenge, or a wild \u201cwhat if?\u201d Let\u2019s talk.";

export const footerLocation = {
  place: "United States",
  note: "(Open to relocation)",
} as const;

export const footerNavigation: FooterDestination[] = [
  { id: "FooterNavAbout", label: "About", href: null },
  { id: "FooterNavPlay", label: "Play", href: null },
  { id: "FooterNavExperiment", label: "Experiment", href: null },
  {
    id: "FooterNavTestimonial",
    label: "Testimonial",
    href: "/#TestimonialSection",
    targetId: "TestimonialSection",
  },
  { id: "FooterNavLinks", label: "Links", href: null },
  { id: "FooterNavResume", label: "Resume", href: null },
];

export const footerSocialLinks: FooterSocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ananya-v04/",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/ananyadesign/",
  },
  {
    id: "github",
    label: "Github",
    href: "https://github.com/Ananyavashist",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/Ananya_uni",
  },
  {
    id: "substack",
    label: "Substack",
    href: "https://substack.com/@ananya710782",
  },
];

export const footerTickerImages: FooterTickerImage[] = [
  {
    id: "footer-image-1",
    src: "/footer-ticker/footer-01.png",
    alt: "Ananya as an ADPList Campus Leader",
    height: "medium",
    objectPosition: "center",
  },
  {
    id: "footer-image-2",
    src: "/footer-ticker/footer-02.png",
    alt: "Presenting research synthesis at a whiteboard",
    height: "tall",
    objectPosition: "center top",
  },
  {
    id: "footer-image-3",
    src: "/footer-ticker/footer-03.png",
    alt: "Campus courtyard with wooden patio furniture",
    height: "short",
    objectPosition: "center",
  },
  {
    id: "footer-image-4",
    src: "/footer-ticker/footer-04.png",
    alt: "At a research showcase in front of design posters",
    height: "tall",
    objectPosition: "center top",
  },
  {
    id: "footer-image-5",
    src: "/footer-ticker/footer-05.png",
    alt: "Working with teammates on laptops",
    height: "short",
    objectPosition: "center",
  },
  {
    id: "footer-image-6",
    src: "/footer-ticker/footer-06.png",
    alt: "Speaking at an event",
    height: "medium",
    objectPosition: "center top",
  },
  {
    id: "footer-image-7",
    src: "/footer-ticker/footer-07.png",
    alt: "Night sky over autumn trees",
    height: "short",
    objectPosition: "center",
  },
  {
    id: "footer-image-8",
    src: "/footer-ticker/footer-08.png",
    alt: "Evening sky above campus housing",
    height: "medium",
    objectPosition: "center",
  },
];
