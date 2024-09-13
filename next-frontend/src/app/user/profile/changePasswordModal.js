"use client";

import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "@/contexts";

import * as actions from "@/actions";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ handleChangePassword }) => {
  const { authToken } = useStateContext();

  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (old_password === new_password) {
      toast.error("Old and new password must be different!");
      return;
    }
    const postData = {
      old_password,
      new_password,
    };
    const res = await actions.changePassword(authToken, postData);
    if(res.error) {
      toast.error(res.msg);
    } else {
      toast.success(res.msg);
      handleChangePassword();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Change Password</p>
            </div>
            <div className="py-2">
              <button onClick={handleChangePassword}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="old_password"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <input
                type="password"
                id="old_password"
                name="old_password"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={old_password}
                onChange={(e) => setOld_password(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                onClick={handleChangePassword}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;