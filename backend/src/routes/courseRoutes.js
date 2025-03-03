import express from 'express';
import { generateCourses, getUserCourses } from '../controllers/generateCourses.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/courses/generate/:userId', verifyToken, generateCourses);
router.get('/courses/:userId', verifyToken, getUserCourses);

export default router; 