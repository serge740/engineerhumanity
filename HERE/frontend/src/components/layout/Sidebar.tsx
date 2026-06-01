import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Globe, Settings, FileText, Puzzle,
  Image, ArrowLeft, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';

const globalLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sites',     icon: Globe,            label: 'Workspace' },
  { to: '/settings',  icon: Settings,         label: 'Settings'  },
];

const siteLinks = (id: string) => [
  { to: `/sites/${id}`,            icon: FileText, label: 'Pages',      exact: true },
  { to: `/sites/${id}/components`, icon: Puzzle,   label: 'Components', exact: false },
  { to: `/sites/${id}/assets`,     icon: Image,    label: 'Assets',     exact: false },
  { to: `/sites/${id}/settings`,   icon: Settings, label: 'Settings',   exact: false },
];

interface SidebarProps { collapsed: boolean; onToggle: () => void; siteName?: string; }

export default function Sidebar({ collapsed, onToggle, siteName }: SidebarProps) {
  const { siteId } = useParams<{ siteId?: string }>();
  const navigate   = useNavigate();
  const inSite     = Boolean(siteId);
  const links      = inSite ? siteLinks(siteId!) : globalLinks;

  return (
    <aside
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0c1424 100%)' }}
      className={`
        h-screen flex flex-col sticky top-0 shrink-0 text-slate-300
        transition-all duration-200 ease-in-out z-10
        ${collapsed ? 'w-[60px]' : 'w-[220px]'}
      `}
    >
      {/* ── Brand ─────────────────────────────────────────── */}
      <div className={`h-14 flex items-center shrink-0 border-b border-white/[0.06]
        ${collapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700
          flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/50">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-white tracking-tight truncate leading-none">
              SiteBuilder
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-none">Pro</p>
          </div>
        )}
      </div>

      {/* ── Site context chip ──────────────────────────────── */}
      {inSite && !collapsed && (
        <div className="mx-3 mt-3">
          <button
            onClick={() => navigate('/sites')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg
              bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center
              text-[10px] font-bold text-white shrink-0">
              {siteName?.charAt(0).toUpperCase() ?? 'S'}
            </div>
            <span className="text-[12px] font-medium text-slate-300 truncate flex-1">
              {siteName ?? 'Site'}
            </span>
            <ArrowLeft className="w-3 h-3 text-slate-500 shrink-0" />
          </button>
        </div>
      )}

      {inSite && collapsed && (
        <button onClick={() => navigate('/sites')}
          className="mx-2 mt-3 p-2 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
          title="All sites">
          <ArrowLeft className="w-4 h-4 text-slate-500" />
        </button>
      )}

      {/* ── Section label ──────────────────────────────────── */}
      {!collapsed && (
        <p className="px-4 mt-5 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-slate-600">
          {inSite ? 'Site' : 'Navigation'}
        </p>
      )}

      {/* ── Nav ───────────────────────────────────────────── */}
      <nav className="flex-1 px-2 space-y-0.5 pt-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label, exact }: any) => (
          <NavLink
            key={to}
            to={to}
            end={exact ?? false}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all
               ${collapsed ? 'justify-center' : ''}
               ${isActive
                 ? 'bg-blue-600 text-white shadow-sm'
                 : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-100'
               }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Collapse toggle ────────────────────────────────── */}
      <button
        onClick={onToggle}
        className="h-11 flex items-center justify-center border-t border-white/[0.06]
          text-slate-600 hover:text-slate-300 hover:bg-white/[0.04] transition-colors shrink-0"
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
