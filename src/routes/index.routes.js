import { Router } from "express"
import authRouter from "./auth.routes.js"
import cartRouter from "./cart.routes.js"
import produtosRoute from "./produtos.routes.js"

const router = Router()
router.use(authRouter)
router.use(cartRouter)
router.use(produtosRoute)
export default router