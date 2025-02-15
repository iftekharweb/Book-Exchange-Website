import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, Footer, Sidebar } from "./components";
import { Dashboard, Profile, Login, Signup, UserBooks, BookRequests, BuyOrders, AllGebresBook, SwapOrders, SwapRequests, SelectBookToSwap, EducationCategoryBook, BusinessCategoryBook, ScienceCategoryBook, BiographyCategoryBook, PhilosophyCategoryBook, FictionCategoryBook, TermsAndConditions, PrivacyPolicy } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";

const AuthenticatedRoutes = () => {
  const { activeMenu, log, sign, authToken } = useStateContext();

  if (log) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (sign) {
    return (
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    );
  }

  return (
    <div className="flex relative">
      {activeMenu ? (
        <div className="w-72 fixed bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "bg-main-bg min-h-screen md:ml-72 w-full"
            : "bg-main-bg w-full min-h-screen flex-2"
        }
      >
        <div className="fixed md:static w-full">
          <Navbar />
        </div>
        <div className="w-full h-full flex flex-col justify-between items-center shadow-sm">
          <div className="w-full bg-[#FAFBFB] h-full">
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />

              {/* Pages */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-books" element={<UserBooks />} />
              <Route path="/book-requests" element={<BookRequests />} />
              <Route path="/buy-orders" element={<BuyOrders />} />
              <Route path="/swap-requests" element={<SwapRequests />} />
              <Route path="/swap-orders" element={<SwapOrders />} />
              <Route path="/select-book-to-swap" element={<SelectBookToSwap />} />

              {/* Books */}
              <Route path="/all-genres" element={<AllGebresBook />} />
              <Route path="/education" element={<EducationCategoryBook />} />
              <Route path="/business" element={<BusinessCategoryBook />} />
              <Route path="/science" element={<ScienceCategoryBook />} />
              <Route path="/biography" element={<BiographyCategoryBook />} />
              <Route path="/philosophy" element={<PhilosophyCategoryBook />} />
              <Route path="/fiction" element={<FictionCategoryBook />} />

              {/*  */}
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthenticatedRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
