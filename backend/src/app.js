import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import languageRouter from './routes/languageRoutes.js';
import fraseRouter from './routes/fraseRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import imaUrlRoutes from './routes/imaUrlRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de CORS para permitir solicitudes desde múltiples orígenes
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://artcode-gallery.vercel.app',
  'https://portfolio-gallery.vercel.app',
  'https://portfolio-gallery-app-891376441044.herokuapp.com',
  // Añade aquí cualquier otro dominio que necesites permitir
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Origen bloqueado por CORS:', origin);
      callback(null, true); // Permitir todos los orígenes en desarrollo
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api', languageRouter);
app.use('/api', fraseRouter);
app.use('/api', contactRouter);
app.use('/api', imaUrlRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
    // Ruta a los archivos estáticos (dist de Vite)
    const staticPath = path.resolve(__dirname, '../../public');
    app.use(express.static(staticPath));

    // Para cualquier otra ruta, enviar el index.html
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.resolve(staticPath, 'index.html'));
        }
    });
}

export default app;
