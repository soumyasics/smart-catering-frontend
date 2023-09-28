import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function CusFotgotPass({basename}) {
  const mainnavigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/forgotPwd", data)
      .then((res) => {
        console.log("Submitted", res);
        alert("Password Changed");
        mainnavigate('/login/cuslog')
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Incorrect credentials. Please try again");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("cuslogid") != null) {
      mainnavigate("/home");
    }
  });
  return (
  
    <div className="container">
      <div className="row">
        <div className="col-5 customer"></div>
        <div className="col-7">
        <div className="main">
      <section id="featured-services" class="featured-services">
        <div className="container">
          <div className="row">
            <div class="col-12">
              <form onSubmit={submitfn}>
                <div class="service-item position-relative">
                  <h2 style={{ textAlign: "center" }}> Forgot Password?</h2>
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
                      placeholder="Enter your new Password"
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

export default CusFotgotPass