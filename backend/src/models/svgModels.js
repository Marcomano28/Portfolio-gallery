import { Schema, model } from 'mongoose';

const svgSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    data:{
        type: String,
        required: true
    }
});
const Svgs = model('Svgs', svgSchema);
 export default Svgs;