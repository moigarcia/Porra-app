import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "../../contexts/authContext";
import { authService, betService } from "../../services/index";
import NavBar from "../navbar/NavBar";
import { constants } from "../../utils/constants/index";
import "./bet.css";
import ModalDone from "../modals/ModalDone";

const Bet = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [day, setDay] = useState();
  const [bet, setBet] = useState(false);
  const [betDone, setBetDone] = useState(false)
  const [backHome, setBackHome] = useState(false)
  const { notify, setNotify } = useContext(AuthContext);
  const [quantity, setQuantity] = useState({ localTeam: 0, visitingTeam: 0 });
  const [scorers, setScorers] = useState([]);

  useEffect(() => {
    setDay(props.location.state.betDay);
    const getDay = async () => {
      try {
        const id = props.location.state.betDay.id
        const bet = { userId: props.location.state.currentUserId}
        const resultBet = await betService.getBetActually(id, bet);
        setBet(resultBet[0]);
      } catch (error) {
        throw error;
      }
    };
    getDay();
  }, [setDay, setBet, setBetDone, props.location.state.betDay, props.location.state.currentUserId]);

  const logOut = () => {
    authService.logOut();
    setCurrentUser(null)
  };
  
  const betSubmit = async event => {
      event.preventDefault();
      const bet = {
        resultLocalTeam: quantity.localTeam,
        resultVisitingTeam: quantity.visitingTeam,
        userId: currentUser.id,
        day: day.id,
        scorers: scorers
      }
      try {
        if(
          (day.visitingTeam === "C.D. Vicálvaro" &&
            quantity.visitingTeam === scorers.length) ||
          (day.localTeam === "C.D. Vicálvaro" &&
            quantity.localTeam === scorers.length)
        ){
          await betService.doBet(day.id, bet)
          setBetDone(true)
          window.$("#modalBet").modal("show");
          setNotify({
            code: "doBet",
            message: "Tu apuesta se ha guardado correctamente, mucha suerte!!!",
            state: true
          });
        } else {
          console.log("entra")
          await setBetDone(true)
          window.$("#modalBet").modal("show");
          setNotify({
            code: "notBet",
            message: "No puedes cerrar la apuesta, faltan goleadores",
            state: true
          });
          
        }
      } catch (error) {
        console.log(error)
      }
  }
  const hideModal = () => {
    if(notify.code === "doBet" ){
      setBackHome(true)
    }
    window.$("#modalBet").modal("hide");
    setBetDone(false)
    setNotify({
      code: "",
      message: "",
      state: false
    });
  };
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
      (day.visitingTeam === "C.D. Vicálvaro" &&
        quantity.visitingTeam > scorers.length) ||
      (day.localTeam === "C.D. Vicálvaro" &&
        quantity.localTeam > scorers.length)
    ) {
      setScorers([...scorers, e.target.value]);
    } 
  };
  const vicalScored =
    (day &&
      day.visitingTeam === "C.D. Vicálvaro" && quantity.visitingTeam > 0) ||
    (day && day.localTeam === "C.D. Vicálvaro" && quantity.localTeam > 0);

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

  if(!currentUser){
    return <Redirect to="/" />
  }
  if(backHome){
    return <Redirect to="/home" />
  }
  console.log(day)
  console.log(vicalScored)
  console.log(quantity)
  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} day={day}/>
      {betDone && <ModalDone modal={notify} closeModal={hideModal}></ModalDone>}
      <div className="container">
        <img src="/escudo_litris.png" className="shield" alt="" />
        <div className="jumbotron">
          <div className="card card-day">
            {bet && <h6 className="mt-2">Ya realizaste tu apuesta</h6>}
            <form>
              <div className="card-body">
                <div className="d-flex justify-content-around align-items-center">
                  <img
                    src={day && day.shieldLocal}
                    className="shield small"
                    alt="escudo1"
                  />
                  {day && day.localTeam}

                  <select
                    type="number"
                    className="form-control form-result"
                    value={bet.resultLocalTeam}
                    name="localTeam"
                    id="localTeam"
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
              <div className="d-flex justify-content-around align-items-center">
                  <img
                    src={day && day.shieldVisiting}
                    className="shield small"
                    alt="escudo2"
                  />
                  {day && day.visitingTeam}
                  <select
                  type="number"
                    className="form-control form-result"
                    value={bet.resultVisitingTeam}
                    name="visitingTeam"
                    id="visitingTeam"
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
              { bet && bet.scorers[0] !== "" && 
                <table className="table table-striped prueba">{scorersBetList}</table>
              }
              { !bet && vicalScored && scorers.length > 0 && (
                <table className="table table-striped">{scorersList}</table>
                )}
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

export default withRouter(Bet);
