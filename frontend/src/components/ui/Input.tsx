import { inputProps } from "../../util/types";
const Input = ({ placeholder }: inputProps) => {
  return (
    <input
      placeholder={placeholder}
      className="bg-med p-4 rounded-2xl w-[429px]"
    />
  );
};
export default Input;
