import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import image from '../assets/image6.jpg';

function Upcoming() {
  const [events] = useState([
    {
      id: 1,
      title: "Annual Health Summit 2026",
      date: "March 15, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, Downtown",
      description: "Join us for our flagship annual event bringing together healthcare professionals, community leaders, and advocates to discuss the future of health equity.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      category: "Conference",
      status: "Registration Open"
    },
    {
      id: 2,
      title: "Community Health Fair",
      date: "April 8, 2026",
      time: "10:00 AM - 3:00 PM",
      location: "Central Park Pavilion",
      description: "Free health screenings, wellness workshops, and resources for the entire family. Connect with local health providers and learn about preventive care.",
      image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=800&h=500&fit=crop",
      category: "Community Event",
      status: "Free Event"
    },
    {
      id: 3,
      title: "Mental Health Awareness Workshop",
      date: "April 22, 2026",
      time: "6:00 PM - 8:00 PM",
      location: "Virtual Event",
      description: "An interactive workshop focusing on mental health awareness, stress management techniques, and building resilient communities.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
      category: "Workshop",
      status: "Virtual"
    },
    {
      id: 4,
      title: "Youth Leadership Training",
      date: "May 5, 2026",
      time: "1:00 PM - 4:00 PM",
      location: "Community Center Hall A",
      description: "Empowering the next generation of health advocates through leadership training, mentorship, and hands-on community project planning.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop",
      category: "Training",
      status: "Limited Spots"
    },
    {
      id: 5,
      title: "Nutrition & Wellness Seminar",
      date: "May 18, 2026",
      time: "11:00 AM - 1:00 PM",
      location: "Wellness Center",
      description: "Learn about nutrition basics, meal planning on a budget, and creating sustainable healthy eating habits for you and your family.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
      category: "Seminar",
      status: "Registration Open"
    },
    {
      id: 6,
      title: "Healthcare Access Forum",
      date: "June 2, 2026",
      time: "2:00 PM - 6:00 PM",
      location: "City Hall Auditorium",
      description: "A critical discussion on improving healthcare access in underserved communities, featuring policymakers, healthcare providers, and community advocates.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      category: "Forum",
      status: "RSVP Required"
    }
  ]);

  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Conference', 'Workshop', 'Training', 'Community Event', 'Seminar', 'Forum'];

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => event.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header
        title="Upcoming Events"
        linkTitle="Events"
        linkHref="/upcoming"
        backgroundImage={image}
      />

      {/* Filter Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === category
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
            >
              {category === 'all' ? 'All Events' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Event Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{event.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <NavLink to="/contact" className=" flex justify-between justify-center bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg w-[90%]">
                  Learn More & Register
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter to receive updates about upcoming events and initiatives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;