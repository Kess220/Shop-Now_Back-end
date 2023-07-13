import { Router } from "express"
import authRouter from "./auth.routes.js"
import produtosRoute from "./produtos.routes.js"

const router = Router()

router.use(authRouter)
router.use(produtosRoute)

export default router