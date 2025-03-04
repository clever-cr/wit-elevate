import React, { useEffect, useState } from 'react';
import { 

  PiBookOpenThin, 
  PiClipboardTextThin, 
  PiTargetThin 
} from 'react-icons/pi';
import { MdOutlineQuiz, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

// Course Modal Component
const CourseModal: React.FC<{
  isOpen: boolean, 
  onClose: () => void, 
  course: {
    title: string, 
    description: string, 
    duration: string,
    type: string
  }
}> = ({ isOpen, onClose, course }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = async () => {
    try {
      // Replace with actual API call to enroll in course
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseTitle: course.title })
      });

      if (!response.ok) {
        throw new Error('Enrollment failed');
      }

      setIsEnrolled(true);
      toast.success(`Successfully enrolled in ${course.title}!`);
      onClose();
    } catch (error) {
      toast.error('Failed to enroll. Please try again.');
      console.error('Enrollment error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="mb-4">
          <strong>Type:</strong> {course.type}
          <br />
          <strong>Duration:</strong> {course.duration}
        </div>
        <button 
          onClick={handleEnroll}
          disabled={isEnrolled}
          className={`w-full py-2 rounded-lg ${
            isEnrolled 
              ? 'bg-gray-300 text-gray-500' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEnrolled ? 'Enrolled' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

// Mentorship Booking Modal
const MentorshipModal: React.FC<{
  isOpen: boolean, 
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const availableSlots = [
    "Monday, 10:00 AM", 
    "Wednesday, 2:00 PM", 
    "Friday, 4:00 PM"
  ];

  const handleBookSlot = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      // Replace with actual API call to book mentorship
      const response = await fetch('/api/mentorship/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slot: selectedSlot })
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      toast.success(`Mentorship session booked for ${selectedSlot}`);
      onClose();
    } catch (error) {
      toast.error('Failed to book session. Please try again.');
      console.error('Mentorship booking error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Book Mentorship Session</h2>
        <div className="space-y-2 mb-4">
          {availableSlots.map((slot) => (
            <div 
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedSlot === slot 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {slot}
            </div>
          ))}
        </div>
        <button 
          onClick={handleBookSlot}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Session
        </button>
      </div>
    </div>
  );
};

interface UserData {
  name: string;
  completedCourses: number;
  totalCourses: number;
  assessmentScore: number;
  projectsCompleted: number;
  careerGoalProgress: number;
}

const Overview=() => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    completedCourses: 0,
    totalCourses: 0,
    assessmentScore: 0,
    projectsCompleted: 0,
    careerGoalProgress: 0
  });

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/overview');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const courses = [
    {
      title: "Advanced React Workshop",
      description: "Deep dive into advanced React concepts and best practices",
      duration: "4 weeks",
      type: "Online"
    },
    {
      title: "Data Science Certification",
      description: "Comprehensive data science training with Python and ML",
      duration: "12 weeks",
      type: "Self-paced"
    }
  ];

  const openCourseModal = (course:any) => {
    setSelectedCourse(course);
    setCourseModalOpen(true);
  };

  const statsCards = [
    {
      icon: <PiBookOpenThin className="w-6 h-6 text-blue-500" />,
      title: 'Courses Completed',
      value:` ${userData.completedCourses}/${userData.totalCourses}`,
      progress: Math.round((userData.completedCourses / userData.totalCourses) * 100)
    },
    {
      icon: <MdOutlineQuiz className="w-6 h-6 text-green-500" />,
      title: 'Assessment Score',
      value: `${userData.assessmentScore}`,
      progress: userData.assessmentScore
    },
    {
      icon: <PiClipboardTextThin className="w-6 h-6 text-purple-500" />,
      title: 'Projects',
      value: `${userData.projectsCompleted} Completed`,
      progress: Math.round((userData.projectsCompleted / 5) * 100)
    },
    {
      icon: <PiTargetThin className="w-6 h-6 text-red-500" />,
      title: 'Career Goal Progress',
      value: `${userData.careerGoalProgress}%`,
      progress: userData.careerGoalProgress
    }
  ];

  return (
    <>
    <div className="p-6 bg-[#F8F9FB] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userData.name}
        </h1>
        <div className="text-sm text-gray-500">
          Dashboard / Overview
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              {card.icon}
              <div className="text-right">
                <h3 className="text-sm text-gray-500">{card.title}</h3>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${card.progress}`}}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recent Activities Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b pb-2">
              <span>Completed Python Programming Course</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Passed Web Development Assessment</span>
              <span className="text-sm text-gray-500">5 days ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Started Machine Learning Project</span>
              <span className="text-sm text-gray-500">1 week ago</span>
            </li>
          </ul>
        </div>

        {/* Upcoming Events/Recommendations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <ul className="space-y-4">
            {courses.map((course, index) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.type}</p>
                </div>
                <button 
                  onClick={() => openCourseModal(course)}
                  className="text-blue-600 hover:underline"
                >
                  {index === 0 ? 'Enroll' : 'Start'}
                </button>
              </li>
            ))}
            <li className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Career Mentorship</h3>
                <p className="text-sm text-gray-500">1-on-1 Session</p>
              </div>
              <button 
                onClick={() => setMentorshipModalOpen(true)}
                className="text-blue-600 hover:underline"
              >
                Schedule
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Enrollment Modal */}
      {selectedCourse && (
        <CourseModal 
          isOpen={courseModalOpen} 
          onClose={() => setCourseModalOpen(false)}
          course={selectedCourse}
        />
      )}

      {/* Mentorship Booking Modal */}
      <MentorshipModal 
        isOpen={mentorshipModalOpen}
        onClose={() => setMentorshipModalOpen(false)}
      />
    </div>
    </>
    
  );
};

export default Overview;