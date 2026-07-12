import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Heart, RefreshCw } from 'lucide-react';

import { verifyDonationSession } from '../../services/donationService';
import { formatAmount } from '../../data/donationData';

type VerifyResult = {
    status: 'pending' | 'succeeded' | 'failed';
    amount: number;
    currency: string;
    firstName: string;
    frequency: 'once' | 'monthly';
    programArea: string;
    email?: string | null;
};

const DonationSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<VerifyResult | null>(null);
    const [error, setError] = useState(false);

    const checkStatus = () => {
        if (!sessionId) {
            setError(true);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(false);
        verifyDonationSession(sessionId)
            .then(res => setResult(res))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        checkStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 text-center">
                {loading && (
                    <>
                        <Loader2 className="w-12 h-12 text-sky-600 animate-spin mx-auto mb-5" />
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Confirming your payment…</h1>
                        <p className="text-gray-500 text-sm">This usually only takes a moment.</p>
                    </>
                )}

                {!loading && (error || !result) && (
                    <>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">We couldn't confirm this donation</h1>
                        <p className="text-gray-500 text-sm mb-6">The confirmation link looks invalid or has expired.</p>
                        <Link to="/donate" className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                            Back to Donate
                        </Link>
                    </>
                )}

                {!loading && !error && result?.status === 'succeeded' && (
                    <>
                        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-5" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Thank you, {result.firstName}! <span className="inline-block">❤️</span>
                        </h1>
                        <p className="text-gray-500 text-sm mb-6">
                            Your {result.frequency === 'monthly' ? 'monthly' : 'one-time'} gift of{' '}
                            <span className="font-semibold text-gray-900">{formatAmount(result.amount, result.currency)}</span>{' '}
                            toward {result.programArea} has been received.
                        </p>
                        {result.email && (
                            <p className="text-sm text-gray-400 mb-6">A receipt has been emailed to you.</p>
                        )}
                        <Link to="/" className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                            <Heart className="w-4 h-4" /> Back to site
                        </Link>
                    </>
                )}

                {!loading && !error && result?.status === 'pending' && (
                    <>
                        <Loader2 className="w-12 h-12 text-sky-600 animate-spin mx-auto mb-5" />
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Still confirming your payment</h1>
                        <p className="text-gray-500 text-sm mb-6">This can take a minute. Feel free to check again.</p>
                        <button
                            onClick={checkStatus}
                            className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-sky-700 transition-colors border-none cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4" /> Check again
                        </button>
                    </>
                )}

                {!loading && !error && result?.status === 'failed' && (
                    <>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">This donation wasn't completed</h1>
                        <p className="text-gray-500 text-sm mb-6">You have not been charged. You're welcome to try again.</p>
                        <Link to="/donate" className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                            Try Again
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default DonationSuccess;
