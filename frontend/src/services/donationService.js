import api from '../api/api';

/**
 * Donation Service
 * Handles all API calls related to donations
 */

/**
 * Create a new donation record
 */
export const createDonation = async (donationData) => {
    const response = await api.post('/api/donations', donationData);
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
