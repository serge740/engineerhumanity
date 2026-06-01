import AdminLayout from '../../components/layout/AdminLayout';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <AdminLayout title={title}>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <span className="text-2xl">🔧</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title} — Coming Soon</h2>
        <p className="text-sm text-gray-500 max-w-sm">
          {description ?? 'This section is being built. Check back soon.'}
        </p>
      </div>
    </AdminLayout>
  );
}
