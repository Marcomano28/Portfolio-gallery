import express from "express";
import CountryLanguage from "../models/languageModels.js";

const router = express.Router();

router.get('/languages/:countryCode', async (req, res) => {
    try {
        // Limpiar y extraer solo los primeros 2 caracteres del código del país
        const countryCode = req.params.countryCode.split(':')[0].substring(0, 2).toUpperCase();
        
        const country = await CountryLanguage.findOne({ country: countryCode });
        if (country) {
            res.json(country.languages);
        } else {
            res.status(404).json({ message: `Country not found: ${countryCode}` });     
        }
    } catch (error) {
        console.error('Error fetching languages:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;