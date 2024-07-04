import express from 'express';
import cors from 'cors';
import svgRoutes from './routes/svgRoutes.js';
import languageRouter from './routes/languageRoutes.js';
import fraseRouter from './routes/fraseRoutes.js';

const app = express();
app.use(cors({
    origin: ['http://localhost:5174']  
}));

app.use(express.json());
app.use('/api', svgRoutes);
app.use('/api', languageRouter);
app.use('/api', fraseRouter);
export default app;

