import express from 'express';
import cors from 'cors';

import languageRouter from './routes/languageRoutes.js';
import fraseRouter from './routes/fraseRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import imaUrlRoutes from './routes/imaUrlRoutes.js';

const app = express();
const allowedOrigins = ['http://localhost:5174', 'https://artcode.onrender.com','https://artbycode-gallery-228f649ce407.herokuapp.com'];
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


export default app;
