import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const currentColor = "#FF7F3E";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  );
};

const Navbar = () => {
  const { activeMenu, setActiveMenu, authName, handleLogOut, authToken, changeLog, changeSign } =
    useStateContext();
  const navigate = useNavigate();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleLoginClick = () => {
    changeLog();
    navigate("/login");
  };

  const handleRegisterClick = () => {
    changeSign();
    navigate("/register");
  };

  const handleLogoutClick = () => {
    handleLogOut();
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {authToken ? (
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {authName}
              </span>
            </p>
            <button className="px-4" onClick={handleLogoutClick}>
              <FiLogOut className="font-semibold text-gray-500 hover:text-red-500 hover:font-bold text-xl" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <button className="px-4">
              <p
                className="font-semibold text-gray-400 hover:text-[#FF7F3E]"
                onClick={handleLoginClick}
              >
                Login
              </p>
            </button>
            <button className="px-4">
              <p
                className="font-semibold text-gray-400 hover:text-[#FF7F3E]"
                onClick={handleRegisterClick}
              >
                Register
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
