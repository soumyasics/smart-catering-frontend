import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../baseurl";
function ViewCatorder({basename}) {
  const navigate = useNavigate();
  const [data, setdata] = useState([
    {
      foodid: {
        image: { filename: "" },
        foodname: "",
        package: "",
        vegornon: "",
        type: "",
      },
      custid: { name: "", contact: "", city: "", district: "", pincode: "" },
    },
  ]);
  const [approveddata, setapproveddata] = useState([]);

  const [test, settest] = useState("");

  const [custcomplaint, setcustcomp] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("catlogid") == null) {
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewComplaintsByCatId/${localStorage.getItem("catlogid")}`)
      .then((res) => {
        console.log(res, " cust complaints");
        if (res.data.data != undefined) {
          setcustcomp(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewOrderReqsByCat/${localStorage.getItem("catlogid")}`)
      .then((res) => {
        console.log(res, "pending caterer orders");
        if (res.data.data != undefined) {
          setdata(res.data.data);
          settest("hello");
        } else {
          setdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAprvdOrdersByCat/${localStorage.getItem("catlogid")}`)
      .then((res) => {
        console.log(res, "approved orders");
        if (res.data.data != undefined) {
          setapproveddata(res.data.data);
          settest("hello");
        } else {
          setapproveddata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const approvefn = (id) => {
    axiosInstance
      .post(`/approveOrderByCat/${id}`)
      .then((res) => {
        console.log(res, "approve");
        alert("Approved this order");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const declinefn = (id) => {
    axiosInstance
      .post(`/rejectOrderByCat/${id}`)
      .then((res) => {
        console.log(res, "reject");
        alert("Rejected this order");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="catererdiv" style={{ minHeight: "300px", padding: "40px" }}>
      {/* Map start here  */}

      {test.length ? (
        <div>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  View Pending orders to be Approved
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="container">
                    <h1 style={{ textAlign: "center" }}>
                      {" "}
                      All Orders to be Approved
                    </h1>
                    {data.length ? (
                      data.map((a) => {
                        return (
                          <div class="row">
                            <div class="col-3">
                              <div class="card" style={{ padding: "10px" }}>
                                <h3> Customer Details</h3>
                                <div class="card-body">
                                  <h5 class="card-title">
                                    Name : {a.custid.name}
                                  </h5>
                                  <p class="card-text">
                                    Contact : {a.custid.contact}
                                  </p>
                                  <p class="card-text">
                                    Address : {a.custid.city},{" "}
                                    {a.custid.district} District
                                  </p>
                                  <p className="card-text">
                                    Pincode : {a.custid.pincode}{" "}
                                  </p>
                                  {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-7">
                              <div class="card">
                                <h3> Order Details</h3>
                                <div className="container">
                                  <div className="row">
                                    <div className="col">
                                      <img
                                        src={`${basename}/${a.foodid.image.filename}`}
                                        class="card-img-top"
                                        alt={a.foodid.image.filename}
                                      />
                                    </div>
                                    <div className="col">
                                      <div class="card-body">
                                        <h5 class="card-title">
                                          Food item : {a.foodid.foodname},{" "}
                                          {a.count} items needed
                                        </h5>
                                        <h5> Total Cost : {a.count*a.foodid.price}rs</h5>
                                        <p class="card-text">
                                          Package : {a.foodid.package}
                                        </p>
                                        <p class="card-text">
                                          {" "}
                                          Veg or Non Veg : {a.foodid.vegornon}
                                        </p>
                                        <p class="card-text">
                                          Type : {a.foodid.type}
                                        </p>

                                        <p class="card-text">
                                          Comments : {a.comments}
                                        </p>
                                        <p class="card-text">
                                          Date : {a.date.slice(0, 10)}
                                        </p>

                                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                      </div>{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  approvefn(a._id);
                                }}
                              >
                                {" "}
                                Approve
                              </button>
                              <hr />
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  declinefn(a._id);
                                }}
                              >
                                {" "}
                                Decline
                              </button>
                            </div>
                            <p></p>
                            <hr />
                          </div>
                        );
                      })
                    ) : (
                      <div class="menus d-flex align-items-center">
                        <div class="text-wrap">
                          <div class="row align-items-start">
                            <div class="col-12">
                              <h5>No Data </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  View Approved Orders
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="container">
                    <h1 style={{ textAlign: "center" }}>
                      {" "}
                      All Approved Orders
                    </h1>
                    {approveddata.length ? (
                      approveddata.map((a) => {
                        return (
                          <div class="row">
                            <div class="col-4">
                              <div class="card" style={{ padding: "10px" }}>
                                {/* <img src="..." class="card-img-top" alt="..."/> */}
                                <h3> Customer Details</h3>
                                <div class="card-body">
                                  <h5 class="card-title">
                                    Name : {a.custid.name}
                                  </h5>
                                  <p class="card-text">
                                    Contact : {a.custid.contact}
                                  </p>
                                  <p class="card-text">
                                    Email : {a.custid.email}
                                  </p>
                                  <p class="card-text">
                                    Address : {a.custid.city},{" "}
                                    {a.custid.district} District
                                  </p>
                                  <p className="card-text">
                                    Pincode : {a.custid.pincode}{" "}
                                  </p>
                                  {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="card">
                                <h3> Order Details</h3>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-4">
                                      <img
                                        src={`http://localhost:4008/${a.foodid.image.filename}`}
                                        class="card-img-top"
                                        alt={a.foodid.image.filename}
                                      />
                                    </div>
                                    <div className="col-8">
                                      <div class="card-body">
                                        <h5 class="card-title">
                                         Order Detail : {a.foodid.foodname},  {a.count} items needed on {a.date.slice(0,10)}
                                        </h5>
                                        <p class="card-text">
                                          Package : {a.foodid.package}
                                        </p>
                                        <p class="card-text">
                                          {" "}
                                          Veg or Non Veg : {a.foodid.vegornon}
                                        </p>
                                        <p class="card-text">
                                          Type : {a.foodid.type}
                                        </p>

                                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                      </div>{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p></p>
                            <hr />
                          </div>
                        );
                      })
                    ) : (
                      <div class="menus d-flex align-items-center">
                        <div class="text-wrap">
                          <div class="row align-items-start">
                            <div class="col-12">
                              <h5>No Data </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12">
            <div class="card">
              {/* <img src="..." class="card-img-top" alt="..."> */}
              <div class="card-body">
                <h5 class="card-title">No Complaints to display</h5>
               
              </div>
            </div>
          </div>
      )}

      {/* Map Ends here  */}
    </div>
  );
}

export default ViewCatorder;
