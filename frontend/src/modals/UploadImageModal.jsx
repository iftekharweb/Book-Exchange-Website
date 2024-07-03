import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";

const UploadImageModal = ({ handleImageAdding, fetchUser, images }) => {
  const {authUserId} = useStateContext();

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      if(images.length) {
        const [dltImg, postImg] = await Promise.all(
          [axios.delete(
            `${import.meta.env.VITE_BASEURL}/users/${authUserId}/images/${images[0].id}/`
          ),
          axios.post(
            `${import.meta.env.VITE_BASEURL}/users/${authUserId}/images/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )]
        );
        fetchUser();
        handleImageAdding();
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_BASEURL}/users/${authUserId}/images/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchUser();
        handleImageAdding();
      }
    } catch (error) {
      fetchUser();
      handleImageAdding();
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Upload Image </p>
            </div>
            <div className="py-2">
              <button onClick={handleImageAdding}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                User Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                onChange={handleImageChange}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                onClick={handleImageAdding}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadImageModal;
