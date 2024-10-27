import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
};

export { connectDB, disconnectDB };