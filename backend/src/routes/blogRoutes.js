import express from 'express';
import { 
  allBlogs, 
  createBlog, 
  deleteBlog, 
  oneBlog, 
  updateBlog 
} from '../controllers/blogController.js';
import { verifyUserToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/postBlog", verifyUserToken, createBlog);
router.get("/allBlogs", allBlogs);
router.get("/oneBlog/:id", oneBlog);
router.delete("/deleteBlog/:id", verifyUserToken, deleteBlog);
router.patch("/updateBlog/:id", verifyUserToken, updateBlog);

export default router; 