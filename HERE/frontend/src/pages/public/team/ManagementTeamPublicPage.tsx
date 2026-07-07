import { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { getPublicTeamMembers, type TeamMember } from '../../../api/team';
import { TeamHero } from './TeamHero';
import { resolveImage } from './resolveImage';

function TeamMemberModal({ member, onClose }: { member: TeamMember | null; onClose: () => void }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <img
              src={resolveImage(member.image)}
              alt={member.name}
              className="w-48 h-48 rounded-full object-cover object-top border-4 border-sky-600 shadow-xl"
            />
            <div className="text-center md:text-left flex-1">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                {member.name}
                {member.credentials && (
                  <span className="text-2xl text-sky-600">, {member.credentials}</span>
                )}
              </h2>
              <p className="text-xl text-gray-600 mb-4">{member.title}</p>

              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
                >
                  LinkedIn Profile
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
              Role & Responsibilities
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {member.bio || `Contributes essential expertise and dedication to Engineers4Humanity's mission as part of the ${member.title} team, working to empower refugees and underserved communities through sustainable development initiatives.`}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-sky-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="font-semibold text-gray-900 capitalize">{member.category}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-semibold text-gray-900">Rwanda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ManagementTeamPublicPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    getPublicTeamMembers('management')
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans text-gray-800">
      <TeamHero title="Our Team" linkTitle="Our Team" linkHref="/team/management-team" />

      <section className="py-20 bg-white">
        <div className="mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-center text-gray-500">No team members published yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600 group"
                >
                  <div className="h-64 flex justify-center items-center overflow-hidden">
                    <img
                      src={resolveImage(member.image)}
                      alt={member.name}
                      className="w-64 h-64 rounded-full object-cover object-top shadow-xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                      {member.credentials && (
                        <span className="text-lg text-sky-600">, {member.credentials}</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {member.title}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="flex-1 bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-sky-700 hover:to-green-700 transition-all text-sm"
                      >
                        View Profile
                      </button>
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Your Support Can Make a World of Difference
          </h2>
          <p className="text-xl mb-10 opacity-95">
            Whether through donations, volunteering, or spreading the word, you can help empower vulnerable communities.
          </p>
          <a
            href="/donate"
            className="inline-block bg-white text-sky-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
          >
            Donate Now
          </a>
        </div>
      </section>

      {selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
