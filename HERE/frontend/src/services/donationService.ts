import api from '../api/api';

/**
 * Donation Service
 * Handles all API calls related to donations
 */

/**
 * Create a new donation record and Stripe Checkout session.
 * Returns { checkoutUrl, donationId } — redirect the browser to checkoutUrl.
 */
export const createDonation = async (donationData) => {
    const response = await api.post('/api/donations', donationData);
    return response.data;
};

/**
 * Verify a completed/abandoned Stripe Checkout session against the backend,
 * which checks the live status with Stripe and updates the donation record.
 * Pass `cancelled: true` from the /donate/failed page so the backend force-closes
 * a still-open session immediately instead of leaving it pending.
 */
export const verifyDonationSession = async (sessionId, { cancelled = false } = {}) => {
    const response = await api.get(`/api/donations/verify/${sessionId}`, {
        params: cancelled ? { cancelled: '1' } : undefined,
    });
    return response.data;
};

/**
 * Get paginated list of donations (public view — private donors are masked)
 */
export const getDonations = async (page = 1, limit = 20, program = '') => {
    const params = { page, limit };
    if (program) params.program = program;
    const response = await api.get('/api/donations', { params });
    return response.data;
};

/**
 * Get donations with impact messages (donor impact wall)
 */
export const getDonationImpacts = async () => {
    const response = await api.get('/api/donations/impacts');
    return response.data;
};

/**
 * Get aggregate donation statistics
 */
export const getDonationStats = async () => {
    const response = await api.get('/api/donations/stats');
    return response.data;
};
