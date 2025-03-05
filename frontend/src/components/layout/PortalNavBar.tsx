import { FaBell } from "react-icons/fa"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signOutAction } from "../../store/users/actions"

const PortalNavBar = () => {
  const { user } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    const res = await signOutAction()(dispatch)
    if (res?.type) {
      navigate("/login")
    }
  }

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

          <div className="relative">
            <div 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {user?.data?.firstName?.[0] || 'U'}
                </span>
              </div>
              <div className="text-left">
                <h2 className="font-medium text-gray-800">{user?.data?.firstName}</h2>
                <p className="text-sm text-gray-500">{user?.data?.email}</p>
              </div>
              <RiArrowDropDownLine className={`w-5 h-5 text-gray-400 transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PortalNavBar