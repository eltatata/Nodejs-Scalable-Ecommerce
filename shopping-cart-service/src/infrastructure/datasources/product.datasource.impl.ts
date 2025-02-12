import { envs } from '../../config';
import { ProductDataSource } from '../../domain';

export class ProductDataSourceImpl implements ProductDataSource {
  async findProductById(id: string): Promise<Response> {
    return await fetch(`${envs.PRODUCTS_API_URL}/${id}`);
  }
}
