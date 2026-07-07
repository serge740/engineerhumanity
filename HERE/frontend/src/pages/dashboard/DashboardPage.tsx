import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, FileText, Image, ArrowRight, Loader2, TrendingUp,
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
      <div className="page-head">
        <div>
          <h1>Welcome back{admin?.adminName ? `, ${admin.adminName}` : ''}</h1>
          <div className="page-head__sub">Here's what's happening across your sites.</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn--primary" onClick={() => navigate('/sites')}>
            <ArrowRight size={13} /> Go to Workspace
          </button>
        </div>
      </div>

      <div className="kpi-grid kpi-grid--3" style={{ marginBottom: 'var(--gap-card)' }}>
        <div className="kpi">
          <div className="kpi__label"><TrendingUp size={13} /> Published sites</div>
          <div className="kpi__value">{loading ? '—' : publishedSites}</div>
          <div className="kpi__foot"><span>of {sites.length} total</span></div>
        </div>
        <div className="kpi">
          <div className="kpi__label"><FileText size={13} /> Pages</div>
          <div className="kpi__value">{loading ? '—' : totalPages}</div>
          <div className="kpi__foot"><span>across all sites</span></div>
        </div>
        <div className="kpi">
          <div className="kpi__label"><Image size={13} /> Assets</div>
          <div className="kpi__value">{loading ? '—' : totalAssets}</div>
          <div className="kpi__foot"><span>images &amp; fonts uploaded</span></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <div>
            <div className="panel__title">Workspace</div>
            <div className="panel__sub">Your sites</div>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={() => navigate('/sites')}>
            Open <ArrowRight size={12} />
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <Loader2 size={20} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} />
          </div>
        ) : sites.length === 0 ? (
          <div className="empty">
            <Globe size={28} style={{ color: 'var(--fg-subtle)', marginBottom: 10 }} />
            <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>Workspace not found</p>
            <p>Please contact the administrator to set up the workspace.</p>
          </div>
        ) : (
          <div>
            {sites.map(site => (
              <div
                key={site.id}
                className="activity-row"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/sites/${site.id}`)}
              >
                <div className="activity-icon"><Globe size={13} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="activity-row__title">{site.name}</div>
                  <div className="activity-row__meta">
                    {site.domain ?? 'No domain'} · {site._count?.pages ?? 0} pages · {site._count?.assets ?? 0} assets
                  </div>
                </div>
                <span className={`badge ${site.published ? 'badge--success' : ''}`}>
                  {site.published ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
