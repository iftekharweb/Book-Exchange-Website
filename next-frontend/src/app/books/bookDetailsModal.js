"use client";

import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import { toast } from "react-toastify";

const BookDetailsModal = ({ handleDetails, book }) => {
  const { authUserId } = useStateContext();
  const [owner, setOwner] = useState({});

  const fetchUser = async () => {
    console.log("okeeeeyy: ", book.user);
    const res = await actions.fetchOwnerInfo(book.user);

    if (!res.error) {
      setOwner(res.ownerData);
    } else {
      toast.error("Faild to fetch book owner info");
    }
  };
  useEffect(() => {
    console.log(book);
    console.log("Pre ", owner);
    fetchUser();
    console.log("Post ", owner);
  }, []);

  const handleBuy = async () => {
    const res = await actions.handleBuyBook(book.id, authUserId);
    if (res.error) {
      toast.error(res.msg);
    } else {
      toast.success(res.msg);
      handleDetails();
    }
  };

  const handleSwap = async () => {
    const res = await actions.handleSwapBook(book.id, authUserId);
    if (res.error) {
      toast.error(res.msg);
    } else {
      toast.success(res.msg);
      handleDetails();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Book Details</p>
            </div>
            <div className="py-2">
              <button onClick={handleDetails}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>

          <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {book.title}
                </h3>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  By {book.author}
                </p>
              </div>

              <div className="hidden sm:block sm:shrink-0">
                <img
                  alt=""
                  src={book?.images[0]?.image}
                  className="size-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-pretty text-sm text-gray-500">
                {book.description}
              </p>
            </div>

            <div className="mt-4">
              <p className="font-bold">Price: {book.price} TK</p>
            </div>

            <div className="mt-5 mb-5">
              <p className="pb-2 text-[#ff7f3e]">Book Owner Details</p>
              <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Name</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {owner?.name}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">District</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {owner?.district}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Upazila</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {owner?.upazilla}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Phone Number</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {owner?.phone}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <dl className="mt-6 flex justify-between items-center">
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">Published</dt>
                <dd className="text-xs text-gray-500">{book.publish_date}</dd>
              </div>

              {authUserId ? (
                <div className="flex justify-between items-center">
                  <button
                    className="mr-3 border border-[#FF7F3E] hover:bg-[#FF7F3E] hover:text-white rounded-md font-semibold px-6 py-2"
                    onClick={handleBuy}
                  >
                    Buy
                  </button>
                  <button
                    className="mr-3 border border-[#FF7F3E] hover:bg-[#FF7F3E] hover:text-white rounded-md font-semibold px-6 py-2"
                    onClick={handleSwap}
                  >
                    Swap
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <button
                    className="mr-3 border border-[#FF7F3E] hover:bg-[#FF7F3E] hover:text-white rounded-md font-semibold px-6 py-2"
                    onClick={() => actions.goToLoginPage()}
                  >
                    Login to buy/swap
                  </button>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
