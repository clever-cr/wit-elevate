import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSideBar from '../components/layout/PortalSideBar';
import Button from '../components/ui/Button';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const Assessment = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3000); // 50 minutes in seconds
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch questions from API
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/assessment/questions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

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

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ answers: selectedAnswers })
      });

      if (response.ok) {
        navigate('/assessment/results');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <>
   <div>
    <h1 className='font-semibold text-2xl'>Take Your Assessment</h1>
    <div className='bg-white ml-[143px] mt-8 flex flex-col gap-6 items-center py-[102px] px-[114px] rounded-3xl'>
      <h2 className='font-semibold text-xl'>Assessment Completed Successfully</h2>
      <h1 className='font-semibold text-3xl'>15/20</h1>
      <p className='text-sm'>If you did not score above 16, you can retake the assessment.</p>
      <div className='flex items-center gap-8'>
      <Button className='bg-primary py-5 px-8 text-white' text='Retake'/>
      <Button className='bg-[#F6F6F6] py-5 px-8' text="Finish"/>
      </div> 
    
    </div>
   </div>
    </>
  );
};

export default Assessment; 