import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link } from "react-router-dom";

function AdminCat({basename}) {
  const [catdata, setcatdata] = useState([]);

  useEffect(() => {
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
  }, []);

  const Deletecat = (id) => {
    axiosInstance
      .post(`/deleteStaffById/${id}`)
      .then((res) => {
        console.log(res, "deleted");
        if (res.data.status == 200) {
          alert("Deleted Caterer");
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
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Caterer
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* catdata details mapped */}
                      {catdata.length ? (
                        catdata.map((a) => {
                          return (
                            <div className="col-4">
                              <div class="card card-body">
                                <div className="main">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        Caterer name : {a.unitname}
                                      </h5>
                                      <p class="card-text">Email : {a.email}</p>
                                      <p class="card-text">
                                        Contact : {a.contact}
                                      </p>
                                      <p class="card-text">Email : {a.email}</p>
                                      <p class="card-text">
                                        District : {a.district}
                                      </p>
                                      <p class="card-text">
                                        Pincode : {a.pincode}
                                      </p>
                                      <hr />
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                          Deletecat(a._id);
                                        }}
                                      >
                                        Delete
                                      </button>
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
                                  <h5 class="card-title">No Caterer</h5>
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

export default AdminCat;
