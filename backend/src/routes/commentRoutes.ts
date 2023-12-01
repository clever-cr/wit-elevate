import express from "express";
import {
  createComment,
  AllComments,
  deleteComment,
  updateComment,
} from "../controllers/commentController";
import { verifyUserToken } from "../middleware/verifyToken";
const commentRoute = express.Router();

commentRoute.post("/postComment/:blogId", verifyUserToken, createComment);
commentRoute.get("/comments/:blogId", AllComments);
commentRoute.delete("/comment/:id", verifyUserToken, deleteComment);
commentRoute.patch("/comment/:id", verifyUserToken, updateComment);

export default commentRoute;
