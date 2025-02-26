import express from 'express';
import generateCourses from '../controllers/generateCourses.js';

const router = express.Router();

router.post("/generateCourses", generateCourses);

export default router; 