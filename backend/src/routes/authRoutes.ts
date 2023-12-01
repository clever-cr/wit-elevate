import express from "express";
import { signUp, signIn, editRole } from "../controllers/authController";

const authRoute = express.Router();
authRoute.post("/signUp", signUp);
authRoute.post("/signIn", signIn);
authRoute.patch("/editRole/:id", editRole);
export default authRoute;
