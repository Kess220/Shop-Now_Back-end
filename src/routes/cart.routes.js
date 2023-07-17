import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { cartItemSchema } from "../schemas/cartSchemas.js";
import {
  addItem,
  clearCart,
  getCartItems,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/itens", schemaValidation(cartItemSchema), addItem);
cartRouter.delete("/itens", removeItem);

cartRouter.get("/itens/:userId", getCartItems);
cartRouter.delete("/itens/usuario/:userId", clearCart);

cartRouter.put("/itens/:itemId/aumentar-quantidade", increaseQuantity);
cartRouter.put("/itens/:itemId/diminuir-quantidade", decreaseQuantity);

export default cartRouter;
