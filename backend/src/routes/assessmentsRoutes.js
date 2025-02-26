import express from 'express';
import { 
  getAssessments, 
  getAssessment, 
  submitAssessment, 
  getStudentAssessments,
  createAssessment 
} from '../controllers/assessmentController.js';
import { authenticateUser } from '../middleware/auth.js'; // Assuming you have auth middleware

const router = express.Router();

// Public routes
router.get('/assessments', getAssessments);
router.get('/assessments/:id', getAssessment);

// Protected routes (require authentication)
router.post('/assessments/:id/submit', authenticateUser, submitAssessment);
router.get('/my-assessments', authenticateUser, getStudentAssessments);
router.post('/assessments', authenticateUser, createAssessment);

export default router;