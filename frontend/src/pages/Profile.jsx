import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import UploadImageModal from "../modals/UploadImageModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import UserProfileEditModal from "../modals/UserProfileEditModal";

const Profile = () => {
  const { authToken, authUserId } = useStateContext();

  const [user, setUser] = useState({});
  const [userImg, setUserImg] = useState([]);

  const [addingImg, setAddingImage] = useState(false);
  const [passChanging, setPassChanging] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);

  const fetchUser = async () => {
    try {
      const [res, imgRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASEURL}/profile/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }),
        axios.get(
          `${import.meta.env.VITE_BASEURL}/users/${authUserId}/images/`
        ),
      ]);
      if (res.data && imgRes.data) {
        setUser(res.data);
        setUserImg(imgRes.data);
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageAdding = () => setAddingImage(!addingImg);
  const handleChangePassword = () => setPassChanging(!passChanging);
  const handleEditProfile = () => setProfileEdit(!profileEdit);

  return (
    <div className="m-2 md:m-8 mt-24 bg-white rounded-3xl h-[90%] p-8">
      {addingImg && (
        <UploadImageModal
          handleImageAdding={handleImageAdding}
          fetchUser={fetchUser}
          images={userImg}
        />
      )}
      {passChanging && (
        <ChangePasswordModal handleChangePassword={handleChangePassword} />
      )}
      {profileEdit && (
        <UserProfileEditModal
          handleEditProfile={handleEditProfile}
          user={user}
          fetchUser={fetchUser}
        />
      )}
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl font-serif">
          Your Profile
        </h2>
        <div className="flex">
          <button
            className="ml-2 py-2 px-3 bg-[#FF7F3E] hover:bg-[#ff5e00] rounded-sm font-semibold text-white"
            onClick={handleEditProfile}
          >
            Edit profile
          </button>
          <button
            className="ml-2 py-2 px-3 bg-[#FF7F3E] hover:bg-[#ff5e00] rounded-sm font-semibold text-white"
            onClick={handleChangePassword}
          >
            Change password
          </button>
        </div>
      </header>
      <div className="flex justify-between items-center py-10">
        <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm w-[70%]">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">User ID</dt>
              <dd className="text-gray-700 sm:col-span-2">{user?.id}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Full Name</dt>
              <dd className="text-gray-700 sm:col-span-2">{user?.name}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Gender</dt>
              <dd className="text-gray-700 sm:col-span-2">{user?.gender}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">District</dt>
              <dd className="text-gray-700 sm:col-span-2">{user?.district}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Upazila</dt>
              <dd className="text-gray-700 sm:col-span-2">{user?.upazilla}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Phone Number</dt>
              <dd className="text-gray-700 sm:col-span-2">{user?.phone}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Date of Birth</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {user?.date_of_birth}
              </dd>
            </div>
          </dl>
        </div>

        <div className="w-[30%] flex flex-col justify-center items-center">
          <img
            src={
              userImg.length
                ? `${import.meta.env.VITE_BASEURL}/${userImg[0].image}/`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover shadow-lg mb-4 border border-[#FF7F3E]"
          />
          <button
            className="px-3 font-semibold text-[#FF7F3E] mt-2 hover:text-[#ff5e00] hover:font-bold"
            onClick={handleImageAdding}
          >
            {userImg.length ? "Change Photo" : "Upload photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
