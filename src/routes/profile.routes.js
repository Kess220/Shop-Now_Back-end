import { Router } from "express"
import { authValidation } from "../middlewares/authValidation.js"
import { getProfile, changeName, changeEmail, changePassword, changeImage } from "../controllers/profile.controller.js"

const profileRouter = Router()

profileRouter.get("/profile/:userId", authValidation, getProfile);
profileRouter.put("/profile/update-name/:userId", authValidation, changeName);
profileRouter.put("/profile/update-email/:userId", authValidation, changeEmail);
profileRouter.put("/profile/update-password/:userId", authValidation, changePassword);
profileRouter.put("/profile/update-image/:userId", authValidation, changeImage);


export default profileRouter