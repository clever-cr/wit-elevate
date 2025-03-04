import { useEffect } from "react";
import CourseCard from "../components/ui/CourseCard";
import { getUserCoursesAction } from "../store/courses/action";
import { useSelector, useDispatch } from "react-redux";
import LoadingCard from "../components/ui/LoadingCard";

const Courses = () => {
  const { course, user } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (user?.data?.token) {
    getUserCoursesAction("67c4b6c049730346fcb69fd8")(dispatch);
    // }
  }, [dispatch, user?.data?.token, user?.data?._id]);

  // Extract courses properly
  const allCourses = course?.userCourses?.flatMap(
    (item: any) => item?.courses || []
  );
  console.log("User Courses:", allCourses, "User Data:", user);

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-medium text-xl">Hi Clever U</h2>
        <h1 className="font-semibold text-2xl">Good Morning!</h1>
      </div>

      <div className="pt-[34px]">
        <h2 className="font-semibold text-2xl">Recommended Courses</h2>
        {course.isLoading ? (
          <div className="pt-6 flex gap-11 w-full flex-wrap">
            {[1, 2, 3, 4]?.map(() => (
              <LoadingCard />
            ))}
          </div>
        ) : (
          <div className="pt-6 flex gap-11 w-full flex-wrap">
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
                  />
                ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        )}
      </div>

      <div className="pt-[44px]">
        <h2 className="font-semibold text-2xl">
          Worth looking at after recommendation
        </h2>
        <div className="pt-6 flex gap-11">
          <CourseCard
            title="course"
            description="Enhancing Learning Engagement Through Thoughtful UX/UI"
          />
          <CourseCard
            title="course"
            description="Enhancing Learning Engagement Through Thoughtful UX/UI"
          />
          <CourseCard
            title="course"
            description="Enhancing Learning Engagement Through Thoughtful UX/UI"
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
