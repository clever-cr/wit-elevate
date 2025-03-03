// import Assessment from "../models/assessments.js";
// import AssessmentAttempt from "../models/assessmentAttempts.js";

// // Get all available assessments
// export const getAssessments = async (req, res) => {
//   try {
//     const assessments = await Assessment.find()
//       .select('title duration totalQuestions skillLevel category')
//       .populate('createdBy', 'name');
    
//     res.json(assessments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a single assessment details (without correct answers)
// export const getAssessment = async (req, res) => {
//   try {
//     const assessment = await Assessment.findById(req.params.id)
//       .select('-questions.correctAnswer')
//       .populate('createdBy', 'name');
    
//     if (!assessment) {
//       return res.status(404).json({ message: 'Assessment not found' });
//     }
    
//     res.json(assessment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Submit an assessment attempt
// export const submitAssessment = async (req, res) => {
//   try {
//     const { assessmentId, answers } = req.body;
//     const studentId = req.user._id; // Assuming you have authentication middleware

//     // Get the assessment
//     const assessment = await Assessment.findById(assessmentId);
//     if (!assessment) {
//       return res.status(404).json({ message: 'Assessment not found' });
//     }

//     // Calculate score
//     let score = 0;
//     const gradedAnswers = answers.map(answer => {
//       const question = assessment.questions.find(q => q._id.toString() === answer.questionId);
//       const isCorrect = question.correctAnswer === answer.selectedAnswer;
//       if (isCorrect) {
//         score += question.points;
//       }
//       return {
//         question: question.question,
//         selectedAnswer: answer.selectedAnswer,
//         isCorrect,
//         points: isCorrect ? question.points : 0
//       };
//     });

//     // Create attempt record
//     const attempt = new AssessmentAttempt({
//       student: studentId,
//       assessment: assessmentId,
//       answers: gradedAnswers,
//       score,
//       passed: score >= assessment.passingScore
//     });

//     await attempt.save();

//     res.json({
//       score,
//       totalPoints: assessment.questions.reduce((sum, q) => sum + q.points, 0),
//       passed: score >= assessment.passingScore,
//       feedback: gradedAnswers
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get student's assessment history
// export const getStudentAssessments = async (req, res) => {
//   try {
//     const studentId = req.user._id; // Assuming you have authentication middleware
    
//     const attempts = await AssessmentAttempt.find({ student: studentId })
//       .populate('assessment', 'title skillLevel category')
//       .sort('-completedAt');

//     res.json(attempts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new assessment (for instructors)
// export const createAssessment = async (req, res) => {
//   try {
//     const { title, questions, duration, passingScore, skillLevel, category } = req.body;
    
//     const assessment = new Assessment({
//       title,
//       questions,
//       duration,
//       totalQuestions: questions.length,
//       passingScore,
//       skillLevel,
//       category,
//       createdBy: req.user._id // Assuming you have authentication middleware
//     });

//     await assessment.save();
//     res.status(201).json(assessment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };