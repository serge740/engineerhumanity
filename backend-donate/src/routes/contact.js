const { Router } = require('express');
const { sendEmail } = require('../services/emailService');

const router = Router();

const CONTACT_RECIPIENT = 'contact@engineers4humanity.org';

/**
 * POST /api/contact
 * Sends a contact form message to the Engineers4Humanity inbox via Brevo
 */
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, message } = req.body;

        if (!first_name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please provide a valid email address.' });
        }

        const name = `${first_name} ${last_name || ''}`.trim();
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const year = new Date().getFullYear();

        await sendEmail(
            CONTACT_RECIPIENT,
            `New Contact Message from ${name}`,
            'Contact-us-notification',
            { name, email, message, date, year }
        );

        res.json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'Failed to send your message. Please try again.' });
    }
});

module.exports = router;
