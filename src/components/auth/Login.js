import React, { useState, useContext, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService } from "../../services/index";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {

    // const authenticate = async () => {
    //   try{
    //     const response = await authService.authenticate()
    //     setCurrentUser(response)
    //   } catch(error) {
    //     throw error
    //   }
    // }
    // authenticate()
  }, []);

  const signIn = async () => {
    try{
    const response = window.open("https://porra-api.herokuapp.com/auth/twitter", "_self")
    if (response) {
      console.log(response)
      const responseUser = await authService.authenticate()
        setCurrentUser(responseUser)
    }
    } catch(error) {
      throw error
    }
  }

  console.log(currentUser);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      <button onClick={signIn} className="btn btn-primary">
        {" "}
        Twitter{" "}
      </button>
    </div>
  );
};

export default Login;
