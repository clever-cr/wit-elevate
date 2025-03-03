import Blog from '../models/blog.js';
import Response from '../utils/Response.js';
import status from 'http-status';

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return Response.succesMessage(
      res,
      "Blog created successfully",
      blog,
      status.CREATED
    );
  } catch (error) {
    console.log(error);
    return Response.errorMessage(
      res,
      "Failed to create blog",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const allBlogs = async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const blogs = await Blog.find()
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    return Response.succesMessage(
      res,
      "Blogs retrieved successfully",
      blogs,
      status.OK
    );
  } catch (error) {
    console.log(error);
    return Response.errorMessage(
      res,
      "Failed to fetch blogs",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const oneBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return Response.errorMessage(
        res,
        "Blog not found",
        status.NOT_FOUND
      );
    }
    return Response.succesMessage(
      res,
      "Blog retrieved successfully",
      blog,
      status.OK
    );
  } catch (error) {
    console.log(error);
    return Response.errorMessage(
      res,
      "Failed to fetch blog",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}; 