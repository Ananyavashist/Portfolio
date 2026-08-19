export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  color: string;
  /** Degrees of tilt in the fanned desktop layout. */
  rotate: number;
};

export const recommendationsUrl =
  "https://www.linkedin.com/in/ananya-v04/details/recommendations/";

export const testimonials: Testimonial[] = [
  {
    id: "TestimonialDevPatel",
    name: "Dev Patel",
    role: "Software Engineer at KLA",
    quote:
      "As Ananya’s teammate during the Claude Hackathon, where we finished as First Runner-Up, I saw firsthand her strong ownership, understanding of AI agents, and ability to turn ideas into actionable plans. Her creative thinking, collaborative leadership, and focus on execution kept our team aligned and played an important role in our success.",
    color: "#a7c957",
    rotate: -6,
  },
  {
    id: "TestimonialMichaelStallings",
    name: "Michael Stallings",
    role: "Lead Designer at Salesforce",
    quote:
      "As Ananya’s capstone instructor in Indiana University’s HCID Master’s program, I saw her approach a complex, self-directed design challenge with rigor, curiosity, and grounded design thinking. Her ability to simplify, stay focused on the right problem, and earn the respect of both peers and faculty gives me confidence that she will make an immediate impact in UX or product design.",
    color: "#ffad03",
    rotate: 3.5,
  },
  {
    id: "TestimonialSrishtiBehki",
    name: "Srishti Behki",
    role: "Interaction Designer at Samsung",
    quote:
      "As Ananya’s colleague at Worxwide, I witnessed the energy, curiosity, and dedication she brought to every project, consistently translating new ideas and technical knowledge into thoughtful product improvements. Her positive attitude, continuous-learning mindset, and collaborative approach made her an inspiring teammate and a standout design professional.",
    color: "#ffcf70",
    rotate: -4,
  },
  {
    id: "TestimonialVivekGopinath",
    name: "Vivek Gopinath",
    role: "UX Lead at IBM",
    quote:
      "Having worked with Ananya across multiple projects, I witnessed her methodical problem-solving, strong work ethic, and genuine commitment to continuous learning. Her ability to contribute collaboratively while independently managing projects makes her a dependable and valuable addition to any team.",
    color: "#b29ef8",
    rotate: 5,
  },
];
