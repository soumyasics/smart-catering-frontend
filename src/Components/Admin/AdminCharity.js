import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link } from "react-router-dom";

function AdminCharity({basename}) {
  const [Charity, setcharity] = useState([]);

  useEffect(() => {
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

  const Apprcharfn = (id) => {
    axiosInstance
      .post(`/ApproveCharity/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Approved Charity");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Deletechar = (id) => {
    axiosInstance
      .post(`/deleteCharityById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Deleted Charity");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="productdiv1" style={{ minHeight: "400px" }}>
        <div className="main">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  Charities
                </button>
              </h2>
              <div
                id="collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* catdata details mapped */}
                      {Charity.length ? (
                        Charity.map((a) => {
                          return (
                            <div className="col-4">
                              <div class="card card-body">
                                <div className="main">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        Charity : {a.unitname}
                                      </h5>
                                      <h5 class="card-text">
                                        Pincode : {a.pincode}
                                      </h5>
                                      <h5 class="card-text">
                                        Email: {a.email}
                                      </h5>
                                      <h5 class="card-text">
                                        Contact : {a.contact}
                                      </h5>

                                      {a.isActive ? (
                                        <div
                                          class="alert alert-success"
                                          role="alert"
                                        >
                                          <h5> Approved</h5>
                                        </div>
                                      ) : (
                                        <>
                                          <button
                                            className="btn btn-success"
                                            onClick={() => {
                                              Apprcharfn(a._id);
                                            }}
                                          >
                                            Approve
                                          </button>
                                          <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                              Deletechar(a._id);
                                            }}
                                          >
                                            Deny
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div class="col-12">
                          <div class="card card-body">
                            <div className="main">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">No Charity</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* catdata details mapped */}
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
          to see admin panel{" "}
        </h1>
      </div>
    );
  }
}

export default AdminCharity;
