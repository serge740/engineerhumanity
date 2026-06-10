// Real event image imports via Vite glob
import rwandaImg1 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44_1.jpg';
import rwandaImg2 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44_2.jpg';
import rwandaImg3 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44.jpg';
import rwandaImg4 from '../assets/events/rwandaconvention July 2025 (1)/converstion1.png';
import rwandaImg8 from '../assets/events/rwandaconvention July 2025 (1)/converstion2.png';
import rwandaImg7 from '../assets/events/rwandaconvention July 2025 (1)/conv.png';
import rwandaImg10 from '../assets/events/rwandaconvention July 2025 (1)/conversation2.png';
import rwandaImg9 from '../assets/events/rwandaconvention July 2025 (1)/conversation21.png';
import rwandaImg11 from '../assets/events/rwandaconvention July 2025 (1)/conversation3.png';
import rwandaImg12 from '../assets/events/rwandaconvention July 2025 (1)/image1.png';
import rwandaImg13 from '../assets/events/rwandaconvention July 2025 (1)/image2.png';

import rwandaImg5 from '../assets/events/rwandaconvention July 2025 (1)/conversation.png';
import rwandaImg6 from '../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-20-39-24.jpg';
import upcomingImg1 from '../assets/events/events upcoming/image1.png';
import upcomingImg2 from '../assets/events/events upcoming/image2.png';
import upcomingImg3 from '../assets/events/events upcoming/image3.png';
import upcomingImg4 from '../assets/events/events upcoming/image4.png';
import upcomingImg5 from '../assets/events/events upcoming/image5.png';
import upcomingImg6 from '../assets/events/events upcoming/image6.png';
import refugeesDayImg1 from '../assets/events/refugees day/image1.png';
import refugeesDayImg2 from '../assets/events/refugees day/image2.png';
import refugeesDayImg3 from '../assets/events/refugees day/image3.png';
import refugeesDayImg4 from '../assets/events/refugees day/image4.png';
import refugeesDayImg5 from '../assets/events/refugees day/image5.png';
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

