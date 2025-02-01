import { CustomError } from '../';

interface ProductEntityProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: { secureUrl: string; publicId: string }[];
}

export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public inventory: number,
    public images: { secureUrl: string; publicId: string }[],
  ) {}

  static fromObject(obj: unknown): ProductEntity {
    const { id, name, description, price, category, inventory, images } =
      obj as ProductEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!description) throw CustomError.badRequest('Missing description');
    if (!price) throw CustomError.badRequest('Missing price');
    if (!category) throw CustomError.badRequest('Missing category');
    if (inventory === undefined || inventory === null)
      throw CustomError.badRequest('Missing inventory');
    if (!images) throw CustomError.badRequest('Missing images');

    return new ProductEntity(
      id,
      name,
      description,
      price,
      category,
      inventory,
      images,
    );
  }
}
