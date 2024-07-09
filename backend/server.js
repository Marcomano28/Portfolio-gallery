import dotenv from 'dotenv';
import app from './src/app.js'
import db from './src/db.js';

dotenv.config();

const startServer = async () => {
    const port = process.env.PORT || 4000;
    try {
        await db.connect();
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server started on port ${port}`);
        })
    } catch (error) {
        console.log('Could not start server', error);
    }
}
startServer();