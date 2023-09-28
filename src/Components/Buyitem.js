import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function Buyitem({basename}) {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cuslogid") == null) {
      Navigate("/home");
    }
  });
  const { id } = useParams();
  const [item, setitem] = useState({});

  const [test, settest] = useState("");
  
  const [order, setorder] = useState({
    custid: localStorage.getItem("cuslogid"),
    catid: JSON.parse(id).cid,
    foodid: JSON.parse(id).fid,
    count: "",
    date: "",
    comments: "Comments",
  });

  const changefn = (e) => {
    setorder({ ...order, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axiosInstance
      .post("/viewFoodById", { id: JSON.parse(id).fid })
      .then((res) => {
        console.log(res, "view food by id");
        setitem(res.data.data);
        settest("gello");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/addOrder`, order)
      .then((res) => {
        console.log(res);
        alert("Order Placed");
        window.location.reload(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {test.length ? (
        <div className="catererdiv">
          <div class="menus d-flex align-items-center">
            <div class="container">
              <div class="row ">
                <div class="col">
                  <h2>Food Name</h2>
                </div>
                <div class="col">
                  <h2>Type</h2>
                </div>
                <div class="col">
                  <h2>Description</h2>
                </div>
                <div class="col">
                  <h2>Price </h2>
                </div>
              </div>
            </div>
          </div>
          <div class="menus d-flex align-items-center">
            <div class="container">
              <div class="row ">
                <div class="col">
                  <h5>{item.foodname}</h5>
                </div>
                <div class="col">
                  <h5>{item.type}</h5>
                </div>
                <div class="col">
                  <h5>{item.description}</h5>
                </div>
                <div class="col">
                  <h5>{item.price} </h5>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="main">
            <section id="featured-services" class="featured-services">
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <img
                      height={300}
                      width={400}
                      src={`${basename}/${item.image.filename}`}
                    />
                  </div>
                  <div class="col-8">
                    <form onSubmit={submitfn}>
                      <div class=" position-relative">
                        {/* animation */}
                        <h2 style={{ textAlign: "center" }}> Item details</h2>
                        <div className="mb-3">
                          <input
                            class="form-control"
                            type="number"
                            name="count"
                            min="1"
                            placeholder="Food Count"
                            required
                            onChange={changefn}
                          />
                        </div>
                        <hr />
                        <div className="mb-3">
                          <label> When do you need the items?</label>
                          <br />
                          <input
                            class="form-control"
                            type="date"
                            name="date"
                            placeholder="date"
                            min={new Date().toISOString().split("T")[0]}
                            required
                            onChange={changefn}
                          />
                        </div>{" "}
                        <hr />
                        <div className="mb-3">
                          <textarea
                            name="comments"
                            required
                            onChange={changefn}
                            placeholder="Comments"
                            class="form-control"
                            id="form4Example3"
                            rows="4"
                          ></textarea>
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Checkout
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
                                  Checkout
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <div class="container">
                                  <div class="row">
                                    <div
                                      class="col-12"
                                      style={{ margin: "-10px" }}
                                    >
                                      <h1> Total : {order.count*item.price}rs</h1>
                                      <p>
                                        <a
                                          class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                          data-bs-toggle="collapse"
                                          href="#collapseExample"
                                          role="button"
                                          aria-expanded="true"
                                          aria-controls="collapseExample"
                                        >
                                          <span class="fw-bold">
                                            Credit Card
                                          </span>
                                        </a>
                                      </p>
                                      <div
                                        class="collapse"
                                        id="collapseExample"
                                      >
                                        <div class="row">
                                          <div class="col-1"></div>
                                          <div class="col-11">
                                            <div class="row">
                                              <div class="col-12">
                                                <div class="form__div">
                                                  <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Card Number"
                                                    minLength="16"
                                                    maxLength="16"
                                                    required
                                                  />
                                                  <hr />
                                                </div>
                                              </div>

                                              <div class="col-6">
                                                <div class="form__div">
                                                  <input
                                                    type="date"
                                                    class="form-control"
                                                    placeholder="MM/YY"
                                                    min={new Date().toISOString().split("T")[0]}
                                                    required
                                                  />
                                                  <hr />
                                                </div>
                                              </div>

                                              <div class="col-6">
                                                <div class="form__div">
                                                  <input
                                                    type="password"
                                                    class="form-control"
                                                    placeholder="CVV"
                                                    minLength="3"
                                                    maxLength="3"
                                                    required
                                                  />
                                                  <hr />
                                                </div>
                                              </div>
                                              <div class="col-12">
                                                <div class="form__div">
                                                  <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Name on the Card"
                                                    required
                                                  />
                                                  <label
                                                    for=""
                                                    class="form__label"
                                                  ></label>
                                                </div>
                                              </div>
                                              <div class="col-12">
                                                <button
                                                  class="btn btn-light"
                                                  type="submit"
                                                >
                                                  Submit
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Buyitem;
