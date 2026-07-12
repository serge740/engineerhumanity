import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { XCircle, Loader2 } from 'lucide-react';

import { verifyDonationSession } from '../../services/donationService';

const DonationFailed = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }
        // cancelled: true forces the still-open Stripe session closed right away,
        // so this donation is marked 'failed' immediately instead of sitting as
        // 'pending' until Stripe's ~24h natural session expiry.
        verifyDonationSession(sessionId, { cancelled: true }).finally(() => setLoading(false));
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 text-center">
                {loading ? (
                    <>
                        <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-5" />
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Checking your donation status…</h1>
                    </>
                ) : (
                    <>
                        <XCircle className="w-14 h-14 text-red-500 mx-auto mb-5" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your donation wasn't completed</h1>
                        <p className="text-gray-500 text-sm mb-6">
                            No worries — you have not been charged. If this was a mistake, you can try again below.
                        </p>
                        <Link to="/donate" className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                            Try Again
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default DonationFailed;
