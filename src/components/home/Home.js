import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "../../contexts/authContext";
import { authService, dayService } from "../../services/index";
import Menu from "../menu/Menu";
import "./home.css";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [day, setDay] = useState("");

  useEffect(() => {
    const getDay = async () => {
      try {
        const user = await authService.getUserById(currentUser.id)
        const result = await dayService.getDayActually();
        setDay(result);
        setCurrentUser(user)
      } catch (error) {
        throw error;
      }
    };
    getDay();
  }, [setDay, setCurrentUser, currentUser.id]);

  const logOut = () => {
    authService.logOut();
    setCurrentUser(false);
  };
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div id="cms-box">
      <Menu logOut={logOut} currentUser={currentUser} day={day} />
      <div className="container box-home">
        <div className="jumbotron mt-5">
          <h1 className="display-8">Hola {currentUser && currentUser.name}!</h1>
          <p className="lead">
            Bienvenido a la porra de Los Litris, llevas {currentUser.points}{" "}
            puntos, ánimo y...
            <br />
            <strong>Aúpa Vical!!!</strong>
          </p>
          {day && day.stateDay !== "pending" && (
            <div className="">
              <div className="card card-day p-2">
                <div className="row align-items-center ">
                  <div className="col-4 d-flex justify-content-end  p-0">
                    <img
                      src={day && day.shieldLocal}
                      className="shield-home mr-2"
                      alt="escudo1"
                    />
                  </div>
                  <div className="col-8 d-flex justify-content-start p-0">
                    <span>{day && day.localTeam}</span>
                  </div>
                </div>
                <div className="row mt-3 align-items-center">
                  <div className="col-4 d-flex justify-content-end p-0">
                    <img
                      src={day && day.shieldVisiting}
                      className="shield-home  mr-2"
                      alt="escudo2"
                    />
                  </div>
                  <div className="col-8 d-flex justify-content-start p-0">
                    <span>{day && day.visitingTeam}</span>
                  </div>
                </div>
              </div>

              <Link
                to={{
                  pathname: "/bets",
                  state: {
                    betDay: day,
                    currentUserId: currentUser && currentUser.id
                  }
                }}
              >
                <button className="btn btn-outline-success mt-2">
                  apuesta
                </button>
              </Link>
            </div>
          )}
          { day && day.stateDay === "pending" && (
            <p className="lead">La jornada está cerrada no se admiten más resultados</p>
          )}
          { !day &&  (
            <p className="lead">Todavía no está abierta la jornada</p>
          )}
          {!day && currentUser.role === "admin" && (
            <div>
              <Link
                to={{
                  pathname: "/dashboard",
                  state: {
                    currentUserId: currentUser && currentUser.id
                  }
                }}
              >
                <button className="btn btn-success mt-2">crear jornada</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
