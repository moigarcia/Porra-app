import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
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
    setCurrentUser(false)
  };
  if(!currentUser){
    return <Redirect to="/" />
  }
 
  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} day={day}/>
      <div className="container">
        <img src="/escudo_litris.png" className="shield" alt="" />
        <div className="jumbotron">
          <h1 className="display-8">Hola {currentUser && currentUser.name}!</h1>
          <p className="lead">Bienvenido a la porra de Los Litris</p>
          {day ? 
           (<div className="">
          <div className="card card-day ">
            <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src={day && day.shieldLocal}
                  className="shield small mr-2"
                  alt="escudo1"
                />
              <span>
                {day && day.localTeam}
              </span>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
                <img
                  src={day && day.shieldVisiting}
                  className="shield small mr-2"
                  alt="escudo2"
                />
              <span>
                {day && day.visitingTeam}
              </span>
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
            <button className="btn btn-outline-success mt-2">apuesta</button>
          </Link>
          </div>)
          : <p className="lead">Todavía no está abierta la jornada</p>
          }
          {!day && currentUser.role === 'admin' && 
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
        }
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
