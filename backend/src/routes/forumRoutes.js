import express from "express"
import {
  createCategory, 
  getAllCategories, 
  createPost, 
  getAllPosts, 
  getPostById, 
  updatePost, 
  deletePost, 
  likePost, 
  createReply, 
  updateReply, 
  deleteReply, 
  likeReply, 
  searchForum 
} from "../controllers/forumController.js"
import {verifyUserToken} from "../middleware/verifyToken.js"


const router = express.Router();

// Category routes
router.post('/forum/categories', verifyUserToken, createCategory);
router.get('/forum/categories', getAllCategories);

// Post routes
router.post('/forum/posts', verifyUserToken, createPost);
router.get('/forum/posts', getAllPosts);
router.get('/forum/posts/:postId', getPostById);
router.put('/forum/posts/:postId', verifyUserToken, updatePost);
router.delete('/forum/posts/:postId', verifyUserToken, deletePost);
router.post('/forum/posts/:postId/like', verifyUserToken, likePost);

// Reply routes
router.post('/forum/posts/:postId/replies', verifyUserToken, createReply);
router.put('/forum/replies/:replyId', verifyUserToken, updateReply);
router.delete('/forum/replies/:replyId', verifyUserToken, deleteReply);
router.post('/forum/replies/:replyId/like', verifyUserToken, likeReply);

// Search route
router.get('/forum/search', searchForum);

export default router;