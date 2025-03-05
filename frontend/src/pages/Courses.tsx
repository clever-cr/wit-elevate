import { useEffect } from "react";
import CourseCard from "../components/ui/CourseCard";
import { getUserCoursesAction } from "../store/courses/action";
import { useSelector, useDispatch } from "react-redux";
import LoadingCard from "../components/ui/LoadingCard";
import { BookOpen, TrendingUp } from 'lucide-react';
import store from "store";

const courseImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop"
];

const additionalCourseImages = [
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
];

const Courses = () => {
  const { course, user } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get user data from local storage if not in Redux store
    if (!user?.data) {
      const userData = store.get("userData");
      if (userData) {
        dispatch({ type: "user/setData", payload: userData });
      }
    }
    
    getUserCoursesAction("67c4b6c049730346fcb69fd8")(dispatch);
  }, [dispatch, user?.data?.token, user?.data?._id]);

  const allCourses = course?.userCourses?.flatMap(
    (item: any) => item?.courses || []
  );

  // Get user's name from email if firstName is not available
  const getUserDisplayName = () => {
    const userData = user?.data || store.get("userData");
    if (userData?.firstName) return userData.firstName;
    if (userData?.email) {
      // Extract name from email (e.g., "john" from "john@example.com")
      return userData.email.split('@')[0];
    }
    return "User";
  };

  const userName = getUserDisplayName();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 space-y-4 bg-white shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-indigo-600 text-lg font-medium tracking-wide">
                Hi {userName}
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="text-indigo-500" />
              <span className="text-sm">Personalized Learning Path</span>
            </div>
          </div>
        </div>

        {/* Recommended Courses Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pl-2">
            <h2 className="text-gray-900 text-3xl font-bold">
              Recommended Courses
            </h2>
            <div className="flex items-center space-x-2 text-indigo-600 cursor-pointer hover:text-indigo-800">
              <BookOpen size={20} />
              <span className="text-sm font-medium">View All Courses</span>
            </div>
          </div>

          {course.isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4]?.map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCourses?.length > 0 ? (
                allCourses
                  ?.slice(0, 5)
                  .map((course: any, index: number) => (
                    <CourseCard
                      key={index}
                      title={course?.title || "Course"}
                      description={
                        course?.description || "No description available"
                      }
                      imageUrl={courseImages[index % courseImages.length]}
                      link={course?.link} // Add link property if available
                      platform={course?.platform} // Add platform property
                      className="transition duration-300 hover:scale-105 hover:shadow-lg"
                    />
                  ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white shadow-md rounded-xl">
                  <p className="text-gray-500 text-lg font-medium">
                    No courses available
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Additional Courses Section */}
        <div>
          <h2 className="text-gray-900 text-3xl font-bold mb-8 pl-2">
            Worth Looking At
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <CourseCard
                key={index}
                title="UX/UI Design Course"
                description="Enhancing Learning Engagement Through Thoughtful UX/UI"
                imageUrl={additionalCourseImages[index % additionalCourseImages.length]}
                link="https://example.com/ux-ui-course" // Example link
                className="bg-white shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
