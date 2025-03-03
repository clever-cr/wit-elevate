import express from 'express';
import { generateCourses, getUserCourses } from '../controllers/generateCourses.js';


const router = express.Router();

router.post('/courses/generate/:userId',  generateCourses);
router.get('/courses/:userId',  getUserCourses);

export default router; 