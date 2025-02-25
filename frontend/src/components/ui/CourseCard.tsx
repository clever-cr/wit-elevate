// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CourseCard = ({ title, description }:any) => {
  return (
    <div className="bg-white p-5 w-[289px] h-[200px] rounded-[20px] flex  flex-col gap-3">
      <div className="bg-[#F6F6F6] w-[255px] h-[69px] rounded-lg">
        
      </div>
  <p className="text-sx">{title}</p>
  <p className="font-semibold text-base">{description}</p>
  </div>);
};
export default CourseCard;
