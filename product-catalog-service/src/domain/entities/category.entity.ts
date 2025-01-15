import { CustomError } from '../';

interface CategoryEntityProps {
  id: string;
  name: string;
  description?: string;
}

export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
  ) {}

  static fromObject(obj: unknown): CategoryEntity {
    const { id, name, description } = obj as CategoryEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');

    return new CategoryEntity(id, name, description ? description : undefined);
  }
}
