import express from 'express';
import {
  createComment,
  AllComments,
  deleteComment,
  updateComment,
} from '../controllers/commentController.js';
import { verifyUserToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/postComment/:blogId", verifyUserToken, createComment);
router.get("/comments/:blogId", AllComments);
router.delete("/comment/:id", verifyUserToken, deleteComment);
router.patch("/comment/:id", verifyUserToken, updateComment);

export default router; 