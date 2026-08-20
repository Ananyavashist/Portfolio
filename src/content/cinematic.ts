export type HeroCard = {
  id: string;
  src: string;
  alt: string;
  /** Left edge as a percentage of the collage container width. */
  x: number;
  /** Top edge as a percentage of the collage container height. */
  y: number;
  /** Card width as a percentage of the collage container width. */
  width: number;
  /** Intrinsic aspect ratio, used to reserve height and avoid layout shift. */
  ratio: number;
  z: number;
};

export const cinematic = {
  video: "/intro/hey-video.mp4",
  caption: "Oh Hey! Welcome to my world of \u201cWhat if?\u201d and \u201cLet\u2019s try it\u201d",
  pill: "Scroll see further",
  sentence: {
    left: "Hi! I am Ananya,",
    right: "a Product Designer.",
  },
  hero: {
    corners: {
      topLeft: "Ananya @2026",
      topRight: ["Design Engineer", "Speaker and Hosting", "Design Community"],
      bottomLeft: "Product Designer @UITS",
      bottomRight: "Claude 2026 Hackathon Winner",
    },
    words: {
      crafting: "Crafting",
      solutions: "solutions",
      b2b2c: "B2B2C",
      for: "for",
      enterprise: "Enterprise",
      startups: "Startups",
      mncs: "MNCs",
    },
    carousel: [
      {
        id: "slide-aude",
        src: "/intro/cards/aude-performance.png",
        alt: "Aude performance product work",
      },
      {
        id: "slide-makemytrip",
        src: "/intro/cards/makemytrip.png",
        alt: "MakeMyTrip booking confirmation work",
      },
      {
        id: "slide-accolade",
        src: "/intro/cards/deal-meridian-dashboard.png",
        alt: "Accolade broker dashboard work",
      },
      {
        id: "slide-gradient",
        src: "/intro/cards/centry-os.png",
        alt: "GradientFI merchant statement work",
      },
    ],
  },
  about: {
    intro:
      "Ananya is a Product Designer and growing Design Technologist with 3+ years of experience crafting B2B enterprise products and B2C consumer experiences. She has spearheaded 0\u21921 design projects across early-stage seed startups and large-scale MNCs, with expertise in designing clarity within complex product ecosystems.",
    companies: [
      { label: "@MakeMyTrip", href: "https://www.makemytrip.global/?cc=am" },
      { label: "@Aude.ai", href: "https://www.aude.ai/" },
      { label: "@Accolade", href: "https://www.accoladehq.com/" },
    ],
    historySuffix:
      "and more. Outside of her 9\u20135 and on weekends she spends her time tinkering with AI tools.",
    logos: [
      {
        id: "LogoMakeMyTrip",
        label: "MakeMyTrip",
        src: "/about/logos/makemytrip.png",
        side: "left",
        x: 14,
        y: 30.3,
        rotate: 8,
      },
      {
        id: "LogoPearson",
        label: "Pearson Education",
        src: "/about/logos/pearson.svg",
        side: "left",
        x: 11,
        y: 46.3,
        rotate: -6,
      },
      {
        id: "LogoAude",
        label: "Aude.ai",
        src: "/about/logos/aude.png",
        side: "left",
        x: 15,
        y: 62.3,
        rotate: 10,
      },
      {
        id: "LogoIndianaUniversity",
        label: "Indiana University",
        src: "/about/logos/indiana-university-trident.svg",
        side: "right",
        x: 86,
        y: 30.3,
        rotate: -8,
      },
      {
        id: "LogoAccolade",
        label: "Accolade",
        src: "/about/logos/accolade.svg",
        side: "right",
        x: 89,
        y: 46.3,
        rotate: 6,
      },
      {
        id: "LogoGoibibo",
        label: "Goibibo",
        src: "/about/logos/goibibo.png",
        side: "right",
        x: 85,
        y: 62.3,
        rotate: -10,
      },
    ],
    stats: [
      { value: "15+", label: "Products Shipped" },
      { value: "80M", label: "User Impacted" },
      { value: "8+", label: "Industries" },
      { value: "70+", label: "Research Sessions" },
    ],
  },
} as const;

// Geometry recovered from storyboard-9.jpg by SIFT feature matching with a
// RANSAC affine fit, re-expressed as percentages of the collage container
// (the tight bounding box of all cards). The fits agreed on zero rotation for
// every card: the tilt in the collage is baked into the source images. Stacking
// order follows size, which reproduces the reference's overlaps.
export const heroCards: HeroCard[] = [
  {
    id: "HeroCardAudePerformance",
    src: "/intro/cards/aude-performance.png",
    alt: "Aude performance feedback patterns",
    x: 52.05,
    y: 5.39,
    width: 38.4,
    ratio: 1024 / 681,
    z: 1,
  },
  {
    id: "HeroCardAudeCoaching",
    src: "/intro/cards/aude-coaching.png",
    alt: "Aude coaching session request",
    x: 45.09,
    y: 49.01,
    width: 30.31,
    ratio: 876 / 514,
    z: 2,
  },
  {
    id: "HeroCardDealMeridianLeads",
    src: "/intro/cards/deal-meridian-leads.png",
    alt: "Deal Meridian smart leads dashboard",
    x: 1.84,
    y: 6.94,
    width: 28.31,
    ratio: 820 / 642,
    z: 3,
  },
  {
    id: "HeroCardDealMeridianDashboard",
    src: "/intro/cards/deal-meridian-dashboard.png",
    alt: "Deal Meridian broker overview",
    x: 71.76,
    y: 36.85,
    width: 28.24,
    ratio: 819 / 620,
    z: 4,
  },
  {
    id: "HeroCardMaskingMirror",
    src: "/intro/cards/masking-mirror.png",
    alt: "Masking Mirror natural voice onboarding",
    x: 0.0,
    y: 47.09,
    width: 27.99,
    ratio: 811 / 528,
    z: 6,
  },
  {
    id: "HeroCardMakeMyTrip",
    src: "/intro/cards/makemytrip.png",
    alt: "MakeMyTrip booking confirmation",
    x: 21.88,
    y: 51.14,
    width: 26.05,
    ratio: 754 / 627,
    z: 5,
  },
  {
    id: "HeroCardCentryOs",
    src: "/intro/cards/centry-os.png",
    alt: "Centry OS merchant statement",
    x: 31.71,
    y: 16.95,
    width: 23.4,
    ratio: 679 / 613,
    z: 7,
  },
  {
    id: "HeroCardInsuranceDekho",
    src: "/intro/cards/insurancedekho.png",
    alt: "InsuranceDekho mobile app",
    x: 33.95,
    y: 0.0,
    width: 15.47,
    ratio: 449 / 585,
    z: 0,
  },
  {
    id: "HeroCardPortrait",
    src: "/intro/cards/portrait.png",
    alt: "Ananya at a research showcase",
    x: 21.41,
    y: 15.09,
    width: 15.19,
    ratio: 441 / 580,
    z: 9,
  },
  {
    id: "HeroCardRideMap",
    src: "/intro/cards/ride-map.png",
    alt: "Ride booking map",
    x: 70.26,
    y: 65.68,
    width: 13.87,
    ratio: 403 / 424,
    z: 10,
  },
  {
    id: "HeroCardWhiteboard",
    src: "/intro/cards/whiteboard.png",
    alt: "Research synthesis at the whiteboard",
    x: 87.29,
    y: 15.06,
    width: 11.86,
    ratio: 344 / 356,
    z: 11,
  },
];
