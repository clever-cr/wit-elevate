import BoldArrow from "../../assets/BoldArrow";
import { useState } from "react";
import Up from "../../assets/Up";

const Faqs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!open);
  };
  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-semibold text-3xl leading-10 text-darkGrey">FAQs</h1>
      <div className="flex items-center justify-between bg-lightGrey p-6 rounded-sm">
        <h1 className="text-darkGrey text-base leading-6 font-medium">
          Why is it better to choose WIT Elevate as a partner?
        </h1>
        <div>{!isOpen ? <BoldArrow onClick={handleOpen} /> : <Up />}</div>
        {isOpen && <h1 className="bg-red-200">Descriptionnnn</h1>}
      </div>
    </div>
  );
};
export default Faqs;
