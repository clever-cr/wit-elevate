import { buttonProps } from "../../util/types";

const Button = ({ text, className, icon, onClick }: buttonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex  rounded px-4 py-4 text-white- items-center gap-2 ${className}`}
    >
      <h1 className={`  text-sm font-semibold leading-4 `}>{text}</h1>
      {icon}
    </div>
  );
};
export default Button;
