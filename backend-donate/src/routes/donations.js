const { Router } = require('express');
const Donation = require('../models/Donation');

const router = Router();

/**
 * POST /api/donations
 * Create a new donation record
 */
router.post('/', async (req, res) => {
    try {
        const {
            firstName, lastName, street, city, state, phone,
            amount, frequency, programArea,
            displayPublicly, dedicateTo
        } = req.body;

        // Validation
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'First name and last name are required' });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'A valid donation amount is required' });
        }

        const donation = await Donation.create({
            firstName,
            lastName,
            street: street || null,
            city: city || null,
            state: state || null,
            phone: phone || null,
            amount,
            frequency: frequency || 'once',
            programArea: programArea || 'general',
            displayPublicly: displayPublicly || false,
            dedicateTo: dedicateTo || null
        });

        res.status(201).json({
            message: 'Donation recorded successfully!',
            donation
        });
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ error: 'Failed to record donation' });
    }
});

/**
 * GET /api/donations
 * Get all donations (public view — only shows public donors)
 */
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, program } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const where = {};
        if (program) where.programArea = program;

        const { count, rows } = await Donation.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset
        });

        // For public display, mask private donors
        const donations = rows.map(d => {
            const json = d.toJSON();
            if (!json.displayPublicly) {
                json.firstName = 'Anonymous';
                json.lastName = 'Donor';
                json.street = null;
                json.city = null;
                json.state = null;
                json.phone = null;
            }
            return json;
        });

        res.json({
            total: count,
            page: parseInt(page),
            totalPages: Math.ceil(count / parseInt(limit)),
            donations
        });
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ error: 'Failed to fetch donations' });
    }
});

/**
 * GET /api/donations/impacts
 * Get donations that have impact messages (for the donor impact wall)
 */
router.get('/impacts', async (req, res) => {
    try {
        const { Op } = require('sequelize');
        const donations = await Donation.findAll({
            where: {
                displayPublicly: true,
                impactMessage: { [Op.ne]: null }
            },
            attributes: ['id', 'firstName', 'lastName', 'amount', 'programArea', 'impactMessage', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 50
        });

        res.json({ impacts: donations });
    } catch (error) {
        console.error('Error fetching impacts:', error);
        res.status(500).json({ error: 'Failed to fetch impacts' });
    }
});

/**
 * GET /api/donations/stats
 * Get aggregate donation stats
 */
router.get('/stats', async (req, res) => {
    try {
        const sequelize = require('../config/database');
        const totalDonations = await Donation.count();
        const totalAmount = await Donation.sum('amount') || 0;

        const byProgram = await Donation.findAll({
            attributes: [
                'programArea',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                [sequelize.fn('SUM', sequelize.col('amount')), 'total']
            ],
            group: ['programArea'],
            raw: true
        });

        res.json({
            totalDonations,
            totalAmount: parseFloat(totalAmount),
            byProgram
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

module.exports = router;
