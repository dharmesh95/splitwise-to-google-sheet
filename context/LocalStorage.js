import React, { createContext, useState, useContext, useEffect } from "react";

const StorageContext = createContext();

export const useLocalStorage = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [googleResponse, setGoogleResponse] = useState(null);
  const [spreadsheet, setSpreadsheet] = useState({
    id: '1GhA2H9UHaab7-h5GVblae4efn2WFa61HrQ27iWxquus',
    name: 'Mar 23 - Transactions',
    range: 'B5:D50'
  });

  /* set all from local storage */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("token")) {
        setToken(window.localStorage.getItem("token"))
      }
      if (window.localStorage.getItem("groupId")) {
        setGroupId(window.localStorage.getItem("groupId"))
      }
      if (window.localStorage.getItem("googleResponse")) {
        setGoogleResponse(JSON.parse(window.localStorage.getItem("googleResponse")))
      }
      if (window.localStorage.getItem("spreadsheet")) {
        setSpreadsheet(JSON.parse(window.localStorage.getItem("spreadsheet")))
      }
    }
  }, [])

  /* token */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        window.localStorage.setItem("token", token);
      }
    }
  }, [token]);

  /* groupId */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (groupId) {
        window.localStorage.setItem("groupId", groupId);
      }
    }
  }, [groupId]);

  /* googleResponse */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (googleResponse) {
        window.localStorage.setItem("googleResponse", JSON.stringify(googleResponse));
      }
    }
  }, [googleResponse]);

  /* spreadsheet */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (spreadsheet) {
        window.localStorage.setItem("spreadsheet", JSON.stringify(spreadsheet));
      }
    }
  }, [spreadsheet]);

  return (
    <StorageContext.Provider value={
      {
        token,
        setToken,
        groupId,
        setGroupId,
        googleResponse,
        setGoogleResponse,
        spreadsheet,
        setSpreadsheet
      }
    }>
      {children}
    </StorageContext.Provider>
  );
};
