import CourseCard from "../components/ui/CourseCard";

const Courses = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-medium text-xl">Hi Clever U</h2>
        <h1 className="font-semibold text-2xl">Good Morning!</h1>
      </div>
      <div className="pt-[34px]">

        <h2 className="font-semibold text-2xl">Recommended Courses</h2>
        <div className="pt-6 flex gap-11">
          <CourseCard
            title={"course"}
            description={
              "Enhancing Learning Engagement Through Thoughtfull UX/UI"
            }
          />
          <CourseCard
            title={"course"}
            description={
              "Enhancing Learning Engagement Through Thoughtfull UX/UI"
            }
          />
          <CourseCard
            title={"course"}
            description={
              "Enhancing Learning Engagement Through Thoughtfull UX/UI"
            }
          />
        </div>
        <div className="pt-[44px]">
        <h2 className="font-semibold text-2xl">Worth looking at after recommendation</h2>
        <div className="pt-6 flex gap-11">
          <CourseCard
            title={"course"}
            description={
              "Enhancing Learning Engagement Through Thoughtfull UX/UI"
            }
          />
          <CourseCard
            title={"course"}
            description={
              "Enhancing Learning Engagement Through Thoughtfull UX/UI"
            }
          />
          <CourseCard
            title={"course"}
            description={
              "Enhancing Learning Engagement Through Thoughtfull UX/UI"
            }
          />
        </div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
