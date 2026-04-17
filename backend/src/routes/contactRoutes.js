import express from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const DEFAULT_CONTACT_RECIPIENT = 'masnopuedo2021@gmail.com';
const RESEND_API_URL = 'https://api.resend.com/emails';
const RESEND_USER_AGENT = 'portfolio-gallery-contact/1.0';
const contactAttempts = new Map();

const normalizeField = (value) => typeof value === 'string' ? value.trim() : '';
const escapeHtml = (value) => normalizeField(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildContactText = ({ name, email, message }) => `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
const buildContactHtml = ({ name, email, message }) => {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />');

    return `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
    `;
};

const getResendErrorMessage = (error) => {
    const data = error?.response?.data;

    if (typeof data?.message === 'string' && data.message) {
        return data.message;
    }

    if (typeof data?.error === 'string' && data.error) {
        return data.error;
    }

    if (typeof error?.message === 'string' && error.message) {
        return error.message;
    }

    return 'Error sending message';
};

const getClientIp = (req) => {
    const forwardedFor = req.headers['x-forwarded-for'];

    if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
        return forwardedFor.split(',')[0].trim();
    }

    return req.ip || req.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (req) => {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    const recentAttempts = (contactAttempts.get(clientIp) || []).filter((timestamp) => timestamp > windowStart);

    if (recentAttempts.length >= MAX_REQUESTS_PER_WINDOW) {
        contactAttempts.set(clientIp, recentAttempts);
        return true;
    }

    recentAttempts.push(now);
    contactAttempts.set(clientIp, recentAttempts);
    return false;
};

router.post('/send-email', async (req, res) => {
    const name = normalizeField(req.body?.name);
    const email = normalizeField(req.body?.email);
    const message = normalizeField(req.body?.message);
    const resendApiKey = normalizeField(process.env.RESEND_API_KEY);
    const resendFromEmail = normalizeField(process.env.RESEND_FROM_EMAIL);
    const contactRecipientEmail = normalizeField(process.env.CONTACT_TO_EMAIL) || normalizeField(process.env.EMAIL_USER) || DEFAULT_CONTACT_RECIPIENT;
    const emailUser = normalizeField(process.env.EMAIL_USER);
    const emailPass = normalizeField(process.env.EMAIL_PASS);

    if (isRateLimited(req)) {
        return res.status(429).json({
            error: 'Too many messages from this connection. Please try again in 15 minutes.'
        });
    }

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (name.length > MAX_NAME_LENGTH) {
        return res.status(400).json({ error: `Name cannot exceed ${MAX_NAME_LENGTH} characters.` });
    }

    if (email.length > MAX_EMAIL_LENGTH) {
        return res.status(400).json({ error: `Email cannot exceed ${MAX_EMAIL_LENGTH} characters.` });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.` });
    }

    if (!EMAIL_REGEX.test(contactRecipientEmail)) {
        return res.status(500).json({ error: 'Contact recipient email is not configured correctly.' });
    }

    const text = buildContactText({ name, email, message });

    if (resendApiKey) {
        if (!resendFromEmail) {
            return res.status(500).json({ error: 'Resend is not fully configured. Add RESEND_FROM_EMAIL.' });
        }

        try {
            const response = await axios.post(
                RESEND_API_URL,
                {
                    from: resendFromEmail,
                    to: [contactRecipientEmail],
                    subject: `New message from ${name}`,
                    reply_to: email,
                    text,
                    html: buildContactHtml({ name, email, message }),
                },
                {
                    headers: {
                        Authorization: `Bearer ${resendApiKey}`,
                        'Content-Type': 'application/json',
                        'User-Agent': RESEND_USER_AGENT,
                    },
                }
            );

            console.log('Resend email sent:', response.data?.id || 'unknown-id');
            return res.status(200).json({ message: 'Message sent successfully' });
        } catch (error) {
            const resendMessage = getResendErrorMessage(error);
            const resendStatus = error?.response?.status;

            console.error('Error sending email with Resend:', error?.response?.data || error);
            return res.status(resendStatus >= 400 && resendStatus < 500 ? resendStatus : 500).json({
                error: resendMessage,
            });
        }
    }

    if (!emailUser || !emailPass) {
        return res.status(500).json({
            error: 'Email service is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL, or SMTP credentials for local development.'
        });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

    const mailOptions = {
        from: `"Portfolio contact form" <${emailUser}>`,
        replyTo: email,
        to: contactRecipientEmail,
        subject: `New message from ${name}`,
        text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail sent:', info.response);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
});

export default router;
