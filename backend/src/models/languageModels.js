import { Schema, model } from 'mongoose';

const countryLanguageSchema = new Schema({
  country: {
    type: String,
    required: true,
    unique: true,
    uppercase: true 
  },
  languages: [{
    type: String,
    required: true
  }]
});

const CountryLanguage = model('CountryLanguage', countryLanguageSchema);

export default CountryLanguage;