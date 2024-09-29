"use client";

import { useEffect, useState } from "react";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import ConfirmSwapModal from "./confirmSwapModal";

const SelectBookToSwap = () => {
  const { authUserId, userToSwap, setUserToSwap, bookToSwap, setBookToSwap } =
    useStateContext();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const [details, setDetails] = useState(false);
  const [currBook, setCurrBook] = useState({});

  const handleDetails = () => {
    setDetails(!details);
  };

  const handleCancel = () => actions.goToExchangeRqToYou();

  const fetchBooks = async () => {
    const res = await actions.fetchAllBooks(userToSwap.id);
    if (res.error) {
      toast.error("Failed to fetch books. Could be a server error.");
    } else {
      setBooks(res.books);
      setFilteredBooks(res.books);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let updatedBooks = books;

    if (searchTerm) {
      updatedBooks = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    updatedBooks = updatedBooks.filter(
      (book) => book.price >= priceRange.min && book.price <= priceRange.max
    );

    if (sortOption) {
      const [key, order] = sortOption.split(", ");
      updatedBooks.sort((a, b) => {
        if (key === "Title") {
          if (order === "ASC") {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        } else if (key === "Price") {
          return order === "ASC" ? a.price - b.price : b.price - a.price;
        }
        return 0;
      });
    }

    setFilteredBooks(updatedBooks);
  }, [searchTerm, sortOption, priceRange, books]);

  return (
    <div className="p-0">
      {details && (
        <ConfirmSwapModal handleDetails={handleDetails} book={currBook} />
      )}
      <section>
        <div className="mx-auto max-w-screen-xl px-2 py-8 sm:px-4 sm:py-12 lg:px-6">
          <header className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              {userToSwap.name} books (Select One)
            </h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Search books..."
                className="border rounded py-2 px-4 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="ml-2 py-2 px-3 bg-red-500 rounded-sm font-semibold text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </header>

          <div className="mt-8 sm:flex sm:items-center sm:justify-between">
            <div className="block sm:hidden">
              <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium"> Filters & Sorting </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden sm:flex sm:gap-4">
              <div className="">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                    <span className="text-sm font-medium"> Price </span>
                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                    <div className="w-96 rounded border border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">
                          Set your price range
                        </span>
                        <button
                          type="button"
                          className="text-sm text-gray-900 underline underline-offset-4"
                          onClick={() => setPriceRange({ min: 0, max: 1000 })}
                        >
                          Reset
                        </button>
                      </header>
                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                          <label
                            htmlFor="FilterPriceFrom"
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-600">$</span>
                            <input
                              type="number"
                              id="FilterPriceFrom"
                              placeholder="From"
                              className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm py-2 px-1"
                              value={priceRange.min}
                              onChange={(e) =>
                                setPriceRange((prev) => ({
                                  ...prev,
                                  min: e.target.value,
                                }))
                              }
                            />
                          </label>
                          <label
                            htmlFor="FilterPriceTo"
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-600">$</span>
                            <input
                              type="number"
                              id="FilterPriceTo"
                              placeholder="To"
                              className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm py-2 px-1"
                              value={priceRange.max}
                              onChange={(e) =>
                                setPriceRange((prev) => ({
                                  ...prev,
                                  max: e.target.value,
                                }))
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div className="hidden sm:block">
              <label htmlFor="SortBy" className="sr-only">
                Sort By
              </label>
              <select
                id="SortBy"
                className="h-10 rounded border border-gray-300 text-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="Title, ASC">Title, ASC</option>
                <option value="Title, DESC">Title, DESC</option>
                <option value="Price, ASC">Price, ASC</option>
                <option value="Price, DESC">Price, DESC</option>
              </select>
            </div>
          </div>

          <ul className="mt-4 grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {filteredBooks.map((book) => (
              <li className="shadow-md flex flex-col" key={book.id}>
                <button
                  className="group block overflow-hidden flex-grow"
                  onClick={() => {
                    setCurrBook(book);
                    handleDetails();
                  }}
                >
                  <img
                    src={book?.images[0]?.image}
                    alt=""
                    className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className=" bg-white pt-3 px-2 flex flex-col items-start">
                    <h3 className="text-xs text-gray-700 font-semibold group-hover:underline group-hover:underline-offset-4">
                      {book.title}
                    </h3>
                    <h3 className="text-xs text-gray-500">by {book.author}</h3>
                    <p className="mt-2">
                      <span className="sr-only">Regular Price</span>
                      <span className="tracking-wider font-bold text-gray-900">
                        {book.price} TK
                      </span>
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SelectBookToSwap;
