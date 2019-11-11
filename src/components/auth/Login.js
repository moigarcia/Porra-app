import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService } from "../../services/index";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const signIn = async () => {
    try{
    const response = window.open("http://localhost:3001/auth/twitter", "_self")
    if (response) {
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
