import { Link } from 'react-router-dom';
import Header from '../components/Header';
import headerImage from '../assets/image6.jpg';
import { pastEvents } from '../data/events';

function PastEvent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header
        title="Past Events"
        linkTitle="Past Events"
        linkHref="/past-event"
        backgroundImage={headerImage}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact Through Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From refugee camps to graduation halls, these events capture Engineer 4 Humanity's
            journey of empowering communities through education and engineering.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pastEvents.map((event, index) => {
            const coverImage = event.images[0];
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden h-64">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-sky-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 text-blue-700 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {event.attendees} Attendees
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    Event #{index + 1}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {event.images.length} Photos
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-3 flex-grow">
                    {event.description}
                  </p>

                  <Link
                    to={`/past-event/${event.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-auto"
                  >
                    <span>View More Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Next Chapter</h2>
          <p className="text-xl mb-8 text-blue-100">
            Every event, every graduate, every community visit — made possible by supporters like you.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg text-lg"
          >
            Support Our Mission
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PastEvent;
