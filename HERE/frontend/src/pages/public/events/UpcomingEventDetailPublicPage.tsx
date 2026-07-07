import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicEvent, type SiteEvent } from '../../../api/events';
import { EventHero } from './EventHero';
import { resolveImage } from './resolveImage';

export default function UpcomingEventDetailPublicPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<SiteEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPublicEvent(id).then(setEvent).catch(() => setEvent(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event || event.status !== 'upcoming') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <Link to="/upcoming-event" className="text-blue-600 hover:underline">
            ← Back to Upcoming Events
          </Link>
        </div>
      </div>
    );
  }

  const images = event.images.map(resolveImage);

  return (
    <div className="min-h-screen bg-white font-sans">
      <EventHero title={event.title} linkTitle="Upcoming Events" linkHref="/upcoming-event" />

      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
            {event.time && ` · ${event.time}`}
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
          <span className="ml-auto">
            <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold">Upcoming</span>
          </span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Event</h2>
            <p className="text-gray-700 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: event.description }} />
            {event.paragraphs.map((para, i) => (
              <div key={i} className="text-gray-700 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>

          <div className="space-y-6">
            {event.highlights.length > 0 && (
              <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                <h3 className="font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="space-y-2">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      {h.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.contacts && event.contacts.length > 0 && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </h3>
                <div className="space-y-2">
                  {event.contacts.map((c, i) => (
                    <div key={i}>
                      <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                      <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline text-sm break-all">
                        {c.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to="/upcoming-event" className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Event Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl shadow-md ${
                    index === 0 ? 'sm:col-span-2 h-80' : index === 1 ? 'sm:col-span-1 h-80' : 'sm:col-span-1 h-56'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${event.title} – photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Support Our Mission</h2>
          <p className="text-lg text-blue-100 mb-8">
            Every donation helps engineeer4humanity create more events, more opportunities, and
            more futures for refugee youth across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate" className="bg-white text-sky-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Donate Now
            </Link>
            <Link to="/upcoming-event" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors duration-300">
              ← All Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
