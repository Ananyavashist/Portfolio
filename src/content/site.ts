export const site = {
  name: "Ananya",
  title: "Ananya",
  description:
    "A systems-oriented product designer with experience across enterprise, fintech, consumer, B2B, B2C platforms",
  email: "vashistananya07@gmail.com",
  copyright: "Copyright by @Ananya 2026",
  resumeUrl:
    "https://drive.google.com/file/d/10xT7OUjAIoIPwf_3OkzW4ZApj1oLGWKc/view?usp=sharing",
  scheduleUrl: "https://calendar.app.google/mKqHKMBfxw5HDBRZ7",
  logo: {
    src: "/images/logo.png",
    alt: "Ananya",
  },
  nav: [
    { id: "NavLinkProjects", label: "Projects", href: "/" },
    { id: "NavLinkAbout", label: "About", href: "/about/" },
    { id: "NavLinkResume", label: "Resume", href: "/resume/" },
  ],
  footerLinks: [
    { id: "FooterLinkWork", label: "Work", href: "/" },
    { id: "FooterLinkAbout", label: "About", href: "/about/" },
    { id: "FooterLinkResume", label: "Resume", href: "/resume/" },
  ],
  social: [
    {
      id: "FooterLinkedIn",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ananya-v04/",
    },
    {
      id: "FooterInstagram",
      label: "Instagram",
      href: "https://www.instagram.com/ananyadesign/",
    },
    {
      id: "FooterGithub",
      label: "Github",
      href: "https://github.com/Ananyavashist",
    },
    {
      id: "FooterTwitter",
      label: "Twitter",
      href: "https://x.com/Ananya_uni",
    },
    {
      id: "FooterSubstack",
      label: "Substack",
      href: "https://substack.com/@ananya710782",
    },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
