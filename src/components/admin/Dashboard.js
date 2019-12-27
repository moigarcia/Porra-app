import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "../../contexts/authContext";
import { authService, dayService } from "../../services/index";
import NavBar from "../navbar/NavBar";
import { constants } from "../../utils/constants/index";
import "./dashboard.css";
import ModalDone from "../modals/ModalDone";

const Dashboard = props => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [day, setDay] = useState();
  const [newDay, setNewDay] = useState();
  const [updateDone, setUpdateDone] = useState(false);
  const [backHome, setBackHome] = useState(false);
  const { notify, setNotify } = useContext(AuthContext);
  const [quantity, setQuantity] = useState({ localTeam: 0, visitingTeam: 0 });
  const [dayTeams, setDayTeams] = useState({ localTeam: "", visitingTeam: "" });
  const [scorers, setScorers] = useState("");
  const [ confirm, setConfirm ] = useState(false);

  useEffect(() => {
    if (props.location.state.betDay) {
      setDay(props.location.state.betDay);
      setScorers(props.location.state.betDay.scorers);
      setQuantity({
        localTeam: props.location.state.betDay.resultLocalTeam,
        visitingTeam: props.location.state.betDay.resultVisitingTeam
      });
    } else {
      setNewDay(true);
    }
  }, [setDay, setScorers, setNewDay, props.location.state.betDay]);

  const logOut = () => {
    authService.logOut();
    setCurrentUser(null);
  };

  const updateDaySubmit = async event => {
    event.preventDefault();
    const updateDay = {
      resultLocalTeam: quantity.localTeam,
      resultVisitingTeam: quantity.visitingTeam,
      scorers: scorers
    };

    try {
      if (
        (day.visitingTeam === "C.D. Vicálvaro" &&
          quantity.visitingTeam === scorers.length) ||
        (day.localTeam === "C.D. Vicálvaro" &&
          quantity.localTeam === scorers.length)
      ) {
        console.log("no entra");
        await dayService.updatingDaySubmit(day.id, updateDay);
        setUpdateDone(true);
        window.$("#modalBet").modal("show");
        setNotify({
          code: "updateDay",
          message: "La jornada se ha actualizado correctamente!!!",
          state: true
        });
      } else {
        await setUpdateDone(true);
        window.$("#modalBet").modal("show");
        setNotify({
          code: "updateDay",
          message: "No puedes actualizar la jornada, faltan goleadores",
          state: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createDaySubmit = async event => {
    event.preventDefault();
    const shield = teamName => {
      const teamFilter = constants.TEAMS.filter(team => team.name === teamName);
      return teamFilter[0].shield;
    };
    const createdDay = {
      localTeam: dayTeams.localTeam,
      visitingTeam: dayTeams.visitingTeam,
      shieldLocal: shield(dayTeams.localTeam),
      shieldVisiting: shield(dayTeams.visitingTeam)
    };
    try {
      const response = await dayService.creatingDaySubmit(createdDay);
      setDay(response);
      window.$("#modalBet").modal("show");
      setNotify({
        code: "doBet",
        message: "Has creado la jornada correctamente!!!",
        state: true
      });
      setBackHome(true);
    } catch (error) {
      console.log(error);
    }
  };
  const pendingSubmit = async event => {
    event.preventDefault();
    try {
      const response = await dayService.pendingDay(day.id);
      await setUpdateDone(true);
      window.$("#modalBet").modal("show");
      setNotify({
        code: "doBet",
        message: "Se cierran las apuestas!!!",
        state: true
      });
      setDay(response);
    } catch (error) {
      console.log(error);
    }
  };
  const closeSubmit = async event => {
    event.preventDefault();
    try {
      setConfirm(false)
      await dayService.closeDaySubmit(day.id);
      await setUpdateDone(true);
      window.$("#modalBet").modal("show");
      setNotify({
        code: "closeDay",
        message: "Se ha cerrado la jornada!!!",
        state: true
      });
    } catch (error) {
      console.log(error);
    }
  };
  const confirmSubmit = async () => {
    setConfirm(true)
    await setUpdateDone(true);
    window.$("#modalBet").modal("show");
      setNotify({
        code: "closeDay",
        message: "¿Estas seguro que quieres cerrar la jornada?",
        state: true
      });
  }

  const hideModal = () => {
    if (notify.code === "closeDay") {
      setBackHome(true);
    }
    window.$("#modalBet").modal("hide");
    setUpdateDone(false);
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
    if (name === "C.D.Vicálvaro") {
      setScorers([]);
    }
  };
  const handleChangeTeam = e => {
    const { name } = e.target;
    setDayTeams({
      ...dayTeams,
      [name]: e.target.value
    });
  };
  const handleChangeScorers = e => {
    if (
      (day.visitingTeam === "C.D. Vicálvaro" &&
        quantity.visitingTeam > scorers.length) ||
      (day.localTeam === "C.D. Vicálvaro" &&
        quantity.localTeam > scorers.length)
    ) {
      setScorers([...scorers, e.target.value]);
    } else {
    }
  };
  const vicalScored =
    (day &&
      day.visitingTeam === "C.D. Vicálvaro" &&
      quantity.visitingTeam > 0) ||
    (day && day.localTeam === "C.D. Vicálvaro" && quantity.localTeam > 0);

  const deleteScorer = scorer => {
    const index = scorers.indexOf(scorer);
    if (index !== -1) {
      scorers.splice(index, 1);
    }
    setScorers([...scorers]);
  };

  const players = constants.PLAYERS.map(player => (
    <option key={player.id}>{player.name}</option>
  ));

  const selectTeam = constants.TEAMS.map(team => (
    <option key={team.id}>{team.name}</option>
  ));

  const scorersList =
    scorers &&
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

  const pendingDay = day && day.stateDay === "open";
  const closeDay = day && day.stateDay === "pending";

  if (!currentUser) {
    return <Redirect to="/" />;
  }
  if (backHome) {
    return <Redirect to="/home" />;
  }

  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} day={day}/>
      {updateDone && (
        <ModalDone modal={notify} closeModal={hideModal} closeSubmit={closeSubmit} confirm={confirm}></ModalDone>
      )}
      <div className="container box-dashboard pt-5">
        <div className="jumbotron mt-5">
          <div className="card card-day">
            <form>
              <div className="card-body">
                <div>
                  {newDay && (
                    <div>
                      <h5>Local</h5>
                      <select
                        type="text"
                        className="form-control mb-3"
                        name="localTeam"
                        onChange={handleChangeTeam}
                      >
                        <option disabled selected>
                          Local
                        </option>
                        {selectTeam}
                      </select>
                      <h5>Visitante</h5>
                      <select
                        type="text"
                        className="form-control "
                        name="visitingTeam"
                        onChange={handleChangeTeam}
                      >
                        <option disabled selected>
                          Visitante
                        </option>
                        {selectTeam}
                      </select>
                    </div>
                  )}

                  {day && (
                    <div
                      className={
                        !pendingDay &&
                        "d-flex justify-content-around align-items-center"
                      }
                    >
                      <div className="row align-items-center">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            src={day && day.shieldLocal}
                            className="shield  mr-2"
                            alt="escudo1"
                          />
                        </div>
                        <div className="col-6 d-flex justify-content-start p-0">
                          <span>{day && day.localTeam}</span>
                        </div>
                        <div className="col-3 d-flex justify-content-start p-0">
                        {!pendingDay && (
                        <select
                          className="form-control form-result ml-1"
                          name="localTeam"
                          onChange={handleChange}
                          disabled={pendingDay}
                          value={quantity.localTeam}
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
                      )}
                        </div>
                      </div>
                      
                    </div>
                  )}
                </div>
              </div>
              <div className="card-body">
                <div>
                  {day && (
                    <div
                      className={
                        !pendingDay &&
                        "d-flex justify-content-around align-items-center"
                      }
                    >
                      <div className="row  align-items-center">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            src={day && day.shieldVisiting}
                            className="shield  mr-2"
                            alt="escudo2"
                          />
                        </div>
                        <div className="col-6 d-flex justify-content-start p-0">
                          <span>{day && day.visitingTeam}</span>
                        </div>
                        <div className="col-3 d-flex justify-content-start p-0">
                          {!pendingDay && (
                            <select
                              className="form-control form-result"
                              name="visitingTeam"
                              onChange={handleChange}
                              disabled={pendingDay}
                              value={quantity.visitingTeam}
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
                          )}
                        </div>
                      </div>
                      
                    </div>
                  )}
                </div>
              </div>
              {vicalScored && scorers.length > 0 && (
                <table className="table table-striped">{scorersList}</table>
              )}

              {vicalScored && (
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
          {newDay && (
            <button className="btn btn-success mt-2" onClick={createDaySubmit}>
              crear jornada
            </button>
          )}
          {pendingDay && (
            <button className="btn btn-danger mt-2" onClick={pendingSubmit}>
              cerrar apuestas
            </button>
          )}
          {closeDay && (
            <div>
              <button className="btn btn-primary m-2" onClick={updateDaySubmit}>
                actualizar resultados
              </button>

              <button
                className="btn btn-outline-danger mt2"
                onClick={confirmSubmit}
              >
                cerrar jornada
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
