import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandCoins, TrendingUp, XCircle, Clock, RefreshCw, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  getAdminDonations,
  getAdminDonationStats,
  syncPendingDonations,
  type Donation,
  type DonationStats,
  type DonationStatus,
} from '../../api/donations';

const PAGE_SIZE = 20;

const STATUS_FILTERS: { id: DonationStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'succeeded', label: 'Succeeded' },
  { id: 'pending', label: 'Pending' },
  { id: 'failed', label: 'Failed' },
];

function StatusBadge({ status }: { status: DonationStatus }) {
  const variant = status === 'succeeded' ? 'badge--success' : status === 'failed' ? 'badge--danger' : 'badge--warning';
  return <span className={`badge ${variant}`}>{status}</span>;
}

/** Windowed page numbers with ellipsis gaps, e.g. [1, '…', 4, 5, 6, '…', 12] */
function getPageNumbers(current: number, total: number): (number | '…')[] {
  const pages: (number | '…')[] = [];
  const window = 1;
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || (p >= current - window && p <= current + window)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }
  return pages;
}

export default function DonationsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<DonationStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadDonations = useCallback(() => {
    setLoading(true);
    getAdminDonations({ status, search, dateFrom, dateTo, page, limit: PAGE_SIZE })
      .then(res => {
        setDonations(res.items);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      })
      .catch(() => toast.error('Failed to load donations'))
      .finally(() => setLoading(false));
  }, [status, search, dateFrom, dateTo, page]);

  const loadStats = useCallback(() => {
    getAdminDonationStats().then(setStats).catch(() => {});
  }, []);

  useEffect(() => { loadDonations(); }, [loadDonations]);
  useEffect(() => { loadStats(); }, [loadStats]);

  useEffect(() => {
    // Catch donations whose donor never returned to /donate/success or /donate/failed.
    syncPendingDonations()
      .then(() => { loadDonations(); loadStats(); })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSync = () => {
    setSyncing(true);
    syncPendingDonations()
      .then(res => {
        toast.success(`Checked ${res.checked} pending donation(s), updated ${res.updated}.`);
        loadDonations();
        loadStats();
      })
      .catch(() => toast.error('Sync failed'))
      .finally(() => setSyncing(false));
  };

  const totalRaisedLabel = stats?.totalRaised?.length
    ? stats.totalRaised.map(r => `${r.currency} ${r.amount.toLocaleString()}`).join(' · ')
    : '—';

  return (
    <AdminLayout title="Donations">
      <div className="page-head">
        <div>
          <h1>Donations</h1>
          <div className="page-head__sub">Track every donation attempt — succeeded, pending, and failed.</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn--ghost btn--sm" onClick={handleSync} disabled={syncing}>
            {syncing ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />} Refresh pending
          </button>
        </div>
      </div>

      <div className="kpi-grid kpi-grid--4" style={{ marginBottom: 'var(--gap-card)' }}>
        <div className="kpi">
          <div className="kpi__label"><TrendingUp size={13} /> Total raised</div>
          <div className="kpi__value" style={{ fontSize: 18 }}>{totalRaisedLabel}</div>
          <div className="kpi__foot"><span>succeeded donations</span></div>
        </div>
        <div className="kpi">
          <div className="kpi__label"><HandCoins size={13} /> Succeeded</div>
          <div className="kpi__value">{stats ? stats.succeededCount : '—'}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label"><Clock size={13} /> Pending</div>
          <div className="kpi__value">{stats ? stats.pendingCount : '—'}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label"><XCircle size={13} /> Failed</div>
          <div className="kpi__value">{stats ? stats.failedCount : '—'}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head" style={{ flexWrap: 'wrap', height: 'auto', minHeight: 44, padding: '10px 16px' }}>
          <div>
            <div className="panel__title">All donations</div>
            <div className="panel__sub">{total} total</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="input input--search"
              placeholder="Search name or email…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ width: 200 }}
            />
            <select
              className="input"
              value={status}
              onChange={e => { setStatus(e.target.value as DonationStatus | 'all'); setPage(1); }}
              style={{ width: 130 }}
            >
              {STATUS_FILTERS.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <input
              type="date"
              className="input"
              value={dateFrom}
              max={dateTo || undefined}
              onChange={e => { setDateFrom(e.target.value); setPage(1); }}
              style={{ width: 140 }}
              title="From date"
            />
            <span style={{ fontSize: 11, color: 'var(--fg-subtle)' }}>to</span>
            <input
              type="date"
              className="input"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={e => { setDateTo(e.target.value); setPage(1); }}
              style={{ width: 140 }}
              title="To date"
            />
            {(dateFrom || dateTo) && (
              <button
                className="btn btn--ghost btn--icon"
                title="Clear date filter"
                onClick={() => { setDateFrom(''); setDateTo(''); setPage(1); }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <Loader2 size={20} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} />
          </div>
        ) : donations.length === 0 ? (
          <div className="empty">
            <HandCoins size={28} style={{ color: 'var(--fg-subtle)', marginBottom: 10 }} />
            <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No donations found</p>
            <p>Try a different filter or search term.</p>
          </div>
        ) : (
          <div>
            {donations.map(d => (
              <div
                key={d.id}
                className="activity-row"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/donations/${d.id}`)}
              >
                <div
                  className="activity-icon"
                  data-kind={d.status === 'succeeded' ? 'in' : d.status === 'failed' ? 'out' : 'warn'}
                >
                  <HandCoins size={13} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="activity-row__title">
                    {d.firstName} {d.lastName}
                    {d.dedicateTo && <span style={{ color: 'var(--fg-subtle)', fontWeight: 400 }}> · in honor of {d.dedicateTo}</span>}
                  </div>
                  <div className="activity-row__meta">
                    {d.email ?? 'no email'} · {d.frequency === 'monthly' ? 'Monthly' : 'One-time'} · {d.programArea} · {new Date(d.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {d.currency} {d.amount.toLocaleString()}
                  </span>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            ))}
          </div>
        )}

        {total > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--fg-subtle)' }}>
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
            </span>

            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button className="btn btn--ghost btn--sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  Previous
                </button>
                {getPageNumbers(page, totalPages).map((p, i) =>
                  p === '…' ? (
                    <span key={`ellipsis-${i}`} style={{ padding: '0 4px', fontSize: 12, color: 'var(--fg-subtle)' }}>…</span>
                  ) : (
                    <button
                      key={p}
                      className="btn btn--ghost btn--sm"
                      onClick={() => setPage(p)}
                      style={p === page ? { background: 'var(--accent)', color: 'var(--accent-fg)' } : undefined}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button className="btn btn--ghost btn--sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
