import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link } from "react-router-dom";

function AdminComplaints({basename}) {
  const [complaints, setcomplaints] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllComplaints`)
      .then((res) => {
        console.log(res, "View all complaint");
        if (res.data.data != undefined) {
          setcomplaints(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Complaints
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* catdata details mapped */}
                      {complaints.length ? (
                        complaints.map((a) => {
                          return (
                            <div className="col-4">
                              <div class="card card-body">
                                <div className="main">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        Caterer : {a.catid.unitname}
                                      </h5>
                                      <h5 class="card-text">
                                        Customer : {a.custid.name}
                                      </h5>
                                      <h5 class="card-text">
                                        Complaint: {a.complaint}
                                      </h5>
                                      <h5 class="card-text">
                                        Date : {a.date.slice(0, 10)}
                                      </h5>
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
                                  <h5 class="card-title">No Complaints</h5>
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

export default AdminComplaints;
