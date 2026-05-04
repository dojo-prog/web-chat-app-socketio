import { Link } from "react-router-dom";
import useAuthStore from "../stores/auth.store";
import { useState } from "react";
import { ChevronDownIcon, LogOut, PenIcon } from "lucide-react";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  return (
    <div className="h-16 bg-white px-4 py-2 shadow rounded-lg flex items-center justify-between mb-4">
      {/* Left Section */}
      <div className="flex-1">
        {/* Logo Area */}
        <Link to={"/"}>
          <div className="flex items-center">
            <div className="h-8 aspect-square flex items-center justify-center bg-blue-100 rounded-md mr-2">
              <h2 className="font-bold text-blue-700">D</h2>
            </div>
            <h2 className="text-lg font-bold">DOJO</h2>
          </div>
        </Link>
      </div>

      {/* Right Section */}
      <div>
        {/* User Section */}
        <div
          className="relative flex items-center select-none cursor-pointer"
          onClick={() => setUserDropdownOpen((prev) => !prev)}
        >
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
            {user?.avatar_url ? (
              <img src="" alt="" />
            ) : (
              <h2 className="font-bold text-blue-700">
                {user?.fname[0] + user?.lname[0]!}
              </h2>
            )}
          </div>
          <div>
            <h2 className="text-xs text-blue-600 font-semibold">Welcome!</h2>
            <h2 className="text-sm font-bold">
              {user?.fname} {user?.lname}
            </h2>
          </div>
          <div>
            <ChevronDownIcon size={15} className="ml-2" />
          </div>

          {/* Dropdown */}
          {userDropdownOpen && (
            <div className="absolute top-full -right-4 w-40 mt-6 bg-white shadow-lg shadow-blue-500/30 ">
              <button className="w-full p-3 flex items-center justify-center hover:bg-gray-200 text-sm cursor-pointer">
                <PenIcon size={15} className="mr-2" />
                Edit Profile
              </button>
              <button
                className="w-full p-3 flex items-center justify-center hover:bg-gray-200 text-sm cursor-pointer"
                onClick={logout}
              >
                <LogOut size={15} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
