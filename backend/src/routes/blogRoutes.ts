import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  oneBlog,
  updateBlog,
} from "../controllers/blogController";

const blogRouter = express.Router();
blogRouter.post("/postBlog", createBlog);
blogRouter.get("/allBlogs", allBlogs);
blogRouter.get("/oneBlog/:id", oneBlog);
blogRouter.delete("/deleteBlog/:id", deleteBlog);
blogRouter.patch("/updateBlog/:id", updateBlog);
export default blogRouter;
