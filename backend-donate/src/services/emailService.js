require('dotenv').config();
const { BrevoClient } = require('@getbrevo/brevo');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const brevoClient = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
const senderEmail = process.env.EMAIL_FROM;
const senderName = process.env.EMAIL_FROM_NAME || 'Engineers4Humanity';

function loadTemplate(templateName, data) {
    const templatePath = path.join(process.cwd(), 'src', 'templates', `${templateName}.hbs`);
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Email template "${templateName}" not found at ${templatePath}`);
    }
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(source);
    return template(data);
}

async function sendEmail(to, subject, templateName, templateData) {
    const html = loadTemplate(templateName, templateData);
    const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];

    await brevoClient.transactionalEmails.sendTransacEmail({
        sender: { email: senderEmail, name: senderName },
        to: recipients,
        subject,
        htmlContent: html,
    });
}

module.exports = { sendEmail };
