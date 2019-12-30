import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import http from "../../services/base-http-service";
import { constants } from "../../utils/constants";
import Loader from "react-loader-spinner";
import "./login.css";

const Login = props => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (props.location.state && props.location.state.loadUser) {
      console.log("entra loadUser");
      const fetchAuth = async () => {
        const response = await http.get("/auth/login/success");
        localStorage.setItem(
          constants.CURRENT_USER_KEY,
          JSON.stringify(response.data)
        );
        setCurrentUser(response.data);
      };
      fetchAuth();
    }
  }, [props, setCurrentUser]);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      <div className="flex-container login-box align-items-center align-middle">
        {props.location.state && props.location.state.loadUser ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
          <div className="row row-box justify-content-center">
            <div className="box-intro ">
              <img src="/escudo_litris.png" className="shield" alt="" />
              <h2 className="white">Porra Litris</h2>
              <p className="white">
                La porra del C.D.Vicálvaro, en honor a nuestro amigo David
                Ludeña
              </p>
              <a href={constants.URL_AUTH}>
                <button className="btn bg-blue white btn-lg justify-content-center align-items-center align-middle">
                  <img
                    src="/twitter.png"
                    className="icon-twitter mr-2"
                    alt="icon-twitter"
                  />
                  <span>Twitter</span>
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
