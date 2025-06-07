interface EmailTemplateData {
  name: string;
  orderId: string;
  invoicedAmount: number;
  paymentMethod: string;
  address: string;
}

export const emailTemplateGenerator = (
  emailTemplateData: EmailTemplateData,
): string => {
  return `
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    /* Reset styles for email clients */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.5;
      color: #333;
      background-color: #f3f4f6;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #2563eb;
      padding: 24px;
      color: white;
    }

    .logo-text {
      font-size: 24px;
      font-weight: bold;
    }

    .status-badge {
      background-color: #22c55e;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 14px;
    }

    .content {
      padding: 24px;
    }

    .greeting {
      margin-bottom: 24px;
    }

    .greeting h2 {
      font-size: 20px;
    }

    .greeting p {
      color: #666;
    }

    .order-details {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .detail-row {
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      color: #666;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .detail-value {
      font-weight: 500;
    }

    .shipping-notice {
      background-color: #eff6ff;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #1e40af;
    }

    .thank-you {
      text-align: center;
      color: #666;
      margin-bottom: 24px;
    }

    .footer {
      border-top: 1px solid #e5e7eb;
      padding: 24px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }

    .footer p {
      margin-bottom: 4px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <div class="header-content">
        <span class="logo-text">Ecommerce</span>
        <span class="status-badge">Payment Successful</span>
      </div>
    </div>

    <div class="content">
      <div class="greeting">
        <h2>Hey ${emailTemplateData.name},</h2>
        <p>Thanks for your payment. !! We've received it !!</p>
      </div>

      <div class="order-details">
        <div class="detail-row">
          <span class="detail-label">Order ID</span>
          <span class="detail-value">${emailTemplateData.orderId}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Invoiced Amount</span>
          <span class="detail-value" style="color: #16a34a;">${emailTemplateData.invoicedAmount}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Payment Method</span>
          <span class="detail-value">${emailTemplateData.paymentMethod}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Shipping Address</span>
          <span class="detail-value">${emailTemplateData.address}</span>
        </div>
      </div>

      <div class="shipping-notice">
        <p>Your order will be processed and shipped as soon as possible to the address provided.</p>
      </div>

      <div class="thank-you">
        <p>Thank you very much for your purchase! If you have any questions, please don't hesitate to contact
          our
          support team.</p>
      </div>
    </div>

    <div class="footer">
      <p>© 2024 Ecommerce. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>

</html>`;
};
