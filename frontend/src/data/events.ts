// Real event image imports via Vite glob
import rwandaImg1 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44_1.jpg';
import rwandaImg2 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44_2.jpg';
import rwandaImg3 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44.jpg';
import rwandaImg4 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-19-38-26.jpg';
import rwandaImg5 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-19-39-06.jpg';
import rwandaImg6 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-20-39-24.jpg';
const gihembeModules = import.meta.glob(
  '../assets/events/Parent Visit in 2019 at Gihembe Refugee Camp/*.{JPG,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const graduationModules = import.meta.glob(
  '../assets/events/Past Event -Gallely _ Refugee student graduation November 2021 at Latayole-Kigali Rwanda/*.{jpeg,jpg,JPG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

// Vocational training: two folders merged into one event
const vocGradModules = import.meta.glob(
  '../assets/events/Past Event Refugee Youth Vocational Training Graduation La Tayole November 2021-Kigali Rwanda/*.{jpg,JPG,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const vocPicsModules = import.meta.glob(
  '../assets/events/pictures vocationaltraining (1)/*.{jpg,JPG,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const gihembeImages = Object.values(gihembeModules).sort();
const graduationImages = Object.values(graduationModules).sort();
const vocImages = [...Object.values(vocGradModules), ...Object.values(vocPicsModules)].sort();
const rwandaImages = [rwandaImg1, rwandaImg2, rwandaImg3, rwandaImg4, rwandaImg5, rwandaImg6];

export interface PastEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: string;
  description: string;
  paragraphs: string[];
  highlights: { label: string; icon: string }[];
  images: string[];
}

export const pastEvents: PastEvent[] = [
  {
    id: 1,
    title: "Parent Engagement Visit – Gihembe Refugee Camp",
    date: "2019",
    location: "Gihembe Refugee Camp, Rwanda",
    attendees: "60+",
    description:
      "Engineer 4 Humanity's outreach team visited Gihembe Refugee Camp to meet the families of scholarship students, strengthening the bond between the organization and the communities it serves.",
    paragraphs: [
      "In 2019, Engineer 4 Humanity (E4H) organized a meaningful parent engagement visit to Gihembe Refugee Camp in Rwanda — one of the largest refugee settlements in the country. Team members and program coordinators made the journey to meet face-to-face with the parents and guardians of students supported by E4H's education and engineering programs.",
      "The visit was a cornerstone of E4H's holistic approach to education: one that recognizes that a student's success is deeply intertwined with the stability and support of their family. During the visit, team members listened to parents' stories, assessed living conditions, and discussed the academic progress of their children. These conversations shaped future program decisions, ensuring E4H's support remained responsive to the real needs of the community.",
      "By investing time to understand the context in which their students live, Engineer 4 Humanity reinforced its commitment not just to individual students, but to entire families and communities. The visit inspired new initiatives in family support, community engagement, and holistic welfare — all aimed at creating sustainable pathways out of displacement through education and engineering.",
      "This kind of direct community engagement is what sets E4H apart. Every visit, every conversation, and every relationship built at Gihembe has informed how the organization designs its programs — ensuring they are culturally grounded, community-centered, and truly transformative.",
    ],
    highlights: [
      { label: "60+ Families Visited", icon: "users" },
      { label: "Community-Centered Approach", icon: "heart" },
      { label: "Program Impact Assessment", icon: "chart" },
    ],
    images: gihembeImages,
  },
  {
    id: 2,
    title: "Refugee Student Graduation Ceremony – Latayole, Kigali",
    date: "November 2021",
    location: "Latayole, Kigali, Rwanda",
    attendees: "200+",
    description:
      "A milestone celebration honoring refugee students who completed their studies with E4H support, bringing together families, community leaders, and sponsors for an inspiring ceremony.",
    paragraphs: [
      "In November 2021, Engineer 4 Humanity hosted a landmark graduation ceremony at Latayole in Kigali, Rwanda, celebrating the achievements of refugee students who had successfully completed their academic programs with E4H's scholarship and mentorship support. The event was a powerful testament to what becomes possible when young people are given access, opportunity, and belief.",
      "The ceremony brought together more than 200 attendees including graduating students, their proud families, community leaders, local government representatives, and E4H supporters from Rwanda and beyond. Each graduate received recognition not just for their academic achievement, but for the resilience and determination they demonstrated throughout their journey under extraordinary circumstances.",
      "For many of the graduates, this day represented years of sacrifice and perseverance in the face of displacement, uncertainty, and hardship. Engineer 4 Humanity's programs had provided them with scholarships, engineering mentorship, leadership training, and access to a network of professionals committed to their growth. The graduation was proof that with the right support, refugees are not defined by their displacement — they are defined by their potential.",
      "The event also served as a source of inspiration for younger students in the community, demonstrating that education is a door that can never be permanently closed. E4H's commitment to nurturing the next generation of African engineers, community leaders, and change-makers was powerfully on display at Latayole.",
    ],
    highlights: [
      { label: "200+ Attendees", icon: "users" },
      { label: "Milestone for Refugee Education", icon: "graduation" },
      { label: "Community Celebration", icon: "star" },
    ],
    images: graduationImages,
  },
  {
    id: 3,
    title: "Refugee Youth Vocational Training Graduation – La Tayole, Kigali",
    date: "November 2021",
    location: "La Tayole, Kigali, Rwanda",
    attendees: "150+",
    description:
      "Young refugees celebrated the completion of E4H's hands-on vocational training program, marking the beginning of new careers in technical trades and entrepreneurship.",
    paragraphs: [
      "November 2021 was a month of celebration for Engineer 4 Humanity and the young people it serves. At La Tayole in Kigali, Rwanda, a graduation ceremony was held to honor refugee youth who had successfully completed E4H's Vocational Training Program — an intensive, hands-on curriculum designed to equip graduates with practical technical skills and entrepreneurial knowledge for sustainable livelihoods.",
      "The vocational training program is one of E4H's most impactful initiatives, targeting youth who may not have traditional pathways into higher education but whose potential is limitless. Participants trained in trades including construction, tailoring, electrical work, and basic engineering principles — skills that translate directly into income-generating opportunities and economic independence within their communities.",
      "The graduation ceremony was attended by over 150 people, including graduates, their families, E4H staff, local officials, and partner organizations. Each graduate received a certificate of completion and had the opportunity to demonstrate the practical skills they had developed — a proud moment for the individuals, their families, and the entire community that had supported them.",
      "The 2021 cohort represented a new chapter in E4H's approach to empowering refugee communities — one that combines education with practical skills to create self-sustaining livelihoods. Engineer 4 Humanity continues to expand this program, with each new cohort bringing more young people closer to economic independence and a future of their own making.",
    ],
    highlights: [
      { label: "150+ Graduates Celebrated", icon: "graduation" },
      { label: "Practical Skills Training", icon: "tools" },
      { label: "Employment Pathways", icon: "chart" },
    ],
    images: vocImages,
  },
  {
    id: 4,
    title: "Rwanda National Convention – Engineer 4 Humanity",
    date: "July 2025",
    location: "Kigali, Rwanda",
    attendees: "300+",
    description:
      "E4H's Rwanda National Convention united partners, alumni, beneficiaries, and advocates to review 17+ years of impact and chart the organization's strategic direction for the years ahead.",
    paragraphs: [
      "In July 2025, Engineer 4 Humanity convened its Rwanda National Convention in Kigali — a landmark gathering that brought together over 300 participants including alumni, current beneficiaries, partner organizations, government representatives, international donors, and E4H staff from across its operations in Rwanda and beyond.",
      "The convention served as both a celebration and a strategic forum. Attendees reviewed the organization's 17+ year journey of serving refugee communities in Rwanda, highlighted key milestones in education, vocational training, public health engineering, and community empowerment, and heard powerful testimonies of transformation from alumni who have gone on to become professionals, entrepreneurs, and community leaders in their own right.",
      "Panel discussions and workshops addressed the evolving needs of refugee communities in Rwanda, the role of engineering and technology in sustainable development, and opportunities for expanded partnerships with local and international organizations. A major outcome was the formalization of new strategic alliances designed to scale E4H's reach and deepen its impact across Rwanda.",
      "The Rwanda Convention 2025 was a defining moment for Engineer 4 Humanity — reaffirming its position as a trusted, community-rooted organization and renewing its unwavering commitment to creating pathways of hope, education, and economic opportunity for refugee youth across Africa. The energy and optimism of the gathering set the tone for an ambitious next chapter.",
    ],
    highlights: [
      { label: "300+ Participants", icon: "users" },
      { label: "17+ Years of Impact Celebrated", icon: "star" },
      { label: "Strategic Partnership Forum", icon: "chart" },
    ],
    images: rwandaImages,
  },
];
