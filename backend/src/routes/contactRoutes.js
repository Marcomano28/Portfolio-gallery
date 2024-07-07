import express from "express";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
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
