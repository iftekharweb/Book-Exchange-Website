"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "@/actions";

const StateContext = createContext();

export function ContextProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [authUserId, setAuthUserId] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authRole, setAuthRole] = useState("NONE");
  const [authName, setAuthName] = useState("");

  const [userToSwap, setUserToSwap] = useState({});
  const [bookToSwap, setBookToSwap] = useState({});
  const [reqToSwap, setReqToSwap] = useState({});

  const [started, setStarted] = useState(false);

  const [logSign, setLogSign] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    setAuthUserId(null);
    setAuthEmail("");
    setAuthRole("NONE");
    setAuthName("");
    actions.goToLoginPage();
  };

  const fetchUser = useCallback(async () => {
    try {
      if (!authToken) return;
      console.log(authToken);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/profile/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data) {
        const data = response.data;
        console.log(data);
        setAuthEmail(data.email);
        setAuthName(data.name);
        setAuthUserId(data.id);
        setAuthRole(data.is_admin ? "ADMIN" : "USER");
      }
    } catch (error) {
      console.log("Error is hete");
      console.error(error);
      handleLogOut();
    }
  }, [authToken]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchUser();
    }
  }, [authToken, fetchUser]);

  return (
    <StateContext.Provider
      value={{
        fetchUser,
        activeMenu,
        setActiveMenu,
        authToken,
        setAuthToken,
        authUserId,
        setAuthUserId,
        authRole,
        authEmail,
        setAuthEmail,
        authName,
        setAuthName,
        handleLogOut,
        userToSwap,
        setUserToSwap,
        bookToSwap,
        setBookToSwap,
        reqToSwap,
        setReqToSwap,
        started,
        setStarted,
        logSign,
        setLogSign
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
