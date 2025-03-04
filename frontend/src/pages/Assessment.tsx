import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAssessmentsAction,
  getSelectedAssessmentAction,
  submitAssessmentAction,
} from "../store/assessments/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingCard from "../components/ui/LoadingCard";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Sample questions data

const Assessment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assessment, user } = useSelector((state: any) => state);
  const [isStarted, setIsStarted] = useState(false);
  const [assessmentId, setAssessmentId] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for testing // Use sample data
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  console.log("user", assessmentId);
  useEffect(() => {
    getAssessmentsAction()(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (assessmentId) {
      getSelectedAssessmentAction(assessmentId)(dispatch);
    }
  }, [dispatch, assessmentId]);

  // const SingleAssessment = assessment?.selectedAssessment?.flatMap(
  //   (item: any) => item?.questions || []
  // );
  const sampleQuestions = assessment?.selectedAssessment?.questions?.map(
    (el: any) => {
      return {
        id: el?._id,
        question: el?.question,
        options: el?.options,
        correctAnswer: "A JavaScript library for building user interfaces",
      };
    }
  );

  const [questions, setQuestions] = useState<Question[]>(sampleQuestions || []);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 4) {
      handleSubmit();
    }
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStart = (id: any) => {
    setAssessmentId(id);
    setIsStarted(true);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
  };

  // console.log(selectedAnswers, "selected answer");

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Calculate score based on correct answers
    submitAssessmentAction(`${user.data._id}/submit`, {
      assessmentId: assessmentId,
      answers: [
        {
          questionId: "67c5fabd884abe1b54b36a4e",
          selectedAnswer: "B",
        },
      ],
      timeSpent: 3000 - timeLeft,
    });
console.log("submitted");
    // let correctCount = 0;
    // Object.entries(selectedAnswers).forEach(([questionId, answer]) => {
    //   const question = questions.find((q) => q.id === questionId);
    //   if (question && question.correctAnswer === answer) {
    //     correctCount++;
    //   }
    // });
    // setScore(correctCount);
    // if (res) {
    //   setCompleted(true);
    // }
  };

  const handleRetake = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300); // Reset to 5 minutes
    setCompleted(false);
    setScore(0);
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };
  useEffect(() => {
    if (assessment?.selectedAssessment?.questions) {
      const formattedQuestions = assessment.selectedAssessment.questions.map(
        (el: any) => ({
          id: el._id,
          question: el.question,
          options: el.options,
          correctAnswer: el.correctAnswer, // Make sure this field exists
        })
      );
      setQuestions(formattedQuestions);
    }
  }, [assessment?.selectedAssessment]);

  if (!isStarted) {
    return (
      <div className="min-h-scrxeen bg-gray-50 flex flex-col text-black">
        <div className="grid grid-cols-2 gap-5 mb-5">
          {assessment?.isLoading
            ? [1, 2]?.map(() => {
                return <LoadingCard />;
              })
            : assessment?.allAssessment?.map((el: any) => {
                return (
                  <div className="block rounded-lg bg-white p-6 text-surface shadow-secondary-1">
                    <h5 className="mb-2 text-xl font-medium leading-tight ">
                      {el?.title}
                    </h5>
                    <p className="mb-4 text-base">Category: {el?.category}</p>
                    <p className="mb-4 text-base">duration: {el?.duration}</p>
                    <p className="mb-4 text-base">Level: {el?.skillLevel}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleStart(el?._id)}
                        className="bg-[#6366F1] text-white text-base font-medium px-6 py-1 rounded-full hover:bg-indigo-700 transition-colors"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-sm p-12">
            <h2 className="text-3xl font-medium text-center mb-6">
              Ready to start your assessment?
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              You will have 5 minutes to complete the assessment.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleStart}
                className="bg-[#6366F1] text-white text-lg font-medium px-12 py-3 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-sm p-12">
            <h2 className="text-3xl font-medium text-center mb-6">
              Assessment Completed
            </h2>
            <div className="text-6xl font-bold text-center mb-6">
              {score}/{questions?.length}
            </div>
            <p className="text-xl text-gray-600 text-center mb-12">
              {score >= 3
                ? "Congratulations! You passed the assessment."
                : "You need to score at least 3 to pass. You can retake the assessment."}
            </p>
            <div className="flex justify-center space-x-4">
              {score < 3 && (
                <button
                  onClick={handleRetake}
                  className="bg-[#6366F1] text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Retake Assessment
                </button>
              )}
              <button
                onClick={handleFinish}
                className="bg-gray-100 text-gray-700 text-lg font-medium px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!questions || questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Assessment</h1>
          <div className="text-lg font-medium px-6 py-2 bg-white rounded-full shadow-sm">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl mx-auto">
          <div className="text-sm text-gray-500 mb-6">
            Question {currentQuestion + 1} of {questions?.length}
          </div>

          {questions[currentQuestion] && (
            <>
              <h2 className="text-xl font-semibold mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4 mb-12">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedAnswers[questions[currentQuestion].id] === option
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      className="h-4 w-4 text-indigo-600"
                      checked={
                        selectedAnswers[questions[currentQuestion].id] ===
                        option
                      }
                      onChange={() => handleAnswer(option)}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="ml-3 text-gray-700 cursor-pointer flex-1"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-colors ${
                    currentQuestion === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Previous
                </button>
                {currentQuestion === questions?.length - 1 ? (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-[#6366F1] text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-[#6366F1] text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
