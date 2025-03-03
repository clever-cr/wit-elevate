import { FaBell } from "react-icons/fa"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const PortalNavBar = () =>{
  const {user}=useSelector((state:any)=>state)
return(
  <>
  <div className="px-5 py-10 flex items-center- justify-between bg-slate-600-">
          {/* <NavBar/> */}
          <Link
            to="/"
            className="text-black text-2xl leading-10 font-extrabold "
          >
            WIT <span className="text-primary">Elevate</span>
          </Link>
          <div className="flex items-center gap-5"> 
            <div className="bg-white w-[48px] h-[48px] flex flex-col items-center rounded-full">
            <FaBell  className="text-[#51545B] w-6 h-6 mt-[9px]"/>
            </div>
            <div className="bg-white flex items-center gap-3 py-2 px-4 rounded-[10px]">
              <div className="w-[50px] h-[50px] rounded-full bg-green-300 text-center">
              <h1 className="mt-2 text-2xl">U</h1>
              </div>
              <div>
                <h2>{user?.data?.firstName}</h2>
                <p className="text-xs">{user?.data?.email}</p>
              </div>
              <div>
                <RiArrowDropDownLine className="w-12 h-12"/>
              </div>
            </div>
          </div>
        </div>
  </>
)
}
export default PortalNavBar