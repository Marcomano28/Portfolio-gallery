import express from "express";
import Frase from "../models/fraseModels.js";

const router = express.Router();
router.get('/frase/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const phrase = await Frase.find({ language: language });
        if (phrase.length > 0) {
            res.json(phrase);
        } else {
            res.status(404).json({ message: 'No phrases found for this language' });
        }
    } catch (error) {
        console.error('Error fetching phrases:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
export default router;