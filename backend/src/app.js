import express from 'express';
import cors from 'cors';
import axios from 'axios'; 
import languageRouter from './routes/languageRoutes.js';
import fraseRouter from './routes/fraseRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import imaUrlRoutes from './routes/imaUrlRoutes.js';

const app = express();
const allowedOrigins = [
    'http://localhost:5174',
    'https://artcode.onrender.com',
    'https://artbycode-gallery-228f649ce407.herokuapp.com', 
];
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

//manejar la solicitud a la API de zona horaria
app.get('/api/timezone', async (req, res) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.API_KEY_TZ;

    if (!lat || !lon) {
        return res.status(400).json({ message: 'Latitud y longitud son requeridas.' });
    }

    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            res.json({ zoneName: response.data.zoneName });
        } else {
            res.status(400).json({ message: response.data.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la zona horaria.', error: error.message });
    }
});

app.use('/api', languageRouter);
app.use('/api', fraseRouter);
app.use('/api', contactRouter);
app.use('/api', imaUrlRoutes);

export default app;
