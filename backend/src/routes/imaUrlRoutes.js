import express from'express';
import imaUrl from "../models/imaUrlModel.js";

const router = express.Router();

router.get('/imageurl/:title', async ( req,res) => {
    try {
        const image = await imaUrl.findOne({title: req.params.title});
        if(!image){
            return res.status(404).send('Image not found');
        }
        //res.send('Received title: ' + req.params.title);
        res.json({ url: image.url });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal server error');
    }
});
export default router;