import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { authService, betService } from "../../services/index";
import NavBar from "../navbar/NavBar";
import { constants } from "../../utils/constants/index";
import "./bet.css";

const Bet = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [day, setDay] = useState();
  const [bet, setBet] = useState(false);
  const [betDone, setBetDone] = useState(false)
  const [quantity, setQuantity] = useState({ localTeam: 0, visitingTeam: 0 });
  const [scorers, setScorers] = useState("");

  useEffect(() => {
    setDay(props.location.state.betDay);
    const getDay = async () => {
      try {
        const id = props.location.state.betDay[0].id
        const bet = { userId: props.location.state.currentUserId}
        const resultBet = await betService.getBetActually(id, bet);
        setBet(resultBet[0]);
      } catch (error) {
        throw error;
      }
    };
    getDay();
  }, [setDay, setBet, setBetDone]);

  const logOut = () => {
    authService.logOut();
    return <Redirect to="/" />;
  };
  
  const betSubmit = async event => {
      event.preventDefault();
      const bet = {
        resultLocalTeam: quantity.localTeam,
        resultVisitingTeam: quantity.visitingTeam,
        userId: currentUser.id,
        day: day[0].id,
        scorers: scorers
      }
      try {
        const response = await betService.doBet(day[0].id, bet)
        setBetDone(true)
      } catch (error) {
        console.log(error)
      }
    
  
  }
  
  const handleChange = e => {
    const { name } = e.target;
    setQuantity({
      ...quantity,
      [name]: parseInt(e.target.value, 10)
    });
    setScorers([]);
  };
  const handleChangeScorers = e => {
    if (
      (day[0].visitingTeam === "C.D.Vicalvaro" &&
        quantity.visitingTeam > scorers.length) ||
      (day[0].localTeam === "C.D.Vicalvaro" &&
        quantity.localTeam > scorers.length)
    ) {
      setScorers([...scorers, e.target.value]);
    } else {
    }
  };
  const vicalScored =
    (day &&
      day[0].visitingTeam === "C.D.Vicalvaro" && quantity.visitingTeam > 0) ||
    (day && day[0].localTeam === "C.D.Vicalvaro" && quantity.localTeam > 0);

  const deleteScorer = scorer => {
    const index = scorers.indexOf(scorer);
    if (index !== -1) {
      scorers.splice(index, 1);
    }
    setScorers([...scorers]);
  };

  const players = constants.PLAYERS.map(n => (
    <option key={n.id}>{n.name}</option>
  ));
  
  const scorersList =
    scorers.length > 0 && 
    scorers.map((name, index) => (
      <tbody key={index + Math.random()}>
        <tr>
          <th scope="row">
            <i className="fas fa-futbol" />
          </th>
          <td>{name}</td>
          <td>
            <button onClick={() => deleteScorer(name)}>
              <i className="fas fa-user-times red" />
            </button>
          </td>
        </tr>
      </tbody>
    ));
  const scorersBetList = bet &&
    bet.scorers.length > 0 && 
    bet.scorers.map((name, index) => (
      <tbody key={index + Math.random()}>
        <tr>
          <th scope="row">
            <i className="fas fa-futbol" />
          </th>
          <td>{name}</td>
          <td></td>
        </tr>
      </tbody>
    ));

  if(betDone){
    return <Redirect to="/home" />
  }
  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} />
      <div className="container">
        <img src="/escudo_litris.png" className="shield" alt="" />
        <div className="jumbotron">
          <div className="card card-day">
            {bet && <h6 className="mt-2">Ya realizaste tu apuesta</h6>}
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
                    value={bet.resultLocalTeam}
                    name="localTeam"
                    onChange={handleChange}
                    disabled={bet}
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
                    value={bet.resultVisitingTeam}
                    name="visitingTeam"
                    onChange={handleChange}
                    disabled={bet}
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
              { bet ? (
                <table className="table table-striped">{scorersBetList}</table>
                ) :
                (vicalScored && scorers.length > 0 && (
                <table className="table table-striped">{scorersList}</table>
                ))}
              { !bet && vicalScored && (
                <select
                  className="form-control selected"
                  value="Goleadores"
                  id="scorers"
                  placeholder="First name"
                  onChange={handleChangeScorers}
                >
                  <option disabled>Goleadores</option>
                  {players}
                </select>
              )}
            </form>
          </div>
          {!bet && 
          <button className="btn btn-success mt-2" onClick={betSubmit}>apostar</button>
          }
          </div>
      </div>
    </div>
  );
};

export default Bet;
