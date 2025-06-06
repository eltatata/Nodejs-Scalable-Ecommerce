import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import { CartRepository, ProductRepository } from '../../domain';
import {
  AddItem,
  ClearCart,
  DeleteItem,
  GetCart,
  UpdateQuantity,
} from '../../application';

export class CartController {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  addItem = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const item = req.body;

    new AddItem(this.cartRepository, this.productRepository)
      .execute(userId, item)
      .then((cart) => res.status(201).json(cart))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  getCart = async (req: Request, res: Response) => {
    const { userId } = req.params;

    new GetCart(this.cartRepository)
      .execute(userId)
      .then((cart) => res.status(200).json(cart))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  updateQuantity = async (req: Request, res: Response) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    new UpdateQuantity(this.cartRepository, this.productRepository)
      .execute(userId, productId, quantity)
      .then(() => res.status(204).send())
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  deleteItem = async (req: Request, res: Response) => {
    const { userId, productId } = req.params;

    new DeleteItem(this.cartRepository)
      .execute(userId, productId)
      .then(() => res.status(204).send())
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  clearCart = async (req: Request, res: Response) => {
    const { userId } = req.params;

    new ClearCart(this.cartRepository)
      .execute(userId)
      .then(() => res.status(204).send())
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
