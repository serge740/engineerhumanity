import React from 'react';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import image1 from '../../assets/home/image1.png';
import image2 from '../../assets/home/image3.png';


const About = () => {
  return (
    <div className="font-sans text-gray-800">
 

      {/* Inspiration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Engineers4Humanity's Inspiration
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Engineers4Humanity is a registered <span className="font-semibold text-gray-900">501(c)(3) nonprofit organization</span> based in Texas, fostering resilience and self-reliance among displaced communities.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Engineers4Humanity supports its affiliated organization, the <span className="font-semibold text-gray-900">Engineers4Humanity Consultancy</span>, a social enterprise founded in 2020 in Kigali, Rwanda.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 text-sky-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                      Impact Achievement
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      More than <span className="font-bold text-green-600">2,000 young refugees</span> have been positively impacted by our humanitarian activities in East Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={image1}
                alt="Community Impact"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src={image2}
                alt="Eric Kamanzi"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-10 h-10 text-sky-600" />
                <h2 className="font-serif text-4xl font-bold text-gray-900">
                  Meet Our Founder
                </h2>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-sky-600">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Eric Kamanzi
                </h3>
                <p className="text-sm font-semibold text-sky-600 mb-4">
                  Founder & CEO, Engineers4Humanity
                </p>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    A professional <span className="font-semibold">civil engineer</span>, <span className="font-semibold">Project Management Professional</span>, <span className="font-semibold">environmental expert</span>, and <span className="font-semibold">philanthropist</span> with a master's degree in engineering project management and global sustainability.
                  </p>
                  
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <Heart className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p>
                      Over <span className="font-bold text-gray-900">15 years of experience</span> in humanitarian efforts and the engineering industry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-sky-50 to-green-50 p-6 rounded-xl border-l-4 border-green-600">
                <p className="text-gray-700 leading-relaxed italic">
                  "Inspired by his personal journey as a former refugee and his commitment to community advocacy, Eric established the Engineers4Humanity Consultancy in Rwanda to address critical gaps in education, refugee youth unemployment, public health engineering, water and sanitation services, environmental protection, and youth development within refugee and host communities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-sky-600 to-green-600 text-white p-10 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Eye className="w-12 h-12" strokeWidth={1.5} />
                <h2 className="font-serif text-3xl font-bold">Our Vision</h2>
              </div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Our vision is to <span className="font-bold">inspire a brighter future for all</span> by advocating and empowering refugees and underserved communities.
                </p>
                <p>
                  We strive to achieve this through sustainable, innovative engineering solutions and by engaging leaders and decision-makers to improve refugees' well-being and create lasting, impactful solutions that build peace in the region, enabling future generations to thrive in their homeland.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white border-4 border-sky-600 p-10 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12 text-sky-600" strokeWidth={1.5} />
                <h2 className="font-serif text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Enhancing education & vocational skills development
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Fostering self-reliance through job creation and entrepreneurship
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Advancing engineering solutions for environmental protection, water, sanitation, and hygiene services
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Encouraging servant leadership and peacebuilding in the East African region
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Highlight Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
                alt="Emmanuel Seba visiting students"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
              <p className="text-sm text-gray-600 italic mt-4 text-center">
                "Mr. Emmanuel Seba, one of our Alumnae currently in charge of the Education Program, visiting sponsored students."
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-10 h-10 text-green-600" />
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  Our Team's Impact
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team is composed of dedicated individuals who understand firsthand the challenges faced by refugee communities. Many of our staff members are alumni of our programs, now giving back to help the next generation.
              </p>

              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-600">
                <h4 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  Education Program Leadership
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Led by Emmanuel Seba, our education program continues to create pathways to success for hundreds of students each year, ensuring every young person has the opportunity to reach their full potential.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-sky-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Students Sponsored</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-green-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-sky-600 mb-1">2,000+</div>
                  <div className="text-sm text-gray-600">Lives Changed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-10 opacity-95">
            Together, we can create lasting change for refugees and underserved communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="inline-block bg-white text-sky-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Support Our Mission
            </a>
            <a
              href="#contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-sky-600 transition-all"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>

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

export default About;