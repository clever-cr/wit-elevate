import Assessment from "../models/assessments.js";
import AssessmentAttempt from "../models/assessmentAttempts.js";
import Response from "../utils/Response.js";
import status from "http-status";
import Badge from '../models/badge.js';
import UserBadge from '../models/userBadge.js';
import mongoose from "mongoose";

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
    return Response.errorMessage(
      res,
      "Failed to fetch assessments",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


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
    return Response.errorMessage(
      res,
      "Failed to fetch assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


export const submitAssessment = async (req, res) => {
  try {
    const { answers = [], timeSpent } = req.body;
    const assessmentId = req.params.assessmentId;
    const studentId = req.user._id;

    const assessment = await Assessment.findById(assessmentId);
    
    if (!assessment) { 
      return Response.errorMessage(
        res,
        "Assessment not found",
        status.NOT_FOUND
      );
    }


    const previousPassedAttempt = await AssessmentAttempt.findOne({
      student: studentId,
      assessment: assessmentId,
      passed: true 
    });

    const validQuestions = answers.every(answer => {
  
    
      if (!answer.questionId || !mongoose.isValidObjectId(answer.questionId)) {
        return false;
      }
    
      const convertedId = new mongoose.Types.ObjectId(answer.questionId);
     
      const match = assessment.questions.some(q => {

        return q._id.equals(convertedId);
      });
    

      return match;
    });

    if (!validQuestions) {
      return Response.errorMessage(
        res,
        "Invalid question IDs in answers",
        status.BAD_REQUEST
      );
    }

    let score = 0;
    const gradedAnswers = answers.map(answer => {
      const question = assessment.questions.find(q => 
        q._id.toString() === answer.questionId
      );
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score += question.points;
      
      return {
        question: question.question,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0
      };
    });

    const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);
    const percentageScore = (score / totalPoints) * 100;
    const passed = percentageScore >= assessment.passingScore;

    

    const attempt = new AssessmentAttempt({
      student: studentId,
      assessment: assessmentId,
      answers: gradedAnswers,
      score,
      passed,
      timeSpent,
      completed: true
    });

    await attempt.save();

    const earnedBadges = [];
    

    if (passed && !previousPassedAttempt) {
   
      
      try {
     
        const existingBadge = await Badge.findOne({ 
          name: "Success Badge",
          user: studentId
        });
        
        if (existingBadge) {
         
          existingBadge.count += 1;
          await existingBadge.save();
          earnedBadges.push(existingBadge);
        } else {
  
          const newBadge = new Badge({
            name: "Success Badge",
            description: "Awarded for successfully completing an assessment",
            user: studentId,
            count: 1
          });
          await newBadge.save();
          earnedBadges.push(newBadge);
        }
      } catch (error) {
        return error
      
     
      }
    } else if (previousPassedAttempt) {
      return error
    }


    return Response.succesMessage(
      res,
      "Assessment submitted successfully",
      {
        score,
        totalPoints,
        passed,
        feedback: gradedAnswers,
        earnedBadges
      },
      status.OK
    );
  } catch (error) {

    return Response.errorMessage(
      res,
      error.message || "Failed to submit assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


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
    return Response.errorMessage(
      res,
      "Failed to fetch assessment history",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


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
    });

    await assessment.save();
    
    return Response.succesMessage(
      res,
      "Assessment created successfully",
      assessment,
      status.CREATED
    );
  } catch (error) {
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
    return Response.errorMessage(
      res,
      "Failed to update assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


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
    return Response.errorMessage(
      res,
      "Failed to delete assessment",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


export const getUserBadges = async (req, res) => {
  try {
    const userId = req.params.userId;

    const badges = await Badge.find({ user: userId })
      .sort('-createdAt');

    return Response.succesMessage(
      res,
      "User badges retrieved successfully",
      badges,
      status.OK
    );
  } catch (error) {

    return Response.errorMessage(
      res,
      "Failed to fetch user badges",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUsersByBadge = async (req, res) => {
  try {
    const { badgeId } = req.params;
    const userBadges = await UserBadge.find({ badge: badgeId })
      .populate('user', 'firstName lastName email')
      .populate('badge')
      .sort('-earnedAt');

    return Response.succesMessage(
      res,
      "Users with badge retrieved successfully",
      userBadges,
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to fetch users by badge",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const getAssessmentStatistics = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    
    // Get all attempts for this assessment
    const attempts = await AssessmentAttempt.find({ assessment: assessmentId });
    
    // Calculate statistics
    const totalAttempts = attempts.length;
    const passedAttempts = attempts.filter(attempt => attempt.passed).length;
    const failedAttempts = totalAttempts - passedAttempts;
    const completedAttempts = attempts.filter(attempt => attempt.completed).length;
    const notCompletedAttempts = totalAttempts - completedAttempts;
    
    // Calculate average score
    const averageScore = attempts.length > 0 
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length 
      : 0;
    
    // Calculate pass rate
    const passRate = totalAttempts > 0 
      ? (passedAttempts / totalAttempts) * 100 
      : 0;
    
    return Response.succesMessage(
      res,
      "Assessment statistics retrieved successfully",
      {
        totalAttempts,
        passedAttempts,
        failedAttempts,
        completedAttempts,
        notCompletedAttempts,
        averageScore: Math.round(averageScore * 100) / 100,
        passRate: Math.round(passRate * 100) / 100
      },
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to fetch assessment statistics",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const getOverallAssessmentStatistics = async (req, res) => {
  try {
    // Get all assessment attempts
    const attempts = await AssessmentAttempt.find();
    
    // Calculate overall statistics
    const totalAttempts = attempts.length;
    const passedAttempts = attempts.filter(attempt => attempt.passed).length;
    const failedAttempts = totalAttempts - passedAttempts;
    const completedAttempts = attempts.filter(attempt => attempt.completed).length;
    const notCompletedAttempts = totalAttempts - completedAttempts;
    
    // Calculate average score across all attempts
    const averageScore = attempts.length > 0 
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length 
      : 0;
    
    // Calculate overall pass rate
    const passRate = totalAttempts > 0 
      ? (passedAttempts / totalAttempts) * 100 
      : 0;
    
    // Get unique users who have attempted assessments
    const uniqueUsers = await AssessmentAttempt.distinct('student');
    
    return Response.succesMessage(
      res,
      "Overall assessment statistics retrieved successfully",
      {
        totalAttempts,
        passedAttempts,
        failedAttempts,
        completedAttempts,
        notCompletedAttempts,
        averageScore: Math.round(averageScore * 100) / 100,
        passRate: Math.round(passRate * 100) / 100,
        totalUniqueUsers: uniqueUsers.length
      },
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to fetch overall assessment statistics",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUserAssessmentStatistics = async (req, res) => {
  try {
    // Get all users with their assessment attempts
    const userAttempts = await AssessmentAttempt.aggregate([
      {
        $group: {
          _id: "$student",
          totalAttempts: { $sum: 1 },
          passedAttempts: { 
            $sum: { $cond: [{ $eq: ["$passed", true] }, 1, 0] }
          },
          failedAttempts: { 
            $sum: { $cond: [{ $eq: ["$passed", false] }, 1, 0] }
          },
          completedAttempts: { 
            $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] }
          },
          averageScore: { $avg: "$score" },
          lastAttemptDate: { $max: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 1,
          firstName: "$userInfo.firstName",
          lastName: "$userInfo.lastName",
          email: "$userInfo.email",
          totalAttempts: 1,
          passedAttempts: 1,
          failedAttempts: 1,
          completedAttempts: 1,
          averageScore: { $round: ["$averageScore", 2] },
          lastAttemptDate: 1,
          passRate: {
            $round: [
              { $multiply: [{ $divide: ["$passedAttempts", "$totalAttempts"] }, 100] },
              2
            ]
          }
        }
      }
    ]);
    
    return Response.succesMessage(
      res,
      "User assessment statistics retrieved successfully",
      userAttempts,
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to fetch user assessment statistics",
      status.INTERNAL_SERVER_ERROR
    );
  }
};