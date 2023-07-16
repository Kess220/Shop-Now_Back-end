import { Router } from "express"
import { authValidation } from "../middlewares/authValidation.js"
import { getProfile } from "../controllers/profile.controller.js"

const profileRouter = Router()

profileRouter.get("/profile", authValidation, getProfile); 

export default profileRouter



