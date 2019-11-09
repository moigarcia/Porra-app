import React, { useContext} from "react";
import { AuthContext } from "../../contexts/authContext";
import { authService } from "../../services/index";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  const logOut = () => authService.logOut()


  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Jornada</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Clasificación</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Mis porras</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">{currentUser.photo}</a>
            </li>
            <li class="nav-item">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
