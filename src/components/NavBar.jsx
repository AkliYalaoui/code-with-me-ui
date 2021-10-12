import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/userSlice";
import { useState } from "react";
import AddProject from "./AddProject";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    history.replace("/");
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AddProject modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <nav className="shadow-md">
        <div className="flex items-center justify-between max-w-5xl m-auto">
          <Link to="/" className="font-bold text-2xl">
            CodeWithMe
          </Link>
          <ul className="flex items-center">
            <li>
              <button
                className="bg-gray-900 p-3 shadow hover:bg-opacity-70"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
            <li>
              <button
                className="bg-gray-900 ml-2 p-3 shadow hover:bg-opacity-70"
                onClick={openModal}
              >
                + project
              </button>
            </li>
            <li className="p-3 bg-gray-900 hover:opacity-70">
              {isLoggedIn ? (
                <Link to="/profile">Get started</Link>
              ) : (
                <Link to="/auth">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
