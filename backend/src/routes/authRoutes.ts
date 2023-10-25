import express from "express";
import { signUp, signIn, editRole } from "../controllers/authController";

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/signIn", signIn);
authRouter.patch("/editRole/:id", editRole);
export default authRouter;
