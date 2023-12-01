import Logo from "../../assets/Logo";
import { linkProps } from "../../util/types";
import { links } from "../../util/data";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "";
  const token = localStorage.getItem("token");
  function logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className="py-10 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-14 ">
          <Link
            to="/"
            className="text-black text-2xl leading-10 font-extrabold"
          >
            WIT <span className="text-secondary">Elevate</span>
          </Link>

          <div className=" flex items-center gap-8 text-grey text-base font-medium leading-6">
            {links.map(({ link, path }: linkProps) => {
              return <Link to={path}>{link}</Link>;
            })}
          </div>
        </div>
        <div className="flex items-center gap-5">
          {["admin", "partner"].includes(role) && (
            <Link
              to="dashboard"
              className="border border-primary px-6 py-2 text-secondary rounded-lg"
            >
              Dashboard
            </Link>
          )}
          {token ? (
            <button
              onClick={logout}
              className="text-base font-medium leading-6 bg-secondary text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="logIn"
              className="text-grey text-base font-medium leading-6"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
