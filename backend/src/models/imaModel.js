import { model, Schema } from "mongoose";

const imaSchema = new Schema ({
    name: { type: String, required: true },
    data: { type: String, required: true } 
});
const imaModel = model('Image', imaSchema);

export default imaModel;