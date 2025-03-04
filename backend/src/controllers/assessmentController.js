import Assessment from "../models/assessments.js";
import AssessmentAttempt from "../models/assessmentAttempts.js";
import Response from "../utils/Response.js";
import status from "http-status";

// Get all available assessments
export const getAssessments = async (req, res) => {
  try {
    const { category, skillLevel } = req.query;
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (skillLevel) query.skillLevel = skillLevel;

    const assessments = await Assessment.find(query)
      .select('title duration totalQuestions skillLevel category')
      .populate('createdBy', 'firstName lastName')
      .sort('-createdAt');
    
    return Response.succesMessage(
      res,
      "Assessments retrieved successfully",
      assessments,
      status.OK
    );
  } catch (error) {
    console.error(error);
    return Response.errorMessage(
      res,
      "Failed to fetch assessments",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Get a single assessment details
export const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      isActive: true
    })
    .select('-questions.correctAnswer')
    .populate('createdBy', 'firstName lastName');
    
    if (!assessment) {
      return Response.errorMessage(
        res,
        "Assessment not found",
        status.NOT_FOUND
      );
    }
    
    return Response.succesMessage(
      res,
      "Assessment retrieved successfully",
      assessment,
      status.OK
    );
  } catch (error) {
    console.error(error);
    return Response.errorMessage(
      res,
      "Failed to fetch assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Submit an assessment attempt
export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers, timeSpent } = req.body;
    const {studentId} = req.params;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return Response.errorMessage(
        res,
        "Assessment not found",
        status.NOT_FOUND
      );
    }

    // Validate if student has already attempted this assessment
    const existingAttempt = await AssessmentAttempt.findOne({
      student: studentId,
      assessment: assessmentId
    });

    if (existingAttempt) {
      return Response.errorMessage(
        res,
        "You have already attempted this assessment",
        status.BAD_REQUEST
      );
    }

    // Calculate score
    let score = 0;
    const gradedAnswers = answers.map(answer => {
      const question = assessment.questions.find(q => q._id.toString() === answer.questionId);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score += question.points;
      
      return {
        question: question.question,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0
      };
    });

    const attempt = new AssessmentAttempt({
      student: studentId,
      assessment: assessmentId,
      answers: gradedAnswers,
      score,
      passed: score >= assessment.passingScore,
      timeSpent
    });

    await attempt.save();

    return Response.succesMessage(
      res,
      "Assessment submitted successfully",
      {
        score,
        totalPoints: assessment.questions.reduce((sum, q) => sum + q.points, 0),
        passed: score >= assessment.passingScore,
        feedback: gradedAnswers
      },
      status.OK
    );
  } catch (error) {
    console.error(error);
    return Response.errorMessage(
      res,
      "Failed to submit assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Get student's assessment history
export const getStudentAssessments = async (req, res) => {
  try {
    const attempts = await AssessmentAttempt.find({ 
      student: req.user._id 
    })
    .populate('assessment', 'title skillLevel category')
    .sort('-createdAt');

    return Response.succesMessage(
      res,
      "Assessment history retrieved successfully",
      attempts,
      status.OK
    );
  } catch (error) {
    console.error(error);
    return Response.errorMessage(
      res,
      "Failed to fetch assessment history",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Create a new assessment (admin only)
export const createAssessment = async (req, res) => {
  try {
    const {
      title,
      questions,
      duration,
      passingScore,
      skillLevel,
      category
    } = req.body;
    
    const assessment = new Assessment({
      title,
      questions,
      duration,
      totalQuestions: questions.length,
      passingScore,
      skillLevel,
      category,
      // createdBy: req.user._id
    });

    await assessment.save();
    
    return Response.succesMessage(
      res,
      "Assessment created successfully",
      assessment,
      status.CREATED
    );
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return Response.errorMessage(
        res,
        "Invalid assessment data",
        status.BAD_REQUEST
      );
    }
    return Response.errorMessage(
      res,
      "Failed to create assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Update assessment (admin only)
export const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return Response.errorMessage(
        res,
        "Assessment not found",
        status.NOT_FOUND
      );
    }

    const updates = req.body;
    if (updates.questions) {
      updates.totalQuestions = updates.questions.length;
    }

    Object.assign(assessment, updates);
    await assessment.save();

    return Response.succesMessage(
      res,
      "Assessment updated successfully",
      assessment,
      status.OK
    );
  } catch (error) {
    console.error(error);
    return Response.errorMessage(
      res,
      "Failed to update assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete assessment (admin only)
export const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return Response.errorMessage(
        res,
        "Assessment not found",
        status.NOT_FOUND
      );
    }

    assessment.isActive = false;
    await assessment.save();

    return Response.succesMessage(
      res,
      "Assessment deleted successfully",
      null,
      status.OK
    );
  } catch (error) {
    console.error(error);
    return Response.errorMessage(
      res,
      "Failed to delete assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
}; 