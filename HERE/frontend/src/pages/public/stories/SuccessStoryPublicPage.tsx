import { useEffect, useState } from 'react';
import { Star, Award, ChevronRight } from 'lucide-react';
import { getPublicStories, type Story } from '../../../api/stories';
import { StoryHero } from './StoryHero';
import { StoryModal } from './StoryModal';
import { resolveImage } from './resolveImage';

export default function SuccessStoryPublicPage() {
  const [summaryStories, setSummaryStories] = useState<Story[]>([]);
  const [fullStories, setFullStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    Promise.all([
      getPublicStories('success-summary'),
      getPublicStories('success'),
    ])
      .then(([summaries, full]) => {
        setSummaryStories(summaries);
        setFullStories(full);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans text-gray-800">
      <StoryHero title="Success Stories" linkTitle="Success Story" linkHref="/impact/success-story" />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Section 1 — Summary cards */}
          <section id="success-story" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-10">
                <Star className="w-10 h-10 text-green-600" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Success Stories
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                The refugee education program has hundreds of success stories, and beneficiaries' testimonials highlight its positive impacts. Let's share a few of them.
              </p>
              {summaryStories.length === 0 ? (
                <p className="text-gray-500">No summaries published yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {summaryStories.map((story, i) => (
                    <div key={story.id} className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{story.story}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Section 2 — Image cards with full story modal */}
          <section id="full-stories" className="py-12 md:py-20 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 md:mb-16">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600" />
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                    Read Their Full Stories
                  </h2>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Click on any profile below to read the full testimony in their own words.
                </p>
              </div>
              {fullStories.length === 0 ? (
                <p className="text-center text-gray-500">No stories published yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {fullStories.map((story) => (
                    <div
                      key={story.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600"
                    >
                      <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                        <img
                          src={resolveImage(story.image)}
                          alt={story.name}
                          className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                        <p className="text-sky-600 font-semibold mb-4">{story.role}</p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                          {story.summary}
                        </p>
                        <button
                          onClick={() => setSelectedStory(story)}
                          className="w-full bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-sky-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                        >
                          View Full Story
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <section className="py-16 md:py-20 bg-linear-to-br from-sky-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Be Part of the Story
          </h2>
          <p className="text-lg md:text-xl opacity-95 mb-8">
            Your support helps us continue transforming lives through education, engineering, and peace-building.
          </p>
          <a
            href="/donate"
            className="inline-block bg-white text-sky-600 px-8 md:px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl no-underline"
          >
            Donate Now
          </a>
        </div>
      </section>

      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
