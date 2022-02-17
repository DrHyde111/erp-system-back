import {Router} from "express";
import authController from "../controllers/auth.controller";

const authRouter = Router()

// Login into system
authRouter.post("/login", authController.login)

// Check if token is correct
authRouter.post("/check", authController.checkToken)

export default authRouter;