import { SlArrowRight } from "react-icons/sl"
import { Link } from "react-router-dom"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SideBarButton = ({text,icon}:any) =>{
  return (
  <Link
    to="/"
    className="flex items-center  px-5 py-2 hover:bg-primary bg-white rounded-full hover:text-white justify-between"
  >
    <div className="flex items-center gap-2">
      <>{icon}</>
      <p>{text}</p>
    </div>
    <div >
      <SlArrowRight className=" hover:hidden w-3" />
    </div>
  </Link>
  )
  
}
export default SideBarButton