import React, { useState } from 'react';

function PastEvent() {
  const [events] = useState([
    {
      id: 1,
      title: "Safe Water, Stronger Communities: Public Health Engineering Awareness Camp",
      location: "New York, US",
      date: "June 21, 2025",
      description: "This awareness camp is part of our Public Health Engineering initiative aimed at educating rural households about safe water practices, sanitation infrastructure, and low-cost water filtration systems. Join us in building a healthier future through grassroots engineering and knowledge sharing...",
      organizers: ["John Smith", "Sarah Johnson"],
      details: "The event successfully brought together community leaders, engineers, and local residents to discuss sustainable water solutions. Participants learned about low-cost filtration systems and proper sanitation practices that can be implemented in rural communities.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop",
      attendees: "150+"
    },
    {
      id: 2,
      title: "Community Health Infrastructure Development Workshop",
      location: "Kigali, Rwanda",
      date: "May 15, 2025",
      description: "A hands-on workshop focusing on building sustainable health infrastructure in underserved communities. Engineers and health professionals collaborated to design practical solutions for water access and sanitation facilities.",
      organizers: ["Dr. Marie Uwase", "Eng. David Mutabazi"],
      details: "This workshop resulted in concrete plans for three new water filtration stations in rural districts. Participants developed implementation strategies and secured commitments from local government officials for ongoing support.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop",
      attendees: "85+"
    },
    {
      id: 3,
      title: "Annual Engineers for Humanity Summit 2024",
      location: "Richardson, Texas, US",
      date: "December 10, 2024",
      description: "Our flagship annual summit brought together engineers, healthcare professionals, and community advocates to share innovations in public health engineering and discuss strategies for sustainable community development.",
      organizers: ["Dr. Michael Chen", "Rebecca Martinez"],
      details: "The summit featured keynote speakers from leading institutions, breakout sessions on emerging technologies, and networking opportunities. Key outcomes included new partnerships and funding commitments for three major initiatives.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      attendees: "300+"
    },
    {
      id: 4,
      title: "Rural Sanitation Training Program",
      location: "Eastern Province, Rwanda",
      date: "November 8, 2024",
      description: "Intensive training program for local technicians and community health workers on maintaining and repairing water and sanitation systems. Focus on sustainable, locally-sourced solutions.",
      organizers: ["Eng. Patrick Habimana", "Grace Uwimana"],
      details: "Twenty-five participants completed the comprehensive training program and received certification. The program included theoretical instruction and practical field work, resulting in immediate improvements to seven community water systems.",
      image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&h=500&fit=crop",
      attendees: "25"
    },
    {
      id: 5,
      title: "Water Quality Testing & Monitoring Initiative Launch",
      location: "Multiple Locations, East Africa",
      date: "October 5, 2024",
      description: "Launch event for our water quality monitoring program, introducing new testing protocols and equipment to ensure safe drinking water across multiple communities.",
      organizers: ["Dr. James Nkusi", "Elizabeth Kamara"],
      details: "Successfully launched monitoring systems in 15 communities, training local teams in water quality testing procedures. The initiative established baseline data for ongoing monitoring and early intervention protocols.",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=500&fit=crop",
      attendees: "60+"
    },
    {
      id: 6,
      title: "Youth STEM & Health Education Fair",
      location: "Houston, Texas, US",
      date: "September 20, 2024",
      description: "Interactive educational fair engaging youth in STEM fields with focus on public health applications. Students explored engineering solutions to global health challenges through hands-on activities.",
      organizers: ["Prof. Lisa Thompson", "Carlos Rodriguez"],
      details: "Over 200 students participated in workshops covering water filtration design, basic sanitation engineering, and health infrastructure planning. The event inspired several students to pursue careers in public health engineering.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
      attendees: "200+"
    },
    {
      id: 7,
      title: "Disaster Response Water Systems Workshop",
      location: "Virtual Event",
      date: "August 12, 2024",
      description: "Online workshop focused on rapid deployment of emergency water and sanitation systems in disaster-affected areas. Featured case studies and practical guidelines for emergency response teams.",
      organizers: ["Dr. Amanda Wilson", "Robert Chang"],
      details: "Global participation with attendees from 25 countries. Workshop produced a comprehensive field guide for emergency water system deployment and established an international network of trained responders.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
      attendees: "180+"
    },
    {
      id: 8,
      title: "Community Partnership Forum",
      location: "Kigali, Rwanda",
      date: "July 18, 2024",
      description: "Forum bringing together NGOs, government agencies, and community organizations to strengthen partnerships and coordinate efforts in public health infrastructure development.",
      organizers: ["Minister of Health Rep", "NGO Coalition Leaders"],
      details: "Established new collaborative frameworks and identified opportunities for resource sharing. Forum resulted in signed agreements for three joint projects addressing water access in remote areas.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=500&fit=crop",
      attendees: "120+"
    },
    {
      id: 9,
      title: "Low-Cost Filtration Technology Demonstration",
      location: "Dallas, Texas, US",
      date: "June 5, 2024",
      description: "Demonstration of innovative, affordable water filtration technologies suitable for resource-limited settings. Featured live testing and comparative analysis of various filtration methods.",
      organizers: ["Dr. Thomas Anderson", "Jennifer Lee"],
      details: "Successfully demonstrated three filtration systems with costs under $50 per household. Attracted interest from international development organizations and secured funding for pilot programs in five communities.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop",
      attendees: "90+"
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Past Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our journey of impact and community transformation. Discover the events 
            that have shaped our mission to promote health equity through engineering solutions.
          </p>
        </div>
      </div>

      {/* Events Grid - Three Columns */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Event Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white text-blue-700 px-4 py-2 rounded-full font-bold shadow-lg">
                  {event.attendees} Attendees
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  Event #{events.length - index}
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                    Completed
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {event.title}
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">📍 {event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">⏰ {event.date}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
                  {event.description}
                </p>

             

                <button
                  onClick={() => openModal(event)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-auto"
                >
                  <span>View More Details</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Page Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl animate-fadeIn">
            {/* Modal Header with Image */}
            <div className="relative h-80 overflow-hidden rounded-t-2xl">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white text-gray-900 rounded-full p-3 hover:bg-gray-100 transition-all shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Event #{events.findIndex(e => e.id === selectedEvent.id) + 1}
                  </span>
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Completed
                  </span>
                  <span className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg ml-auto">
                    {selectedEvent.attendees} Attendees
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[43vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Location</p>
                    <p className="font-semibold">{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="font-semibold">{selectedEvent.date}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About This Event
                </h3>
                <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Event Details
                </h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
                  {selectedEvent.details}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Event Organizers
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {selectedEvent.organizers.map((organizer, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{organizer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Close Details</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
}

export default PastEvent;