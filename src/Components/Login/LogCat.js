import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function Logcat({basename}) {
  const mainnavigate = useNavigate();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("catlogid") != null) {
      mainnavigate("/home");
    }
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/loginStaff", data)
      .then((res) => {
        console.log("Submitted", res);
        localStorage.setItem('catlogid', res.data.user._id)
        alert("Logged in")
        window.location.reload()
        
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Incorrect credentials. Please try again");
      });
  };

  return (
 <div className="container">
  <div className="row">
    <div className="col-5 caterer"></div>
    <div className="col-7">
    <div className="main">
      <section id="featured-services" class="featured-services">
        <div className="container">
          <div className="row">
            <div class="col-12">
              <form onSubmit={submitfn}>
                <div class="service-item position-relative">
                  <h2 style={{ textAlign: "center" }}> Login - Caterer</h2>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={changefn}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={changefn}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%", background: "#0EA2BD" }}
                    />{" "}
                  </div>
                </div>
              </form>
              <Link to={`/CatForgotPass`}> Forgot Password?</Link>
            </div>
          </div>
        </div>
      </section>

      <div class="main-w3layouts wrapper"></div>
    </div>
    </div>
  </div> 
 </div>
  );
}

export default Logcat;
