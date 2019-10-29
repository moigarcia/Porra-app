import React, { useEffect, useState } from 'react';
import { constants } from '../utils/constants';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
 
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem(constants.CURRENT_USER_KEY)));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};