import mongoose from 'mongoose';

export class MongoDatabase {
  static async connect(uri: string) {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
    }
  }
}
