import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, Footer, Sidebar } from "./components";
import { Dashboard, Profile, Login, Signup, UserBooks, BookRequests, BuyOrders, AllGebresBook } from "./pages";
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-books" element={<UserBooks />} />
              <Route path="/book-requests" element={<BookRequests />} />
              <Route path="/buy-orders" element={<BuyOrders />} />
              <Route path="/all-genres" element={<AllGebresBook />} />
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
