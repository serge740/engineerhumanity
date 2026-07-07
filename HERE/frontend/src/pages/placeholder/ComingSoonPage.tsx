import { Wrench } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <AdminLayout title={title}>
      <div className="panel">
        <div className="empty">
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--r-md)', background: 'var(--bg-sunk)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
          }}>
            <Wrench size={22} style={{ color: 'var(--fg-subtle)' }} />
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>{title} — Coming Soon</p>
          <p style={{ maxWidth: 320, margin: '0 auto' }}>
            {description ?? 'This section is being built. Check back soon.'}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
