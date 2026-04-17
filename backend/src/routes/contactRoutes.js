import express from "express";
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
const contactAttempts = new Map();

const normalizeField = (value) => typeof value === 'string' ? value.trim() : '';
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

    if (!emailUser || !emailPass) {
        return res.status(500).json({ error: 'Email service is not configured.' });
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
        to: 'masnopuedo2021@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
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
