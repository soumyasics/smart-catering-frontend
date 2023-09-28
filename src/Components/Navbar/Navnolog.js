import React from "react";
import { Link } from "react-router-dom";
import logo  from "../../Assets/image/hub6.png"

function Navnolog() {
  return (
    <header
      id="header"
      class="header"
      data-scrollto-offset="0"
      style={{ background: "#312A23" }}
    >
      <div class="container-fluid d-flex align-items-center justify-content-between">
        <Link
          to="/home"
          class="logo d-flex align-items-center scrollto me-auto me-lg-0"
        >
           <img src={logo} alt="ll" width="200"/>
          {/* <h1>Hungry Hub </h1> */}
        </Link>

        <nav id="navbar" class="navbar">
          <ul>
            <li>
              <Link class="nav-link scrollto" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link class="nav-link scrollto" to="/about">
                About
              </Link>
            </li>
            <li class="dropdown reg">
              <a>
                <span style={{ color: "white"}} >Login</span>{" "}
                <i class="bi bi-chevron-down dropdown-indicator"></i>
              </a>
              <ul id="log">
                <li>
                  <Link to="/login/cuslog">Customer</Link>
                </li>
                <li>
                  <Link to="/Login/catlog">Caterer</Link>
                </li>
                <li>
                  <Link to="/login/charlog">Charity</Link>
                </li>
              </ul>
            </li>
            <li class="dropdown reg">
              <a>
                <span style={{ color: "white"}}>Register</span>{" "}
                <i class="bi bi-chevron-down dropdown-indicator"></i>
              </a>
              <ul id="log">
                <li>
                  <Link to="/register/cusreg">Customer</Link>
                </li>
                <li>
                  <Link to="/register/catreg">Caterer</Link>
                </li>
                <li>
                  <Link to="/Register/charreg">Charity</Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul></ul>
          <i class="bi bi-list mobile-nav-toggle d-none"></i>
        </nav>
      </div>
    </header>
  );
}

export default Navnolog;
