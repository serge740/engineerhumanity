import { useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar, { type Crumb } from './TopBar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  crumbs?: Crumb[];
  siteName?: string;
  /** Remove padding and disable scroll — used by the editor so it can fill the space */
  fullHeight?: boolean;
}

export default function AdminLayout({ children, title, crumbs, siteName, fullHeight }: AdminLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed]       = useState(false);

  return (
    <div className={collapsed ? 'dash-shell app sidebar-collapsed' : 'dash-shell app'}>
      {isMobileOpen && (
        <div className="sidebar-overlay is-open" onClick={() => setIsMobileOpen(false)} />
      )}
      <Sidebar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(v => !v)}
        siteName={siteName}
      />
      <div className="main">
        <TopBar title={title} crumbs={crumbs} onToggleSidebar={() => setIsMobileOpen(v => !v)} />
        <div className={fullHeight ? 'content content--full' : 'content'}>
          {children}
        </div>
      </div>
    </div>
  );
}
