import React, { createContext, useState, useContext, useEffect } from "react";
import { getSheetName } from "../util/date";

const StorageContext = createContext();

export const useStorage = () => {
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
  const [userIdsStr, setUserIdsStr] = useState('7743509,56707094')

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
      if (window.localStorage.getItem("spreadsheet")) {
        setSpreadsheet(JSON.parse(window.localStorage.getItem("spreadsheet")))
      }
      if (window.localStorage.getItem("userIdsStr")) {
        setUserIdsStr(window.localStorage.getItem("userIdsStr"))
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
        window.localStorage.setItem("spreadsheet", JSON.stringify(spreadsheet));
      }
    }
  }, [spreadsheet]);

  /* userIdsStr */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userIdsStr) {
        window.localStorage.setItem("userIdsStr", userIdsStr);
      }
    }
  }, [userIdsStr]);

  const clearSession = () => {
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("googleResponse")
    window.sessionStorage.removeItem("groupId")

    window.localStorage.removeItem("userIdsStr")
    window.localStorage.removeItem("spreadsheet")
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

        userIdsStr,
        setUserIdsStr,

        clearSession,
      }
    }>
      {children}
    </StorageContext.Provider>
  );
};
