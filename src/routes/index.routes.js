import { Router } from "express"
import authRouter from "./auth.routes.js"
import produtosRoute from "./produtos.routes.js"
import cartRouter from "./cart.routes.js"
import profileRouter from "./profile.routes.js"


const router = Router()

router.use(authRouter)
router.use(produtosRoute)
router.use(profileRouter)
router.use(cartRouter)


export default router