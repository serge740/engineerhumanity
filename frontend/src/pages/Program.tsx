import React from 'react';
import image from '../assets/image6.jpg'
import Header from "../components/Header";



function Program() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Programs"
        linkTitle="Programs"
        linkHref="/programs"
        backgroundImage={image}
      />



      {/* Overview Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">OVERVIEW</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Engineers4Humanity addresses critical needs through education, public health engineering, and capacity-building programs.
          </p>
          <p className="text-lg text-gray-700">
            We aim to build a better world for everyone through innovative engineering solutions. Promoting self-reliance and sustainable livelihood among refugees, migrants, and underserved communities.
          </p>
        </div>
      </div>

      {/* Recent Highlights */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Eric attended International Conference and Expo on Resilient City, and disasters management, held in Houston-Texas, 2025"
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Eric with President of Engineers without Borders Manuel Calderon, Matthew Craig and other fellow members of North Texas -EWB during fundraising event to support community Water Supply Projects"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Public Health Engineering Program */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-8xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Public Health Engineering</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  As an engineering humanitarian organization, Engineers4Humanity aims to address vital public health engineering issues in refugee camps, urban areas, and rural areas in underdeveloped African countries by providing water, improved sanitation, waste management solutions, and support for clean energy projects.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop"
                  alt="Water Engineering"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 italic mt-2 text-center">"Clean water infrastructure bringing hope to underserved communities"</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our projects include support for disaster emergency preparedness, environmental protection, and enhanced public safety in Texas through partnerships with the Government, the Private sector, Civil society organizations, and the community.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              For Africa and other rural areas, we focus on designing affordable water supply systems, constructing proper sanitation facilities, transforming waste into renewable energy sources, and using available natural resources to serve the community.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=300&fit=crop"
                  alt="Community Water Project"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 italic mt-2 text-center">"Community members accessing safe, clean water from new water supply systems"</p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=300&fit=crop"
                  alt="Sanitation Facilities"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 italic mt-2 text-center">"Modern sanitation facilities improving health and dignity in refugee camps"</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Outcomes:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Engineers4Humanity Consultancy (EHC Ltd) is an officially registered environmental and social safeguarding firm in East Africa, led by licensed environmental experts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Conducted 100+ environmental and social safeguarding studies, including a study on a project benefiting the Gihembe Refugee camp in Gicumbi and the Mahama Refugee camp in Kirehe District.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Supported in disaster emergencies and the public safety community outreach program, and organized different training for refugee youth.</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Support the WASH project to promote sustainable waste management practices that protect the environment, improve hygiene, and reduce waterborne diseases in refugee camps and rural areas.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Support and conduct community outreach and awareness campaigns on public safety and disaster preparedness.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Support the SDG implementation program in Africa and Texas.</span>
                </li>
              </ul>
            </div>

            <a
              href="https://e4hinitiative.org/apply-for-paid-training/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
            >
              Apply for Paid Training
            </a>
          </div>
        </div>
      </div>

      {/* Education Program */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-blue-700 mb-6">Education Program</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Engineers4Humanity provides formal education and vocational skills development scholarships to young refugees in various trades. Equipping them with practical skills empowers them to find jobs and become financially independent.
                  </p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop"
                    alt="Education Program"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Empowering refugee youth through quality education and STEM scholarships"</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                In the African refugee camps- Rwanda, we are dedicated to fostering growth and opportunity by offering high school and university scholarships focused on STEM fields. By collaborating with partner organizations and government of Rwanda, we provide valuable vocational training for refugee youth, equipping them with the essential skills for success in the job market. This approach not only enhances their individual prospects but also benefits their communities.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                In the USA, our program aggressively targets partnerships with government agencies, academic institutions, universities, the City ISD, and refugee resettlement agencies to ensure that refugee youth receive the education they deserve.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We actively conduct community outreach campaigns, engage directly with youth, and offer mentorship and career guidance to empower them with essential information about scholarships and universities. We assert that an educated community is crucial for advancing national development and integrating successfully into American society. Education serves as a powerful catalyst for change, driving progress and making a significant impact both locally and globally.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Outcomes:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>We are providing high school scholarships and vocational short-course training for young refugees in Rwanda, and 250 refugee students completed vocational training and found employment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Through advocacy and partnership, 2000+ refugee students have completed high school and have seen their lives change.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Conducted mentorship activity to inspire Refugee youth/immigrants to pursue education, especially STEM & vocational careers.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Mobilize High School and university Scholarships in STEM and Vocational Training.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Partnership with universities and colleges worldwide to offer refugee scholarships.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Partnership with an international e-learning platform to provide scholarships for refugee students.</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://e4hinitiative.org/apply-for-education-scholarships-empower-your-copy/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
              >
                For Refugee Youth - Apply for Education Scholarships
              </a>

              {/* Education Images */}
              <div className="mt-10 grid md:grid-cols-3 gap-6">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop"
                    alt="Students in classroom"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Students engaged in interactive STEM learning activities"</p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop"
                    alt="Graduation ceremony"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Celebrating academic achievements and new beginnings"</p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
                    alt="Student mentorship"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"One-on-one mentorship guiding students toward success"</p>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mt-10 grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "Chief of Operations, Mr Innocent and Muneza visited some of our students at ETEKA-Kabgayi, 2025"
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "Some of the Alumnae graduated from the University, with bachelor's and master's degrees. From right is Mr. Emmanuel Sebagisha, Musuhuke Bahati, with his classmate."
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "Eric, Malisaba and Fred, Meeting with some of the beneficiary women whose children are sponsored by the Engineers4Humanity Education Program, Gihembe Refugee Camp 2020"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineers4Humanity Institute */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-8xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Engineers4Humanity Institute</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Responding to the scarcity of jobs, the unemployment issue among refugee /immigrant youth, and the gap between industry and skilled labor, we observed that it is necessary to establish career paths for young people and those who need to change careers or upgrade their skills to meet the labor market's needs.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Vocational Training"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 italic mt-2 text-center">"Hands-on vocational training preparing youth for skilled careers"</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Engineers4Humanity Institute is an e-learning platform that will serve as a skill development, research, and innovation hub, providing affordable, accessible education to vulnerable youth, primarily refugees worldwide.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This Institute serves as a center of excellence and a career-path program that helps refugees, Immigrants, and vulnerable youth acquire the tools and skills needed to break the cycle of poverty and become self-reliant.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We are committed to collaborating with career development centers, the construction industry, academia, the private sector, and the government to transform refugee youth and immigrants into a highly skilled, competitive workforce that excels globally and contributes positively to national development.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 italic mb-4">
                "Instructor Mapendo with the Engineers4Humanity Vocational Training Short Course trainees, Gihember 2020."
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Area:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Engineering and Technical Skills Development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Project Management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Leadership & Interpersonal skills development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Entrepreneurship and Finance Literacy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Environmental protection & disaster management</span>
                </li>
              </ul>
            </div>

            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
            >
              Log in to our e-Learning Portal here
            </a>
          </div>
        </div>
      </div>

      {/* Leadership & Peace Building Program */}
      <div className="bg-gradient-to-br from-green-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-green-700 mb-6">Leadership & Peace Building Program</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    We have boldly confronted the challenges of conflict and are passionately dedicated to advancing peacebuilding efforts throughout East Africa and beyond.
                  </p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop"
                    alt="Community Leadership"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Community leaders working together for peace and sustainable development"</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Promote peacebuilding through research, launch impactful community outreach campaigns, and actively engage leaders, youth, women, policymakers, and decision-makers to confront the root causes of the conflict. Our goal is to develop innovative and sustainable solutions that will establish lasting peace in the East African region and beyond.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are committed to uplifting African youth and women and transforming them into servant leaders and passionate advocates for sustainable peace. We inspire them to foster positive change within their communities by equipping them with the essential tools and knowledge they need.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our collaborative partnerships with the USA, the African Union, and regional organizations such as SADC and EAC are essential in our pursuit of an Africa we want that is free from discrimination and violence. Together, we can illuminate the path toward a brighter, more harmonious future for all, as outlined in SDG 2030.
              </p>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 italic">
                  "Eric Kamanzi, a keynote Speaker at Northwest Community Center-Dallas, sharing refugee story and resilience journey"
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Empower youth & women through peacebuilding initiatives and promote cohabitation and coexistence among communities through organized festivals, Youth Summer Camps, debates, Essay Competitions, and peacebuilding initiatives.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Conduct research on the root causes of conflict and identify sustainable solutions at the regional and global levels.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Collaborate with the UN, AU, Government, civil society organizations, faith-based organizations /Churches, Academic and youth institutions in promoting peacebuilding in the region by supporting the demobilization and capacity-building of youth and women.</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://e4hinitiative.org/support-our-mission-sponsorship-partnership-form/"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
              >
                For Sponsors - Support Our Mission – Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Entrepreneurship Program */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-8xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">ENTREPRENEURSHIP PROGRAM</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Engineers4Humanity Consultancy</h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  Engineers4Humanity Consultancy is a social enterprise registered in East Africa, dedicated to delivering a dynamic range of Engineering consultancy services, social-environmental study consultancy, education & skills development services.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop"
                  alt="Business Consulting"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 italic mt-2 text-center">"Professional consultancy services driving social enterprise and community development"</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Engineers4Humanity Consultancy is a skills development hub that transforms unskilled young people, primarily refugees and underserved communities in Rwanda, into competent, skilled technicians through hands-on training, career guidance, and an entrepreneurship incubation process. This results in job creation and the socioeconomic transformation of the community.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our social entrepreneurship approach aims to create a profound and lasting impact in Africa and globally. As a proudly registered firm specializing in engineering, environmental services, and social safeguarding in East Africa, we are determined to make a significant difference in the lives of the communities we serve, championing progress and resilience at every turn.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We have a skilled, experienced, committed, and competent team of engineers, environmental experts, and Real Estate and social environmental experts ready to serve you across Africa.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 italic">
                "Eric Kamanzi attended 2 days of training & Expo on Resilient City and disaster preparedness."
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1">•</span>
                  <span>Engineering & Construction Services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1">•</span>
                  <span>Project management & Business study consultancy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1">•</span>
                  <span>Public health engineering & environmental Service</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4 leading-relaxed">
                At Engineers4Humanity, we are actively contributing to the realization of the African Agenda 2063 and the SDGs 2030 through engineering projects. Attracting International investors, youth capacity building, and transferring knowledge and skills. We strive to unlock the continent's boundless potential and drive meaningful change for a brighter, more prosperous future.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Guided by the principles of self-reliance and the desire to create meaningful job opportunities for vulnerable communities, refugee, and immigrant youth, we are excited to establish the Engineers4Humanity Consultancy- USA.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                This initiative aims to empower refugees and foster positive development within the country, creating a constructive pathway for integration and growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our comprehensive consultancy offerings focus on engineering, construction, project management, and environmental studies. These services will create valuable job opportunities for trainees from the Engineers4Humanity Institute by collaborating with civil society organizations, government agencies, and private-sector companies in the construction industry.
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800 mb-4">
                Join us as we embark on this journey to make a meaningful impact together!
              </p>

              {/* Entrepreneurship Images */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop"
                    alt="Engineering Projects"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Innovative engineering solutions transforming communities across Africa"</p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=300&fit=crop"
                    alt="Construction Management"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Construction projects creating jobs and building sustainable infrastructure"</p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop"
                    alt="Team Collaboration"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 italic mt-2 text-center">"Collaborative teamwork driving entrepreneurship and economic empowerment"</p>
                </div>
              </div>

              <a
                href="https://e4hinitiative.org/job-seekers-apply-for-employment-opportunity/"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
              >
                For Job Seekers - Apply for Employment Opportunity
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Program;