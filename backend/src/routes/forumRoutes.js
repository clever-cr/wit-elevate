import express from 'express';
import { 
  getThreads,
  getThread,
  createThread,
  createReply,
  toggleLike,
  toggleResolved
} from '../controllers/forumController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/threads', getThreads);
router.get('/threads/:id', getThread);

// Protected routes
router.post('/threads', authenticateUser, createThread);
router.post('/threads/:threadId/replies', authenticateUser, createReply);
router.post('/posts/:id/like', authenticateUser, toggleLike);
router.patch('/threads/:id/resolve', authenticateUser, toggleResolved);

export default router; 