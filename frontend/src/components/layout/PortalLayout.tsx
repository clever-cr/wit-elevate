// import PortalNavBar from "./PortalNavBar";
// import PortalSideBar from "./PortalSideBar";
// import { Outlet } from "react-router";
// const PortalLayout = () =>{
// return (
//   <div className="h-screen">
//   <PortalNavBar/>
// <div className="flex gap-5">
// <PortalSideBar/>
// <div className="flex-1">
// <Outlet/>
// </div>

// </div>

//   </div>
// )
// }
// export default PortalLayout;

import PortalNavBar from "./PortalNavBar";
import PortalSideBar from "./PortalSideBar";
import { Outlet } from "react-router";

const PortalLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <PortalNavBar />
      <div className="flex">
        <PortalSideBar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;