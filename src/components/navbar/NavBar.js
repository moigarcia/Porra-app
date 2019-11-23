import React from "react";
import { Link } from "react-router-dom";
const NavBar = ({currentUser, logOut, day}) => {
  
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-2" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/home">Jornada</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/clasificacion">Clasificación</a>
            </li>
            {currentUser && currentUser.role === 'admin' ? 
              <li className="nav-item">
                <Link
                  to={{
                    pathname: "/dashboard",
                    state: {
                      betDay: day,
                      currentUserId: currentUser && currentUser.id
                    }
                  }}
                >
                  Admin
                </Link>
              
              </li>
              : null
            }
          </ul>
        </div>
        
        <a className="nav-item text-white" href="/perfil">
        <img src={currentUser && currentUser.photo} className="rounded-circle" alt="perfil"/>
           <span className="ml-2">@{currentUser && currentUser.userTwitter}</span>
          </a>
        <button className="btn btn-success" onClick={logOut}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </nav>
    </div>
  );
};

export default NavBar;