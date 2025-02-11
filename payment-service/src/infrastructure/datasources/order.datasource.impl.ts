import { envs } from '../../config';
import { CheckoutDto, OrderDataSource } from '../../domain';

export class OrderDataSourceImpl implements OrderDataSource {
  async createOrder(checkoutDto: CheckoutDto): Promise<Response> {
    return fetch(`${envs.ORDER_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: checkoutDto.userId,
        items: checkoutDto.items,
      }),
    });
  }

  async updateOrder(orderId: string, address: string): Promise<Response> {
    return fetch(`${envs.ORDER_API_URL}/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'paid',
        address,
      }),
    });
  }
}
