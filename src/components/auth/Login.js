import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService } from "../../services/index";
import "./login.css";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const signIn = async () => {
    try {
      const response = window.open(
        "https://porra-api.herokuapp.com/auth/twitter",
        "_self"
      );
      if (response) {
        console.log("entra ",response)
        const responseUser = await authService.authenticate();
        setCurrentUser(responseUser);
      }
    } catch (error) {
      throw error;
    }
  };

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      <div className="flex-container login-box align-items-center align-middle">
        <div className="row row-box justify-content-center">
          <div className="box-intro ">
            <img src="/escudo_litris.png" className="shield" alt="" />
            <h2 className="white">Porra Litris</h2>
            <p className="white">
              La porra del C.D.Vicálvaro, en honor a nuestro amigo David
              Ludeña
            </p>
            <button onClick={signIn} className="btn bg-blue white btn-lg justify-content-center align-items-center align-middle">
            <img src="/twitter.png" className="icon-twitter mr-2" alt="icon-twitter" />
              <span>Twitter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
