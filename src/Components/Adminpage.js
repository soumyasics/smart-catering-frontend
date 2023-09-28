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
                    Hi Admin, Welcome to the Admin Panel
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
                          {cusdata.length} Customers Registered
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
                          {catdata.length} Catering services registered
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
                          {charitydata.length} Charities Registered
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
      <div style={{ minHeight: "400px" }}>
        <h1 style={{ textAlign: "center", position: "relative", top: "150px" }}>
          Please{" "}
          <Link style={{ fontSize: "50px" }} to="/Admin">
            log in{" "}
          </Link>
          to see admin panel <hr />
          <span>
            {" "}
            Back to the{" "}
            <Link style={{ fontSize: "50px" }} to="/home">
              Home Page
            </Link>





            <div class="col-sm-12 col-md-8  align-items-center">


                      <div class="text-start ps-4">
                        <h5 class="mb-3">
                          {data.empid ? data.empid.name : ""}
                        </h5>
                        <p class="text-truncate me-3">
                          <i class="far fa-clock text-primary me-2"></i>
                          {data.lop != undefined
                            ? `Loss of Pay :${data.lop}`
                            : null}
                        </p>
                      </div>

                      
                      <div class="text-start ps-4">
                        <p class="text-truncate me-3">
                          <i class="far fa-money-bill-alt text-primary me-2"></i>
                          <b>
                            {data.leave != undefined
                              ? `Leaves Taken : ${data.leave}`
                              : null}{" "}
                          </b>
                        </p>
                        
                        <div class="text-start ps-4">
                          <p class="text-truncate me-3">
                            <i class="fa fa-map-marker-alt text-primary me-2"></i>
                            <b>
                              {data.incentive
                                ? `Incentive : ${data.incentive}`
                                : ""}
                            </b>
                          </p>
                        </div>
                        <p class="text-truncate me-3">
                          <i class="far fa-clock text-primary me-2"></i>
                          <b>{data.sal ? `Salary : ${data.sal}` : ""}</b>
                        </p>
                        {/* <p class="text-truncate me-3">
                              <i class="far fa-clock text-primary me-2"></i>
                              Salary : {data.sal}
                            </p> */}
                      </div>
                    </div>





















          </span>
        </h1>
      </div>
    );
  }
}

export default Adminpage;
