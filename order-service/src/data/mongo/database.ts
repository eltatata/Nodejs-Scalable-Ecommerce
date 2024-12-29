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
}
