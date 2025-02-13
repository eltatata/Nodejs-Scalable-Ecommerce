import { envs } from '../../config';
import { ProductDataSource } from '../../domain';

export class ProductDataSourceImpl implements ProductDataSource {
  async findProductById(id: string): Promise<Response> {
    return await fetch(`${envs.PRODUCTS_API_URL}/${id}`);
  }

  async deductProduct(id: string, quantity: number): Promise<Response> {
    return await fetch(`${envs.PRODUCTS_API_URL}/${id}/deduct`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
  }
}
