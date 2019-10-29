import React, { useState, useContext, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { authService } from '../../services/index';

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async event => {
      console.log("entra handlesubmit")
      event.preventDefault();
      try {
       //await authService.authenticate();
        const response = await authService.authenticate();
        
          setCurrentUser(JSON.parse(response));
        
      } catch (error) {
        
        throw error;
        }
    },
    [setCurrentUser]
  );

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      <button onClick={handleSubmit} className="primary"> Twitter </button>
    </div>
  );
};

export default Login;
