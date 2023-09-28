import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function Menu({basename}) {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    foodname: "",
    vegornon: "",
    catid: localStorage.getItem("catlogid"),
    price: "",
    description: "",
    package: "",
    type: "",
    image: null,
  });

  useEffect(() => {
    if (localStorage.getItem("catlogid") == null) {
      navigate("/home");
    }
  });

  useEffect(() => {
    if (localStorage.getItem("catlogid") == null) {
      navigate("/home");
    }
  }, []);

  const changefn = (e) => {
    if (e.target.name == "image") {
      setdata({ ...data, image: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/addfood", data, {headers: {
        'Content-Type': 'multipart/form-data',
      },})
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Inserted Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main">
      <section id="featured-services" class="featured-services">
        <div className="container">
          <div className="row">
            <div className="col-6 menu" >
              {/* <h1> Hello </h1> */}
            </div>
            <div class="col-6">
              <form onSubmit={submitfn}>
                <div class="service-item position-relative">
                  <h2 style={{ textAlign: "center" }}> Add Menu</h2>
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="foodname"
                      placeholder="Food Name"
                      required
                      onChange={changefn}
                    />
                  </div>{" "}
                  <div className="mb-3">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        class="btn-check"
                        name="vegornon"
                        id="btnradio1"
                        value="Veg"
                        onChange={changefn}
                      />
                      <label class="btn btn-outline-success" for="btnradio1">
                        Veg{" "}
                      </label>

                      <input
                        type="radio"
                        class="btn-check"
                        name="vegornon"
                        id="btnradio2"
                        value="Non Veg"
                        onChange={changefn}
                      />
                      <label class="btn btn-outline-danger" for="btnradio2">
                        Non Veg{" "}
                      </label>
                    </div>
                  </div>{" "}
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="number"
                      name="price"
                      placeholder="price"
                      required
                      onChange={changefn}
                    />
                  </div>{" "}
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="description"
                      placeholder="Description"
                      required
                      onChange={changefn}
                    />
                  </div>
                  <select class="form-select" onChange={changefn} name="package">
                    <option value="">Select a Package</option>
                    <option >Birthday</option>
                    <option >Wedding</option>
                    <option >Reception</option>
                    <option >Other Functions</option>
                  </select>
                  <br/>
                  <select class="form-select" onChange={changefn} name="type">
                    <option value="">Select Food type</option>
                    <option >Main Course</option>
                    <option >Dessert</option>
                    <option >Beverage</option>
                    <option >Starter Item</option>
                  </select>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">
                      Add a picture
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      name="image"
                      onChange={changefn}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%", background: "#0EA2BD" }}
                    />{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
