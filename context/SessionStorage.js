import React, { createContext, useState, useContext, useEffect } from "react";
import { getSheetName } from "../util/date";

const StorageContext = createContext();

export const useSessionStorage = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [googleResponse, setGoogleResponse] = useState(null);
  const sheetName = getSheetName()
  const [spreadsheet, setSpreadsheet] = useState({
    id: '1GhA2H9UHaab7-h5GVblae4efn2WFa61HrQ27iWxquus',
    name: sheetName,
    range: 'B8:D50'
  });

  /* set all from session storage */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.sessionStorage.getItem("token")) {
        setToken(window.sessionStorage.getItem("token"))
      }
      if (window.sessionStorage.getItem("groupId")) {
        setGroupId(window.sessionStorage.getItem("groupId"))
      }
      if (window.sessionStorage.getItem("googleResponse")) {
        setGoogleResponse(JSON.parse(window.sessionStorage.getItem("googleResponse")))
      }
      if (window.sessionStorage.getItem("spreadsheet")) {
        setSpreadsheet(JSON.parse(window.sessionStorage.getItem("spreadsheet")))
      }
    }
  }, [])

  /* token */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        window.sessionStorage.setItem("token", token);
      }
    }
  }, [token]);

  /* groupId */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (groupId) {
        window.sessionStorage.setItem("groupId", groupId);
      }
    }
  }, [groupId]);

  /* googleResponse */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (googleResponse) {
        window.sessionStorage.setItem("googleResponse", JSON.stringify(googleResponse));
      }
    }
  }, [googleResponse]);

  /* spreadsheet */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (spreadsheet) {
        window.sessionStorage.setItem("spreadsheet", JSON.stringify(spreadsheet));
      }
    }
  }, [spreadsheet]);

  const clearSession = () => {
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("groupId")
    window.sessionStorage.removeItem("googleResponse")
    window.sessionStorage.removeItem("spreadsheet")
  }

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
        setSpreadsheet,
        clearSession
      }
    }>
      {children}
    </StorageContext.Provider>
  );
};
