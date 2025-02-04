export interface CreatePaymentData {
  orderId: string;
  amount: number;
  status: string;
  paymentMethod: string;
}
