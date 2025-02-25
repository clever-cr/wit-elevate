const express = require('express');
const { allBlogs, createBlog, deleteBlog, oneBlog, updateBlog } = require('../controllers/blogController');
const { verifyUserToken } = require('../middleware/verifyToken');

const router = express.Router();

router.post("/postBlog", verifyUserToken, createBlog);
router.get("/allBlogs", allBlogs);
router.get("/oneBlog/:id", oneBlog);
router.delete("/deleteBlog/:id", verifyUserToken, deleteBlog);
router.patch("/updateBlog/:id", verifyUserToken, updateBlog);

module.exports = router; 