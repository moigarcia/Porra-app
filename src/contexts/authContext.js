import React, { useEffect, useState } from 'react';
import { constants } from '../utils/constants';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notify, setNotify] = useState({
    code: "",
    message: "",
    state: false
  });
 
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem(constants.CURRENT_USER_KEY)));
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        notify,
        setNotify
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};