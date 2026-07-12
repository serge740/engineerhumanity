import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail, MapPin, Globe, HandCoins } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAdminDonation, type Donation, type DonationStatus } from '../../api/donations';

function StatusBadge({ status }: { status: DonationStatus }) {
  const variant = status === 'succeeded' ? 'badge--success' : status === 'failed' ? 'badge--danger' : 'badge--warning';
  return <span className={`badge ${variant}`}>{status}</span>;
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
      <span style={{ color: 'var(--fg-subtle)' }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: 'right', wordBreak: 'break-all' }}>{value ?? '—'}</span>
    </div>
  );
}

export default function DonationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getAdminDonation(id)
      .then(setDonation)
      .catch(() => toast.error('Failed to load donation'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminLayout title="Donation Details">
      <div className="page-head">
        <div>
          <button className="btn btn--ghost btn--sm" onClick={() => navigate('/donations')} style={{ marginBottom: 8 }}>
            <ArrowLeft size={13} /> Back to Donations
          </button>
          <h1>{donation ? `${donation.firstName} ${donation.lastName}` : 'Donation'}</h1>
          {donation && (
            <div className="page-head__sub" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusBadge status={donation.status} /> · {new Date(donation.createdAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} />
        </div>
      ) : !donation ? (
        <div className="empty">
          <p style={{ fontWeight: 600, color: 'var(--fg)' }}>Donation not found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 'var(--gap-card)', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="panel">
            <div className="panel__head">
              <div>
                <div className="panel__title"><HandCoins size={13} style={{ verticalAlign: -2, marginRight: 4 }} /> Donation</div>
              </div>
            </div>
            <Row label="Amount" value={`${donation.currency} ${donation.amount.toLocaleString()}`} />
            <Row label="Frequency" value={donation.frequency === 'monthly' ? 'Monthly' : 'One-time'} />
            <Row label="Program" value={donation.programArea} />
            <Row label="Dedicated to" value={donation.dedicateTo} />
            <Row label="Display publicly" value={donation.displayPublicly ? 'Yes' : 'No'} />
            <Row label="Status" value={<StatusBadge status={donation.status} />} />
            <Row label="Email sent" value={donation.emailSentAt ? new Date(donation.emailSentAt).toLocaleString() : 'Not sent'} />
          </div>

          <div className="panel">
            <div className="panel__head">
              <div>
                <div className="panel__title"><Mail size={13} style={{ verticalAlign: -2, marginRight: 4 }} /> Donor</div>
              </div>
            </div>
            <Row label="Name" value={`${donation.firstName} ${donation.lastName}`} />
            <Row label="Email" value={donation.email} />
            <Row label="Phone" value={donation.phone} />
            <Row label={<><MapPin size={11} style={{ verticalAlign: -1 }} /> Street</>} value={donation.street} />
            <Row label="City" value={donation.city} />
            <Row label={<><Globe size={11} style={{ verticalAlign: -1 }} /> Country</>} value={donation.country} />
            <Row label="Region / State" value={donation.adminDivision} />
          </div>

          <div className="panel">
            <div className="panel__head">
              <div>
                <div className="panel__title">Stripe references</div>
              </div>
            </div>
            <Row label="Checkout Session" value={donation.stripeCheckoutSessionId} />
            <Row label="Customer" value={donation.stripeCustomerId} />
            <Row label="Subscription" value={donation.stripeSubscriptionId} />
            <Row label="Payment Intent" value={donation.stripePaymentIntentId} />
            <Row label="Invoice" value={donation.stripeInvoiceId} />
            <Row label="Created" value={new Date(donation.createdAt).toLocaleString()} />
            <Row label="Updated" value={new Date(donation.updatedAt).toLocaleString()} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
