"use client";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import { FiLogOut } from "react-icons/fi";

import Full_logo from "@/public/Full_Logo.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";

const currentColor = "#FF7F3E";

export default function HyperNavbar() {
  const {
    activeMenu,
    setActiveMenu,
    authName,
    handleLogOut,
    authToken,
    logSign,
    setLogSign,
  } = useStateContext();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleLoginClick = () => {
    actions.goToLoginPage();
    setLogSign(true);
  };

  const handleRegisterClick = () => {
    actions.goToRegisterPage();
    setLogSign(true);
  };

  const handleLogoutClick = () => {
    handleLogOut();
    toast.success("Successfully logged out");
    setLogSign(true);
    actions.goToLoginPage();
  };

  const [listRQ, setListRQ] = useState(false);
  return (
    <>
      {!logSign && (
        <header className="bg-white shadow-md">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 md:flex md:items-center md:gap-12">
                <button
                  className="block text-[#FF7F3E]"
                  onClick={() => actions.goToHome()}
                >
                  <span className="sr-only">Home</span>
                  <Image src={Full_logo} alt="logo" width={70} height={30} />
                </button>
              </div>

              <div className="md:flex md:items-center md:gap-12">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <button
                        className="text-gray-500 transition hover:text-gray-500/75"
                        onClick={() => actions.goToBooksPage()}
                      >
                        {" "}
                        Books{" "}
                      </button>
                    </li>

                    {false && <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        {" "}
                        Todo{" "}
                      </a>
                    </li>}

                    {authToken && <li className="relative">
                      <button
                        className="text-gray-500 transition hover:text-gray-500/75"
                        onClick={() => setListRQ(!listRQ)}
                      >
                        {" "}
                        Requests{" "}
                      </button>
                      {listRQ && (
                        <div
                          className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                          role="menu"
                        >
                          <div className="p-2">
                            <button
                              onClick={() => {
                                setListRQ(!listRQ);
                                actions.goToBuyRqToYou();
                              }}
                              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                              role="menuitem"
                            >
                              Buy requests to you
                            </button>

                            <button
                              onClick={() => {
                                setListRQ(!listRQ);
                                actions.goToExchangeRqToYou();
                              }}
                              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                              role="menuitem"
                            >
                              Exchange requsts to you
                            </button>

                            <button
                              onClick={() => {
                                setListRQ(!listRQ);
                                actions.goToYourBuyOrders();
                              }}
                              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                              role="menuitem"
                            >
                              Your buy orders
                            </button>

                            <button
                              onClick={() => {
                                setListRQ(!listRQ);
                                actions.goToYourExchangeOrders();
                              }}
                              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                              role="menuitem"
                            >
                              Your exchange orders
                            </button>
                          </div>
                        </div>
                      )}
                    </li>}

                    {authToken && <li>
                      <button
                        className="text-gray-500 transition hover:text-gray-500/75"
                        onClick={() => actions.goToUserBooks()}
                      >
                        {" "}
                        Inventory{" "}
                      </button>
                    </li>}

                    <li>
                      <button
                        className="text-gray-500 transition hover:text-gray-500/75"
                        onClick={() => actions.goToBlogsPage()}
                      >
                        {" "}
                        Blogs{" "}
                      </button>
                    </li>
                  </ul>
                </nav>

                <div className="flex items-center gap-4">
                  {!authName ? (
                    <div className="sm:flex sm:gap-4">
                      <button
                        className="rounded-md bg-[#FF7F3E] px-5 py-2.5 text-sm font-medium text-white shadow"
                        onClick={() => actions.goToLoginPage()}
                      >
                        Login
                      </button>

                      <div className="hidden sm:flex">
                        <button
                          className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#FF7F3E]"
                          onClick={() => actions.goToRegisterPage()}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                      <button
                        className="hover:bg-orange-500 text-gray-400 hover:text-white  px-2 rounded-md"
                        onClick={() => actions.goToProfilePage()}
                      >
                        <span className="text-14">Hi,</span>{" "}
                        <span className="font-bold ml-1 text-14">
                          {authName}
                        </span>
                      </button>
                      <button className="px-4" onClick={handleLogoutClick}>
                        <FiLogOut className="font-semibold text-gray-500 hover:text-red-500 hover:font-bold text-xl" />
                      </button>
                    </div>
                  )}

                  <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
