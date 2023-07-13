import { Router } from "express"
import { schemaValidation } from "../middlewares/schemaValidation";
import { cartItemSchema } from "../schemas/cartSchemas";
import { addItem, clearCart, getCartItems, removeItem, updateItemQuantity } from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post('/items', schemaValidation(cartItemSchema), addItem);
cartRouter.delete('/items/:id', removeItem);
cartRouter.put('/items/:id', schemaValidation(cartItemSchema), updateItemQuantity);
cartRouter.get('/items', getCartItems);
cartRouter.delete('/items', clearCart);

export default cartRouter