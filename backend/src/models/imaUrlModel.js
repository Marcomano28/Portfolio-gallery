import { model, Schema } from "mongoose";

const imaUrlSchema = new Schema ({
    title: { type: String, required: true },
    url: { type: String, required: true }
});
const imaUrl = model('ImageUrl', imaUrlSchema);
export default imaUrl;
