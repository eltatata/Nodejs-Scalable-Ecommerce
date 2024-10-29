import { CustomError } from "../";

export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
  ) { }

  static fromObject(obj: any): CategoryEntity {
    const { id, _id, name, description } = obj;

    if (!id && _id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");

    return new CategoryEntity(id || _id, name, description ? description : undefined);
  }
}
