import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    items: [
      {
        _id: false,
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price must be a positive number'],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Cart = mongoose.model('Cart', cartSchema);
