import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        _id: false,
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model('Order', orderSchema);
