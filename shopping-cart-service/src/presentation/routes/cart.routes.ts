import { Router } from "express";
import { CartDataSourceImpl, CartRepositoryImpl } from "../../infrastructure";
import { CartController } from "../";

export class CartRoutes {
  static get routes(): Router {
    const router = Router();

    const cartDataSource = new CartDataSourceImpl();
    const cartRepository = new CartRepositoryImpl(cartDataSource);
    const cartController = new CartController(cartRepository);

    router.post("/:userId", cartController.addItem);
    router.get("/:userId", cartController.getCart);
    router.put("/:userId/:productId", cartController.updateQuantity);
    router.delete("/:userId/:productId", cartController.deleteItem);

    return router;
  }
}