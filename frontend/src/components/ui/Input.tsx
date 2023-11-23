import { inputProps } from "../../util/types";
const Input = ({ placeholder, value, name, onChange }: inputProps) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className="bg-med p-4 rounded-2xl w-[429px]"
    />
  );
};
export default Input;
