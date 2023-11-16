import Logo from "../../assets/Logo";
import { linkProps } from "../../util/types";
import links from "../../util/data";
import Button from "../ui/Button";
const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-5">
      <Logo />
      <div className="flex gap-5">
        {links.map(({ link }: linkProps) => {
          return (
            <div>
              <h1 className="text-base leading-6">{link}</h1>
            </div>
          );
        })}
      </div>
      <Button text="Get started" />
    </div>
  );
};
export default NavBar;
