import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, FileText, Puzzle, Image,
  ArrowRight, Loader2, TrendingUp, Layers, BarChart2,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { getSites, type Site } from '../../api/sites';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSites().then(setSites).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const totalPages     = sites.reduce((s, x) => s + (x._count?.pages ?? 0), 0);
  const publishedSites = sites.filter((s) => s.published).length;
  const totalAssets    = sites.reduce((s, x) => s + (x._count?.assets ?? 0), 0);

  return (
    <AdminLayout title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Hero ───────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br
          from-blue-600 via-blue-700 to-indigo-800 p-7 text-white shadow-xl shadow-blue-900/20">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-1/2 w-96 h-32 opacity-5"
            style={{ background: 'radial-gradient(ellipse, white 0%, transparent 70%)' }} />

          <div className="relative">
            <p className="text-blue-200 text-sm font-medium mb-1">Good to see you back</p>
            <h1 className="text-2xl font-bold tracking-tight">
              {admin?.adminName ?? 'Welcome'}
            </h1>
            <p className="text-blue-200 text-sm mt-2 max-w-md">
              {loading ? '' : `${totalPages} page${totalPages !== 1 ? 's' : ''} — ${publishedSites > 0 ? publishedSites + ' live' : 'none published yet'}.`}
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => navigate('/sites')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700
                  text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
              >
                <Layers className="w-4 h-4" /> Go to Workspace
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={TrendingUp} label="Published"   value={loading ? '—' : String(publishedSites)}  color="emerald" />
          <StatCard icon={BarChart2}  label="Pages"       value={loading ? '—' : String(totalPages)}      color="violet"  />
          <StatCard icon={Image}      label="Assets"      value={loading ? '—' : String(totalAssets)}     color="amber"   />
        </div>

        {/* ── Workspace ──────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-slate-800">Workspace</h2>
            <button
              onClick={() => navigate('/sites')}
              className="text-[12px] font-medium text-blue-600 hover:text-blue-700
                flex items-center gap-1 transition-colors"
            >
              Open <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            </div>
          ) : sites.length === 0 ? (
            <EmptyState onAction={() => navigate('/sites')} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {sites.slice(0, 1).map((site) => (
                <SiteCard key={site.id} site={site} onClick={() => navigate(`/sites/${site.id}`)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────

const colorConfig: Record<string, { bg: string; icon: string; border: string }> = {
  blue:    { bg: 'bg-blue-50',    icon: 'text-blue-600',    border: 'border-blue-100' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
  violet:  { bg: 'bg-violet-50',  icon: 'text-violet-600',  border: 'border-violet-100' },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-600',   border: 'border-amber-100' },
};

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.FC<any>; label: string; value: string; color: string;
}) {
  const c = colorConfig[color];
  return (
    <div className={`bg-white rounded-2xl border ${c.border} p-5 shadow-sm`}>
      <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-4.5 h-4.5 ${c.icon}`} strokeWidth={2} />
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      <p className="text-[12px] font-medium text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

// ─── Site card ──────────────────────────────────────────────────────────────

const siteColors = [
  'from-blue-500 to-blue-700',
  'from-violet-500 to-violet-700',
  'from-emerald-500 to-emerald-700',
  'from-rose-500 to-rose-700',
  'from-amber-500 to-amber-600',
  'from-cyan-500 to-cyan-700',
];

function SiteCard({ site, onClick }: { site: Site; onClick: () => void }) {
  const pages      = site._count?.pages ?? 0;
  const components = site._count?.components ?? 0;
  const assets     = site._count?.assets ?? 0;
  const colorIdx   = site.name.charCodeAt(0) % siteColors.length;
  const gradient   = siteColors[colorIdx];

  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 p-5 text-left
        hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60
        transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient}
          flex items-center justify-center text-white font-bold text-sm shadow-md`}>
          {site.name.charAt(0).toUpperCase()}
        </div>
        <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
          site.published
            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
            : 'text-slate-500  bg-slate-100  border border-slate-200'
        }`}>
          {site.published ? '● Live' : '○ Draft'}
        </span>
      </div>

      <p className="font-semibold text-slate-900 text-[14px] leading-snug">{site.name}</p>
      <p className="text-[12px] text-slate-400 font-mono mt-0.5 truncate">
        {site.domain ?? 'No domain'}
      </p>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[12px] text-slate-400">
        <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />{pages}</span>
        <span className="flex items-center gap-1.5"><Puzzle className="w-3.5 h-3.5" />{components}</span>
        <span className="flex items-center gap-1.5"><Image className="w-3.5 h-3.5" />{assets}</span>
        <span className="ml-auto flex items-center gap-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          Open <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </button>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────

function EmptyState({ onAction }: { onAction: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
        <Globe className="w-7 h-7 text-blue-500" />
      </div>
      <h3 className="text-[15px] font-semibold text-slate-800 mb-1">Workspace not found</h3>
      <p className="text-[13px] text-slate-500 max-w-xs mx-auto mb-5">
        Please contact the administrator to set up the workspace.
      </p>
      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white
          text-[13px] font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
      >
        Go to Workspace
      </button>
    </div>
  );
}
