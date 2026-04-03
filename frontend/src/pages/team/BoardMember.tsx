import React, { useState } from 'react';
import { X, ExternalLink, Shield, Award, Users } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

// team member

import image1 from '../../assets/team/board/image1.png'
import image2 from '../../assets/team/board/image2.png'
import image3 from '../../assets/team/board/image3.png'
import image4 from '../../assets/team/board/image4.png'
import image5 from '../../assets/team/board/image5.png'
import image6 from '../../assets/team/board/image6.png'
import image7 from '../../assets/team/board/image7.png'

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
      image: image1,
      linkedIn: "https://www.linkedin.com/in/vinhoey/",
      role: 'chair',
      bio: "Vin Hoey serves as Board Chair of Engineers4Humanity, bringing decades of high-level experience in nonprofit governance, strategic planning, and organizational leadership. As Managing Director of Strategic4sight, he advises mission-driven organizations on strategy, marketing, leadership development, and board effectiveness.\n\nA dedicated Christian philanthropist and proud grandfather, Vin is deeply committed to serving refugees, vulnerable youth, and people experiencing homelessness. Vin has served on the boards of 25 nonprofits, chaired 10, and cofounded four, giving him exceptional depth in nonprofit governance and organizational development.\n\nHis compassion-driven service aligns directly with Engineers4Humanity's mission to restore dignity, expand opportunity, and build pathways to self-reliance for displaced and underserved communities. His extensive network across philanthropy, corporate leadership, and global nonprofit circles strengthens Engineers4Humanity's ability to build partnerships and mobilize resources for refugee self-reliance, job creation, and vocational training programs in Rwanda and East Africa.\n\nVin's global corporate background includes serving as Global Marketing Communications Manager for ExxonMobil Chemical and leading communications across Europe, Africa, and the Middle East from Brussels. He also teaches Nonprofit Marketing Strategies at the SMU Cox Graduate School of Business and has taught at SMU and DePauw University.\n\nAs Board Chair of Engineers4Humanity, Vin plays a pivotal role in strategic networking, donor engagement, and fundraising, helping expand refugee self-reliance, job creation, and vocational training programs across Rwanda and East Africa. His leadership strengthens the board's effectiveness, ensures strong governance, and supports the organization's long-term vision of engineering dignity and opportunity for all."
    },
        {
      id: 2,
      name: "Eric Kamanzi",
      credentials: "PMP, PE, MSc",
      title: "Founder & Chief Executive Officer",
      image: image2,
      linkedIn: "https://www.linkedin.com/in/eric-kamanzi-pmp/",
      role: 'executive',
      bio: "Eric Kamanzi is the Founder & CEO of Engineers4Humanity and a member of the United Nations Association of the United States of America (UNAUSA), Dallas Chapter. Born in the DRC Congo and raised in a refugee camp in Rwanda as an orphan and survivor of violence, Eric transformed a life of hardship into a mission of hope, dignity, and opportunity for displaced communities. His journey from refugee camp to humanitarian engineer is captured in his #1 bestselling book Breaking Boundaries.\n\nEric's purpose was shaped by his father, Rusine, an elementary school teacher and community servant who taught him self-reliance, generosity, and the responsibility to lift others; and inspired by his spiritual mentors: The Purpose Driven Life by Pastor Rick Warren, The Power of Hope by Joyce Meyer, the Bible and many other human right activists which awakened his conviction that every life has meaning. These influences formed his lifelong message: \"Never Give Up. Never Lose Hope. God knows your name\".\n\nFor 17 years, Eric has led transformative initiatives for refugees, including co-founding Forum Amis de la Paix (2008) and establishing Hope School (2009), which enabled more than 500 high school graduates and 100 university students. In 2020, he founded Engineers4Humanity Consultancy and the Engineers4Humanity Technical & Innovation Hub Center—addressing today's urgent need for vocational training, climate-smart engineering, WASH solutions, and youth employment.\n\nA Civil Engineer and PMP-certified professional, Eric has led 100+ construction projects and serves as a Special Inspector at DFW International Airport. He is an active member of the National Society of Professional Engineers, RAPEPRwanda, PMI, Engineers Without Borders–USA, and the Institute of Engineers Rwanda.\n\nThrough Engineers4Humanity, Eric has impacted 100,000+ refugees and 2,000+ youth, championing dignity, self-reliance, and community-driven development."
    },
    {
      id: 3,
      name: "Brother Malisaba Straton",
      credentials: "M.Ed",
      title: "Board Vice Chair | Education Program",
      image: image3,
      role: 'vice-chair',
      bio: "Brother Malisaba Straton is a Marist brother, experienced educator and humanitarian leader whose five decades of service have strengthened schools and communities across East Africa (Rwanda, the DRC, Tanzania and Kenya) and with global network in education in the USA and Europe. As Board Vice Chair in charge of Education at Engineers4Humanity, he guides the organization's strategy for refugee education, school partnerships, and youth empowerment.\n\nBrother Straton has led and transformed numerous institutions, including Byimana School of Science—where he introduced Rwanda's first wireless internet in a public school—and Rwabuye Technical School, which he revitalized from 90 to 300 students within three years. His leadership has consistently combined academic excellence, financial discipline, and a deep commitment to student wellbeing.\n\nHe served as Deputy Provincial Superior of the Marist Brothers in Central and East Africa, supervised major school infrastructure projects, and held governance roles in national companies. A trained human rights educator, he has participated in international workshops in Geneva and has been a strong advocate for child protection and refugee learners.\n\nThrough partnerships with Forum Amis de la Paix and Engineers4Humanity, Brother Straton has helped refugee students access quality boarding schools, vocational training, mentorship, and long-term academic support. His lifelong dedication to education and human dignity continues to shape the next generation of leaders across East and Central Africa."
    },
    {
      id: 4,
      name: "Theo Karegesa Kivuye",
      credentials: "MEng",
      title: "Board Vice Chair | Engineering Program",
      image: image4,
      role: 'vice-chair',
      bio: "Karegesa Muyango is an engineering leader and former refugee whose professional journey fuels his commitment to empowering young refugee engineers. As Vice Chair of Engineering at Engineers4Humanity, he guides the organization's technical programs, WASH initiatives, environmental protection projects, and job-creation pathways for displaced youth.\n\nWith a background in Chemistry and Mechanical Engineering from the American University in Cairo, Karegesa has built a diverse career across logistics, mining, hydropower, industrial installations, and public health engineering. His work includes rainwater harvesting systems for vulnerable families, effluent and wastewater management, dumpsite stabilization, and major environmental restoration projects across Rwanda.\n\nA dedicated mentor, he supports internship placement, technical apprenticeships, and career guidance for refugee engineers, helping them transition into meaningful employment. His humanitarian service spans rehabilitation support for war-injured veterans, artificial limb procurement, and fire-engine training in partnership with Japan.\n\nKaregesa champions engineering as a pathway to dignity, resilience, and sustainable peace."
    },

    {
      id: 5,
      name: "Japhet Habinshuti",
      credentials: "PEng, MSc",
      title: "Board Member",
      image: image5,
      linkedIn: "https://www.linkedin.com/in/japheth-habinshuti-n-430a54100/",
      role: 'member',
      bio: "Japhet is a leading Urban Planning and Climate Resilience expert with over 13 years of experience delivering high-impact, community-centered solutions across Sub-Saharan Africa. His work has mobilized tens of millions of dollars in climate adaptation, gender equity, and urban resilience investments—directly improving the lives of vulnerable communities, including informal settlement residents, women, youth, and climate-exposed households.\n\nHe currently serves with the World Resources Institute (WRI) as a key implementer of the Africa Climate Resilient Cities Program, where he leads the US $22 million SUNCASA initiative, reducing flood risk for more than 2 million people across Rwanda, Ethiopia, and South Africa. His leadership has shaped Kigali's first Urban Resilience Roadmap, secured major climate finance through the World Bank's Gap Fund, and advanced gender-responsive mobility, digital inclusion, and post-COVID recovery programs.\n\nJaphet's career includes influential roles with the World Bank, the Global Covenant of Mayors, the Resilient Cities Network, UNESCO, and Rwanda's Natural Resources Authority. Across these institutions, he has built a reputation for turning policy into practice, strengthening local government capacity, and designing nature-based and GESI-responsive solutions that deliver measurable, scalable impact.\n\nAs a Board Member of Engineers4Humanity, Japhet brings strategic leadership in climate adaptation, urban resilience, inclusive planning, and climate finance mobilization. His expertise directly strengthens the organization's mission to equip refugees and host communities with engineering skills, infrastructure solutions, and dignified opportunities needed to thrive in the face of climate and economic shocks."
    },
    {
      id: 6,
      name: "Joseph Masengesho",
      credentials: "MBA",
      title: "Board Member",
      image: image6,
      linkedIn: "https://www.linkedin.com/in/joseph-mboneza-masengesho-45373842/",
      role: 'member',
      bio: "Joseph Masengesho is an experienced project management professional (MBA) with nearly 14 years of experience advancing youth employment, entrepreneurship, and vocational skills development across Rwanda. His work with leading international development agencies—including AFD/Expertise France, APEFE, and DOT Rwanda—has focused on empowering vulnerable youth, women, and people with disabilities through TVET training, dual apprenticeship systems, and private-sector–driven job creation.\n\nJoseph has coordinated multi-stakeholder programs that strengthen TVET–industry collaboration, build the capacity of trainers and SMEs, and expand access to skills training and workplace integration for disadvantaged groups. He has led teams, managed project resources, and delivered large-scale training initiatives that have equipped thousands of young people with practical skills for employment and entrepreneurship.\n\nCurrently serving as Manager for Entrepreneurship, Employment, and Private Sector Engagement under the AFD/Expertise France AFTER I & II Projects, Joseph oversees the design and implementation of workforce development interventions, employer engagement strategies, and capacity-building programs for national TVET institutions.\n\nAs a Board Member of Engineers4Humanity, Joseph brings deep expertise in vocational training systems, youth workforce development, and inclusive job creation. His leadership strengthens Engineers4Humanity's mission to equip refugees and host communities with market-relevant skills, expand pathways to dignified employment, and build resilient livelihoods through engineering and technical education."
    },
    {
      id: 7,
      name: "J. Baptist Ndahiriwe",
      credentials: "MPH",
      title: "Board Member",
      image: image7,
      linkedIn: "https://www.linkedin.com/in/j-baptist-ndahiriwe-5691096a/",
      role: 'member',
      bio: "Ndahiriwe is a senior health systems consultant with over 20 years of experience across clinical practice, academia, regulation, and health policy in Rwanda and the East African region. He has led major national and regional initiatives focused on strengthening health workforce standards, accreditation systems, institutional governance, and quality assurance expertise that directly supports Engineers4Humanity's Public Health Engineering mission.\n\nWith deep experience in developing scopes of practice, training standards, accreditation frameworks, and compliance audits, he brings a strong foundation for improving the quality and safety of community-level health and WASH services. His leadership in curriculum development, education harmonization, and higher education quality assurance aligns with Engineers4Humanity's commitment to delivering high-quality vocational training and expanding job creation pathways for refugee and host communities.\n\nNdahiriwe has served on high-level Ministry of Health technical committees, regulatory councils, and university governance structures, and has contributed to major health systems strengthening projects, including serving as Technical Lead for the HSS NEXT project. He currently consults with Building Systems for Health on a Gates Foundation–funded Primary Health Care Performance Management initiative in Rwanda and Ghana.\n\nHe holds bachelor's degrees in Diagnostic Imaging and Pharmaceutical Sciences, a master's degree in medical Imaging, and Master of Public Health in Global Health. Fluent in English and French, he brings strong strategic, analytical, and governance expertise to the Board of Engineers4Humanity."
    },
    
  ];

  const BoardMemberModal: React.FC<{ member: BoardMember | null; onClose: () => void }> = ({ member, onClose }) => {
    if (!member) return null;

    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-3xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 mt-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover object-top border-4 border-sky-600 shadow-lg"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                  {member.credentials && (
                    <span className="text-xl text-sky-600">, {member.credentials}</span>
                  )}
                </h2>
                <p className="text-lg text-gray-600 mb-4">{member.title}</p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <div className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-semibold capitalize flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {member.role.replace('-', ' ')}
                  </div>
                  {member.role === 'chair' && (
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Leadership
                    </div>
                  )}
                </div>

                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
                  >
                    LinkedIn Profile
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-50 to-green-50 p-5 rounded-xl border-l-4 border-sky-600">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                Role & Impact
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="font-sans text-gray-800">
      <Header
        title="Board Members"
        linkTitle="Board Members"
        linkHref="/board-members"
        backgroundImage={image}
      />

      {/* All Board Members - Single Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600 group"
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
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