import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
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

  const [log, setLog] = useState(false);
  const [sign, setSign] = useState(false);

  const changeLog = () => {
    setLog(!log);
    setSign(false);
  };

  const changeSign = () => {
    setSign(!sign);
    setLog(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    setAuthUserId(null);
    setAuthEmail("");
    setAuthRole("NONE");
    setAuthName("");
    setLog(false); // Redirect to login
  };

  const fetchUser = useCallback(async () => {
    console.log("OKKKKK");
    try {
      if (!authToken) return; // Avoid fetch if authToken is empty or null

      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/profile/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        const data = response.data;
        setAuthEmail(data.email);
        setAuthName(data.name);
        setAuthUserId(data.id);
        setAuthRole(data.is_admin ? "ADMIN" : "USER");
      }
    } catch (error) {
      console.error(error);
      handleLogOut(); // Log out on error (e.g., invalid token)
    }
  }, [authToken]); // Only fetch user if authToken changes

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
  }, [authToken, fetchUser]); // Fetch user when authToken changes

  return (
    <StateContext.Provider
      value={{
        fetchUser,
        activeMenu,
        setActiveMenu,
        authToken,
        setAuthToken,
        authUserId,
        authRole,
        authEmail,
        authName,
        handleLogOut,
        log,
        setLog,
        sign,
        setSign,
        changeLog,
        changeSign,
        userToSwap,
        setUserToSwap,
        bookToSwap,
        setBookToSwap,
        reqToSwap,
        setReqToSwap,
        started,
        setStarted
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
