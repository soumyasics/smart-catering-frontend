import React from 'react'
import { Link } from 'react-router-dom';
import logo  from "../../Assets/image/hub6.png"

function NavChar() {
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
              <li>
                <Link to="/CharProfile" className="nav-item nav-link">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/ViewDonation" className="nav-item nav-link">
                  View Donations
                </Link>
              </li>
              <button
                onClick={() => {
                  localStorage.clear();
                  alert("Logged out");
                  window.location.reload(false);
                }}
                class="btn btn-primary py-2 px-lg-3 d-none d-lg-block"
                style={{ backgroundColor: "#0EA2BD" }}
              >
                Logout
              </button>
            </ul>
            <ul></ul>
            <i class="bi bi-list mobile-nav-toggle d-none"></i>
          </nav>
        </div>
      </header>
    );
  }

export default NavChar