const { Router } = require('express');
const multer = require('multer');
const { sendEmail } = require('../services/emailService');

const router = Router();

const CONTACT_RECIPIENT = 'contact@engineers4humanity.org';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
        const allowed = /\.(pdf|doc|docx|jpg|jpeg|png|gif|txt|xls|xlsx|ppt|pptx)$/i;
        if (allowed.test(file.originalname)) {
            cb(null, true);
        } else {
            cb(new Error('File type not allowed. Accepted: PDF, Word, Excel, PowerPoint, images, text.'));
        }
    },
});

/**
 * POST /api/contact
 * Accepts multipart/form-data. Optional file field: "attachment".
 * File is held in memory, converted to base64, and forwarded as a
 * Brevo email attachment — nothing is written to disk.
 */
router.post('/', upload.single('attachment'), async (req, res) => {
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

        // Convert uploaded file buffer → base64 for Brevo attachment
        const attachments = [];
        if (req.file) {
            attachments.push({
                name: req.file.originalname,
                content: req.file.buffer.toString('base64'),
            });
        }

        await sendEmail(
            CONTACT_RECIPIENT,
            `New Contact Message from ${name}`,
            'Contact-us-notification',
            { name, email, message, date, year },
            attachments
        );

        res.json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
        if (error.message?.includes('File type not allowed')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File is too large. Maximum size is 10 MB.' });
        }
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'Failed to send your message. Please try again.' });
    }
});

module.exports = router;
