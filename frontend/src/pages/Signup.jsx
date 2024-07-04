import React, { useState } from "react";
import axios from "axios";

import books1 from "../assets/books1.jpg";
import Full_logo from "../assets/Full_Logo.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const { authToken, changeLog, changeSign, setAuthToken } = useStateContext();
  // State for all fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) return;

    const name = `${fname} ${lname}`;

    const userData = {
      name,
      email,
      phone: phoneNumber,
      district,
      upazilla: upazila,
      gender,
      date_of_birth: dateOfBirth,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/register/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        const data = res.data;
        localStorage.setItem("token", data.token.access);
        toast.success("Signup successful! Redirecting...", { autoClose: 3000 });
        setTimeout(() => {
          setAuthToken(data.token.access);
          changeSign();
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={books1}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <img src={Full_logo} alt="" className="h-24 w-30" />

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to BookMark
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-3 sm:px-12 lg:col-span-7 lg:px-5 lg:py-5 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative mt-5 block lg:hidden">
                <img src={Full_logo} alt="" className="h-24 w-30" />

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to BookMark
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>

              <div className="w-full flex justify-center items-center">
                <img src={Full_logo} alt="" className="h-24 w-30" />
              </div>
              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="District"
                    className="block text-sm font-medium text-gray-700"
                  >
                    District
                  </label>
                  <input
                    type="text"
                    id="District"
                    name="district"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Upazila"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upazila
                  </label>
                  <input
                    type="text"
                    id="Upazila"
                    name="upazila"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="PhoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="phone"
                    id="PhoneNumber"
                    name="phone"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="Gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="Gender"
                    name="gender"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="DateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="DateOfBirth"
                    name="date_of_birth"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="py-2 px-1 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <button className="text-gray-700 underline mx-1">
                      terms and conditions
                    </button>
                    and
                    <button className="text-gray-700 underline mx-1">
                      privacy policy
                    </button>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <button className="text-gray-700 underline px-1">
                      Log in
                    </button>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Signup;
