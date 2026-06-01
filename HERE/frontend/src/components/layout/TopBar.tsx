import { LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export interface Crumb { label: string; to?: string; }

interface TopBarProps { title: string; crumbs?: Crumb[]; }

export default function TopBar({ title, crumbs }: TopBarProps) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
  };

  const initials = admin?.adminName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 min-w-0">
        {crumbs && crumbs.length > 0 ? (
          crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
              {c.to ? (
                <button
                  onClick={() => navigate(c.to!)}
                  className="text-[13px] text-slate-400 hover:text-slate-700 font-medium transition-colors truncate"
                >
                  {c.label}
                </button>
              ) : (
                <span className="text-[13px] font-semibold text-slate-800 truncate">{c.label}</span>
              )}
            </span>
          ))
        ) : (
          <span className="text-[13px] font-semibold text-slate-800">{title}</span>
        )}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:block text-right">
          <p className="text-[12px] font-semibold text-slate-800 leading-none">{admin?.adminName}</p>
          <p className="text-[11px] text-slate-400 leading-none mt-1">{admin?.adminEmail}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700
          flex items-center justify-center text-white font-bold text-[11px] shrink-0
          ring-2 ring-blue-100 shadow-sm">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400
            hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
