import Logo from "../../assets/Logo";
import { linkProps } from "../../util/types";
import links from "../../util/data";
import FaceBook from "../../assets/FaceBook";
import Instagram from "../../assets/Instagram";
import X from "../../assets/X";
import LinkedIn from "../../assets/LinkedIn";
import Youtube from "../../assets/Youtube";
const Footer = () => {
  return (
    <div className="px-16 py-20 flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <Logo />
        <div>
          <div className="flex gap-5">
            {links.map(({ link }: linkProps) => {
              return (
                <div>
                  <h1 className="text-base leading-6">{link}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaceBook />
          <Instagram />
          <X />
          <LinkedIn />
          <Youtube />
        </div>
      </div>
      <div className="border-t border-black ">
        <div className="flex justify-center gap-6  pt-8  ">
          <p>2023 Tech Connekt. All right reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies Settings"].map(
              (link) => {
                return <a className="underline">{link}</a>;
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
