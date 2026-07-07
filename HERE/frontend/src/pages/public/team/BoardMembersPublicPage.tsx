import { useEffect, useState } from 'react';
import { X, ExternalLink, Shield, Award, Users } from 'lucide-react';
import { getPublicTeamMembers, type TeamMember } from '../../../api/team';
import { TeamHero } from './TeamHero';
import { resolveImage } from './resolveImage';

function BoardMemberModal({ member, onClose }: { member: TeamMember | null; onClose: () => void }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <img
              src={resolveImage(member.image)}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover object-top border-4 border-sky-600 shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                {member.name}
                {member.credentials && (
                  <span className="text-xl text-sky-600">, {member.credentials}</span>
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{member.title}</p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {member.role && (
                  <div className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-semibold capitalize flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {member.role.replace('-', ' ')}
                  </div>
                )}
                {member.role === 'chair' && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Leadership
                  </div>
                )}
              </div>

              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
                >
                  LinkedIn Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-green-50 p-5 rounded-xl border-l-4 border-sky-600">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" />
              Role & Impact
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BoardMembersPublicPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    getPublicTeamMembers('board')
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans text-gray-800">
      <TeamHero title="Board Members" linkTitle="Board Members" linkHref="/team/board-members" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-center text-gray-500">No board members published yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600 group"
                >
                  <div className="h-80 overflow-hidden">
                    <img
                      src={resolveImage(member.image)}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    {member.credentials && (
                      <p className="text-lg text-sky-600 font-semibold mb-3">
                        {member.credentials}
                      </p>
                    )}
                    <p className="text-gray-600 mb-6">
                      {member.title}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="flex-1 bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-green-700 transition-all"
                      >
                        View Full Profile
                      </button>
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-6 h-6" />
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 text-center">
              Board Governance & Advisory Role
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Governance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Providing strategic oversight and ensuring accountability to stakeholders and the communities we serve
                </p>
              </div>
              <div className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Advisory</h3>
                <p className="text-gray-600 leading-relaxed">
                  Offering expert guidance on programs, strategy, and operations to maximize impact for refugee communities
                </p>
              </div>
              <div className="p-6">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Networking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Leveraging connections and partnerships to expand opportunities and resources for the organization's mission
                </p>
              </div>
            </div>
          </div>
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
        <BoardMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>
    </div>
  );
}
