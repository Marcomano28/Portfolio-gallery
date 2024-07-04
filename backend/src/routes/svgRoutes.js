import express from 'express';
import Svgs from '../models/svgModels.js';
const router = express.Router();
router.get('/svg/:name', async (req, res) => {
    try {
        const svg = await Svgs.findOne({ name: req.params.name });
        if (!svg) {
            return res.status(404).send('SVG not found');
        }
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg.data);
    } catch (error) {
        console.error('Error fetching SVG:', error);
        res.status(500).send('Internal server error');
    }
});
export default router;