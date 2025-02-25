import PortalNavBar from "./PortalNavBar";
import PortalSideBar from "./PortalSideBar";
import { Outlet } from "react-router";
const PortalLayout = () =>{
return (
  <div className="h-screen">
  <PortalNavBar/>
<div className="flex gap-5">
<PortalSideBar/>
<Outlet/>
</div>

  </div>
)
}
export default PortalLayout;