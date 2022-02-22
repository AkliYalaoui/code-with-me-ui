import { Link } from "react-router-dom";
import { Navlink } from ".";

import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const [user] = useAuth();

  return (
    <nav className="shadow-md">
      <div className="max-w-5xl m-auto flex items-center justify-between ">
        <h2 className="p-4 relative">
          <span className="absolute top-3 left-1 border-black h-4 w-4 block border-t-4 border-l-4"></span>
          <Link to="/" className="text-xl">
            CodeWithMe
          </Link>
          <span className="absolute bottom-3 right-1 border-black h-4 w-4 block border-b-4 border-r-4"></span>
        </h2>
        <ul className="flex items-center justify-between">
          <li>
            <Navlink to="/">Home</Navlink>
          </li>
          {user ? (
            <li>
              <Navlink to="/dashboard">Dashboard</Navlink>
            </li>
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
