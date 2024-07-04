import express from "express";
import CountryLanguage from "../models/languageModels.js";
const router = express.Router();
router.get('/languages/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode.toUpperCase();
    try{
        const country = await CountryLanguage.findOne({ country: countryCode});
        if(country){
            res.json(country.languages);
        }else{
            res.status(404).json({message: 'Country not found'});     
        }
        }catch(error){
            res.status(500).json({message:'Server error',error: error.message});
        }
});
export default router;