import React from 'react';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/home/image4.png';


const About = () => {
  return (
    <section className="py-20 bg-white font-sans text-gray-800">
      <div className="mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Engineers4Humanity's Inspiration
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              Engineers4Humanity is a registered <span className="font-semibold text-gray-900">501(c)(3) nonprofit organization</span> based in Texas, fostering resilience and self-reliance among displaced communities through education, engineering, and servant leadership.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Founded by <span className="font-semibold text-gray-900">Eric Kamanzi</span> — civil engineer, PMP, and former refugee — the organization has positively impacted more than <span className="font-bold text-green-600">2,000 young refugees</span> across East Africa and beyond.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-sky-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                    17+ Years of Impact
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Since 2008, we have been transforming lives through scholarships, vocational training, WASH engineering, and peacebuilding programs.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-800 transition-colors"
            >
              Learn More About Us →
            </Link>
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
  );
};

export default About;
