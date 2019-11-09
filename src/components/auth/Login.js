import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { authService } from '../../services/index';

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   fetch("https://porra-api.herokuapp.com/auth/login/success", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true
  //     }
  //   })
  //     .then(response => {
  //       if (response.status === 200) return response.json();
  //       throw new Error("failed to authenticate user");
  //     })
  //     .then(responseJson => {
  //       setCurrentUser({
  //         authenticated: true,
  //         user: responseJson.user
  //       });
  //     })
      
    
  // }, [])

  const handleSubmit = useCallback(
    async event => {
      console.log("entra handlesubmit")
      event.preventDefault();
      try {
       //await authService.authenticate();
        const response = await authService.authenticate();
          console.log("response ", response)
          setCurrentUser(JSON.parse(response));
        
      } catch (error) {
        console.log(error)
        throw error;
        }
    },
    [setCurrentUser]
  );
  const signIn = () => window.open("https://porra-api.herokuapp.com/auth/twitter", "_self")

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      <button onClick={signIn} className="btn btn-primary"> Twitter </button>
    </div>
  );
};


export default Login;

