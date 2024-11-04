import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import { CreateProduct, CreateProductDto, DeleteProduct, FindProduct, FindProducts, ProductRepository, UpdateProduct, UpdateProductDto } from '../../domain';

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) { }

  findProducts = (req: Request, res: Response) => {
    new FindProducts(this.productRepository)
      .execute()
      .then(products => res.status(200).json(products))
      .catch(error => ErrorHandlerService.handleError(error, res));
  }

  findProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    new FindProduct(this.productRepository)
      .execute(id)
      .then(product => res.status(200).json(product))
      .catch(error => ErrorHandlerService.handleError(error, res));
  }

  createProduct = (req: Request, res: Response) => {
    const data = {
      ...req.body,
      images: Array.isArray(req.files) ? req.files.map((file: Express.Multer.File) => file.buffer) : [],
      price: parseFloat(req.body.price),
      inventory: parseInt(req.body.inventory, 10)
    };

    const { errors, validatedData } = CreateProductDto.create(data);
    if (errors) { res.status(400).json({ errors }); return; }

    new CreateProduct(this.productRepository)
      .execute(validatedData!)
      .then(product => res.status(201).json(product))
      .catch(error => ErrorHandlerService.handleError(error, res));
  }

  updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = {
      ...req.body,
      id,
      images: Array.isArray(req.files) ? req.files.map((file: Express.Multer.File) => file.buffer) : [],
      price: parseFloat(req.body.price),
      inventory: parseInt(req.body.inventory, 10)
    };

    const { errors, validatedData } = UpdateProductDto.update(data);
    if (errors) { res.status(400).json({ errors }); return; }

    new UpdateProduct(this.productRepository)
      .execute(validatedData!)
      .then(product => res.status(200).json(product))
      .catch(error => ErrorHandlerService.handleError(error, res));
  }

  deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteProduct(this.productRepository)
      .execute(id)
      .then(() => res.status(204).send())
      .catch(error => ErrorHandlerService.handleError(error, res));
  }
}
