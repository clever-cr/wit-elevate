// import { FaBell } from "react-icons/fa"
// import { RiArrowDropDownLine } from "react-icons/ri"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

// const PortalNavBar = () =>{
//   const {user}=useSelector((state:any)=>state)
// return(
//   <>
//   <div className="px-5 py-10 flex items-center- justify-between bg-slate-600-">
//           {/* <NavBar/> */}
//           <Link
//             to="/"
//             className="text-black text-2xl leading-10 font-extrabold "
//           >
//             WIT <span className="text-primary">Elevate</span>
//           </Link>
//           <div className="flex items-center gap-5"> 
//             <div className="bg-white w-[48px] h-[48px] flex flex-col items-center rounded-full">
//             <FaBell  className="text-[#51545B] w-6 h-6 mt-[9px]"/>
//             </div>
//             <div className="bg-white flex items-center gap-3 py-2 px-4 rounded-[10px]">
//               <div className="w-[50px] h-[50px] rounded-full bg-green-300 text-center">
//               <h1 className="mt-2 text-2xl">U</h1>
//               </div>
//               <div>
//                 <h2>{user?.data?.firstName}</h2>
//                 <p className="text-xs">{user?.data?.email}</p>
//               </div>
//               <div>
//                 <RiArrowDropDownLine className="w-12 h-12"/>
//               </div>
//             </div>
//           </div>
//         </div>
//   </>
// )
// }
// export default PortalNavBar

import { FaBell } from "react-icons/fa"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const PortalNavBar = () =>{
  const {user}=useSelector((state:any)=>state)
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-gray-800">
            WIT <span className="text-blue-600">Elevate</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user?.data?.firstName?.[0] || 'U'}
              </span>
            </div>
            <div className="text-left">
              <h2 className="font-medium text-gray-800">{user?.data?.firstName}</h2>
              <p className="text-sm text-gray-500">{user?.data?.email}</p>
            </div>
            <RiArrowDropDownLine className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  )
}
export default PortalNavBar