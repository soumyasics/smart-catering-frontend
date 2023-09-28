import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../baseurl";

function CustomerReg() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    district: "",
    pincode: "",
    city: "",
    contact: "",
    email: "",
    password: "",
    age: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/registerCustomer", data)
      .then((res) => {
        console.log("Submitted", res);
        if (res.data.status == 200) {
          alert(res.data.msg);
          navigate("/Login/cuslog");
        } else if (res.data.status == 500) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
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
                  <h2 style={{ textAlign: "center" }}> Register - Customer</h2>
                  <div className="mb-3">
                    {" "}
                    <input
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="name"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>
                  <div className="mb-3">
                    {" "}
                    <input
                      class="form-control"
                      type="text"
                      name="district"
                      placeholder="district"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>
                  <div className="mb-3">
                    {" "}
                    <input
                      class="form-control"
                      type="tel"
                      name="pincode"
                      minLength="6"
                      maxLength="6"
                      placeholder="pincode"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>

                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="city"
                      placeholder="city"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>

                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="tel"
                      name="contact"
                      placeholder="contact"
                      minLength="10"
                      maxLength="10"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="email"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      placeholder="password"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="number"
                      name="age"
                      min='1'
                      placeholder="age"
                      required
                      onChange={changefn}
                    />{" "}
                  </div>

                  <div className="mb-3">
                    <input type="submit" className="btn btn-primary" style={{width:"100%", background:"#0EA2BD"}} />{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
      </div>
    </div>
   </div>
  );
}

export default CustomerReg;
