import Blog from "../models/Blog";
import { Request, Response } from "express";

const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).send(blog);
  } catch (error) {
    console.log(error);
  }
};

const allBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
};

const oneBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog) {
      res.status(200).send(blog);
    }
    res.status(404).send("Blog doesn't exist");
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      res.status(200).send(blog);
    }
    res.status(400).send("blog not found");
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
      res.status(404).send("blog not found");
    }
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
  }
};

export { createBlog, allBlogs, oneBlog, deleteBlog, updateBlog };
