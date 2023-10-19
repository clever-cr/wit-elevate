import express from "express";
import { signUp, signIn } from "../controllers/authController";

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/signIn", signIn);

export default authRouter;
