
import { PiHouseSimpleThin } from "react-icons/pi";
import SideBarButton from "../ui/SideBarButton";
import { MdOutlineForum, MdOutlineQuiz } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import store from "store";

const PortalSideBar = ({ isOpen, closeSidebar }) => {
  const data = store.get("userData");

  const handleNavigation = () => {
  
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}
      
      <aside 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          fixed md:sticky top-0 h-screen overflow-y-auto
          z-20 w-64 bg-white border-r border-gray-100 
          transition-transform duration-300 ease-in-out
          md:h-[calc(100vh-73px)] md:top-[73px]
        `}
      >
        <div className="p-6">
          <div className="flex flex-col gap-2">
            {data.role === "admin" && (
              <>
              <SideBarButton 
                text="Dashboard" 
                icon={<PiHouseSimpleThin className="w-5 h-5" />} 
                path="/admin/dashboard"
                onClick={handleNavigation}
                end
              />
              <SideBarButton 
              text="Forum" 
              icon={<MdOutlineForum className="w-5 h-5" />} 
              path="/admin/dashboard/forum"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Projects" 
              icon={<GoProjectSymlink className="w-5 h-5" />} 
              path="/admin/dashboard/projects"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Assessments" 
              icon={<MdOutlineQuiz className="w-5 h-5" />} 
              path="/admin/dashboard/assessments"
              onClick={handleNavigation}
            />
              </>
            )}
            {data.role != "admin" && (
              <>
              <SideBarButton 
              text="Overview" 
              icon={<PiHouseSimpleThin className="w-5 h-5" />} 
              path="/user/portal/overview" 
              onClick={handleNavigation}
              end
              />
              <SideBarButton 
                text="Profile" 
                icon={<CgProfile className="w-5 h-5" />} 
                path="/user/portal/profile"
                onClick={handleNavigation}
              />
              <SideBarButton 
              text="Assessments" 
              icon={<MdOutlineQuiz className="w-5 h-5" />} 
              path="/user/portal/assessments"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Courses" 
              icon={<BsBook className="w-5 h-5" />} 
              path="/user/portal/courses"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Forum" 
              icon={<MdOutlineForum className="w-5 h-5" />} 
              path="/user/portal/forum"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Projects" 
              icon={<GoProjectSymlink className="w-5 h-5" />} 
              path="/user/portal/projects"
              onClick={handleNavigation}
            />
              </>
            )}
            
          </div>
        </div>
      </aside>
    </>
  );
};

export default PortalSideBar;
