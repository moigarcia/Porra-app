import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService, dayService } from "../../services/index";
import NavBar from "../navbar/NavBar";
import { constants } from "../../utils/constants/index";
import "./bet.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [day, setDay] = useState("");
  const [quantity, setQuantity] = useState({ localTeam: 0, visitingTeam: 0 });
  const [scorers, setScorers] = useState([]);

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
    return <Redirect to="/" />;
  };
  const handleChange = e => {
    const { name } = e.target;
    setQuantity({
      ...quantity,
      [name]: parseInt(e.target.value, 10)
    });
  };
  const handleChangeScorers = e => {
    setScorers([
      ...scorers,
      e.target.value
    ]);
  };
  const vicalScored =
    (day &&
      (day[0].visitingTeam === "C.D.Vicalvaro" && quantity.visitingTeam > 0)) ||
    (day && (day[0].localTeam === "C.D.Vicalvaro" && quantity.localTeam > 0));

  const players = constants.PLAYERS.map((n, index) => (<option key={index}>{n}</option>));
  

  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} />
      <div className="container">
        <img src="/escudo_litris.png" className="shield" alt="" />
        <div className="jumbotron">
          <div className="card card-day">
            <form>
              <div className="card-body">
                <div>
                  <img
                    src="/escudos/aranjuez.jpg"
                    className="shield small mr-2"
                  />
                  {day && day[0].localTeam}

                  <select
                    type="number"
                    className="form-control form-result"
                    value={quantity.localTeam}
                    name="localTeam"
                    onChange={handleChange}
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <img
                    src="/escudos/vicalvaro.jpg"
                    className="shield small mr-2"
                  />
                  {day && day[0].visitingTeam}
                  <select
                    className="form-control form-result"
                    value={quantity.visitingTeam}
                    name="visitingTeam"
                    onChange={handleChange}
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                </div>
              </div>
                  {vicalScored && 
                  <select
                  className="form-control"
                  value={scorers}
                  name="visitingTeam"
                  onChange={handleChangeScorers}
                >{players}</select>
                  }
            </form>
          </div>
          <button className="btn btn-success mt-2">apostar</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
