import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const SwapRequests = () => {
  const { authUserId , setUserToSwap, setBookToSwap, setReqToSwap } = useStateContext();

  const navigate = useNavigate();

  const [reqs, setReqs] = useState([]);
  const [allReqs, setAllReqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reqsPerPage = 10;

  const fetchRequestsData = async () => {
    try {
      const [buyRequestsRes, allBuyRequestsRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_BASEURL}/swap-requests/?user=${authUserId}`
        ),
        axios.get(`${import.meta.env.VITE_BASEURL}/swapbooks/`),
      ]);
      setReqs(buyRequestsRes.data);
      setAllReqs(allBuyRequestsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchRequestsData();
  }, []);

  const totalPages = Math.ceil(reqs.length / reqsPerPage);
  const currentReqs = reqs.slice(
    (currentPage - 1) * reqsPerPage,
    currentPage * reqsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCancel = async (reqId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/swapbooks/${reqId}/`
      );
      fetchRequestsData();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleConfirm = async (req) => {
    console.log(req);
    setUserToSwap(req.buyer);
    setBookToSwap(req.book);
    setReqToSwap(req);
    navigate("/select-book-to-swap");
    return;
  };

  return (
    <div className="py-5 px-10">
      <div className="pb-5">
        <p className="text-3xl font-serif font-semibold">
          Books requests to you
        </p>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Requested Exchanger
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Phone Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Book Details
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Book Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Select/Cancel
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentReqs.map((req) => (
                <tr key={req.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {req.buyer.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {req.buyer.district} {"-"} {req.buyer.upazilla}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {req.buyer.phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <div className="flex flex-col justify-start item-center">
                      <li className="list-none">
                        <span className="font-semibold">Title : </span>
                        {req.book.title}
                      </li>
                      <li className="list-none">
                        <span className="font-semibold">Author : </span>
                        {req.book.author}
                      </li>
                      <li className="list-none">
                        <span className="font-semibold">Price : </span>
                        {req.book.price} TK
                      </li>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={`${import.meta.env.VITE_BASEURL}${
                          req.book.images[0].image
                        }`}
                        alt=""
                        className="size-16 rounded-lg object-cover shadow-sm"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center">
                        <button
                          className="mr-3 border text-green-500 border-green-500 hover:bg-green-500 hover:text-white rounded-md font-semibold px-3 py-1"
                          onClick={() => handleConfirm(req)}
                        >
                          Select
                        </button>
                        <button
                          className="mr-3 border text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-md font-semibold px-3 py-1"
                          onClick={() => handleCancel(req.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`block rounded border ${
                    currentPage === index + 1
                      ? "block size-8 rounded border-[#03C9D7] bg-[#03C9D7] text-center leading-8 text-white"
                      : "block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                  } text-center leading-8`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SwapRequests;
