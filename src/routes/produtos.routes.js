import { Router } from "express"
import { authValidation } from "../middlewares/authValidation.js"
import { getProdutos } from "../controllers/produtos.controller.js"

const produtosRoute = Router()

produtosRoute.get("/produtos", authValidation, getProdutos)

export default produtosRoute