import Logo from "../../assets/Logo";
import { linkProps } from "../../util/types";
import { links } from "../../util/data";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-10">
      <div className="flex items-center gap-14 ">
        <Link to="/" className="text-black text-2xl leading-10 font-extrabold">
          WIT <span className="text-secondary">Elevate</span>
        </Link>

        <div className=" flex items-center gap-8 text-grey text-base font-medium leading-6">
          {links.map(({ link, path }: linkProps) => {
            return <Link to={path}>{link}</Link>;
          })}
        </div>
      </div>

      <Link to="logIn" className="text-grey text-base font-medium leading-6">
        Log in
      </Link>
    </div>
  );
};
export default NavBar;
