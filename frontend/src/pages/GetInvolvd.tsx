import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import image from '../assets/image6.jpg'
import donateImage from '../assets/image1.jpg'
import volunteerImage from '../assets/image2.jpg'
import partnerImage from '../assets/image3.jpg'
import careerImage from '../assets/image4.jpg'
import scholarshipImage from '../assets/image5.jpg'

import Header from "../components/Header";

const GetInvolved = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const opportunities = [
    {
      id: 1,
      title: "Donate",
      description: "Your financial contributions are vital to the success of our programs. Donations go directly towards funding our public health programming projects, community development programs, and Refugee Youth Education.",
      image: donateImage,
      buttonText: "Donate Now",
      buttonColor: "bg-gradient-to-br from-sky-600 to-green-600"
    },
    {
      id: 2,
      title: "Volunteer",
      description: "We are always looking for passionate individuals who want to make a difference. Whether you're an engineer, content writer, social media specialist, graphic designer, events life coach, or field volunteer, your skills and expertise can help us further our mission. Volunteer with us as staff or mentor to give back to community and achieve God purpose on this earth.",
      image: volunteerImage,
      buttonText: "Join Our Volunteer Team",
      buttonColor: "bg-gradient-to-br from-sky-600 to-green-600"
    },
    {
      id: 3,
      title: "Partner With Us",
      description: "Are you an organization or company looking to make an impact? We're seeking a qualified and competent personnel from refugees and host community, self-reliance program and never leave any one behind program. We welcome partnerships with businesses, research centers, peace-building institutions, youth organizations, universities, high schools, academic institutions, and humanitarian organizations. Together we can create lasting change.",
      image: partnerImage,
      buttonText: "Link for Partnership Application",
      buttonColor: "bg-gradient-to-br from-sky-600 to-green-600"
    },
    {
      id: 4,
      title: "Career Path Program",
      description: "Are you a refugee or an immigrant eager to explore new career opportunities or facing challenges with job integration in the USA, East Africa, or the globe?",
      image: careerImage,
      buttonText: "Apply Now",
      buttonColor: "bg-gradient-to-br from-sky-600 to-green-600"
    },
    {
      id: 5,
      title: "Scholarship program",
      description: "Supporting educational advancement through scholarship opportunities for deserving students in our community.",
      image: scholarshipImage,
      buttonText: "Learn More",
      buttonColor: "bg-gradient-to-br from-sky-600 to-green-600"
    }
  ];

  const handleViewMore = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const closeModal = () => {
    setSelectedOpportunity(null);
  };

  const handleModalButtonClick = () => {
    navigate("/contact");
    setSelectedOpportunity(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Get Involved"
        linkTitle="Get Involved"
        linkHref="/get-involved"
        backgroundImage={image}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <div
              key={opportunity.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-72 overflow-hidden">
                <img 
                  src={opportunity.image} 
                  alt={opportunity.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {opportunity.description}
                </p>
                
                {/* View More Button */}
                <button
                  onClick={() => handleViewMore(opportunity)}
                  className={`w-full ${opportunity.buttonColor} text-white py-3 px-4 rounded-full font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg`}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every action counts. Whether you donate, volunteer your time, partner with us, 
            or participate in our programs, you're helping create a brighter future for our community.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
            <div>
              <div className="text-4xl font-bold text-[#5DADE2] mb-2">200+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#5DADE2] mb-2">14+</div>
              <div className="text-gray-600">Years of Impact</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#5DADE2] mb-2">300+</div>
              <div className="text-gray-600">Lives Transformed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Image */}
              <div className="h-64 md:h-96 overflow-hidden rounded-xl mb-6">
                <img 
                  src={selectedOpportunity.image} 
                  alt={selectedOpportunity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {selectedOpportunity.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {selectedOpportunity.description}
              </p>

              {/* Action Button */}
              <button
                onClick={handleModalButtonClick}
                className={`w-full ${selectedOpportunity.buttonColor} text-white py-4 px-6 rounded-full font-medium text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg`}
              >
                {selectedOpportunity.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GetInvolved;