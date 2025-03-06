import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAssessmentsAction,
  getSelectedAssessmentAction,
  submitAssessmentAction,
  getStudentAssessmentsAction,
} from "../store/assessments/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { assessmentAction } from "../store/assessments";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  BookOpenIcon,
  ArrowPathIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

// interface Question {
//   _id: string;
//   question: string;
//   options: string[];
//   points: number;
//   correctAnswer: string;
// }

// interface AssessmentResponse {
//   type: boolean;
//   payload?: {
//     attempted?: boolean;
//     [key: string]: any;
//   };
// }

const Assessment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assessment } = useSelector((state: any) => state);
  const [isStarted, setIsStarted] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | undefined>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for testing
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [canRetake, setCanRetake] = useState(true);

  useEffect(() => {
    console.log("Fetching assessments...");
    Promise.all([
      getAssessmentsAction()(dispatch),
      getStudentAssessmentsAction()(dispatch)
    ])
      .then(([assessmentsRes, attemptsRes]) => {
        console.log("Assessments response:", assessmentsRes);
        console.log("Attempts response:", attemptsRes);
        
        if (!assessmentsRes?.type) {
          setError("Failed to fetch assessments");
          return;
        }

        // First set the assessments
        dispatch(assessmentAction.setAllAssessment(assessmentsRes.data));

        // Then map the attempts if they exist
        if (attemptsRes?.type && attemptsRes?.data) {
          const attempts = attemptsRes.data;
          const updatedAssessments = assessmentsRes.data.map((assessment: any) => {
            const attempt = attempts.find((a: any) => a.assessment._id === assessment._id);
            if (attempt) {
              return {
                ...assessment,
                attempted: true,
                score: attempt.score,
                passingScore: attempt.assessment.passingScore
              };
            }
            return assessment;
          });
          dispatch(assessmentAction.setAllAssessment(updatedAssessments));
        }
      })
      .catch((err) => {
        console.error("Error fetching assessments:", err);
        setError("Failed to fetch assessments");
      });
  }, [dispatch]);

  useEffect(() => {
    if (assessmentId) {
      console.log("Fetching selected assessment:", assessmentId);
      getSelectedAssessmentAction(assessmentId)(dispatch)
        .then((res) => {
          console.log("Selected assessment response:", res);
          if (!res?.type) {
            setError("Failed to fetch selected assessment");
          }
          const response = res as { type: boolean; payload?: { attempted?: boolean } };
          if (response.payload?.attempted) {
            setCanRetake(false);
            setError("This assessment has already been completed and cannot be retaken.");
          }
        })
        .catch((err) => {
          console.error("Error fetching selected assessment:", err);
          setError("Failed to fetch selected assessment");
        });
    }
  }, [dispatch, assessmentId]);

  const questions = assessment?.selectedAssessment?.questions || [];

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStart = (id: string) => {
    console.log("Starting assessment with ID:", id);
    // Check if assessment has already been attempted
    const attemptedAssessment = assessment?.allAssessment?.find((el: any) => el._id === id);
    
    if (attemptedAssessment?.attempted) {
      setError("This assessment has already been completed and cannot be retaken.");
      setCanRetake(false);
      return;
    }

    // First load the selected assessment
    getSelectedAssessmentAction(id)(dispatch)
      .then((res) => {
        console.log("Selected assessment loaded:", res);
        if (res?.type) {
          setAssessmentId(id);
          setIsStarted(true);
          setError(null);
          setCanRetake(true);
        } else {
          setError("Failed to load assessment questions");
        }
      })
      .catch((err) => {
        console.error("Error loading assessment:", err);
        setError("Failed to load assessment");
      });
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion]._id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!assessmentId) {
      setError("No assessment selected");
      return;
    }

    const formattedAnswers = Object.entries(selectedAnswers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })
    );

    const payload = {
      answers: formattedAnswers,
      timeSpent: 300 - timeLeft,
    };

    try {
      console.log("Submitting assessment:", {
        assessmentId,
        payload,
        selectedAnswers,
        questions
      });
      const res = await submitAssessmentAction(assessmentId, payload)(dispatch);
      console.log("Submit response:", res);

      if (res?.type) {
        const calculatedScore = questions.reduce((total:any, question:any) => {
          const userAnswer = selectedAnswers[question._id];
          const isCorrect = userAnswer === question.correctAnswer;
          return total + (isCorrect ? question.points : 0);
        }, 0);
        
        setScore(calculatedScore);
        setCompleted(true);
      } else {
        setError(res?.error || "Failed to submit assessment");
      }
    } catch (err: any) {
      console.error("Error submitting assessment:", err);
      if (err?.response?.status === 400 && err?.response?.data?.error === "You have already attempted this assessment") {
        setError("You have already completed this assessment. Please select a different assessment or contact your administrator.");
        setCanRetake(false);
        setCompleted(true);
      } else {
        setError(err?.response?.data?.error || "Failed to submit assessment. Please try again later.");
      }
    }
  };

  const handleRetake = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setCompleted(false);
    setScore(0);
    setError(null);
  };

  const handleFinish = () => {
    navigate("/portal");
  };

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full transform hover:scale-105 transition-transform duration-300">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </motion.div>
    );
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <AcademicCapIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Available Assessments</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessment?.isLoading ? (
              <div className="col-span-full text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading assessments...</p>
              </div>
            ) : assessment?.allAssessment?.length > 0 ? (
              assessment.allAssessment.map((assessment: any) => (
                <motion.div
                  key={assessment._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpenIcon className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-gray-800">{assessment.title}</h2>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-5 h-5 text-indigo-500" />
                      <p>Duration: {assessment.duration} minutes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LightBulbIcon className="w-5 h-5 text-indigo-500" />
                      <p>Questions: {assessment.totalQuestions}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ChartBarIcon className="w-5 h-5 text-indigo-500" />
                      <p>Level: {assessment.skillLevel}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AcademicCapIcon className="w-5 h-5 text-indigo-500" />
                      <p>Category: {assessment.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStart(assessment._id)}
                    className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                    <span>Start Assessment</span>
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-gray-600">No assessments available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-6xl mb-4"
          >
            {score >= (assessment?.selectedAssessment?.passingScore || 3) ? "🎉" : "💪"}
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            {score >= (assessment?.selectedAssessment?.passingScore || 3) ? (
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            ) : (
              <XCircleIcon className="w-8 h-8 text-red-500" />
            )}
            <span>Assessment Completed</span>
          </h2>
          <div className="text-5xl font-extrabold text-indigo-600 mb-4">
            {score}/{assessment?.selectedAssessment?.passingScore || 3}
          </div>
          <p className={`text-lg mb-6 ${score >= (assessment?.selectedAssessment?.passingScore || 3) ? 'text-green-600' : 'text-red-600'}`}>
            {score >= (assessment?.selectedAssessment?.passingScore || 3)
              ? "Congratulations! You passed the assessment."
              : "You did not pass the assessment."}
          </p>
          
          {!canRetake && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                This assessment can only be taken once. You have already completed this assessment.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            {canRetake && (
              <button
                onClick={handleRetake}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center space-x-2"
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span>Retake Assessment</span>
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center space-x-2"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-base text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800">
              {assessment?.selectedAssessment?.title || "Assessment"}
            </h1>
          </div>
          <div className="bg-white rounded-full px-6 py-2 shadow-lg flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-600 font-semibold text-sm">
              Time Left: {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <LightBulbIcon className="w-4 h-4" />
              <span>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {questions[currentQuestion] && (
            <>
              <h2 className="text-base font-semibold mb-6 text-gray-800">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3 mb-6">
                {questions[currentQuestion].options.map((option:any, index:any) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAnswers[questions[currentQuestion]._id] === option
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedAnswers[questions[currentQuestion]._id] === option}
                      onChange={() => handleAnswer(option)}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="ml-3 text-sm text-gray-700 cursor-pointer flex-1"
                    >
                      {option}
                    </label>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 text-sm ${
                    currentQuestion === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={assessment?.isLoading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm"
                  >
                    <span>Next Question</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Assessment;