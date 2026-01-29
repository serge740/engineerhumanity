import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Wrench, 
  Heart,
  Droplet,
  GraduationCap,
  Hammer,
  Users,
  Building2,
  Menu,
  X
} from 'lucide-react';

const E4HHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
      title: "Building Dignified Lives",
      description: "Empowering refugees and underserved communities through education, engineering, and servant leadership"
    },
    {
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80",
      title: "Education Changes Everything",
      description: "Supporting 500+ high school graduates and 2,000+ young refugees with mentorship and career pathways"
    },
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80",
      title: "Creating Opportunities",
      description: "300+ job opportunities created through vocational training and social entrepreneurship"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "500+", label: "High school graduates from refugee camps" },
    { number: "300+", label: "Youth trained in vocational skills" },
    { number: "2,000+", label: "Young refugees mentored" },
    { number: "100+", label: "University graduates supported" },
    { number: "300+", label: "Jobs created for refugees" }
  ];

  const missionCards = [
    {
      icon: BookOpen,
      title: "Education & Skills",
      description: "Enhancing education and vocational skills development to create pathways for success and self-sufficiency for refugees and underserved communities."
    },
    {
      icon: Briefcase,
      title: "Job Creation",
      description: "Fostering self-reliance through job creation and entrepreneurship opportunities that transform lives and communities."
    },
    {
      icon: Wrench,
      title: "Engineering Solutions",
      description: "Advancing sustainable engineering solutions for environmental protection, water, sanitation, and hygiene services."
    },
    {
      icon: Heart,
      title: "Peacebuilding",
      description: "Encouraging servant leadership and peacebuilding initiatives in the East African region for lasting impact."
    }
  ];

  const programs = [
    {
      icon: Droplet,
      title: "Public Health Engineering",
      content: [
        "The pressing challenges of Water, Sanitation, and Hygiene (WASH) across African countries and refugee camps demand our immediate commitment.",
        "In line with SDG 2030 and Africa Agenda 2063, we're dedicated to transforming critical WASH issues into opportunities for impactful change by implementing sustainable systems ensuring access to safe drinking water and improved sanitation.",
        { label: "Africa Program", text: "Building pedestrian suspended bridges and infrastructure connecting rural communities to education, markets, and healthcare." },
        { label: "USA Program", text: "Enhancing public safety, environmental protection, and disaster preparedness in Texas communities." }
      ]
    },
    {
      icon: GraduationCap,
      title: "Education Program",
      content: [
        '"Education is a powerful weapon to change the world" - Nelson Mandela',
        "We believe education is the key to achieving social and economic transformation. We're passionate about empowering refugees, immigrants, and underserved youth with essential skills for self-reliance.",
        "Our programs emphasize technical disciplines and STEM subjects at high school, college, and university levels, helping youth transition from reliance on aid to becoming skilled, productive contributors to their communities.",
        "We work with local administrations, education institutions, and universities to support transformative education programs."
      ]
    },
    {
      icon: Hammer,
      title: "Skills Development Institute",
      content: [
        "The Engineers4Humanity Institute provides sustainable engineering solutions to combat job scarcity and high unemployment among refugee and immigrant youth.",
        "As a center for skill development and innovation, we equip refugees and vulnerable youth with the skills needed to break the cycle of poverty and achieve self-reliance.",
        "We develop young leaders grounded in servant-leadership principles and collaborate with government, civil society, and the private sector to empower underprivileged individuals.",
        "By promoting self-reliance through capacity-building programs, we unlock potential and create transformative opportunities."
      ]
    },
    {
      icon: Users,
      title: "Servant Leadership & Peacebuilding",
      content: [
        "After nearly 30 years in refugee camps, we're committed to supporting peacebuilding initiatives and empowering youth and women to become champions of peace.",
        "Our innovative program promotes emotional healing and empowers individuals affected by conflict to articulate their stories and find their voices.",
        "Working with qualified psychologists, mentors, and coaches, we support participants in overcoming past challenges through creative methodologies including effective listening, painting, poetry, music, and book writing.",
        "We organize multicultural events, competitions, and international festivals to advance peace-building initiatives and honor victims of conflict."
      ]
    },
    {
      icon: Building2,
      title: "Social Entrepreneurship",
      content: [
        "Engineers4Humanity Consultancy is a registered social enterprise in East Africa providing engineering, environmental, and social consultancy services.",
        "Founded in Rwanda in 2020, we offer services that support refugee youth education, job creation, and promote sustainable development across Africa.",
        "We're relaunching our consultancy program to support African Agenda 2063 and SDGs 2030, while planning to launch Engineers4Humanity Consultancy-USA.",
        "This will provide engineering, project management, and inspection services, creating jobs and contributing to economic growth in America."
      ]
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-white/95 backdrop-blur-md shadow-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-xl">E4H</span>
              </div>
              <div className="hidden md:block">
                <div className="font-serif text-xl font-bold text-gray-900 leading-tight">
                  Engineers4Humanity
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Building Dignified Lives
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              <li>
                <a 
                  href="#home" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                >
                  Programs
                </a>
              </li>
              <li>
                <a 
                  href="#events" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                >
                  Events
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                >
                  Contact
                </a>
              </li>
              <li className="ml-4">
                <a 
                  href="https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02" 
                  className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Donate Now
                </a>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-sky-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col gap-2 mt-4">
                <a 
                  href="#home" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  About
                </a>
                <a 
                  href="#programs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  Programs
                </a>
                <a 
                  href="#events" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  Events
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  Contact
                </a>
                <a 
                  href="https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02" 
                  className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md text-center mt-2"
                >
                  Donate Now
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-[85vh] mt-24 overflow-hidden" id="home">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl animate-[slideUp_0.8s_ease-out]">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl leading-relaxed drop-shadow-xl animate-[slideUp_0.8s_ease-out_0.2s_backwards]">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-10' 
                  : 'bg-white/50 w-3 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-sky-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-4xl md:text-5xl font-bold text-green-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm opacity-90 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-transparent hover:border-sky-500"
                >
                  <Icon className="w-10 h-10 text-sky-600 mb-4" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl font-semibold mb-3 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Eric Kamanzi"
              className="w-full h-[500px] object-cover rounded-xl shadow-2xl"
            />
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-gray-900">
                Our Story & Inspiration
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Engineers4Humanity is a registered 501(c)(3) nonprofit organization based in Texas, fostering resilience and self-reliance among displaced communities worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We support our affiliated organization, the Engineers4Humanity Consultancy, a social enterprise founded in 2020 in Kigali, Rwanda.
              </p>
              <div className="bg-gray-50 p-6 border-l-4 border-green-600 rounded-lg mb-6">
                <h4 className="font-serif text-xl font-semibold mb-2 text-gray-900">
                  Founded by Eric Kamanzi
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  A professional civil engineer, Project Management Professional, environmental expert, and philanthropist with a master's degree in engineering project management and global sustainability and over 15 years of experience in humanitarian efforts.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Inspired by his personal journey as a former refugee and his commitment to community advocacy, Eric established Engineers4Humanity to address critical gaps in education, refugee youth unemployment, public health engineering, and youth development within refugee and host communities.
              </p>
              <p className="text-gray-900 font-semibold">
                More than 2,000 young refugees have been positively impacted by our humanitarian activities in East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50" id="programs">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Our Programs
          </h2>
          <div className="space-y-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-80 bg-gradient-to-br from-sky-600 to-green-600 p-8 text-white flex flex-col justify-between">
                      <div>
                        <Icon className="w-12 h-12 mb-4" strokeWidth={1.5} />
                        <h3 className="font-serif text-2xl font-bold">
                          {program.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-1 p-8">
                      <div className="space-y-4">
                        {program.content.map((item, idx) => {
                          if (typeof item === 'string') {
                            return (
                              <p key={idx} className="text-gray-600 leading-relaxed">
                                {item}
                              </p>
                            );
                          } else {
                            return (
                              <div key={idx} className="pl-4 border-l-2 border-gray-200">
                                <p className="font-semibold text-sky-600 mb-1">
                                  {item.label}:
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                  {item.text}
                                </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Your Support Makes a Difference
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Whether through donations, volunteering, or spreading the word, you can help empower vulnerable communities and create lasting change.
          </p>
          <a
            href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE"
            className="inline-block bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-700 hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl"
          >
            Make a Donation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-16" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Engineers4Humanity
              </h3>
              <p className="mb-2">Registered 501(c)(3) nonprofit organization</p>
              <p>EIN: 99-2264956</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Texas Office
              </h3>
              <p className="mb-2">908 Audelia RD, Suite 200, Box 139<br />Richardson, TX 75081</p>
              <p className="mb-1">Phone: (+1) 469 967 0444</p>
              <p>Email: contact@e4hinitiative.org</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Rwanda Office
              </h3>
              <p className="mb-2">Engineers4Humanity Consultancy Ltd<br />TIN: 111054632</p>
              <p className="mb-2">Kigali City, Kicukiro Center<br />Diamond House, 2nd Floor</p>
              <p className="mb-1">Phone: (+250) 788 307 186</p>
              <p>Email: engineersforhumanity20@gmail.com</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Quick Links
              </h3>
              <a href="#about" className="block mb-2 hover:text-sky-500 transition">About Us</a>
              <a href="#programs" className="block mb-2 hover:text-sky-500 transition">Programs</a>
              <a href="#events" className="block mb-2 hover:text-sky-500 transition">Events</a>
              <a href="#contact" className="block mb-2 hover:text-sky-500 transition">Contact</a>
              <a href="#" className="block hover:text-sky-500 transition">Privacy Policy</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2026 Engineers4Humanity. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700;800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default E4HHomepage;