import { X, Sparkles } from 'lucide-react';
import type { Story } from '../../../api/stories';
import { resolveImage } from './resolveImage';

export function StoryModal({ story, onClose }: { story: Story | null; onClose: () => void }) {
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={resolveImage(story.image)}
              alt={story.name}
              className="w-32 h-32 rounded-full object-cover object-top border-4 border-sky-600"
            />
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">{story.name}</h2>
              <p className="text-sky-600 font-semibold text-lg">{story.role}</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-green-600">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.intro}</p>
            </div>
            {(story.sections ?? []).map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-sky-600" />
                  {section.title}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <p className="text-right font-serif text-xl italic text-gray-600">- {story.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
