import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import http from "../../services/base-http-service";
import { constants } from "../../utils/constants";
import Loader from "react-loader-spinner";
import ModalDone from "../modals/ModalDone";
import "./login.css";

const Login = props => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [backLogin, setBackLogin] = useState(false);
  const { notify, setNotify } = useContext(AuthContext);

  useEffect(() => {
    if (props.location.state && props.location.state.loadUser) {
      setTimeout(() => {
        console.log('entra timeout')
        http.get("/auth/login/success", { headers: {'Access-Control-Allow-Origin': '*' }  })      
         .then(response => {
           console.log("por if se queda")
           localStorage.setItem(
             constants.CURRENT_USER_KEY,
             JSON.stringify(response.data)
           );
           setCurrentUser(response.data);
           }) 
         .catch(error => {
           console.log("por else se queda ", error)
           setShowModal(true);
           window.$("#modalBet").modal("show");
           setNotify({
             code: "errorLogin",
             message: "Se ha producido un error en acceso con Twitter",
             state: true
           });
         }) 
       
        
      }, 10000);
    }
  }, [props, setCurrentUser]);

  const hideModal = () => {
    if (notify.code === "errorLogin") {
      setBackLogin(true);
    }
    window.$("#modalBet").modal("hide");
    setShowModal(false);
    setNotify({
      code: "",
      message: "",
      state: false
    });
  };

  if (currentUser || backLogin) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      {showModal && (
        <ModalDone modal={notify} closeModal={hideModal}/>
      )}
      <div className="flex-container login-box align-items-center align-middle">
        {props.location.state && props.location.state.loadUser ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
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
