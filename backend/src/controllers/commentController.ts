import Comment from "../models/comments";
import { Request, Response } from "express";
import Blog from "../models/blog";

export const createComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.find({ blogId });
    if (!blog) {
      return res.status(400).send("blog doesn't exist");
    }
    const comment = await Comment.create({ ...req.body, blogId });
    if (!comment) {
      console.log("don't create");
    }
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
  }
};

export const AllComments = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.find({ blogId });
    if (!blog) {
      return res.status(400).send("blog doesn't exist");
    }
    const comments = await Comment.find({ blogId });
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!comment) {
      res.status(404).send("comment not found");
    }
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send(comment);
  } catch (error) {
    console.log(error);
  }
};
