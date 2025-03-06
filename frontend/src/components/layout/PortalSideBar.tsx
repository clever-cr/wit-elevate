// import { PiHouseSimpleThin } from "react-icons/pi";
// import SideBarButton from "../ui/SideBarButton";
// import { MdOutlineForum, MdOutlineQuiz } from "react-icons/md";
// import { GoProjectSymlink } from "react-icons/go";
// import { CgProfile } from "react-icons/cg";
// const PortalSideBar = () => {
//   return (
//     <>
//       <div className="bg-[#F8F9FB]">
        
//         <div className="bg-white mx-5 rounded-3xl w-full- h-full- pl-8 py-16 pr-16 flex flex-col gap-5">
//           <SideBarButton text="Overview" icon={<PiHouseSimpleThin />}  path="/portal"/>
//           <SideBarButton text="Profile" icon={<CgProfile />} path="/portal/profile"/>
//           <SideBarButton text="Assessments" icon={<MdOutlineQuiz />} path="/portal/assessment"  />
//           <SideBarButton text="Courses" icon={<MdOutlineQuiz />}  path="/portal/courses" />
//           <SideBarButton text="Forum" icon={<MdOutlineForum />} path="/portal/forum"/>
//           <SideBarButton text="Projects" icon={<GoProjectSymlink  />} path="/portal/project"/>
//         </div>
//       </div>
//     </>
//   );
// };
// export default PortalSideBar;

import { PiHouseSimpleThin } from "react-icons/pi";
import SideBarButton from "../ui/SideBarButton";
import { MdOutlineForum, MdOutlineQuiz } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";

const PortalSideBar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100">
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <SideBarButton 
            text="Overview" 
            icon={<PiHouseSimpleThin className="w-5 h-5" />} 
            path="/portal"
          />
          <SideBarButton 
            text="Profile" 
            icon={<CgProfile className="w-5 h-5" />} 
            path="/portal/profile"
          />
          <SideBarButton 
            text="Assessments" 
            icon={<MdOutlineQuiz className="w-5 h-5" />} 
            path="/portal/assessment"
          />
          <SideBarButton 
            text="Courses" 
            icon={<BsBook className="w-5 h-5" />} 
            path="/portal/courses"
          />
          <SideBarButton 
            text="Forum" 
            icon={<MdOutlineForum className="w-5 h-5" />} 
            path="/portal/forum"
          />
          <SideBarButton 
            text="Projects" 
            icon={<GoProjectSymlink className="w-5 h-5" />} 
            path="/portal/projects"
          />
        </div>
      </div>
    </aside>
  );
};

export default PortalSideBar;