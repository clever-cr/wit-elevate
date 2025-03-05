


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
import { verifyUserToken } from '../middleware/verifyToken.js';



const router = express.Router();


router.get('/assessments', getAssessments);
router.get('/assessments/:id', getAssessment);
router.post('/assessments/submit/:id', verifyUserToken, submitAssessment);
router.get('/my-assessments', verifyUserToken, getStudentAssessments);


router.post('/assessments', createAssessment);
router.put('/assessments/:id', updateAssessment);
router.delete('/assessments/:id', deleteAssessment);

export default router;