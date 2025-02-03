import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Payment', paymentSchema);
