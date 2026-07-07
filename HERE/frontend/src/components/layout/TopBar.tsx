import { LogOut, ChevronRight, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';

export interface Crumb { label: string; to?: string; }

interface TopBarProps { title: string; crumbs?: Crumb[]; onToggleSidebar?: () => void; }

export default function TopBar({ title, crumbs, onToggleSidebar }: TopBarProps) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = admin?.adminName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <header className="topbar">
      <button className="icon-btn sidebar-toggle" onClick={onToggleSidebar} title="Toggle sidebar" aria-label="Toggle sidebar">
        <Menu size={16} />
      </button>

      <nav className="crumbs">
        {crumbs && crumbs.length > 0 ? (
          crumbs.map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              {i > 0 && <ChevronRight className="crumbs__sep" size={12} />}
              {c.to ? (
                <button onClick={() => navigate(c.to!)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-subtle)', fontSize: 12, padding: 0 }}>
                  {c.label}
                </button>
              ) : (
                <span className="crumbs__current">{c.label}</span>
              )}
            </span>
          ))
        ) : (
          <span className="crumbs__current">{title}</span>
        )}
      </nav>

      <div style={{ position: 'relative', marginLeft: 'auto' }} ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(v => !v)}
          className="user-card"
          style={{ background: 'none', cursor: 'pointer', padding: '4px 6px', border: 'none' }}
        >
          <div className="avatar">{initials}</div>
          <ChevronRight size={12} style={{ transform: isProfileOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.1s' }} />
        </button>

        {isProfileOpen && (
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            width: 200, background: 'var(--bg-elev)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 50,
          }}>
            <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.adminName}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-subtle)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.adminEmail}</div>
            </div>
            <div style={{ padding: 6 }}>
              <button
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--danger)', textAlign: 'left' }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
