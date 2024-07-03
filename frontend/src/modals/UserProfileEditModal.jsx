import React, { useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";

const UserProfileEditModal = ({ handleEditProfile, user, fetchUser }) => {
  const { authToken, authUserId } = useStateContext();

  const [profileData, setProfileData] = useState({
    id: user.id || "",
    date_of_birth: user.date_of_birth || "",
    gender: user.gender || "",
    district: user.district || "",
    upazilla: user.upazilla || "",
    phone: user.phone || "",
    name: user.name || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/users/${authUserId}/`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        alert("Profile updated successfully!");
        fetchUser();
        handleEditProfile();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div className="flex justify-between items-center pb-3">
          <div className="py-2">
            <p className="text-2xl font-semibold">Edit Profile</p>
          </div>
          <div className="py-2">
            <button onClick={handleEditProfile}>
              <MdOutlineCancel className="text-2xl hover:text-red-500" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              value={profileData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date_of_birth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              value={profileData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              value={profileData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              value={profileData.district}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="upazilla"
              className="block text-sm font-medium text-gray-700"
            >
              Upazila
            </label>
            <input
              type="text"
              id="upazilla"
              name="upazilla"
              className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              value={profileData.upazilla}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              value={profileData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
              onClick={handleEditProfile}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileEditModal;
