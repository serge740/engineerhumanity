import React, { useState } from 'react';
import { X, ExternalLink, Shield, Award, Users } from 'lucide-react';

interface BoardMember {
  id: number;
  name: string;
  title: string;
  credentials?: string;
  image: string;
  linkedIn?: string;
  role: 'chair' | 'vice-chair' | 'executive' | 'member';
  bio: string;
}

const BoardMembers: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  const boardMembers: BoardMember[] = [
    {
      id: 1,
      name: "Vin Hoey",
      credentials: "MBA",
      title: "Board Chair",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      linkedIn: "https://www.linkedin.com/in/vinhoey/",
      role: 'chair',
      bio: "As Board Chair, Vin Hoey provides strategic leadership and governance oversight to Engineers4Humanity. With his MBA background and extensive experience in organizational leadership, he guides the board in fulfilling its fiduciary responsibilities while ensuring the organization remains focused on its mission to empower refugees and underserved communities. His leadership helps shape the strategic direction of the organization and ensures accountability to stakeholders and the communities served."
    },
    {
      id: 2,
      name: "Frere Straton Malisaba",
      credentials: "M.Ed",
      title: "Board Vice Chair | Education Program",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
      role: 'vice-chair',
      bio: "Frere Straton Malisaba serves as Board Vice Chair with a special focus on the Education Program. A dedicated Catholic Church Marist brother who celebrated his 50th anniversary of service in 2024, Malisaba has been a cornerstone of Engineers4Humanity's achievements. For over two decades, he has played a pivotal role in refugee youth education, advocating tirelessly for young refugees, sponsoring high school students, and financing vocational training. His deep commitment to education and his profound understanding of the challenges faced by refugee communities make him an invaluable leader on the board. The organization is deeply grateful for his unwavering dedication and partnership."
    },
    {
      id: 3,
      name: "Theo Karegesa Kivuye",
      credentials: "MEng",
      title: "Board Vice Chair | Engineering Program",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      role: 'vice-chair',
      bio: "Theo Karegesa Kivuye serves as Board Vice Chair overseeing the Engineering Program. With his Master's in Engineering (MEng), he brings critical technical expertise and strategic vision to Engineers4Humanity's engineering initiatives. He provides leadership and guidance for all engineering projects across Africa, including WASH (Water, Sanitation, and Hygiene) systems, infrastructure development, and sustainable engineering solutions. His role ensures that the organization's engineering programs maintain the highest standards of quality and effectiveness while addressing the most pressing needs of refugee and underserved communities."
    },
    {
      id: 4,
      name: "Eric Kamanzi",
      credentials: "PMP, PE, MSc",
      title: "Founder & Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      linkedIn: "https://www.linkedin.com/in/eric-kamanzi-pmp/",
      role: 'executive',
      bio: "Eric Kamanzi is the visionary Founder and Chief Executive Officer of Engineers4Humanity. A refugee/immigrant from the Democratic Republic of Congo, Eric is a father, #1 best-selling author, philanthropist, and civil engineer with a Master's degree in Engineering Project Management and Global Sustainability. His passion for humanitarian work stems from his father's legacy and his own life experiences as a refugee in East Africa. With over 17 years of dedicated service in refugee communities, Eric has committed his life to building a better world free from discrimination and violence, advancing sustainable solutions for those affected by conflict and displacement through comprehensive capacity-building programs. His mentorship and education programs have transformed the lives of hundreds of refugees in East Africa and America. Eric's life vision is 'Living a happy and impactful life,' and he believes deeply that education is the key to unlocking potential and creating lasting change."
    },
    {
      id: 5,
      name: "Japhet Habinshuti",
      credentials: "PEng, MSc",
      title: "Board Member",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      linkedIn: "https://www.linkedin.com/in/japheth-habinshuti-n-430a54100/",
      role: 'member',
      bio: "Japhet Habinshuti serves as a Board Member, bringing his professional engineering credentials (PEng) and Master of Science degree to the governance of Engineers4Humanity. His technical expertise and professional experience contribute significantly to the board's ability to oversee the organization's engineering programs and ensure they meet the highest professional standards. As a board member, he participates in strategic decision-making, provides technical guidance, and helps ensure that the organization's engineering initiatives are executed with excellence and integrity. His commitment to the mission of empowering refugee communities through sustainable engineering solutions makes him a valuable member of the governance team."
    },
    {
      id: 6,
      name: "J. Baptist Ndahiriwe",
      credentials: "MPH",
      title: "Board Member",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      linkedIn: "https://www.linkedin.com/in/j-baptist-ndahiriwe-5691096a/",
      role: 'member',
      bio: "J. Baptist Ndahiriwe brings his Master of Public Health (MPH) expertise to the Engineers4Humanity Board of Directors. His background in public health provides crucial perspective on the organization's WASH (Water, Sanitation, and Hygiene) programs and other health-related initiatives that serve refugee and underserved communities. As a board member, he helps ensure that the organization's programs are designed and implemented with a strong understanding of public health principles and community health needs. His expertise is particularly valuable in guiding the organization's efforts to improve health outcomes through sustainable infrastructure and educational programs. He contributes to strategic planning and helps the board fulfill its governance and advisory responsibilities."
    },
    {
      id: 7,
      name: "Joseph Masengesho",
      credentials: "MBA",
      title: "Board Member",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80",
      linkedIn: "https://www.linkedin.com/in/joseph-mboneza-masengesho-45373842/",
      role: 'member',
      bio: "Joseph Masengesho serves on the Engineers4Humanity Board of Directors, contributing his MBA expertise and business acumen to the organization's governance. His background in business management and strategic thinking helps guide the organization in areas of operational efficiency, financial sustainability, and organizational development. As a board member, he participates actively in strategic planning, helps ensure sound fiscal management, and contributes to the development of sustainable business models that support the organization's humanitarian mission. His commitment to the vision of empowering refugees and underserved communities through education and sustainable development makes him an essential part of the board's leadership team."
    }
  ];

  const BoardMemberModal: React.FC<{ member: BoardMember | null; onClose: () => void }> = ({ member, onClose }) => {
    if (!member) return null;

    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full my-8 relative">
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 mt-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <img
                src={member.image}
                alt={member.name}
                className="w-56 h-56 rounded-full object-cover border-4 border-sky-600 shadow-2xl"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-4xl font-bold text-gray-900 mb-2">
                  {member.name}
                  {member.credentials && (
                    <span className="text-3xl text-sky-600">, {member.credentials}</span>
                  )}
                </h2>
                <p className="text-2xl text-gray-600 mb-6">{member.title}</p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                  <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold capitalize flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {member.role.replace('-', ' ')}
                  </div>
                  {member.role === 'chair' && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Leadership
                    </div>
                  )}
                </div>

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

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-sky-50 to-green-50 p-8 rounded-2xl border-l-4 border-sky-600">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-7 h-7 text-sky-600" />
                  Role & Impact
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {member.bio}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-sky-600 text-center">
                  <p className="text-sm text-gray-600 mb-2">Position</p>
                  <p className="font-bold text-gray-900 text-lg">{member.title}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-600 text-center">
                  <p className="text-sm text-gray-600 mb-2">Credentials</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {member.credentials || 'Board Member'}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-sky-600 text-center">
                  <p className="text-sm text-gray-600 mb-2">Expertise</p>
                  <p className="font-bold text-gray-900 text-lg capitalize">
                    {member.role === 'chair' && 'Governance'}
                    {member.role === 'vice-chair' && member.title.includes('Education') && 'Education'}
                    {member.role === 'vice-chair' && member.title.includes('Engineering') && 'Engineering'}
                    {member.role === 'executive' && 'Executive Leadership'}
                    {member.role === 'member' && member.credentials?.includes('PEng') && 'Engineering'}
                    {member.role === 'member' && member.credentials?.includes('MPH') && 'Public Health'}
                    {member.role === 'member' && member.credentials?.includes('MBA') && 'Business'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getRoleCategory = (role: string) => {
    switch (role) {
      case 'chair':
        return { label: 'Board Leadership', members: boardMembers.filter(m => m.role === 'chair') };
      case 'vice-chair':
        return { label: 'Board Vice Chairs', members: boardMembers.filter(m => m.role === 'vice-chair') };
      case 'executive':
        return { label: 'Executive Leadership', members: boardMembers.filter(m => m.role === 'executive') };
      case 'member':
        return { label: 'Board Members', members: boardMembers.filter(m => m.role === 'member') };
      default:
        return { label: 'Board Members', members: [] };
    }
  };

  const categories = ['chair', 'vice-chair', 'executive', 'member'];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 to-green-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Shield className="w-16 h-16" />
            <h1 className="font-serif text-5xl md:text-6xl font-bold">
              Board Members
            </h1>
          </div>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95">
            Below are the Engineers4Humanity Board Members providing an advisory, governance, and networking role to achieve the organization's mission
          </p>
        </div>
      </section>

      {/* Board Members by Role */}
      {categories.map((categoryKey) => {
        const category = getRoleCategory(categoryKey);
        if (category.members.length === 0) return null;

        return (
          <section key={categoryKey} className="py-20 bg-white even:bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-center gap-3 mb-12">
                <Award className="w-10 h-10 text-sky-600" />
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 text-center">
                  {category.label}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {category.members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600 group"
                  >
                    <div className="h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      {member.credentials && (
                        <p className="text-lg text-sky-600 font-semibold mb-3">
                          {member.credentials}
                        </p>
                      )}
                      <p className="text-gray-600 mb-6">
                        {member.title}
                      </p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="flex-1 bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-green-700 transition-all"
                        >
                          View Full Profile
                        </button>
                        {member.linkedIn && (
                          <a
                            href={member.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Governance Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 text-center">
              Board Governance & Advisory Role
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  Governance
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Providing strategic oversight and ensuring accountability to stakeholders and the communities we serve
                </p>
              </div>
              <div className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  Advisory
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Offering expert guidance on programs, strategy, and operations to maximize impact for refugee communities
                </p>
              </div>
              <div className="p-6">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  Networking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Leveraging connections and partnerships to expand opportunities and resources for the organization's mission
                </p>
              </div>
            </div>
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
        <BoardMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700;800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default BoardMembers;