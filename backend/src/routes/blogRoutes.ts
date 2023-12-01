import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  oneBlog,
  updateBlog,
} from "../controllers/blogController";
import { verifyUserToken } from "../middleware/verifyToken";

const blogRoute = express.Router();

blogRoute.post("/postBlog", verifyUserToken, createBlog);
blogRoute.get("/allBlogs", allBlogs);
blogRoute.get("/oneBlog/:id", oneBlog);
blogRoute.delete("/deleteBlog/:id", verifyUserToken, deleteBlog);
blogRoute.patch("/updateBlog/:id", verifyUserToken, updateBlog);
export default blogRoute;
