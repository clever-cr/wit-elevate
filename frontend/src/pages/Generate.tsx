import Button from "../components/ui/Button";
import { BsStars } from "react-icons/bs";

const Generate = () => {
  return (
    <>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col">
          <h2 className="font-medium text-xl">Hi Clever U</h2>
          <h1 className="font-semibold text-2xl">Good Morning!</h1>
        </div>

        <div className="bg-white flex flex-col items-center gap-11 px-28 py-28 rounded-3xl ml-36">
          <h1 className="text-3xl font-semibold">First Time on Platform?</h1>
          <p className="text-sm max-w-md text-center">
            Welcome! Now that you've completed your profile, you can start your
            journey by creating your learning path.
          </p>
          <Button
            text={"Generate Learning path"}
            icon={<BsStars className="w-5 h-5" />}
            className="bg-primary px-16 py-4 rounded-xl text-white flex-row-reverse"
          ></Button>
        </div>
      </div>
    </>
  );
};
export default Generate;
