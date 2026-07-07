import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Globe, Settings, FileText,
  ArrowLeft, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavLinkItem { to: string; icon: React.FC<any>; label: string; exact?: boolean; }

const globalLinks: NavLinkItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sites',     icon: Globe,            label: 'Workspace' },
  { to: '/settings',  icon: Settings,         label: 'Settings'  },
];

const siteLinks = (id: string): NavLinkItem[] => [
  { to: `/sites/${id}`, icon: FileText, label: 'Pages', exact: true },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  siteName?: string;
}

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapsed, siteName }: SidebarProps) {
  const { siteId } = useParams<{ siteId?: string }>();
  const navigate    = useNavigate();
  const { admin }   = useAuth();
  const inSite      = Boolean(siteId);
  const links       = inSite ? siteLinks(siteId!) : globalLinks;

  const initials = admin?.adminName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '?';

  return (
    <aside className={`sidebar${isOpen ? ' is-open' : ''}${collapsed ? ' is-collapsed' : ''}`}>
      <div className="sidebar__brand">
        <div className="brand-mark"><span>S</span></div>
        {!collapsed && (
          <div>
            <div className="brand-name">SiteBuilder</div>
            <div className="brand-meta">Pro</div>
          </div>
        )}
      </div>

      {inSite && !collapsed && (
        <div style={{ padding: '10px 12px 0' }}>
          <button
            onClick={() => navigate('/sites')}
            className="nav__item"
            style={{ background: 'var(--bg-sunk)', border: '1px solid var(--border)' }}
          >
            <ArrowLeft className="nav__icon" strokeWidth={1.75} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {siteName ?? 'All sites'}
            </span>
          </button>
        </div>
      )}

      <div className="sidebar__section-label">{inSite ? 'Site' : 'Navigation'}</div>
      <nav className="nav">
        {links.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact ?? false}
            title={collapsed ? label : undefined}
            className={({ isActive }) => `nav__item${isActive ? ' is-active' : ''}`}
            onClick={() => { if (window.innerWidth < 768) onClose(); }}
          >
            <Icon className="nav__icon" strokeWidth={1.75} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="user-card">
          <div className="avatar">{initials}</div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-card__name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {admin?.adminName || '—'}
              </div>
              <div className="user-card__role">Admin</div>
            </div>
          )}
        </div>
      </div>

      <button
        className="sidebar-collapse-btn"
        onClick={onToggleCollapsed}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
