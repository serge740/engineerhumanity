import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

import image1 from '../../assets/team/management/image1.png'
import image2 from '../../assets/team/management/image2.png'
import image3 from '../../assets/team/management/image3.png'
import image4 from '../../assets/team/management/image4.png'
import image5 from '../../assets/team/management/image5.png'
import image6 from '../../assets/team/management/image6.png'
import image7 from '../../assets/team/management/image7.png'
import image8 from '../../assets/team/management/image8.png'
import image9 from '../../assets/team/management/image9.png'
import image10 from '../../assets/team/management/image10.png'
import image11 from '../../assets/team/management/image11.png'
import image12 from '../../assets/team/management/image12.png'
import image13 from '../../assets/team/management/image13.png'
import image14 from '../../assets/team/management/image14.png'
import image15 from '../../assets/team/management/image15.png'
import image16 from '../../assets/team/management/image16.png'
import image17 from '../../assets/team/management/image17.png'
import image18 from '../../assets/team/management/image18.png'
import image19 from '../../assets/team/management/image19.png'
import image20 from '../../assets/team/management/image20.png'
import image21 from '../../assets/team/management/image21.png'
import image22 from '../../assets/team/management/image22.png'
import image23 from '../../assets/team/management/image23.png'
import image24 from '../../assets/team/management/image24.png'
import image25 from '../../assets/team/management/image25.png'
import image26 from '../../assets/team/management/image26.png'
import image27 from '../../assets/team/management/image27.png'
import image28 from '../../assets/team/management/image28.png'
import image29 from '../../assets/team/management/image29.png'
import image30 from '../../assets/team/management/image30.png'
// member images


interface TeamMember {
  id: number;
  name: string;
  title: string;
  credentials?: string;
  image: string;
  linkedIn?: string;
  category: 'leadership' | 'operations' | 'programs' | 'projects';
}

const ManagementTeamPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Eric Kamanzi",
      credentials: "PMP, PE, MSc",
      title: "Founder & Chief Executive Officer",
      image: image1,
      linkedIn: "https://www.linkedin.com/in/eric-kamanzi-pmp/",
      category: 'leadership'
    },
    {
      id: 2,
      name: "Vin Hoey",
      credentials: "MBA",
      title: "Board Chair",
      image: image2,
      linkedIn: "https://www.linkedin.com/in/vinhoey/",
      category: 'leadership'
    },
    {
      id: 3,
      name: "Frere Straton Malisaba",
      credentials: "M.Ed",
      title: "Board Vice Chair | Education Program",
      image: image3,
      linkedIn: "/board-members/#gallery",
      category: 'leadership'
    },
    {
      id: 4,
      name: "Theophile Karegesa Kivuye",
      credentials: "MEng",
      title: "Board Vice Chair | Engineering Program",
      image: image4,
      category: 'leadership'
    },
    {
      id: 5,
      name: "Fabrice Kayisire",
      credentials: "PE",
      title: "Country Director - Rwanda",
      image: image5,
      linkedIn: "https://www.linkedin.com/in/fabrice-kayisire-94613a98/",
      category: 'operations'
    },
    {
      id: 6,
      name: "Innocent Habimana",
      credentials: "MPH",
      title: "Chief of Operations - Africa",
      image: image6,
      category: 'operations'
    },
    {
      id: 7,
      name: "Emmanuel Sebagisha",
      credentials: "M.Ed",
      title: "Education Program Manager - Africa",
      image: image7,
      linkedIn: "https://www.linkedin.com/in/emmanuel-sebagisha-352532193/",
      category: 'programs'
    },
    {
      id: 8,
      name: "Octavien Rugirangoga",
      credentials: "PE",
      title: "Engineering Program Manager - Africa",
      image: image8,
      category: 'programs'
    },
    {
      id: 9,
      name: "Mukaneza Jacqueline",
      title: "Finance & Accounting - Rwanda",
      image: image9,
      linkedIn: "https://www.linkedin.com/in/mukaneza-jacqueline-b5778b29b/",
      category: 'operations'
    },
    {
      id: 10,
      name: "Bernard Ndizeye",
      title: "Youth Mentorship - Rwanda",
      image: image10,
      category: 'programs'
    },
    {
      id: 11,
      name: "Jackson Mutega",
      title: "Youth Mentorship Program - Africa",
      image: image11,
      linkedIn: "https://www.linkedin.com/in/dushimimana-mutega-a28585338/",
      category: 'programs'
    },
    {
      id: 12,
      name: "Samuel Ntirenganya",
      credentials: "EIT",
      title: "Engineering Project - Africa",
      image: image12,
      category: 'projects'
    },
    {
      id: 13,
      name: "Eric Ndayisaba",
      title: "Marketing & Fundraising",
      image: image13,
      linkedIn: "https://www.linkedin.com/in/eric-ndayisaba/",
      category: 'operations'
    },
    {
      id: 14,
      name: "Ntwari Christian",
      title: "Environmental Project - Africa",
      image: image14,
      linkedIn: "https://www.linkedin.com/in/ntwari-christian-613764229/",
      category: 'projects'
    },
    {
      id: 15,
      name: "Enock Nkurunziza",
      title: "Education Project Manager - Rwanda",
      image: image15,
      linkedIn: "https://www.linkedin.com/in/enock-nkurunziza/",
      category: 'programs'
    },
    {
      id: 16,
      name: "Bosco Izabayo",
      title: "Youth Mentorship Program - Africa",
      image: image16,
      linkedIn: "https://www.linkedin.com/in/bosco-izabayo-9912761b4/",
      category: 'programs'
    },
    {
      id: 17,
      name: "Noel Rusine",
      title: "Media & Storytelling",
      image: image17,
      linkedIn: "https://www.linkedin.com/in/sine-noel-3004591b3/",
      category: 'operations'
    },
    {
      id: 18,
      name: "Innocent Habimfura",
      title: "Environmental Project - Africa",
      image: image18,
      linkedIn: "https://www.linkedin.com/in/habimfura-innocent-7a4540186/",
      category: 'projects'
    },
    {
      id: 19,
      name: "Joel S Rusine",
      credentials: "EIT",
      title: "Engineering Project - USA",
      image: image19,
      linkedIn: "https://www.linkedin.com/in/joel-s-rusine-82260a259/",
      category: 'projects'
    },
    {
      id: 20,
      name: "Alex Rukamirwa",
      credentials: "EIT",
      title: "Engineering Project - Africa",
      image: image20,
      linkedIn: "https://www.linkedin.com/in/rukamirwa-alexis-b448b9213/",
      category: 'projects'
    },
    {
      id: 21,
      name: "Bahati Musuhuke",
      credentials: "MBA",
      title: "Youth Mentorship - Rwanda",
      image: image21,
      linkedIn: "https://www.linkedin.com/in/bahati-musuhuke/",
      category: 'programs'
    },
    {
      id: 22,
      name: "Delice Kiracunda",
      title: "Girl Students' Representative - Rwanda",
      image: image22,
      category: 'programs'
    },
    {
      id: 23,
      name: "Kalisa Jacques",
      title: "Media & Marketing",
      image: image23,
      linkedIn: "https://www.linkedin.com/in/kalisa-j-0421b62b8/?originalSubdomain=be",
      category: 'operations'
    },
    {
      id: 24,
      name: "Fred Shyaka",
      credentials: "EIT",
      title: "Engineering Project - Africa",
      image: image24,
      linkedIn: "https://www.linkedin.com/in/shyaka-fred-1a2193260/",
      category: 'projects'
    },
    {
      id: 25,
      name: "Hodari R. Etienne",
      title: "Engineering Project - USA",
      image: image25,
      linkedIn: "https://www.linkedin.com/in/etienne-hodari-rwakibibi-0b0aa497/",
      category: 'projects'
    },
    {
      id: 26,
      name: "Amani Faustin",
      credentials: "MBA",
      title: "Youth Job Opportunity - Rwanda",
      image: image26,
      category: 'programs'
    },
    {
      id: 27,
      name: "Mupenzi Niyomugabo",
      title: "Vocational Training - Rwanda",
      image: image27,
      category: 'programs'
    },
    {
      id: 28,
      name: "Andy Bayingana",
      title: "Media & Storytelling",
      image: image28,
      linkedIn: "https://www.linkedin.com/in/bayingana-andy-0b776721a/",
      category: 'operations'
    },
    {
      id: 29,
      name: "Theoneste Habimana",
      credentials: "PMP, QS",
      title: "Engineering Project | M&E",
      image: image29,
      linkedIn: "https://www.linkedin.com/in/habi-theo-pmp-qs-ur23/",
      category: 'projects'
    },
    {
      id: 30,
      name: "Bosco S. Rusine",
      title: "Engineering Project - USA",
      image: image30,
      linkedIn: "https://www.linkedin.com/in/bosco-rusine-b21466171/",
      category: 'projects'
    }
  ];



  const TeamMemberModal: React.FC<{ member: TeamMember | null; onClose: () => void }> = ({ member, onClose }) => {
    if (!member) return null;

    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover object-top border-4 border-sky-600 shadow-xl"
              />
              <div className="text-center md:text-left flex-1">
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                  {member.name}
                  {member.credentials && (
                    <span className="text-2xl text-sky-600">, {member.credentials}</span>
                  )}
                </h2>
                <p className="text-xl text-gray-600 mb-4">{member.title}</p>

                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
                  >
                    LinkedIn Profile
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                Role & Responsibilities
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {member.title.includes('Founder') &&
                  "As Founder and Chief Executive Officer, Eric leads Engineers4Humanity's mission to empower refugees and underserved communities through education, engineering solutions, and servant leadership. With over 17 years of humanitarian service, he guides the organization's strategic vision and global operations."
                }
                {member.title.includes('Board Chair') && !member.title.includes('Vice') &&
                  "As Board Chair, provides strategic oversight and governance leadership to Engineers4Humanity, ensuring the organization remains aligned with its mission and achieves sustainable impact for refugee communities."
                }
                {member.title.includes('Vice Chair') && member.title.includes('Education') &&
                  "Serves as Board Vice Chair overseeing the Education Program, bringing decades of experience in refugee youth education, advocacy, and mentorship. Plays a cornerstone role in sponsoring students and financing vocational training initiatives."
                }
                {member.title.includes('Vice Chair') && member.title.includes('Engineering') &&
                  "Serves as Board Vice Chair responsible for the Engineering Program, providing technical leadership and strategic direction for all engineering initiatives across Africa and beyond."
                }
                {member.title.includes('Country Director') &&
                  "Oversees Engineers4Humanity operations in Rwanda, coordinating program implementation, managing local partnerships, and ensuring effective delivery of engineering and educational services throughout the country."
                }
                {member.title.includes('Chief of Operations') &&
                  "Manages operational excellence across all Engineers4Humanity programs in Africa, ensuring efficient coordination between teams, effective resource allocation, and successful project implementation."
                }
                {member.title.includes('Education Program Manager') &&
                  "Leads the education program initiatives across Africa, managing student sponsorships, coordinating with educational institutions, and ensuring quality delivery of educational support to refugee youth."
                }
                {member.title.includes('Engineering Program Manager') &&
                  "Directs engineering program activities in Africa, overseeing WASH projects, infrastructure development, and technical capacity building initiatives for underserved communities."
                }
                {member.title.includes('Finance & Accounting') &&
                  "Manages financial operations for Engineers4Humanity in Rwanda, ensuring transparent accounting practices, budget management, and financial reporting for all organizational activities."
                }
                {member.title.includes('Youth Mentorship') &&
                  "Provides guidance, support, and mentorship to young refugees, helping them navigate educational pathways, develop career skills, and achieve their full potential through one-on-one coaching and group programs."
                }
                {member.title.includes('Marketing') &&
                  "Develops and implements marketing strategies to increase awareness of Engineers4Humanity's mission, manages fundraising campaigns, and builds relationships with donors and partners."
                }
                {member.title.includes('Engineering Project') &&
                  "Works on engineering infrastructure projects including WASH systems, suspended bridges, and environmental protection initiatives, applying technical expertise to improve living conditions in refugee camps and rural communities."
                }
                {member.title.includes('Environmental Project') &&
                  "Implements environmental protection and sustainability initiatives, focusing on conservation, waste management, and eco-friendly solutions for refugee and rural communities in Africa."
                }
                {member.title.includes('Media') &&
                  "Captures and shares the stories of Engineers4Humanity's impact through multimedia content, managing social media presence, and creating compelling narratives that highlight the organization's work and the journeys of those it serves."
                }
                {member.title.includes("Girl Students' Representative") &&
                  "Advocates for and represents the needs and interests of female students in Engineers4Humanity programs, working to ensure equal access to educational opportunities and addressing challenges specific to young refugee women."
                }
                {member.title.includes('Youth Job Opportunity') &&
                  "Connects refugee youth with employment opportunities, manages job placement programs, and builds partnerships with employers to create pathways to economic self-reliance."
                }
                {member.title.includes('Vocational Training') &&
                  "Develops and delivers vocational training programs that equip refugee youth with practical, marketable skills in trades and technical fields, enabling economic independence."
                }
                {!member.title.includes('Founder') &&
                  !member.title.includes('Board') &&
                  !member.title.includes('Country Director') &&
                  !member.title.includes('Chief') &&
                  !member.title.includes('Manager') &&
                  !member.title.includes('Finance') &&
                  !member.title.includes('Youth') &&
                  !member.title.includes('Marketing') &&
                  !member.title.includes('Engineering') &&
                  !member.title.includes('Environmental') &&
                  !member.title.includes('Media') &&
                  !member.title.includes('Representative') &&
                  !member.title.includes('Job') &&
                  !member.title.includes('Vocational') &&
                  `Contributes essential expertise and dedication to Engineers4Humanity's mission as part of the ${member.title} team, working to empower refugees and underserved communities through sustainable development initiatives.`
                }
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-sky-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="font-semibold text-gray-900 capitalize">{member.category}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-semibold text-gray-900">
                  {member.title.includes('USA') ? 'United States' :
                    member.title.includes('Rwanda') ? 'Rwanda' :
                      member.title.includes('Africa') ? 'Africa' : 'Global'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800">
      <Header
        title="Engineers4Humanity Global Team"
        linkTitle="Management Team"
        linkHref="/management-team"
        backgroundImage={image}
      />

      {/* All Team Members - Single Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600 group"
              >
                <div className="h-64  flex justify-center items-center overflow-hidden">
                  <img
                src={member.image}
                alt={member.name}
                className="w-64 h-64 rounded-full object-cover object-top   shadow-xl"
              />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                    {member.credentials && (
                      <span className="text-lg text-sky-600">, {member.credentials}</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {member.title}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="flex-1 bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-sky-700 hover:to-green-700 transition-all text-sm"
                    >
                      View Profile
                    </button>
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Your Support Can Make a World of Difference
          </h2>
          <p className="text-xl mb-10 opacity-95">
            Whether through donations, volunteering, or spreading the word, you can help empower vulnerable communities.
          </p>
          <a
            href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE"
            className="inline-block bg-white text-sky-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
          >
            Donate Now
          </a>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700;800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ManagementTeamPage;