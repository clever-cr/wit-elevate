import { Link } from "react-router-dom";
import { formProps } from "../../util/types";
import Google from "../../assets/Google";

const Form = ({ header }: formProps) => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-bold text-3xl leading-10 text-dark">{header}</h1>
        <div className="flex flex-col items-center gap-4">
          <button className="flex items-center gap-4 border border-[#E7E7E7] py-2 px-24 rounded-2xl">
            <Google />{" "}
            <p className="font-semibold text-base leading-5">
              Continue with Google
            </p>
          </button>
          <p className="">or</p>
        </div>
      </div>
    </div>
  );
};
export default Form;
