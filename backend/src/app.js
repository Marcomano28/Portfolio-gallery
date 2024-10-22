import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import languageRouter from './routes/languageRoutes.js';
import fraseRouter from './routes/fraseRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import imaUrlRoutes from './routes/imaUrlRoutes.js';

const app = express();
const allowedOrigins = ['http://localhost:5174', 'https://artcode.onrender.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed from this origin'));
        }
    }
}));
app.use(express.json());
app.use('/api', languageRouter);
app.use('/api', fraseRouter);
app.use('/api', contactRouter);
app.use('/api', imaUrlRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

export default app;

