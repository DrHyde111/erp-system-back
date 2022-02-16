import {Router} from "express";
import authController from "../controllers/auth.controller";

const authRouter = Router()

// Login into system
authRouter.post("/login", authController.login)

export default authRouter;