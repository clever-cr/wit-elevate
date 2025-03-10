// import { SlArrowRight } from "react-icons/sl"
// import { Link } from "react-router-dom"

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const SideBarButton = ({text,icon,path}:any) =>{
//   return (
//   <Link
//     to={path}
//     className="flex items-center  px-5 py-2 hover:bg-primary bg-white rounded-full hover:text-white justify-between"
//   >
//     <div className="flex items-center gap-2">
//       <>{icon}</>
//       <p>{text}</p>
//     </div>
//     <div >
//       <SlArrowRight className=" hover:hidden w-3" />
//     </div>
//   </Link>
//   )

// }
// export default SideBarButton

import { Link } from "react-router-dom";

const SideBarButton = ({ text, icon, path, onClick }: any) => {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default SideBarButton;
