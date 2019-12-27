import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../../contexts/authContext";
import { authService, dayService } from "../../services/index";
import NavBar from "../navbar/NavBar";
import './Classification.css'


const Classification = props => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [ chart, setChart ] = useState([]);

  useEffect(() => {
    
    

  }, []);

  const logOut = () => {
    authService.logOut();
    setCurrentUser(false)
  };

 
  return (
    <div id="cms-box">
      <NavBar logOut={logOut} currentUser={currentUser} day={props.location.state.betDay}/>
      <div className="container box-table pt-5 pb-5 d-flex justify-content-center">
      <table className="mt-5 table mb-5 white ">
        <thead className="thead-dark">
          <tr>
            <th scope="col-3"></th>
            <th scope="col-8">Nombre</th>
            <th scope="col-1">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <th scope="row" className="bg-blue-light">1</th>
            <td>@de_litris</td>
            <td>24</td>
          </tr>
          <tr>
            <th scope="row" className="bg-blue-light">2</th>
            <td>@raulitri</td>
            <td>24</td>
          </tr>
          <tr>
            <th scope="row" className="bg-blue-light">3</th>
            <td>@robertoLpezFer2</td>
            <td>16</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>@Santaelena17</td>
            <td>13</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>@Morante06</td>
            <td>13</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>@MiguelSanRomn2</td>
            <td>13</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>@Seergiooo1</td>
            <td>13</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>@busero20</td>
            <td>10</td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td>@AlfonsoAparic12</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">10</th>
            <td>@charrito73</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">11</th>
            <td>@Ferdemente1</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">12</th>
            <td>@Marta_M_R</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">13</th>
            <td>@davidvicigles</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">14</th>
            <td>@rfergo</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">15</th>
            <td>@susanaalsa70</td>
            <td>8</td>
          </tr>
          <tr>
            <th scope="row">16</th>
            <td>@MiguelIngelSanz</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">17</th>
            <td>@16Cavita</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">18</th>
            <td>@J_eldiez</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">19</th>
            <td>@rosamrivplz</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">20</th>
            <td>@PadillamanDiaz</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">21</th>
            <td>@orgulloazulon</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">22</th>
            <td>@VkVikal</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">23</th>
            <td>@Nando0372</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">24</th>
            <td>@JaviPatate</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">25</th>
            <td>@IsraelLabrador2</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">26</th>
            <td>@Saya57046194</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">27</th>
            <td>@betoatm</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
       
      </div>
    </div>
  );
};

export default withRouter(Classification);