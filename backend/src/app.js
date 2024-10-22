import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
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
const __dirname = dirname(__filename);

// Verificar si la carpeta 'dist' del frontend existe
const distPath = path.join(__dirname, '../frontend/dist');
if (!fs.existsSync(distPath)) {
  console.warn('Warning: The dist folder does not exist. Make sure to build the frontend correctly.');
} else {
  console.log('Dist folder found. Proceeding to serve static files.');
}
// Configura el servidor para servir los archivos del frontend desde 'frontend/dist'
console.log('Setting up static middleware to serve frontend files from frontend/dist');
app.use(express.static(distPath));

// Ruta para manejar todas las peticiones y servir index.html del frontend
app.get('*', (req, res) => {
    console.log(`Received request for: ${req.originalUrl}`);
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Error loading the page');
      }
    });
  });

// Log para verificar que el servidor está listo para exportar
console.log('Express app setup complete. Ready to export.');

export default app;
