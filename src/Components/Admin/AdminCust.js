import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link } from "react-router-dom";
function AdminCust({basename}) {
  const [cusdata, setcusdata] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllCustomerss`)
      .then((res) => {
        console.log(res, " all customer");
        if(res.data.data!=undefined){
          setcusdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletefn = (id) => {
    axiosInstance
      .post(`/deleteCustomerById/${id}`)
      .then((res) => {
        console.log(res, "deleted");
        if (res.data.status == 200) {
          alert("Deleted Customer");
          window.location.reload(false);
        }
        else{
          alert(res.data.msg)
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
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Customer
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* cusdata details mapped */}
                      {cusdata.length?cusdata.map((a) => {
                        return (
                          <div class="col-4">
                            <div class="card card-body">
                              <div className="main">
                                <div class="card">
                                  <div class="card-body">
                                    <h5 class="card-title">
                                      Customer name : {a.name}
                                    </h5>
                                    <p class="card-text">Email : {a.email}</p>
                                    <p class="card-text">
                                      Contact : {a.contact}
                                    </p>
                                    <p class="card-text">
                                      District : {a.district}
                                    </p>
                                    <p class="card-text">
                                      Pincode : {a.pincode}
                                    </p>
                                    <hr />
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        deletefn(a._id);
                                      }}
                                    >
                                      {" "}
                                      Delete{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }):<div class="col-12">
                      <div class="card card-body">
                        <div className="main">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">
                                No Customers 
                              </h5>
                             
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                      {/* cusdata details mapped */}
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

export default AdminCust;
