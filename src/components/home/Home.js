import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService, dayService } from "../../services/index";
import NavBar from "../navbar/NavBar";
import "./home.css";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [day, setDay] = useState("");

  useEffect(() => {
    const getDay = async () => {
      try {
        const result = await dayService.getDayActually();
        setDay(result);
      } catch (error) {
        throw error;
      }
    };
    getDay();
  }, [setDay]);

  const logOut = () => {
    authService.logOut();
    setCurrentUser()
  };
  if(!currentUser){
    return <Redirect to="/" />
  }

  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} />
      <div className="container">
        <img src="/escudo_litris.png" className="shield" alt="" />
        <div className="jumbotron">
          <h1 className="display-8">Hola {currentUser && currentUser.name}!</h1>
          <p className="lead">Bienvenido a la porra de Los Litris</p>
          <div className="card card-day">
            <div className="card-body">
              <h4>
                <img
                  src="/escudos/aranjuez.jpg"
                  className="shield small mr-2"
                />
                {day && day[0].localTeam}
              </h4>
            </div>
            <div className="card-body">
              <h4>
                <img
                  src="/escudos/vicalvaro.jpg"
                  className="shield small mr-2"
                />
                {day && day[0].visitingTeam}
              </h4>
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
            <button className="btn btn-success mt-2">apostar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
