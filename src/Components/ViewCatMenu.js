import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function ViewCatMenu({basename}) {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(localStorage.getItem('loguserid'));
    axiosInstance
      .post(`/viewFoodByCat/${localStorage.getItem("catlogid")}`)
      .then((res) => {
        console.log(res, "food");
        if (res.data.data != undefined) {
          setdata(res.data.data);
        } else {
          setdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("catlogid") == null) {
      navigate("/home");
    }
  });

  const deletefn = (e) => {
    if (data.length > 1) {
      console.log(e);
      axiosInstance
        .post(`/removeFoodById/`,{ id: e })
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            alert("Deleted");
            window.location.reload(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Menu should have atleast one data. Please add another data.");
    }
  };
  return (
    <div className="catererdiv" style={{minHeight:"400px"}}>
      {data.length ? (
        <div class="menus d-flex align-items-center">
          <div class="container text-center">
            <div class="row">
             
            <div class="col">
                <h4>Image</h4>
              </div>
              <div class="col">
                <h4>Food Name</h4>
              </div>
              <div class="col">
                <h4>Type</h4>
              </div>
              <div class="col">
                <h4>Description</h4>
              </div>
              <div class="col">
                <h4>Price </h4>
              </div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
            <hr/>
          </div>
        </div>
      ) : null}
      <div class="menus d-flex align-items-center">
        <div class="container text-center">
          {/* Map start here  */}
          {data.length ? (
            data.map((a) => {
              return (
                <div class="row" style={{margin:"20px",padding:"5px", borderRadius:'10px', background:"#e0e0e0"}}>
                  <div class="col">
                    <img height={140} src={`${basename}/${a.image.filename}`} />
                  </div>
                  <div class="col">
                    <h5>{a.foodname}</h5>
                  </div>
                  <div class="col">
                    <h5>{a.type}</h5>
                  </div>
                  <div class="col">
                    <h5>{a.description}</h5>
                  </div>
                  <div class="col">
                    <h5>₹{a.price} </h5>
                  </div>
                  <div class="col">
                    <Link
                      className="btn btn-primary"
                      style={{ marginRight: "10px" }}
                      to={`/EditMenu/${a._id}`}
                    >
                      {" "}
                      Edit
                    </Link>
                  </div>
                  <div className="col">
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        deletefn(a._id);
                      }}
                    >
                      {" "}
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div class="row align-items-start">
              <div class="col">
              <div class="card" >
  <div class="card-body">
    <h5 class="card-title">No data to display</h5>
    <h6 class="card-title">Please add a new menu </h6>
    <Link to={`/AddMenu`} className="btn btn-primary">Add a new menu</Link>

  </div>
</div>
              </div>
            </div>
          )}
          {/* Map Ends here  */}
        </div>
      </div>
    </div>
  );
}

export default ViewCatMenu;
