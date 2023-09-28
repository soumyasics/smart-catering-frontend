import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function ViewDonation({basename}) {
  const navigate = useNavigate();

  const [Charitydata, setcharitydata] = useState([]);
  const [ApprovedCharitydata, setApprCharityData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("charlogid") == null) {
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(
        `/viewdonateNotifcnByCharityId/${localStorage.getItem("charlogid")}`
      )
      .then((res) => {
        console.log(res, "pending Charity Requests");
        if (res.data.data != undefined) {
          setcharitydata(res.data.data);
        } else {
          setcharitydata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(
        `/viewAcceptedDonationsByCharity/${localStorage.getItem("charlogid")}`
      )
      .then((res) => {
        console.log(res, "Approved Charity Requests");
        if (res.data.data != undefined) {
          setApprCharityData(res.data.data);
        } else {
          setApprCharityData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const approvefn = (id) => {
    axiosInstance
      .post(`/acceptDonationByCharity/${id}`)
      .then((res) => {
        console.log(res, "approved");
        if (res.data.status == 200) {
          alert("Donation accepted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const declinefn = (id) => {
    axiosInstance
      .post(`/rejectDonationByCharity/${id}`)
      .then((res) => {
        console.log(res, "reject");
        if (res.data.status == 200) {
          alert("Donation Declined");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="catererdiv" style={{ minHeight: "300px" }}>
      {/* Map start here  */}
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
                View Donation requests
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse "
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="container">
                  <h1 style={{ textAlign: "center" }}>Donation requests</h1>
                  {Charitydata.length ? (
                    Charitydata.map((a) => {
                      if(a.charityStatus=="pending"){
                        return (
                          <div class="row">
                            <div class="col-3">
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
                                    Address : {a.custid.city}, {a.custid.district}{" "}
                                    District
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
                            <div>
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
  
                            <hr />
                          </div>
                        );
                      }
                      
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
                Approved Donations
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse "
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="container">
                  <h1 style={{ textAlign: "center" }}>Approved Donations</h1>
                  {ApprovedCharitydata.length ? (
                    ApprovedCharitydata.map((a) => {
                      if(a.charityStatus=="accepted"){
                        return (
                          <div class="row">
                            <div class="col-3">
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
                                    Address : {a.custid.city}, {a.custid.district}{" "}
                                    District
                                  </p>
                                  <p className="card-text">
                                    Pincode : {a.custid.pincode}{" "}
                                  </p>
                                  {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-9">
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
                      }
                     
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
      {/* Map Ends here  */}
    </div>
  );
}

export default ViewDonation;
