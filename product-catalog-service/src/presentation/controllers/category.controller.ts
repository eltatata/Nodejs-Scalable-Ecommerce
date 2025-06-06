import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import {
  CategoryRepository,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../domain';
import {
  CreateCategory,
  DeleteCategory,
  FindCategories,
  FindCategory,
  UpdateCategory,
} from '../../application';

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findCategories = (req: Request, res: Response) => {
    new FindCategories(this.categoryRepository)
      .execute()
      .then((categories) => res.status(200).json(categories))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  findCategory = (req: Request, res: Response) => {
    const { id } = req.params;

    new FindCategory(this.categoryRepository)
      .execute(id)
      .then((category) => res.status(200).json(category))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  createCategory = (req: Request, res: Response) => {
    const { errors, validatedData } = CreateCategoryDto.create(req.body);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new CreateCategory(this.categoryRepository)
      .execute(validatedData!)
      .then((category) => res.status(201).json(category))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  updateCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const { errors, validatedData } = UpdateCategoryDto.update({
      ...req.body,
      id,
    });
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new UpdateCategory(this.categoryRepository)
      .execute(validatedData!)
      .then((category) => res.status(200).json(category))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteCategory(this.categoryRepository)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
