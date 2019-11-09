import React, { useState, useContext, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService } from "../../services/index";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    // fetch("https://porra-api.herokuapp.com/auth/login/success", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true
    //   }
    // })

    authService
      .authenticate()
      .then(responseJson => {
        console.log("responsejson ", responseJson)
        setCurrentUser(responseJson.user);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  const signIn = () =>
    window.open("https://porra-api.herokuapp.com/auth/twitter", "_self");
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
