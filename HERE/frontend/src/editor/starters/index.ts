export interface StarterTemplate {
  id: string;
  label: string;
  emoji: string;
  blocks: Array<{ type: string; order: number; props: any; styles?: any }>;
}

export const STARTERS: StarterTemplate[] = [
  {
    id: 'landing-page',
    label: 'Landing Page',
    emoji: '🚀',
    blocks: [
      {
        type: 'hero',
        order: 0,
        props: {
          heading: 'Welcome to Our Website',
          subheading: 'We help people achieve great things. Discover what we can do for you.',
          buttonText: 'Get Started',
          buttonLink: '/contact',
          backgroundImage: '',
          overlayColor: '#000000',
          overlayOpacity: 0.3,
          textColor: '#ffffff',
          alignment: 'center',
          minHeight: '80vh',
        },
      },
      {
        type: 'stats',
        order: 1,
        props: {
          items: [
            { number: '500', suffix: '+', label: 'Clients served' },
            { number: '10', suffix: ' yrs', label: 'Experience' },
            { number: '98', suffix: '%', label: 'Satisfaction rate' },
          ],
          columns: 3,
          bgColor: '#f8fafc',
          textColor: '#111827',
          numberColor: '#2563EB',
        },
      },
      {
        type: 'text',
        order: 2,
        props: {
          content: '<p>We are passionate about what we do and committed to delivering exceptional results for every client. Our team brings together years of experience, innovative thinking, and a genuine care for the people we serve.</p>',
          alignment: 'center',
          maxWidth: '700px',
        },
      },
      {
        type: 'cta-banner',
        order: 3,
        props: {
          heading: 'Ready to get started?',
          body: "Let's work together to bring your vision to life.",
          buttonText: 'Contact Us',
          buttonLink: '/contact',
          bgColor: '#2563EB',
          textColor: '#ffffff',
          alignment: 'center',
        },
      },
    ],
  },
  {
    id: 'about-page',
    label: 'About Us',
    emoji: '👋',
    blocks: [
      {
        type: 'heading',
        order: 0,
        props: {
          text: 'About Us',
          level: 'h1',
          alignment: 'center',
          color: '#111827',
          fontWeight: 'bold',
        },
      },
      {
        type: 'text',
        order: 1,
        props: {
          content: '<p>We are a team of dedicated professionals committed to making a difference. Founded with a simple mission: to serve our community with excellence and integrity.</p>',
          alignment: 'center',
          maxWidth: '700px',
        },
      },
      {
        type: 'image-text',
        order: 2,
        props: {
          imageSrc: '',
          imageAlt: 'Our team',
          content: '<h2>Our Story</h2><p>Every great organization starts with a vision. Ours began with a simple belief that people deserve better. Since our founding, we have grown from a small team into a trusted partner for hundreds of clients.</p>',
          imagePosition: 'left',
          imageSize: '50%',
          verticalAlign: 'center',
        },
      },
      {
        type: 'team-cards',
        order: 3,
        props: {
          members: [
            { photo: '', name: 'Jane Smith', title: 'Executive Director', bio: 'Leading the organization with vision and purpose.' },
            { photo: '', name: 'John Doe', title: 'Operations Manager', bio: 'Ensuring every program runs smoothly and efficiently.' },
            { photo: '', name: 'Mary Johnson', title: 'Program Coordinator', bio: 'Working directly with clients to create impact.' },
          ],
          columns: 3,
          cardStyle: 'card',
        },
      },
    ],
  },
  {
    id: 'contact-page',
    label: 'Contact',
    emoji: '📬',
    blocks: [
      {
        type: 'heading',
        order: 0,
        props: {
          text: 'Contact Us',
          level: 'h1',
          alignment: 'center',
          color: '#111827',
          fontWeight: 'bold',
        },
      },
      {
        type: 'text',
        order: 1,
        props: {
          content: '<p>We would love to hear from you. Fill out the form below or reach us directly at the contact details listed.</p>',
          alignment: 'center',
          maxWidth: '600px',
        },
      },
      {
        type: 'spacer',
        order: 2,
        props: { height: 'md' },
      },
    ],
  },
  {
    id: 'team-page',
    label: 'Team',
    emoji: '👥',
    blocks: [
      {
        type: 'heading',
        order: 0,
        props: {
          text: 'Meet Our Team',
          level: 'h1',
          alignment: 'center',
          color: '#111827',
          fontWeight: 'bold',
        },
      },
      {
        type: 'text',
        order: 1,
        props: {
          content: '<p>Our team is made up of passionate individuals who believe in our mission and work every day to make it a reality.</p>',
          alignment: 'center',
          maxWidth: '600px',
        },
      },
      {
        type: 'team-cards',
        order: 2,
        props: {
          members: [
            { photo: '', name: 'Team Member', title: 'Role', bio: 'A brief bio about this person.' },
            { photo: '', name: 'Team Member', title: 'Role', bio: 'A brief bio about this person.' },
            { photo: '', name: 'Team Member', title: 'Role', bio: 'A brief bio about this person.' },
          ],
          columns: 3,
          cardStyle: 'card',
        },
      },
    ],
  },
];
