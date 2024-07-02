import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdSpaceDashboard, MdOutlineCancel, MdClass, MdScience } from "react-icons/md";
import { FaBookOpenReader, FaBusinessTime, FaPersonCircleQuestion } from "react-icons/fa6";
import { PiBrainFill } from "react-icons/pi";
import { FiCodesandbox } from "react-icons/fi";
import { ImProfile } from "react-icons/im";

import { useStateContext } from "../contexts/ContextProvider";
import Full_logo from "../assets/Full_Logo.png";

const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        role: ["ADMIN", "USER", "NONE"],
        icon: <MdSpaceDashboard />,
      },
    ],
  },

  {
    title: "User Section",
    links: [
      {
        name: "profile",
        role: ["ADMIN", "USER"],
        icon: <ImProfile />,
      },
      {
        name: "user-books",
        role: ["USER"],
        icon: <ImProfile />,
      },
      {
        name: "book-requests",
        role: ["USER"],
        icon: <ImProfile />,
      },
      {
        name: "buy-orders",
        role: ["USER"],
        icon: <ImProfile />,
      },
      {
        name: "swap-requests",
        role: ["USER"],
        icon: <ImProfile />,
      },
      {
        name: "swap-orders",
        role: ["USER"],
        icon: <ImProfile />,
      },
    ],
  },
  {
    title: "Book By Genre",
    links: [
      {
        name: "all-genres",
        role: ["ADMIN", "USER", "NONE"],
        icon: <MdClass />,
      },
      {
        name: "business",
        role: ["ADMIN", "USER", "NONE"],
        icon: <FaBusinessTime />,
      },
      {
        name: "science",
        role: ["ADMIN", "USER", "NONE"],
        icon: <MdScience />,
      },
      {
        name: "fiction",
        role: ["ADMIN", "USER", "NONE"],
        icon: <FiCodesandbox />,
      },
      {
        name: "philosophy",
        role: ["ADMIN", "USER", "NONE"],
        icon: <PiBrainFill />,
      },
      {
        name: "biography",
        role: ["ADMIN", "USER", "NONE"],
        icon: <FaPersonCircleQuestion />,
      },
    ],
  },
];

const currentColor = "#FF7F3E";

const Sidebar = () => {
  //const navigate = useNavigate();
  const { authRole, activeMenu, setActiveMenu, handleLogOut } =
    useStateContext();

  useEffect(() => {
    console.log(authRole);
  }, []);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined) {
      //setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-semiabold tracking-tight text-slate-900"
            >
              <img src={Full_logo} alt="" className="h-10 w-14" />{" "}
              <span className="font-semibold text-gray-400">BookMark</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            <div>
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map(
                    (link) =>
                      link.role.find((id) => id === authRole) && (
                        <NavLink
                          to={`/${link.name}`}
                          key={link.name}
                          onClick={handleCloseSideBar}
                          style={({ isActive }) => ({
                            backgroundColor: isActive ? currentColor : "",
                          })}
                          className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                          }
                        >
                          {link.icon}
                          <span className="capitalize ">{link.name}</span>
                        </NavLink>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;