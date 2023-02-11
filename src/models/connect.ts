import mongoose from 'mongoose';
import 'dotenv/config';

const URI = String(process.env.MONGO_URI);

const connection = async () => {
  await mongoose.connect(URI);
  console.log('Connected to Mongo!');
}

export default connection;
