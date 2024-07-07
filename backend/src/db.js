import mongoose from 'mongoose';
import dotenv from 'dotenv';

const mongoDbUri = process.env.MONGO_URI;

if (!mongoDbUri) {
    console.log('MONGODB_URI environment variable is not defined');
    process.exit(1);
}
const connect = async () => await mongoose.connect(mongoDbUri);
const close = async () => await mongoose.connection.close();

export default { connect, close };