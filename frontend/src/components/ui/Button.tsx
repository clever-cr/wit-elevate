import { buttonProps } from "../../util/types";

const Button = ({ text, className, icon, onClick, type }: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex  rounded px-4- py-4- text-white- items-center gap-2 ${className}`}
      type={type || "button"}
    >
      <h1 className={`  text-sm font-semibold leading-4 `}>{text}</h1>
      {icon}
    </button>
  );
};
export default Button;
