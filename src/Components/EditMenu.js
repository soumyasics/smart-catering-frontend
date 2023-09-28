import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function EditMenu({basename}) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState({
    foodname: "",
    vegornon: "",
    price: "",
    type: "",
    image:null,
    description: "",
    package: "",
    id:id
  });


  useEffect(() => {
    if (localStorage.getItem("catlogid") == null) {
      navigate("/home");
    }
  });

  // useEffect(() => {
  //   axiosInstance
  //     .post(`/viewFoodbyId`, {id:id})
  //     .then((res) => {
  //       console.log(res,' food by id ');
  //      if(res.data.data!=undefined){
  //       setdata(res.data.data);
  //      }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // food id and cat id set
  useEffect(() => {
    console.log(data);
  }, [data.foodname]);

  const changefn = (e) => {
    if (e.target.name == "image") {
      setdata({ ...data, image: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };

  const submitfn = (e) => {
    e.preventDefault();
    console.log(data);
    axiosInstance
      .post("/editFoodById", data ,{headers: {
        'Content-Type': 'multipart/form-data',
      }})
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Inserted Successfully");
        }
        else{
          alert("Something went wrong. Please try again")
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please check your connection")
      });
  };
  return (
    <div className="main">
      <section id="featured-services" class="featured-services">
        <div className="container">
          <div className="row">
            <div class="col-12">
              <form onSubmit={submitfn}>
                <div class="service-item position-relative">
                  <h2 style={{ textAlign: "center" }}> Edit Menu</h2>
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="foodname"
                      placeholder="Food Name"
                      required
                      value={data.foodname}
                      onChange={changefn}
                    />
                  </div>{" "}
                  <div className="mb-3">
                    <textarea
                      name="description"
                      placeholder="Food Description"
                      value={data.description}
                      required
                      onChange={changefn}
                      class="form-control"
                      id="form4Example3"
                      rows="4"
                    ></textarea>
                  </div>{" "}
                  <div className="mb-3">
                    <select
                      class="form-select"
                      name="type"
                      placeholder="Food Type"
                      value={data.type}
                      required
                      onChange={changefn}
                    >
                      <option value="">Category </option>
                      <option>Appetizers</option>
                      <option>Main Course</option>
                      <option>Dessert</option>
                      <option>Beverage</option>
                    </select>
                  </div>
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
                  </div>
                  <div className="mb-3">
                    <select
                      class="form-select"
                      name="package"
                      required
                      value={data.package}
                      onChange={changefn}
                    >
                      <option value="">Packages </option>
                      <option>Marriage</option>
                      <option>Reception</option>
                      <option>Birthday</option>
                      <option>Other events</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="price"
                      placeholder="Food Price"
                      required
                      value={data.price}
                      onChange={changefn}
                    />
                  </div>
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
                      class="btn btn-primary"
                      type="submit"
                      style={{ width: "100%" }}
                    />
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

export default EditMenu;
