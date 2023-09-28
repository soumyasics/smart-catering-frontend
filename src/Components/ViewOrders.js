import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function ViewOrders({basename}) {
  const navigate = useNavigate();

  const [approveddata, setappdata] = useState([]);
  const [rejecteddata, setrejdata] = useState([]);
  const [pendingdata, setpendingdata] = useState([]);

  

  const [review, setreview] = useState();

  useEffect(() => {
    if (localStorage.getItem("cuslogid") == null) {
      navigate("/home");
    }
  });

  useEffect(() => {
   

    axiosInstance
      .post(`/viewPendingOrdersByCustId/${localStorage.getItem("cuslogid")}`)
      .then((res) => {
        console.log(res, "Pending customer orders");
        if (res.data.data != undefined) {
          setpendingdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewConfirmedOrdersByCustId/${localStorage.getItem("cuslogid")}`)
      .then((res) => {
        console.log(res, "Confirmed customer orders");
        if (res.data.data != undefined) {
          setappdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewRejectedOrdersByCustId/${localStorage.getItem("cuslogid")}`)
      .then((res) => {
        console.log(res, "Rejected customer orders");
        if (res.data.data != undefined) {
          setrejdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const reviewfn = (id) => {
    axiosInstance
      .post(`/addReview/${id}`, { reviews: review })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Added review");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [refresh, setrefresh] = useState(false);
  const [rating, setrating] = useState(5);

  const [complaint, setcomplaint] = useState({
    custid: localStorage.getItem(`cuslogid`),
    complaint: "",
    orderid: "",
  });
  const addRating = (id) => {
    axiosInstance
      .post(`/addRating/${id}`, { rating: rating })
      .then((res) => {
        console.log(res);
        setrefresh((prevState) => !prevState);
        if (res.data.status == 200) {
          alert("Added rating");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changefn = (e) => {
    setcomplaint({ ...complaint, [e.target.name]: e.target.value });
  };
  const complaintfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/registerComplaints`, complaint)
      .then((res) => {
        console.log(res, "registered complaint");
        if(res.data.status==200){
          alert(" Complaint Added")
          window.location.reload(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main" style={{ minHeight: "500px" }}>
      <div class="accordion" id="accordionExample" style={{ margin: "50px" }}>
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
              View Approved orders
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container">
                <h1 style={{ textAlign: "center" }}> All your Approved data</h1>
                {approveddata.length ? (
                  approveddata.map((a) => {
                    let x;
                    if (a.charityStatus == "accepted") {
                      x = <h1> Already Donated</h1>;
                    } else if (a.charityStatus == "rejected") {
                      x = (
                        <Link
                          className="btn btn-primary"
                          to={`/Donation/${a.catid._id}/${a.foodid._id}/${a._id}`}
                        >
                          This order was previously rejected by a Charity. Try
                          Donating again?
                        </Link>
                      );
                    } else if (a.charityStatus == "requested") {
                      x = (
                        <Link
                          className="btn btn-primary"
                          onClick={() => {
                            alert(
                              "Please wait for approval from Donation center"
                            );
                          }}
                        >
                          {" "}
                          Please wait for approval from Donation center
                        </Link>
                      );
                    } else if (a.charityStatus == "pending") {
                      x = (
                        <Link
                          className="btn btn-primary"
                          to={`/Donation/${a.catid._id}/${a.foodid._id}/${a._id}`}
                        >
                          {" "}
                          Donate
                        </Link>
                      );
                    }
                    return (
                      <div class="row">
                        <div class="col-3">
                          <div class="card" style={{ padding: "10px" }}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <h3> Caterer Details</h3>
                            <div class="card-body">
                              <h5 class="card-title">
                                Name : {a.catid.unitname}
                              </h5>
                              <p class="card-text">
                                Contact : {a.catid.contact}
                              </p>
                              <p class="card-text">
                                Address : {a.catid.city}, {a.catid.district}{" "}
                                District
                              </p>
                              <p className="card-text">
                                Pincode : {a.catid.pincode}{" "}
                              </p>
                              <div class="mb-3">
                                <form>
                                  <button
                                    for="exampleFormControlTextarea1"
                                    class="form-label btn-primary btn"
                                    type="button"
                                    onClick={() => {
                                      reviewfn(a.foodid._id);
                                    }}
                                  >
                                    Add a review
                                  </button>
                                  <textarea
                                    class="form-control"
                                    required
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    onChange={(e) => {
                                      setreview(e.target.value);
                                    }}
                                  ></textarea>
                                </form>

                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  onChange={(e) => {
                                    setrating(e.target.value);
                                  }}
                                />
                                <br />
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    addRating(a.catid._id);
                                  }}
                                >
                                  {" "}
                                  Add Rating ({rating})
                                </button>

                                <hr />

                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                    setcomplaint({
                                      ...complaint,
                                      orderid: a._id,
                                    });
                                  }}
                                >
                                  Post a Complaint
                                </button>

                                <div
                                  class="modal fade"
                                  id="exampleModal"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1
                                          class="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Complaint
                                        </h1>
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div class="modal-body">
                                        <form onSubmit={complaintfn}>
                                          <div class="service-item position-relative">
                                            <h2 style={{ textAlign: "center" }}>
                                              {" "}
                                              Complaint
                                            </h2>
                                            <div class="mb-3">
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Complaint"
                                                name="complaint"
                                                onChange={changefn}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <input
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{
                                                  width: "100%",
                                                  background: "#0EA2BD",
                                                }}
                                              />{" "}
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                      <div class="modal-footer">
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                                      Food item : {a.foodid.foodname}
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
                                    <h6 class="card-text">Count : {a.count}</h6>

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
                        <div className="col-2">{x}</div>

                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div class="menus d-flex align-items-center">
                    <div class="text-wrap">
                      <div class="row align-items-start">
                        <div class="col-12">
                          <div class="card">
                            <div className="container">
                              <div className="row">
                                <div className="col">
                                  <div class="card-body">
                                    <h5 class="card-title">No Orders found</h5>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
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
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              View Pending orders
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container">
                <h1 style={{ textAlign: "center" }}>
                  {" "}
                  All your Pending orders
                </h1>
                {pendingdata.length ? (
                  pendingdata.map((a) => {
                    return (
                      <div class="row">
                        <div class="col-3">
                          <div class="card" style={{ padding: "10px" }}>
                            <h3> Caterer Details</h3>
                            <div class="card-body">
                              <h5 class="card-title">
                                Name : {a.catid.unitname}
                              </h5>
                              <p class="card-text">
                                Contact : {a.catid.contact}
                              </p>
                              <p class="card-text">
                                Address : {a.catid.city}, {a.catid.district}{" "}
                                District
                              </p>
                              <p className="card-text">
                                Pincode : {a.catid.pincode}{" "}
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
                                      Food item : {a.foodid.foodname}
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
                                    <h6 class="card-text">Count : {a.count}</h6>
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
                          <div class="card">
                            <div className="container">
                              <div className="row">
                                <div className="col">
                                  <div class="card-body">
                                    <h5 class="card-title">No Orders found</h5>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
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
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              View Rejected orders
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container">
                <h1 style={{ textAlign: "center" }}> All your Rejected data</h1>
                {rejecteddata.length ? (
                  rejecteddata.map((a) => {
                    return (
                      <div class="row">
                        <div class="col-3">
                          <div class="card" style={{ padding: "10px" }}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <h3> Caterer Details</h3>
                            <div class="card-body">
                              <h5 class="card-title">
                                Name : {a.catid.unitname}
                              </h5>
                              <p class="card-text">
                                Contact : {a.catid.contact}
                              </p>
                              <p class="card-text">
                                Address : {a.catid.city}, {a.catid.district}{" "}
                                District
                              </p>
                              <p className="card-text">
                                Pincode : {a.catid.pincode}{" "}
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
                                      Food item : {a.foodid.foodname}
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
                                    <h6 class="card-text">Count : {a.count}</h6>
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
                          <div class="card">
                            <div className="container">
                              <div className="row">
                                <div className="col">
                                  <div class="card-body">
                                    <h5 class="card-title">No Orders found</h5>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
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
  );
}

export default ViewOrders;