const refugeeDayModules = import.meta.glob(
  '../assets/events/World Refugee Day Recognition/*.{png,jpg,jpeg,JPG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const refugeeDay2025Modules = import.meta.glob(
  '../assets/events/International World Refugee Day 2025, June 21/*.{png,jpg,jpeg,JPG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const refugeeDay2024Modules = import.meta.glob(
  '../assets/events/Event International Refugee day/*.{png,jpg,jpeg,JPG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const firstIntakeModules = import.meta.glob(
  '../assets/events/first intake/*.{jpeg,jpg,JPG,png,PNG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const vocTrainingModules = import.meta.glob(
  '../assets/events/vocation trainging/*.{jpeg,jpg,JPG,png,PNG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const gihembeImages = Object.values(gihembeModules).sort();
const graduationImages = Object.values(graduationModules).sort();
const vocImages = [...Object.values(vocGradModules), ...Object.values(vocPicsModules)].sort();
const rwandaImages = [rwandaImg12,rwandaImg13,rwandaImg1, rwandaImg2, rwandaImg3,rwandaImg4,rwandaImg5 , rwandaImg6,rwandaImg7,rwandaImg8,rwandaImg9,rwandaImg10,rwandaImg11];
const refugeeDayImages = Object.values(refugeeDayModules).sort();
const refugeeDay2025Images = Object.values(refugeeDay2025Modules).sort();
const refugeeDay2024Images = Object.values(refugeeDay2024Modules).sort();
const firstIntakeImages = Object.values(firstIntakeModules).sort().slice(0, 5);
const vocTrainingImages = Object.values(vocTrainingModules).sort().slice(0, 5);

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
      "Engineers4Humanity  's outreach team visited Gihembe Refugee Camp to meet the families of scholarship students, strengthening the bond between the organization and the communities it serves.",
    paragraphs: [
      "In 2019, Engineers4Humanity   organized a meaningful parent engagement visit to Gihembe Refugee Camp in Rwanda — one of the largest refugee settlements in the country. Team members and program coordinators made the journey to meet face-to-face with the parents and guardians of students supported by Engineers4Humanity  's education and engineering programs.",
      "The visit was a cornerstone of Engineers4Humanity  's holistic approach to education: one that recognizes that a student's success is deeply intertwined with the stability and support of their family. During the visit, team members listened to parents' stories, assessed living conditions, and discussed the academic progress of their children. These conversations shaped future program decisions, ensuring Engineers4Humanity  's support remained responsive to the real needs of the community.",
      "By investing time to understand the context in which their students live, Engineers4Humanity   reinforced its commitment not just to individual students, but to entire families and communities. The visit inspired new initiatives in family support, community engagement, and holistic welfare — all aimed at creating sustainable pathways out of displacement through education and engineering.",
      "This kind of direct community engagement is what sets Engineers4Humanity   apart. Every visit, every conversation, and every relationship built at Gihembe has informed how the organization designs its programs — ensuring they are culturally grounded, community-centered, and truly transformative.",
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
      "A milestone celebration honoring refugee students who completed their studies with Engineers4Humanity   support, bringing together families, community leaders, and sponsors for an inspiring ceremony.",
    paragraphs: [
      "In November 2021, Engineers4Humanity   hosted a landmark graduation ceremony at Latayole in Kigali, Rwanda, celebrating the achievements of refugee students who had successfully completed their academic programs with Engineers4Humanity  's scholarship and mentorship support. The event was a powerful testament to what becomes possible when young people are given access, opportunity, and belief.",
      "The ceremony brought together more than 200 attendees including graduating students, their proud families, community leaders, local government representatives, and Engineers4Humanity   supporters from Rwanda and beyond. Each graduate received recognition not just for their academic achievement, but for the resilience and determination they demonstrated throughout their journey under extraordinary circumstances.",
      "For many of the graduates, this day represented years of sacrifice and perseverance in the face of displacement, uncertainty, and hardship. Engineers4Humanity  's programs had provided them with scholarships, engineering mentorship, leadership training, and access to a network of professionals committed to their growth. The graduation was proof that with the right support, refugees are not defined by their displacement — they are defined by their potential.",
      "The event also served as a source of inspiration for younger students in the community, demonstrating that education is a door that can never be permanently closed. Engineers4Humanity  's commitment to nurturing the next generation of African engineers, community leaders, and change-makers was powerfully on display at Latayole.",
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
      "Young refugees celebrated the completion of Engineers4Humanity  's hands-on vocational training program, marking the beginning of new careers in technical trades and entrepreneurship.",
    paragraphs: [
      "November 2021 was a month of celebration for Engineers4Humanity   and the young people it serves. At La Tayole in Kigali, Rwanda, a graduation ceremony was held to honor refugee youth who had successfully completed Engineers4Humanity  's Vocational Training Program — an intensive, hands-on curriculum designed to equip graduates with practical technical skills and entrepreneurial knowledge for sustainable livelihoods.",
      "The vocational training program is one of Engineers4Humanity  's most impactful initiatives, targeting youth who may not have traditional pathways into higher education but whose potential is limitless. Participants trained in trades including construction, tailoring, electrical work, and basic engineering principles — skills that translate directly into income-generating opportunities and economic independence within their communities.",
      "The graduation ceremony was attended by over 150 people, including graduates, their families, Engineers4Humanity   staff, local officials, and partner organizations. Each graduate received a certificate of completion and had the opportunity to demonstrate the practical skills they had developed — a proud moment for the individuals, their families, and the entire community that had supported them.",
      "The 2021 cohort represented a new chapter in Engineers4Humanity  's approach to empowering refugee communities — one that combines education with practical skills to create self-sustaining livelihoods. Engineers4Humanity   continues to expand this program, with each new cohort bringing more young people closer to economic independence and a future of their own making.",
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
    title: "Engineers4Humanity at the Rwanda National Convention",
    date: "July 2025",
    location: "Dallas , Texas ",
    attendees: "300+",
    description:
      "Engineers4Humanity  's Rwanda National Convention united partners, alumni, beneficiaries, and advocates to review 17+ years of impact and chart the organization's strategic direction for the years ahead.",
    paragraphs: [
      "From July 4 to 6, 2025, I had the honor of joining the 4th of July celebrations for both Rwanda and the United States. Attending the Rwanda Convention in Dallas was especially meaningful—creating space for connection, knowledge exchange, and thoughtful conversations about our shared histories, values, and aspirations.",
      "I was particularly privileged to meet Ambassadors and staffs. Their leadership, insights, and encouragement further strengthened our commitment at Engineers4Humanity to advancing peace, unity, and long‑term stability in the region.",
      "My sincere gratitude goes to the event organizers—Rwanda Abroad‑USA—Rwandan government officials, and everyone who visited our booth, engaged with our work, and supported our mission. It was also an honor to introduce my book, Breaking Boundaries <a href='https://a.co/d/2NFsuRr' style='color:blue;text-decoration:underline;'>(https://a.co/d/2NFsuRr)</a>, to government leaders, private‑sector partners, authors, and civil society organizations.",
      "We look forward to continued collaboration as we work together toward a united, safe, and prosperous Africa—one community at a time.",
    ],
    highlights: [
      { label: "300+ Participants", icon: "users" },
      { label: "17+ Years of Impact Celebrated", icon: "star" },
      { label: "Strategic Partnership Forum", icon: "chart" },
    ],
    images: rwandaImages,
  },
  {
    id: 5,
    title: "Dallas County Commissioners Court – World Refugee Day Recognition",
    date: "June 17, 2025",
    location: "Dallas County, Texas, USA",
    attendees: "County Officials & Community Leaders",
    description:
      "Engineeer4Humanity's Founder, Eric Kamanzi, was invited to present his personal refugee journey before the Dallas County Commissioners Court during the official resolution session recognizing World Refugee Day 2025.",
    paragraphs: [
      "On June 17, 2025, Engineeer4Humanity's Founder, Eric Kamanzi, was invited to present his personal refugee journey before the Dallas County Commissioners Court during the official resolution session recognizing World Refugee Day 2025. This session formed part of the lead-up to the Dallas International World Refugee Day celebration held on June 21, 2025.",
      "In his remarks, Eric highlighted the contributions of refugees and immigrants to the United States—spanning business, culture, science, sports, and community development. He emphasized the importance of empowering refugees through skills, opportunity, and self-reliance rather than charity alone, while also calling for global efforts toward sustainable peace and economic stability.",
      "Eric expressed gratitude for the Texans' welcoming spirit and for the support of Dallas County leadership. He also presented a signed copy of his book, Breaking Boundaries, as a symbol of appreciation for those who champion refugee inclusion and dignity.",
      "This event stands as a meaningful milestone in our ongoing mission to uplift refugee voices, promote self-reliance, and advocate for peaceful, thriving communities.",
    ],
    highlights: [
      { label: "Dallas County Official Recognition", icon: "star" },
      { label: "World Refugee Day 2025", icon: "heart" },
      { label: "Book Presentation: Breaking Boundaries", icon: "chart" },
    ],
    images: refugeeDayImages,
  },
  {
    id: 6,
    title: "World Refugee Day 2025 – Dallas Celebration",
    date: "June 21, 2025",
    location: "Islamic Association of North Texas (IANT), Richardson, Texas, USA",
    attendees: "Dignitaries, Advocates & Community Members",
    description:
      "Engineeer4Humanity Founder and #1 Bestselling Author Eric Kamanzi joined dignitaries, refugee advocates, and community members at the World Refugee Day celebration hosted at IANT in Richardson, Texas, featuring cultural performances, food, music, job fairs, and health services.",
    paragraphs: [
      "On June 21, 2025, Engineeer4Humanity Founder and #1 Bestselling Author Eric Kamanzi joined dignitaries, refugee advocates, and community members at the World Refugee Day celebration hosted at the Islamic Association of North Texas (IANT) in Richardson, Texas. The event featured cultural performances, food, music, job fairs, and health services, creating a vibrant and welcoming atmosphere for all attendees.",
      "Eric shared his powerful story of resilience—from surviving conflict in the Democratic Republic of Congo to becoming a civil engineer, author, and humanitarian leader. Throughout the day, he connected with fellow refugees, local leaders, and partner organizations, signing copies of his memoir Breaking Boundaries and highlighting the contributions refugees make to American society.",
      "This gathering followed his earlier address at the Dallas County Commissioners Court on June 17, where he spoke during the official World Refugee Day Resolution session. His message emphasized dignity, opportunity, and sustainable peace as essential pathways for refugee empowerment.",
      "The event also honored the work of resettlement agencies and community partners who support refugee integration across North Texas. Engineeer4Humanity reaffirmed its commitment to uplifting refugee voices, promoting self-reliance, and celebrating the strength and potential of displaced communities.",
    ],
    highlights: [
      { label: "Cultural Performances & Community", icon: "star" },
      { label: "Book Signing: Breaking Boundaries", icon: "heart" },
      { label: "Job Fairs & Health Services", icon: "chart" },
    ],
    images: refugeeDay2025Images,
  },
  {
    id: 7,
    title: "World Refugee Day 2024 – Dallas Celebration",
    date: "June 22, 2024",
    location: "Dallas, Texas, USA",
    attendees: "City of Dallas, UNHCR Partners & Community",
    description:
      "Engineeer4Humanity Founder Eric Kamanzi joined the City of Dallas, UNHCR partners, and leading resettlement agencies to commemorate World Refugee Day 2024, honoring the resilience, contributions, and stories of refugees across North Texas.",
    paragraphs: [
      "On June 22, 2024, Engineeer4Humanity Founder and #1 Bestselling Author Eric Kamanzi joined the City of Dallas, UNHCR partners, and leading resettlement agencies to commemorate World Refugee Day 2024. Hosted in collaboration with International Rescue Committee, Catholic Charities, World Relief, Church World Service, ICNA Relief, and other partners, the event honored the resilience, contributions, and stories of refugees across North Texas and around the world.",
      "During the celebration, Eric shared his message of hope, dignity, and empowerment—reminding attendees that refugees are not defined by their struggles but by their strength, skills, and potential. The event also marked a special milestone as Eric introduced and signed copies of his memoir, Breaking Boundaries: A Resilient Refugee's Journey from Refugee Camps to Engineer of Change, dedicating it to refugees worldwide as a symbol of encouragement and possibility.",
      "Eric expressed gratitude to the City of Dallas, partner organizations, and supporters—including UES/Alpha—for uplifting refugee voices and creating platforms where their achievements can be celebrated. He reaffirmed Engineeer4Humanity's commitment to using a portion of book proceeds to empower youth and strengthen public health engineering services, especially WASH initiatives in refugee communities.",
      "This celebration stands as a reminder that every refugee has a story worth telling—and a future worth investing in.",
    ],
    highlights: [
      { label: "City of Dallas & UNHCR Partners", icon: "users" },
      { label: "Book Launch: Breaking Boundaries", icon: "star" },
      { label: "Refugee Empowerment & WASH Mission", icon: "heart" },
    ],
    images: refugeeDay2024Images,
  },
  {
    id: 8,
    title: "Disasters Expo USA – Houston & Miami: Participation, Impact & Upcoming Events",
    date: "November 5–6, 2025",
    location: "George R. Brown Convention Center, Houston, Texas",
    attendees: "Industry Leaders & Humanitarian Organizations",
    description:
      `Engineeer4Humanity Founder &amp; CEO Eric Kamanzi and Hodari R. Etienne participated in the <a href="https://disasterexpotexas.com/" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:600;">Disasters Expo USA</a> on November 5–6, 2025—one of the world's leading events dedicated to mitigating the most costly and destructive disasters. The expo brought together global leaders in disaster response, emergency management, water supply, wastewater treatment, public health engineering, climate resilience, and humanitarian innovation.`,
    paragraphs: [
      "During the two-day event, Eric connected with international organizations and technical experts whose work aligns directly with Engineeer4Humanity's mission and Rwanda's national disaster-management priorities. This learning-rich environment strengthened our Public Health Engineering Department and expanded our global network of collaborators committed to building safer, more resilient communities.",
      `<strong>How This Event Supports MINEMA, UNHCR &amp; the Rwanda–Engineeer4Humanity MoU</strong><br/>The expo provides opportunities to:<ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>Connect MINEMA with international disaster-response organizations</li><li>Identify low-cost, scalable technologies for refugee camps</li><li>Strengthen WASH systems, flood-control, and environmental protection</li><li>Support MINEMA's mandate for disaster-risk reduction and resilience</li><li>Bring new partners into the MoU framework for technical support and innovation</li></ul>`,
      `<strong>Benefits for Kigali City: Flooding, Wastewater &amp; Urban Resilience</strong><br/>Kigali faces recurring challenges including urban flooding, erosion and landslides, wastewater management gaps, and drainage systems under pressure. At the Disasters Expo, Eric met experts in:<ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>Urban flood-control engineering</li><li>Smart drainage and storm-water systems</li><li>Wastewater-treatment innovations</li><li>Climate-resilient city planning</li></ul>`,
      `<strong>Benefits for Refugee Camps &amp; High-Risk Districts in Rwanda</strong><br/>Rwanda's refugee-hosting districts face significant environmental challenges. Mahama &amp; Mugombwa face seasonal flooding, pressure on water systems, deforestation, and landslide risks. Gihembe Camp was permanently closed and relocated to Mahama due to severe environmental degradation and landslides—highlighting the urgent need for disaster-resilient planning. Districts such as Gicumbi, Nyabihu, Rubavu, Huye, Gisagara, and Kirehe continue to experience landslides, flooding, and erosion.`,
      `<strong>Solutions We Brought Home</strong><ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>Low-cost flood-control systems suitable for Mugombwa &amp; Mahama</li><li>Slope-stabilization and erosion-control technologies</li><li>Improved wastewater and solid-waste systems</li><li>Emergency water-supply innovations</li><li>Early-warning systems for landslides and floods</li><li>Clean-energy alternatives to reduce deforestation in camps</li></ul>`,
    ],
    highlights: [
      { label: "Nov 5–6, 2025 · Houston TX", icon: "star" },
      { label: "MINEMA & UNHCR MoU Support", icon: "chart" },
      { label: "WASH & Disaster Resilience", icon: "heart" },
    ],
    images: [upcomingImg3, upcomingImg4],
  },
  {
    id: 9,
    title: "The First Intake Graduation – Gihembe Refugee Camp",
    date: "March 2012",
    location: "Gihembe Refugee Camp, Rwanda",
    attendees: "Community Leaders & Families",
    description:
      "Hope School's first class graduated in March 2012 with a 100% national exam pass rate — a miracle born from a small church, 52 students on a bare floor, and a community determined to break the cycle of displacement through education.",
    paragraphs: [
      "Hope School began in 2009 inside a small church in Gihembe Refugee Camp, with 52 students sitting on the floor and learning without desks, books, or electricity. What they did have was faith — and a community determined to break the cycle of refugee hopelessness through education.",
      "Against all odds, the first class graduated in March 2012 with a 100% national exam pass rate, proving that brilliance can rise from the hardest places. This miracle was carried by volunteer teachers, refugee parents, and youth leaders who refused to let circumstance define their children's futures.",
      "Though Hope School closed in 2016, thanks to Impact Hope, many students were able to continue their studies in boarding schools. The spirit of Hope School lives on through Engineers4Humanity and the alumni who now give back as mentors, sponsors, and leaders.",
      "Their lives — and the families formed through this movement — are living proof that hope planted in a refugee camp can grow into a legacy that transforms generations. Your support keeps this miracle alive.",
    ],
    highlights: [
      { label: "100% National Exam Pass Rate", icon: "star" },
      { label: "52 First Intake Students", icon: "users" },
      { label: "Hope School Legacy Lives On", icon: "heart" },
    ],
    images: firstIntakeImages,
  },
  {
    id: 10,
    title: "Engineers4Humanity Launches the Vocational Training & Research Center",
    date: "2020",
    location: "Gihembe Refugee Camp, Rwanda",
    attendees: "MINEMA, GIZ, Local Administration & Community Leaders",
    description:
      "In 2020, Engineers4Humanity launched the Vocational Training and Research Center inside Gihembe Refugee Camp — one of Rwanda's first refugee-led engineering and innovation hubs, honored by local administration, MINEMA staff, GIZ, and refugee education leaders.",
    paragraphs: [
      "The launch was honored by local administration, MINEMA staff led by Rate Cpt Gaulette (RIP) and his assistant Mrs Pascasie, Immigration officer Mr Innocent, GIZ representatives, and refugee education leaders — all united in support of empowering refugee youth through skills, innovation, and dignity.",
      "During the launch, guests toured the center's workshops and witnessed young people demonstrating practical solutions in construction, public health engineering, waste-to-energy innovation, and climate-smart materials — especially Hydrophone block as construction materials and briquet fabrication from waste materials — all designed by refugees for their own community.",
      "The center also introduced a small-scale mushroom cultivation project, a research-driven agricultural initiative designed to combat malnutrition and improve livelihoods. This demonstration garden taught refugee families how to grow mushrooms in very small spaces using low-cost materials available inside the camp, becoming a model for how refugee households could produce nutritious food and generate income.",
      "Beyond the camp, the center inspired a larger agricultural initiative in Bugesera District, where Eric and his spouse Gentille rented a plot to grow peppers, watermelon, and green beans — a study farm showcasing irrigation mechanization, soil improvement, and climate-smart agriculture that improved lives across the local and refugee community.",
      "Though the Gihembe center was forced to stop its activities after the relocation of the camp to Mahama and financial limitations, the seeds planted in engineering, innovation, and agriculture continue to live. Today, Engineers4Humanity is preparing to re-open this vision under the Engineers4Humanity Institute — housing the Innovation & Research Department and the Professional Skills Development & Vocational Training Department. The dream did not end. It is being rebuilt.",
    ],
    highlights: [
      { label: "Rwanda's First Refugee Innovation Hub", icon: "star" },
      { label: "MINEMA & GIZ Recognition", icon: "chart" },
      { label: "WASH · TVET · Agriculture", icon: "heart" },
    ],
    images: vocTrainingImages,
  },
];

export interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  paragraphs: string[];
  highlights: { label: string; icon: string }[];
  images: string[];
  contacts?: { label: string; email: string }[];
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "Join Us for International World Refugee Day – June 20, 2026",
    date: "Saturday, June 20, 2026",
    time: "10:00 AM – 2:00 PM",
    location: "Islamic Association of North Texas (IANT), 840 Abrams Rd, Richardson, TX 75081",
    description:
      `Engineeer4Humanity is honored to be invited once again to the International World Refugee Day Celebration, taking place on Saturday, June 20, 2026, from 10:00 AM to 2:00 PM at the Islamic Association of North Texas (IANT), 840 Abrams Rd, Richardson, TX 75081. Visit <a href="https://www.dallaswrd.com/" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:600;">www.dallaswrd.com</a> for full event details. This annual gathering—organized in partnership with the City of Dallas, UNHCR, and leading resettlement agencies—celebrates the resilience, contributions, and stories of refugees across our communities.`,
    paragraphs: [
      "Following our meaningful participation in the 2024 and 2025 Dallas World Refugee Day events, we are proud to return and stand alongside refugees, advocates, and partners committed to dignity, opportunity, and sustainable peace.",
      "This year, the celebration will also take place in Rwanda, where our Engineeer4Humanity team has been invited to join World Refugee Day activities coordinated with UNHCR and MINEMA in Kigali and all refugee camps across the country—uniting our global community in one shared message of hope and solidarity.",
      "We warmly invite you to attend, connect, and celebrate with us as we honor refugee achievements and reaffirm our commitment to building a more inclusive and peaceful world.",
    ],
    highlights: [
      { label: "June 20, 2026 · 10 AM–2 PM", icon: "star" },
      { label: "IANT, Richardson TX", icon: "heart" },
      { label: "Rwanda Celebration in Parallel", icon: "chart" },
    ],
    images: [refugeesDayImg1, refugeesDayImg2, refugeesDayImg3, refugeesDayImg4, refugeesDayImg5],
    contacts: [
      { label: "Engineeer4Humanity Kigali Office", email: "contactkigali@engineers4humanity.org" },
      { label: "Engineeer4Humanity Texas Office", email: "Contact@engineers4humanity.org" },
    ],
  },
  {
    id: 2,
    title: "Engineeer4Humanity to Attend Disasters Expo USA – 2026 & 2027",
    date: "October 14–15, 2026 (Houston) · 2027 (Miami)",
    location: "George R. Brown Convention Center, Houston TX · Miami, FL",
    description:
      `Engineeer4Humanity is pleased to announce that Founder &amp; CEO Eric Kamanzi and the Engineeer4Humanity USA Team will participate in the upcoming <a href="https://disasterexpotexas.com/" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:600;">Disasters Expo USA 2026</a> (October 14–15, Houston) and <a href="https://disasterexpomiami.com/" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:600;">Disasters Expo Miami 2027</a>—premier national events focused on disaster mitigation, emergency response, WASH innovation, environmental protection, and resilient-city engineering.`,
    paragraphs: [
      "Our participation strengthens the implementation of the MINEMA–UNHCR–engineeer4humanity MoU, especially in Public Health Engineering, WASH, environmental protection, and disaster-risk reduction. The expo also supports Rwanda's national priorities—benefiting Kigali City, refugee-hosting districts, and high-risk areas facing flooding, landslides, wastewater challenges, and environmental degradation.",
      "As a Registered Environmental Firm, and with Eric serving as a lead environmental expert within RAPEP, Engineeer4Humanity uses this platform to bring global solutions home and expand partnerships that improve resilience across Rwanda and Africa.",
      `<strong>Strengthening Research, Innovation &amp; University Engagement</strong><br/>The Disasters Expo provides our Research &amp; Innovation Department with:<ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>Access to cutting-edge technologies in disaster-risk reduction and WASH</li><li>Opportunities for joint research with universities and global institutions</li><li>New models for innovation hubs serving refugee youth and Rwandan students</li><li>Partnerships that support STEM education, applied engineering, and field research</li></ul>`,
      `<strong>Advancing Public Health Engineering</strong><br/>The expo directly supports our Public Health Engineering Department by introducing:<ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>New solutions for water supply, wastewater treatment, and sanitation</li><li>Flood-control and erosion-mitigation technologies for Mahama, Mugombwa, Kigeme, and other refugee camps</li><li>Tools for emergency WASH response and climate-resilient infrastructure</li><li>Partnerships that strengthen Rwanda's national WASH systems</li></ul>`,
      `<strong>Empowering Environmental Clubs in Rwanda &amp; Refugee Camps</strong><br/>Environmental Clubs supported by Engineeer4Humanity will benefit through:<ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>New ideas for community-led environmental protection</li><li>Training materials on flood prevention, waste management, and reforestation</li><li>Youth-friendly tools for climate-action campaigns</li><li>Opportunities to connect with global environmental networks</li></ul>`,
      `<strong>Supporting Our Social Enterprise in Rwanda</strong><br/>For Engineeer4Humanity Consultancy Ltd, the expo opens doors to:<ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700"><li>New environmental technologies for EIA, WASH, and climate-resilience projects</li><li>Partnerships with U.S. companies seeking to expand into Rwanda &amp; Africa</li><li>Opportunities to deliver professional engineering services in Rwanda and the region</li><li>Growth in disaster management, environmental engineering, and resilient-city planning</li></ul>`,
      `<strong>A Call to U.S. Companies</strong><br/>We welcome U.S. companies in disaster management, environmental engineering, water &amp; wastewater technology, climate-resilient infrastructure, and renewable energy to partner with Engineeer4Humanity and explore sustainable business opportunities in Rwanda and across Africa.<br/><br/>Together, we are building safer, stronger, and more resilient communities—across Rwanda, Africa, and the United States.`,
    ],
    highlights: [
      { label: "Oct 14–15, 2026 · Houston TX", icon: "star" },
      { label: "Miami 2027", icon: "chart" },
      { label: "WASH · Resilience · Innovation", icon: "heart" },
    ],
    images: [upcomingImg5, upcomingImg6],
  },
];
