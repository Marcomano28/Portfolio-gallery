import { Schema, model } from 'mongoose';

const fraseSchema = new Schema({
    text: { 
         type: String,
         required: true
         },
    country: [{ 
          type: String,
          required: true 
     }],
    language: {
         type: String,
         required: true
    }     
});
const Frase = model('Frase',fraseSchema);
export default Frase;