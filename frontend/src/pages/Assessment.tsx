import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Sample questions data
const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "An operating system"
    ],
    correctAnswer: "A JavaScript library for building user interfaces"
  },
  {
    id: "2",
    question: "Which hook is used for side effects in React?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer"
    ],
    correctAnswer: "useEffect"
  },
  {
    id: "3",
    question: "What is JSX?",
    options: [
      "A JavaScript XML syntax",
      "A Java extension",
      "A JSON format",
      "A JavaScript framework"
    ],
    correctAnswer: "A JavaScript XML syntax"
  },
  {
    id: "4",
    question: "What is the virtual DOM?",
    options: [
      "A direct copy of the real DOM",
      "A lightweight copy of the real DOM in memory",
      "A browser feature",
      "A React component"
    ],
    correctAnswer: "A lightweight copy of the real DOM in memory"
  },
  {
    id: "5",
    question: "What is the purpose of state in React?",
    options: [
      "To store static data",
      "To manage component's dynamic data",
      "To style components",
      "To handle routing"
    ],
    correctAnswer: "To manage component's dynamic data"
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for testing
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions); // Use sample data
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score based on correct answers
    let correctCount = 0;
    Object.entries(selectedAnswers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question && question.correctAnswer === answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setCompleted(true);
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
    navigate('/dashboard');
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
              {score}/{questions.length}
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
            Question {currentQuestion + 1} of {questions.length}
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
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      className="h-4 w-4 text-indigo-600"
                      checked={selectedAnswers[questions[currentQuestion].id] === option}
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
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
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