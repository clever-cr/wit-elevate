

import PortalNavBar from "./PortalNavBar";
import PortalSideBar from "./PortalSideBar";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import store from "store"
import { useNavigate } from "react-router-dom";

const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = store.get("userData");
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (data.role !== "admin") {
      navigate("/")
    }
  }
  , [data]);

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <PortalNavBar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        sidebarOpen={sidebarOpen} 
      />
      <div className="flex flex-col md:flex-row">
        <PortalSideBar 
          isOpen={sidebarOpen} 
          closeSidebar={() => setSidebarOpen(false)} 
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
