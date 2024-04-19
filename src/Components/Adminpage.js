import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function Adminpage({basename}) {
  const [cusdata, setcusdata] = useState([]);
  const [catdata, setcatdata] = useState([]);
  const [orderdata, setorderdata] = useState([]);
  const [charitydata, setcharity] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/Vieworders`)
      .then((res) => {
        console.log(res, " all orders");
        if (res.data.data != undefined) {
          setorderdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllCustomerss`)
      .then((res) => {
        console.log(res, " all customer");
        if (res.data.data != undefined) {
          setcusdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .post(`/viewAllStaffs`)
      .then((res) => {
        console.log(res, "all staff");
        if (res.data.data != undefined) {
          setcatdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllCharities`)
      .then((res) => {
        console.log(res, " all charity");
        if (res.data.data != undefined) {
          setcharity(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div
        className="productdiv1 admin"
        style={{ minHeight: "400px", padding: "150px" }}
      >
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div class="alert alert-dark" role="alert">
                  <h2
                    style={{
                      textAlign: "center",
                      color: "black",
                      textShadow: "2px 2px white",
                    }}
                  >
                    Hi Admin, Welcome to Hungry Hub
                  </h2>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-6 ">
                      {" "}
                      <div class="alert alert-primary" role="alert">
                        <h3>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/001/974/201/original/customer-reviews-feedback-free-vector.jpg"
                            height={100}
                          />{" "}
                          {cusdata.length} Customers
                        </h3>
                        <Link className="btn btn-danger" to={`/Admin/Customer`}>
                          {" "}
                          More Info
                        </Link>
                      </div>
                    </div>
                    <div className="col-6 ">
                      <div class="alert alert-primary" role="alert">
                        <h3>
                          {" "}
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/001/974/201/original/customer-reviews-feedback-free-vector.jpg"
                            height={100}
                          />{" "}
                          {catdata.length} Catering services 
                        </h3>
                        <Link className="btn btn-danger" to={`/Admin/Caterer`}>
                          {" "}
                          More Info
                        </Link>
                      </div>
                    </div>
                    <div className="col-6 ">
                      <div class="alert alert-primary" role="alert">
                        <h3>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/001/974/201/original/customer-reviews-feedback-free-vector.jpg"
                            height={100}
                          />{" "}
                          {orderdata.length} Orders Placed
                        </h3>
                        <Link className="btn btn-danger" to={`/Admin/Orders`}>
                          {" "}
                          More Info
                        </Link>
                      </div>
                    </div>
                    <div className="col-6 ">
                      <div class="alert alert-primary"  role="alert">
                        <h3>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/001/974/201/original/customer-reviews-feedback-free-vector.jpg"
                            height={100}
                          />{" "}
                          {charitydata.length} Charities 
                        </h3>
                        <Link className="btn btn-danger" to={`/Admin/Charity`}>
                          {" "}
                          More Info
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1>fefe</h1>
    );
  }
}

export default Adminpage;
