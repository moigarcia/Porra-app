import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./Menu.css";

const Menu = ({ currentUser, logOut, day }) => {
  const closeMenu = () => {
    $(".page-wrapper").removeClass("toggled");
  };

  const tagsOpen = () => {
    $(document).ready(function() {
      $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
      });
      $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
      });
    });
  };

  return (
    <div className="menu-box">
      <div className="page-wrapper chiller-theme " ready={tagsOpen()}>
        <div className="position-fixed w-100 bg-white">
          <div className="d-flex justify-content-between">
            <div className="box-mobile-nav icons-nav">
              <button
                id="show-sidebar"
                className="btn btn-sm align-self-center align-middle"
              >
                <img
                  className="icon-nav-menu"
                  alt="icon_lock"
                  src="/Menu.png"
                />
              </button>
            </div>

            <div className="box-mobile-nav logo-nav">
              <Link to={"/home"}>
                <img
                  src="/escudo_litris.png"
                  alt="logo_navbar"
                  className="img-logo"
                />
              </Link>
            </div>

            <div className="box-mobile-nav icons-nav justify-content-end p-2">
              <button className="btn-transparent black" onClick={logOut}>
                <i className="fas fa-sign-out-alt "></i>
              </button>
            </div>
          </div>
        </div>
        <nav id="sidebar" className="sidebar-wrapper ">
          <div className="sidebar-content bg-white">
            <div className="sidebar-brand bg-white">
              <div id="close-sidebar" onClick={closeMenu}>
                <button type="button" className="black btn-transparent">
                  x
                </button>
              </div>
              <div className="sidebar-header">
                <img
                  src={currentUser ? currentUser.photo : null}
                  className="rounded-circle"
                  alt="perfil"
                />
                <span className="black ml-2">
                  @{currentUser && currentUser.userTwitter}
                </span>
              </div>
            </div>
            <div className="sidebar-menu bg-white">
              <ul className="align-middle ">
                <li className="d-flex align-items-center">
                  <div className="box-mobile-nav-icon">
                    <img src="/soccer.png" alt="soccer" />
                  </div>
                  <div className="box-mobile-nav-text">
                    <span className="black ">JORNADA</span>
                  </div>
                  <div className="box-mobile-nav-icon">
                    <Link
                      to={{
                        pathname: "/bets",
                        state: {
                          betDay: day,
                          currentUserId: currentUser && currentUser.id
                        }
                      }}
                    >
                      <img
                        src="/arrow.svg"
                        alt="adown_navbar"
                        className="icon-nav-menu"
                      />
                    </Link>
                  </div>
                </li>
                <li className="d-flex justify-content-center align-items-center">
                  <div className="box-mobile-nav-icon">
                    <img src="/assignment.png" alt="assignment" />
                  </div>
                  <div className="box-mobile-nav-text">
                    <span className="black">CLASIFICACION</span>
                  </div>
                  <div className="box-mobile-nav-icon">
                    <Link
                      to={{
                        pathname: "/classification",
                        state: {
                          betDay: day,
                          currentUserId: currentUser && currentUser.id
                        }
                      }}
                    >
                      <img
                        src="/arrow.svg"
                        alt="adown_navbar"
                        className="icon-nav-menu"
                      />
                    </Link>
                  </div>
                </li>
                {currentUser && currentUser.role === "admin" && (
                  <li className="d-flex justify-content-center align-items-center align-middle">
                    <div className="box-mobile-nav-icon">
                      <img src="/build.png" alt="build" />
                    </div>
                    <div className="box-mobile-nav-text">
                      <span className="black ">ADMIN</span>
                    </div>
                    <div className="box-mobile-nav-icon">
                      <Link
                        to={{
                          pathname: "/dashboard",
                          state: {
                            betDay: day,
                            currentUserId: currentUser && currentUser.id
                          }
                        }}
                      >
                        <img
                          src="/arrow.svg"
                          alt="adown_navbar"
                          className="icon-nav-menu"
                        />
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;

