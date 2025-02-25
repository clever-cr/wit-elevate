const Blog = require('../models/blog');

const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const allBlogs = async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const userId = req.query.user;
    let query = {};
    if (userId) {
      query = { createdBy: userId };
    }

    const blogs = await Blog.find(query).limit(limit);
    res.status(200).send(blogs);
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const oneBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog) {
      return res.status(200).send(blog);
    }
    res.status(404).send("Blog doesn't exist");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(400).send("blog not found");
    }
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
      return res.status(404).send("blog not found");
    }
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBlog, allBlogs, oneBlog, deleteBlog, updateBlog }; 