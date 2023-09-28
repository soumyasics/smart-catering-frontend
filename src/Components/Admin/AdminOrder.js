import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link } from "react-router-dom";

function AdminOrder({basename}) {
  const [orderdata, setorderdata] = useState([]);

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
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Orders
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* catdata details mapped */}
                      {orderdata.length ? (
                        orderdata.map((a) => {
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
                                        Food Name : {a.foodid.foodname}
                                      </h5>
                                      <h5 class="card-text">
                                        Status : {a.status}
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
                                  <h5 class="card-title">No orders</h5>
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

export default AdminOrder;
