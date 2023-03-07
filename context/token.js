import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context object for token
const TokenContext = createContext();

// Export a custom hook that uses useContext to access token value and setter
export const useToken = () => {
  return useContext(TokenContext);
};

// Export a provider component that wraps children with TokenContext.Provider
export const TokenProvider = ({ children }) => {
  // Use state to store token value
  const [token, setToken] = useState(typeof window !== "undefined" ? window.localStorage.getItem("token") : null);

  // Use useEffect hook to save data value to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        window.localStorage.setItem("token", token);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  }, [token]);


  // Return TokenContext.Provider with token value and setter as value prop
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
