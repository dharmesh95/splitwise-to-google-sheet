import React, { createContext, useState, useContext, useEffect } from "react";

const StorageContext = createContext();

export const useLocalStorage = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({ children }) => {

  const [token, setToken] = useState(typeof window !== "undefined" ? window.localStorage.getItem("token") : null);
  const [groupId, setGroupId] = useState(typeof window !== "undefined" ? window.localStorage.getItem("groupId") : null);

  /* token */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        window.localStorage.setItem("token", token);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  }, [token]);

  /* groupId */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (groupId) {
        window.localStorage.setItem("groupId", groupId);
      } else {
        window.localStorage.removeItem("groupId");
      }
    }
  }, [token, groupId]);

  return (
    <StorageContext.Provider value={{ token, setToken, groupId, setGroupId }}>
      {children}
    </StorageContext.Provider>
  );
};
