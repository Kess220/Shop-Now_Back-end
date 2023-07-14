import { Router } from "express"
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { cartItemSchema } from "../schemas/cartSchemas.js";
import { addItem, clearCart, getCartItems, removeItem, updateItemQuantity } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post('/items', schemaValidation(cartItemSchema), addItem);
cartRouter.delete('/items/:id', removeItem);
cartRouter.put('/items/:id', schemaValidation(cartItemSchema), updateItemQuantity);
cartRouter.get('/items', getCartItems);
cartRouter.delete('/items', clearCart);

export default cartRouter