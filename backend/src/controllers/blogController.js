import Blog from '../models/blog.js';

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      message: "Blog created successfully",
      blog
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allBlogs = async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const blogs = await Blog.find()
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const oneBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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