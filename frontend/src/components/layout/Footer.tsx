import Logo from "../../assets/Logo";
import { linkProps } from "../../util/types";

import FaceBook from "../../assets/FaceBook";
import Instagram from "../../assets/Instagram";
import X from "../../assets/X";
import LinkedIn from "../../assets/LinkedIn";
import Youtube from "../../assets/Youtube";
const Footer = () => {
  return (
    <div className="flex items-center justify-between pt-40 pb-7 text-sm">
      <p className="font-medium">
        © Copyright WIT Elevate 2023 All rights reserved
      </p>
      <p className="text-primary font-medium">Support Center</p>
      <p className="font-medium">Follow us on:</p>
      <p className="underline">Privacy Policy</p>
      <p className="underline">Terms of Service</p>
    </div>
  );
};
export default Footer;
