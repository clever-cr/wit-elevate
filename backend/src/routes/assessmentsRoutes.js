import express from "express";
import {
  getAssessments,
  getAssessment,
  submitAssessment,
  getStudentAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getUserBadges,
  getUsersByBadge,
  getAssessmentStatistics,
  getOverallAssessmentStatistics,
  getUserAssessmentStatistics
} from "../controllers/assessmentController.js";
import verifyUserToken from "../middleware/verifyUserToken.js";

const router = express.Router();

router.get("/assessments", getAssessments);
router.get("/assessments/:id", getAssessment);
router.post("/assessments/submit/:assessmentId", verifyUserToken,submitAssessment);
router.get("/my-assessments", verifyUserToken, getStudentAssessments);

router.post("/assessments", createAssessment);
router.put("/assessments/:id", updateAssessment);
router.delete("/assessments/:id", deleteAssessment);
// api/assessments/badges/${userId}
router.get("/assessments/badges/:userId",  getUserBadges);
router.get("/badges/:badgeId/users", getUsersByBadge);

// Get assessment statistics
router.get("/assessments/:id/statistics",  getAssessmentStatistics);

// Get overall assessment statistics
router.get("/assessments/statistics/overall",  getOverallAssessmentStatistics);

// Get user-specific assessment statistics
router.get("/assessments/statistics/users",  getUserAssessmentStatistics);

export default router;
