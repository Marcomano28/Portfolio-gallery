import express from'express';
import imaModel from '../models/imaModel.js';
 
const router = express.Router();

router.get('/ima/:name', async (req, res) => {
    try {
      const ima = await imaModel.findOne({ name: req.params.name});
      if(!ima) {
        return res.status(404).send('Image not found');
      }
      res.send(ima.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal server error');
    }
});
export default router;