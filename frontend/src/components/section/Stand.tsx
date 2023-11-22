import people from "../../assets/people.png";
import Button from "../ui/Button";

const Stand = () => {
  return (
    <div className="flex flex-col  py-28 items-center  gap-14">
      <div className="flex flex-col gap-6 ">
        <h2 className="font-semibold text-3xl text-center leading-10 max-w-3xl">
          We stand with all courageous women in tech who are influencing the
          change.{" "}
        </h2>
        <p className="text-base leading-8 text-center max-w-4xl">
          WIT Elevate is here to foster your career growth. we focus on
          providing the information, sharing new knowledge, and offering events
          that are happining in Kigali
        </p>
      </div>

      <div className="flex gap-8 ">
        <input
          placeholder="name@email.com"
          className="bg-bright py-5 px-4 rounded-md w-[650px]"
        />
        <Button text="Subscribe" className="bg-secondary text-white" />
      </div>
    </div>
  );
};
export default Stand;
