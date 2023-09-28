import React from "react";
import { Link } from "react-router-dom";
import logo  from "../../Assets/image/hub6.png"

function Navadmin() {
  return (
    <header
      id="header"
      class="header"
      data-scrollto-offset="0"
      style={{ background: "#312A23" }}
    >
      <div class="container-fluid d-flex align-items-center justify-content-between">
        <Link
          to="/admin"
          class="logo d-flex align-items-center scrollto me-auto me-lg-0"
        >
           <img src={logo} alt="ll" width="200"/>
        {/* <h1>Hungry Hub </h1> */}
        </Link>

        <nav id="navbar" class="navbar">
          <ul>
            <li>
              <Link class="nav-link scrollto" to="/admin">
                Home
              </Link>
            </li>
            
            <li>
              <Link class="nav-link scrollto" to="/Admin/Customer">
                Customers
              </Link>
            </li>
            <li>
              <Link class="nav-link scrollto" to="/Admin/Caterer">
                Caterers
              </Link>
            </li>
            <li>
              <Link class="nav-link scrollto" to="/Admin/Charity">
                Charities
              </Link>
            </li>
            <li>
              <Link class="nav-link scrollto" to="/Admin/Orders">
                Orders
              </Link>
            </li>
            <li>
              <Link class="nav-link scrollto" to="/Admin/Complaints">
                Complaints
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
  return (
    <div>
      <div class="container-fluid bg-dark px-0">
        <div class="row gx-0">
          <div class="col-lg-14 bg-dark d-none d-lg-block">
            <Link
              to="/"
              class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 class="m-0 display-1 text-success text-uppercase">
                Smart Catering
              </h1>
            </Link>
          </div>
          <div class="col-lg-14">
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0 px-lg-5">
              <a href="index.html" class="navbar-brand d-block d-lg-none">
                <h1 class="m-0 display-2 text-success text-uppercase">
                  Smart Catering
                </h1>
              </a>
              <button
                type="button"
                class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class="collapse navbar-collapse justify-content-around"
                id="navbarCollapse"
              >
                <div class="navbar-nav mr-auto py-0">
                  <Link to="/Home" class="nav-item nav-link active">
                    Home
                  </Link>
                  <Link to="/About" class="nav-item nav-link">
                    About
                  </Link>
                  <Link to="/AddMenu" class="nav-item nav-link">
                    Add Menu
                  </Link>
                  <Link to="/ViewMenu" class="nav-item nav-link">
                    View All Menu
                  </Link>
                  <Link to="/ViewOrders" className="nav-item nav-link">
                    {" "}
                    View Orders{" "}
                  </Link>
                  <Link to="/Donation" class="nav-item nav-link">
                    Donation
                  </Link>
                </div>
                <div class="navbar-nav mr-auto py-0">
                  <button
                    style={{ margin: "10px", width: "100px" }}
                    class="btn btn-success"
                    onClick={() => {
                      localStorage.clear();
                      alert("Logged out");
                      window.location.reload(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navadmin;
