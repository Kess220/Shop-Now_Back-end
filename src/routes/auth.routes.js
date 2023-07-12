import { Router } from "express"
import { login, logout, signUp } from "../controllers/auth.controller.js"
import { schemaValidation } from "../middlewares/schemaValidation.js"
import { loginSchema, userSchema } from "../schemas/auth.schemas.js"
import { authValidation } from "../middlewares/authValidation.js"

const authRouter = Router()

authRouter.post("/sign-up", schemaValidation(userSchema), signUp)
authRouter.post("/login", schemaValidation(loginSchema), login)
authRouter.post("/logout", authValidation, logout)

export default authRouter