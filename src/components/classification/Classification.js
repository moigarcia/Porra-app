import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../../contexts/authContext';
import { authService, dayService } from '../../services/index';
import Menu from '../menu/Menu';
import Loader from 'react-loader-spinner';
import './Classification.css';

const Classification = props => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClassification = async () => {
      const response = await dayService.getClassification();
      setList(response);
      setLoading(false);
    };
    getClassification();
  }, []);

  const logOut = () => {
    authService.logOut();
    setCurrentUser(false);
  };

  return (
    <div id="cms-box">
      <Menu
        logOut={logOut}
        currentUser={currentUser}
        day={props.location.state.betDay}
      />
      <div className="container box-table pt-5 pb-5 d-flex justify-content-center">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <table className="mt-5 table mb-5 white ">
            <thead className="thead-dark">
              <tr>
                <th scope="col-3"></th>
                <th scope="col-8">Nombre</th>
                <th scope="col-1">Pts</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((user, index) => (
                  <tr>
                    <th
                      scope="row"
                      className={`${index < 3 && 'bg-blue-light'}`}
                    >
                      {index + 1}
                    </th>
                    <td>@{user.name}</td>
                    <td>{user.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default withRouter(Classification);
