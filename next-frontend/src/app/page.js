"use client";
import { useStateContext } from "@/contexts";
import { useEffect } from "react";
import * as actions from "@/actions";
import Image from "next/image";

import Full_logo from "@/public/Full_Logo.png";

export default function Home() {
  const { authName, authEmail, handleLogOut, authToken, setLogSign } =
    useStateContext();

  useEffect(() => {
    setLogSign(false);
  }, []);

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <div className="flex justify-center items-center w-full pb-4">
            <Image src={Full_logo} width={200} height={150} />
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Exchange And Buy
            <strong className="font-extrabold text-[#FF7F3E] sm:block">
              {" "}
              Book Mart{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
          A non-profit app that simplifies buying and exchanging books. Connect with fellow readers to share literature without profit motives, promoting a culture of knowledge sharing and community.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-[#FF7F3E] px-12 py-3 text-sm font-bold text-white shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-[#FF7F3E] sm:w-auto"
              onClick={() => actions.goToBooksPage()}
            >
              Get Started
            </button>

            {!authToken && (
              <button
                className="block w-full rounded px-12 py-3 text-sm font-bold text-[#FF7F3E] shadow hover:text-[#FF7F3E] hover:shadow-lg focus:outline-none focus:ring active:text-[#FF7F3E] sm:w-auto border border-[#FF7F3E]"
                onClick={() => actions.goToRegisterPage()}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
