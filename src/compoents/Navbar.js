import { Link } from "react-router-dom";
import { Navlink } from ".";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const [user,updateUser] = useAuth();

  return (
    <nav className="shadow-md">
      <div className="max-w-5xl m-auto flex items-center justify-between ">
        <h2 className="py-4 px-2 relative">
          <span className="absolute top-2 left-1 border-black h-4 w-4 block border-t-4 border-l-4"></span>
          <Link to="/" className="text-xl">
            CodeWithMe
          </Link>
          <span className="absolute bottom-2 right-0 border-black h-4 w-4 block border-b-4 border-r-4"></span>
        </h2>
        <ul className="flex items-center justify-between text-sm sm:text-base">
          {user ? (
            <>
            <li>
              <Navlink to="/dashboard">Dashboard</Navlink>
            </li>
            <li>
              <Navlink to="/add-project">+ Project</Navlink>
            </li>
            <li>
              <button onClick={()=>updateUser(null)} className="px-2 py-4 hover:border-b-2 hover:border-black hover:bg-gray-100">
                Log Out
              </button>
            </li>
            </>
          ) : (
            <>
              <li>
                <Navlink to="/login">Sign In</Navlink>
              </li>
              <li>
                <Navlink to="/register">Sign Up</Navlink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
