import Comment from '../models/comments.js';
import Blog from '../models/blog.js';

export const createComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return res.status(400).json({ message: "Blog doesn't exist" });
    }
    
    const comment = await Comment.create({ ...req.body, blogId });
    if (!comment) {
      return res.status(400).json({ message: "Failed to create comment" });
    }
    
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const AllComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return res.status(400).json({ message: "Blog doesn't exist" });
    }
    
    const comments = await Comment.find({ blogId });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}; 