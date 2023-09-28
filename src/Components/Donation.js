import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function Donation({basename}) {
  const Navigate= useNavigate()
  const { id } = useParams();
  const { foodid } = useParams();
  const { catid } = useParams();

  const [allcharities, setallcharities] = useState([]);

  const [donatedata, setdonatedata] = useState({
    custid: localStorage.getItem("cuslogid"),
    catid: catid,
    foodid: foodid,
    orderid: id,
    charityId: "",
    comment: "",
    date: "",
  });


  useEffect(() => {
    if (localStorage.getItem("cuslogid") == null) {
      Navigate("/home");
    }
  });
  useEffect(() => {
    // console.log(localStorage.getItem('cuslogid'), 'cust id');
    // console.log(catid, ' cat id ');
    // console.log(foodid, " food id");
    // console.log(id, " order id");

    axiosInstance
      .post(`/viewCharities`)
      .then((res) => {
        console.log(res, "All charities");
        if (res.data.data != undefined) {
          setallcharities(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    console.log(donatedata);
  })

  const changefn = (e) => {setdonatedata({...donatedata, [e.target.name]:e.target.value})};
  const submitfn = (e) => {

    e.preventDefault()
    axiosInstance.post(`/donate`,donatedata )
    .then((res)=>{console.log(res);
    alert("Submitted to Charity. Please wait for their approval.")
    window.location.reload(false)
  })
    .catch((err)=>{console.log(err);})
  };
  if (donatedata.charityId == "") {
    return (
      <div style={{minHeight:"500px", padding:"40px"}}>
        <h1 style={{textAlign:"center", fontFamily: `'Dancing Script', cursive`}}> All charities</h1>
        <div className="container">
          <div className="row">
            {allcharities.length
              ? allcharities.map((a) => {
                  return (
                    <div className="col-4">
                      <div class="card" >
                        <img src="https://static.vecteezy.com/system/resources/previews/000/597/449/original/hand-care-logo-vector.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{a.unitname}</h5>
                          <p class="card-text">
                            Contact Number : {a.contact}
                          </p>
                          <p class="card-text">
                            Email : {a.email}
                          </p>
                          <p class="card-text">
                            City : {a.city}, {a.district} district
                          </p>
                          <button onClick={(e)=>{setdonatedata({...donatedata, charityId:a._id})}} class="btn btn-primary">
                           Donate
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              :  <div className="col">
              <div class="card" style={{ width: "18rem" }}>
               
                <div class="card-body">
                  <h5 class="card-title">No Charities Available</h5>
                 
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="main">
          <section id="featured-services" class="featured-services">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <img height={300} width={400} src="https://img.freepik.com/free-vector/tiny-people-standing-near-box-donation-food-delivery-volunteers-giving-healthy-grocery-goods-charity-flat-vector-illustration-social-support-humanitarian-help-community-sharing-concept_74855-21023.jpg?w=2000"/>
                </div>
                <div class="col-8">
                  <form onSubmit={submitfn}>
                    <div class="service-item position-relative">
                      <h2 style={{ textAlign: "center" }}> Donation </h2>
                      <div className="mb-3">
                        <input
                          class="form-control"
                          type="date"
                          name="date"
                          placeholder="date"
                          min={new Date().toISOString().split('T')[0]}
                          required
                          onChange={changefn}
                        />
                      </div>{" "}
                      <div className="mb-3">
                        <textarea
                          name="comment"
                          required
                          onChange={changefn}
                          placeholder="Comments"
                          class="form-control"
                          id="form4Example3"
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          style={{ width: "100%" }}
                        >
                          Donate
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Donation;
