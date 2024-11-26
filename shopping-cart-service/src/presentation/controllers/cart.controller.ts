import { Request, Response } from "express";
import { ErrorHandlerService } from "../";
import { AddItem, CartRepository, GetCart } from "../../domain";

export class CartController {
  constructor(private cartRepository: CartRepository) { }

  addItem = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const item = req.body;

    new AddItem(this.cartRepository)
      .execute(userId, item)
      .then((cart) => res.status(201).json(cart))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  }

  getCart = async (req: Request, res: Response) => {
    const { userId } = req.params;

    new GetCart(this.cartRepository)
      .execute(userId)
      .then((cart) => res.status(200).json(cart))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  }
}
