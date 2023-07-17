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
cartRouter.delete("/itens/:id", removeItem);
cartRouter.get("/itens/:id", getCartItems);
cartRouter.delete("/itens", clearCart);

cartRouter.put("/itens/:id/aumentar-quantidade", increaseQuantity);
cartRouter.put("/itens/:id/diminuir-quantidade", decreaseQuantity);

export default cartRouter;
