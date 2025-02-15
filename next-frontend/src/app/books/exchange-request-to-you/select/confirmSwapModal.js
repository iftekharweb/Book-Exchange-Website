"use client";

import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import FullLogo from "@/public/Full_Logo.png";
import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import { toast } from "react-toastify";
import Image from "next/image";

const ConfirmSwapModal = ({ handleDetails, book }) => {
  const { authUserId, bookToSwap, reqToSwap } = useStateContext();
  const [owner, setOwner] = useState({});
  const [theUser, setTheUser] = useState({});
  const [theBook, setTheBook] = useState({});

  const [allSwapReqs, setAllSwapReq] = useState([]);
  const [allBuyReqs, setAllBuyReq] = useState([]);

  const fetchUser = async () => {
    const res = await actions.megaFetching(
      book.user,
      authUserId,
      bookToSwap.id
    );
    if (!res.error) {
      setOwner(res.owner);
      setTheUser(res.currUser);
      setTheBook(res.currBook);
      setAllSwapReq(res.swapReq);
      setAllBuyReq(res.buyReq);
    } else {
      toast.error(res.msg);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const deleteTheBook = async (reqId, type) => {
    if (type === 1) {
      const res = await actions.deleteTheBookFromSwapLog(reqId);
      if (res.error) {
        toast.error(res.msg);
      }
    } else {
      const res = await actions.deleteTheBookFromBuyLog(reqId);
      if (res.error) {
        toast.error(res.msg);
      }
    }
  };
  const handleConfirm = async () => {
    const res = await actions.handleConfirmForExchanging(
      theBook.id,
      book.id,
      theBook.user,
      book.user
    );
    if (!res.error) {
      allSwapReqs.forEach((x) => {
        if (x.book.id === theBook.id || x.book.id === book.id)
          deleteTheBook(x.id, 1);
      });
      allBuyReqs.forEach((x) => {
        if (x.book.id === theBook.id || x.book.id === book.id)
          deleteTheBook(x.id, 100);
      });
      toast.success(res.msg);
      actions.goToExchangeRqToYou();
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[70%]">
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

          {/*  */}
          <div className="flex justify-between items-center">
            <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mr-2 shadow-md w-[50%] h-full">
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {theBook.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    By {theBook.author}
                  </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt=""
                    src={theBook.images ? theBook?.images[0]?.image : ""}
                    className="size-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">
                  {theBook.description}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-bold">Price: {theBook.price} TK</p>
              </div>

              <div className="mt-5 mb-5">
                <p className="pb-2 text-[#ff7f3e]">Book Owner Details</p>
                <div className="flow-root">
                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Name</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {theUser?.name}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">District</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {theUser?.district}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Upazila</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {theUser?.upazilla}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Phone Number
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {theUser?.phone}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <dl className="mt-6 flex justify-between items-center">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    Published
                  </dt>
                  <dd className="text-xs text-gray-500">
                    {theBook.publish_date}
                  </dd>
                </div>

                <div className="flex justify-between items-center">
                  <Image
                    src={FullLogo}
                    alt=""
                    height={40}
                    width={60}
                    className="h-8 w-10"
                  />
                </div>
              </dl>
            </div>
            <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ml-2 shadow-md w-[50%]">
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
                      <dt className="font-medium text-gray-900">
                        Phone Number
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {owner?.phone}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <dl className="mt-6 flex justify-between items-center">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    Published
                  </dt>
                  <dd className="text-xs text-gray-500">{book.publish_date}</dd>
                </div>

                <div className="flex justify-between items-center">
                  <Image
                    src={FullLogo}
                    alt=""
                    height={40}
                    width={60}
                    className="h-8 w-10"
                  />
                </div>
              </dl>
            </div>
          </div>
          {/*  */}
          <div className="w-full flex justify-center items-center mt-4">
            <button
              className="ml-2 py-2 px-3 bg-[#FF7F3E] rounded-md font-semibold text-white"
              onClick={handleConfirm}
            >
              Confirm Exchange
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSwapModal;
