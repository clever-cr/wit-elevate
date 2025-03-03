// import express from 'express';
// import { 
//   getAssessments, 
//   getAssessment, 
//   submitAssessment, 
//   getStudentAssessments,
//   createAssessment 
// } from '../controllers/assessments.js';


// const router = express.Router();

// // Public routes
// router.get('/assessments', getAssessments);
// router.get('/assessments/:id', getAssessment);

// // Protected routes (require authentication)
// router.post('/assessments/:id/submit', authenticateUser, submitAssessment);
// router.get('/my-assessments', authenticateUser, getStudentAssessments);
// router.post('/assessments', authenticateUser, createAssessment);

// export default router;

import express from 'express';
import { 
  getAssessments,
  getAssessment,
  submitAssessment,
  getStudentAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment
} from '../controllers/assessmentController.js';

// import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Student routes
router.get('/assessments', getAssessments);
router.get('/assessments/:id',  getAssessment);
router.post('/assessments/:id/submit', submitAssessment);
router.get('/my-assessments', getStudentAssessments);

// Admin routes
router.post('/assessments',  createAssessment);
router.put('/assessments/:id', updateAssessment);
router.delete('/assessments/:id', deleteAssessment);

export default router;