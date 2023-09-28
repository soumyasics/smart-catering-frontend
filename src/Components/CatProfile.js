import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function CatProfile({basename}) {
  const Navigate = useNavigate();
  const [profile, setprofile] = useState({});

  const [rating, setrating] = useState([]);
  const [data, setdata] = useState({
    name: "",
    city: "",
    district: "",
    contact: "",
    email: "",
    pincode: "",
  });

  useEffect(() => {
    if (localStorage.getItem("catlogid") == null) {
      Navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewStaffById/${localStorage.getItem(`catlogid`)}`)
      .then((res) => {
        console.log(res);
        setprofile(res.data.data);

        const rate = [];

        for (let i = 0; i < parseFloat(res.data.data.rating).toFixed(); i++) {
          rate.push(i);
        }

        setrating(rate);
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
      .post(`/editStaffById/${localStorage.getItem("catlogid")}`, data)
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

  useEffect(() => {}, []);
  return (
    <div className="main" style={{ minHeight: "300px" }}>
      <div className="container">
        <div className="row">
          <hr />
          <h1> Welcome, {profile.unitname}</h1>

          
          <div className="col-4"></div>
          <div className="col-4">
            <div class="card">
              <img
                src="https://i.pinimg.com/736x/b4/57/f0/b457f066fc90c56a0192a695a4e42c1b.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{profile.unitname}</h5>
                <p class="card-text"> City : {profile.city}</p>

                <p class="card-text"> Contact : {profile.contact}</p>
                <p class="card-text"> Email : {profile.email}</p>
                <p class="card-text"> Pincode : {profile.pincode}</p>
                {rating.length ? (
                  rating.map(() => {
                    return <span style={{ fontSize: "30px" }}> ⭐</span>;
                  })
                ) : (
                  <span style={{ fontSize: "30px" }}>No rating</span>
                )}
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

        <div className="row" style={{margin:"20px"}}>
        <div className="col" ></div>
       <div className="col-6">
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div className="main">
                  <section id="featured-services" class="featured-services">
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
                                <input
                                  class="form-control"
                                  type="text"
                                  name="unitname"
                                  placeholder="name"
                                  required
                                  onChange={changefn}
                                />
                              </div>{" "}
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="tel"
                                  minLength={`6`}
                                  maxLength={`6`}
                                  name="pincode"
                                  placeholder="pincode"
                                  required
                                  onChange={changefn}
                                />
                              </div>{" "}
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="text"
                                  name="city"
                                  placeholder="city"
                                  required
                                  onChange={changefn}
                                />
                              </div>{" "}
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="tel"
                                  minLength={`10`}
                                  maxLength={`10`}
                                  name="contact"
                                  placeholder="contact"
                                  required
                                  onChange={changefn}
                                />
                              </div>{" "}
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="email"
                                  name="email"
                                  placeholder="email"
                                  required
                                  onChange={changefn}
                                />
                              </div>{" "}
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="text"
                                  name="district"
                                  placeholder="district"
                                  required
                                  onChange={changefn}
                                />
                              </div>{" "}
                              <div className="mb-3">
                                <input
                                  class="form-control"
                                  type="number"
                                  name="regno"
                                  min={1}
                                  placeholder="regno"
                                  required
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
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default CatProfile;
