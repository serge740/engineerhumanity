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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        siteName={siteName}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar title={title} crumbs={crumbs} />
        <main className={
          fullHeight
            ? 'flex-1 flex flex-col overflow-hidden p-0'
            : 'flex-1 overflow-y-auto p-6'
        }>
          {children}
        </main>
      </div>
    </div>
  );
}
