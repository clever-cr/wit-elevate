import { PiHouseSimpleThin } from "react-icons/pi";
import SideBarButton from "../ui/SideBarButton";
import { MdOutlineForum, MdOutlineQuiz } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
const PortalSideBar = () => {
  return (
    <>
      <div className="bg-[#F8F9FB]">
        
        <div className="bg-white mx-5 rounded-3xl w-full- h-full- pl-8 py-16 pr-16 flex flex-col gap-5">
          <SideBarButton text="Overview" icon={<PiHouseSimpleThin />}  path="/portal"/>
          <SideBarButton text="Profile" icon={<CgProfile />} path="/portal/profile"/>
          <SideBarButton text="Assessments" icon={<MdOutlineQuiz />} path="/portal/assessment"  />
          <SideBarButton text="Courses" icon={<MdOutlineQuiz />}  path="/portal/courses" />
          <SideBarButton text="Forum" icon={<MdOutlineForum />} path="/portal/forum"/>
          <SideBarButton text="Projects" icon={<GoProjectSymlink  />} path="/portal/projects"/>
        </div>
      </div>
    </>
  );
};
export default PortalSideBar;
