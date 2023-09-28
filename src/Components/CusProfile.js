import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function CusProfile({basename}) {
  const Navigate = useNavigate()
  

  const [data, setdata] = useState({
    name: "",
    city: "",
    district: "",
    contact: "",
    email: "",
    pincode: "",
  });

  useEffect(() => {
    if (localStorage.getItem("cuslogid") == null) {
      Navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewCustomerById/${localStorage.getItem(`cuslogid`)}`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/editCustomerById/${localStorage.getItem('cuslogid')}`, data)
      .then((res) => {
        console.log("Submitted", res);
        if (res.data.status == 200) {
          alert(res.data.msg);
          
        } else if (res.data.status == 500) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="main" style={{ minHeight: "300px" }}>
      <div className="container text-center">
        <div className="row" >
            <hr/>
            <h1> Welcome, {data.name}</h1>
            <div className="col-4"></div>
            
          <div className="col-4" >
            <div class="card">
            <img src="https://static.vecteezy.com/system/resources/previews/002/387/840/original/service-icon-flat-style-isolated-on-white-background-free-vector.jpg"
                  height={300}/>
              <div class="card-body">
                <h4 class="card-title">{data.name}</h4>
                <p class="card-text"> Contact : {data.contact}</p>
                <p class="card-text"> Email : {data.email}</p>
                <p class="card-text"> City : {data.city}</p>
                <p class="card-text"> District : {data.district}</p>
                <p class="card-text"> Pincode : {data.pincode}</p>

               

                <p>
                  <button
                    class="btn btn-primary"
                    style={{
                        width: "100%",
                        background: "#0EA2BD",
                      }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Edit Profile
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
         
        </div>
        <div className="row">
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div >
                  <section >
                    <div className="container">
                      <div className="row">
                        <div class="col-12">
                          <form onSubmit={submitfn}>
                            <div class="service-item position-relative">
                              <h2 style={{ textAlign: "center" }}>
                                {" "}
                                Edit Profile
                              </h2>
                              <div className="mb-3">
                                {" "}
                                <input
                                  class="form-control"
                                  type="text"
                                  name="name"
                                  placeholder="name"
                                  value={data.name}
                                  required
                                  onChange={changefn}
                                />{" "}
                              </div>
                              <div className="mb-3">
                                {" "}
                                <input
                                  class="form-control"
                                  type="text"
                                  name="district"
                                  placeholder="district"
                                  value={data.district}
                                  required
                                  onChange={changefn}
                                />{" "}
                              </div>
                              <div className="mb-3">
                                {" "}
                                <input
                                  class="form-control"
                                  type="tel"
                                  name="pincode"
                                  minLength="6"
                                  maxLength="6"
                                  placeholder="pincode"
                                  required
                                  value={data.pincode}
                                  onChange={changefn}
                                />{" "}
                              </div>

                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="text"
                                  name="city"
                                  placeholder="city"
                                  required
                                  value={data.city}
                                  onChange={changefn}
                                />{" "}
                              </div>

                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="tel"
                                  name="contact"
                                  placeholder="contact"
                                  minLength="10"
                                  maxLength="10"
                                  required
                                  value={data.contact}
                                  onChange={changefn}
                                />{" "}
                              </div>
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="email"
                                  name="email"
                                  placeholder="email"
                                  required
                                  value={data.email}
                                  onChange={changefn}
                                />{" "}
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
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CusProfile;
