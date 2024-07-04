import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBookModal = ({ handleEdit, user, fetchBooks, book }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishDate, setPublishDate] = useState(book.publish_date);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
  const [category, setCategory] = useState(book.catagory);
  const [preImage, setPreImage] = useState(book.images[0].image);
  const [image, setImage] = useState(book.images[0].image);

  const [allCategory, setAllCatagory] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/categories/`
      );
      if (res.data) setAllCatagory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async (bookId, imageFile) => {
    if (preImage === image) {
      toast.success("Book info has been changed", { autoClose: 2000 });
      setTimeout(() => {
        handleEdit();
        fetchBooks();
      }, 2000);
      return;
    }
    const dltImgId = book.images[0].id;
    try {
      console.log(book.images[0].id);
      const res = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/books/${bookId}/images/${dltImgId}/`
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    try {
      const formData = new FormData();
      formData.append("image", image);
      const [dltImg, postImg] = await Promise.all(
        axios.delete(
          `${import.meta.env.VITE_BASEURL}/books/${bookId}/images/${dltImgId}/`
        ),
        axios.post(
          `${import.meta.env.VITE_BASEURL}/books/${bookId}/images/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      );
      if (postImg.data) {
        toast.success("Book info has been changed", { autoClose: 2000 });
        setTimeout(() => {
          handleEdit();
          fetchBooks();
        }, 2000);
      } else {
        toast.error(
          "Something is wrong! Uploaded image of the book is not changed"
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        "Something is wrong! Uploaded image of the book is not changed"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      author,
      user,
      publish_date: publishDate,
      description,
      price,
      catagory: category,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASEURL}/books/${book.id}/`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        uploadImage(res.data.id);
      }
    } catch (error) {
      console.log("NOPE");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Edit The Book </p>
            </div>
            <div className="py-2">
              <button onClick={handleEdit}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Author Input */}
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            {/* Publish Date Input */}
            <div className="mb-4">
              <label
                htmlFor="publishDate"
                className="block text-sm font-medium text-gray-700"
              >
                Publish Date
              </label>
              <input
                type="date"
                id="publishDate"
                name="publish_date"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                required
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Price Input */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Category Input */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value={null}>Select a category</option>
                {allCategory.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload Input */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Book Image
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
                onClick={handleEdit}
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
    </div>
  );
};

export default EditBookModal;
