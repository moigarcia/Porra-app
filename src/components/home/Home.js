import React, { useContext} from "react";
import { AuthContext } from "../../contexts/authContext";
import { authService } from "../../services/index";
import NavBar from '../navbar/NavBar';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const logOut = () => authService.logOut()


  return (
    <div id="cms-box">
      <NavBar></NavBar>
    </div>
  );
};

export default Home;
