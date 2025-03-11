export interface EmailProps {
  to: string;
  subject: string;
  html: string;
}

export interface EmailTemplateData {
  name: string;
  orderId: string;
  invoicedAmount: number;
  paymentMethod: string;
  address: string;
}
