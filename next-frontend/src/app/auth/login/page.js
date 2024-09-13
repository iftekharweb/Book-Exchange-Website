"use client";

import Full_logo from "@/public/Full_Logo.png";
import books2 from "@/public/books2.jpg";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as actions from "@/actions";
import { toast } from "react-toastify";
import { useStateContext } from "@/contexts";

export default function login() {
  const { setAuthToken, setAuthUserId, setAuthName, setAuthEmail, setLogSign } =
    useStateContext();
  useEffect(() => {
    setLogSign(true);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await actions.loginOperation(email, password);
    if (res.token) {
      toast.success(res.msg);
      setAuthToken(res.token.access);
      setAuthName(res.user_name);
      setAuthUserId(res.user_id);
      setAuthEmail(res.user_email);
      localStorage.setItem("token", res.token.access);
      actions.goToHome();
    } else {
      toast.error(res.msg);
    }
  };
  const changeSign = () => {};

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <button
              className=" flex justify-center items-center mb-5 w-full"
              onClick={() => actions.goToHome()}
            >
              <Image src={Full_logo} width={100} height={60} alt="full logo" />
            </button>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form
            action="submit"
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </form>
          <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <button
                  className="underline px-1"
                  onClick={() => actions.goToRegisterPage()}
                >
                  Sign up
                </button>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <Image
            alt="login page image"
            src={books2}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
