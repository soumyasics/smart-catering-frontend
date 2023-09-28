import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function Caterer({basename}) {
  const catid = useParams();
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cuslogid") == null) {
      navigate("/home");
    }
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewFoodByCat/${catid.id}`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="catererdiv">
     
      {data.length ? (
        <div class="menus d-flex align-items-center">
          <div class="container text-center">
          <div className="col-12"> 
          <div class="row">
              <div class="col-2">
                <h3>Food Name</h3>
              </div>
              <div class="col-2">
                <h3>Type</h3>
              </div>
              <div class="col-2">
                <h3>Description</h3>
              </div>
              <div class="col-2">
                <h3>Price </h3>
              </div>
              <div class="col-2"></div>
            </div></div>
          </div>
        </div>
      ) : null}
      <div class="menus d-flex align-items-center">
        <div class="container text-center">
          <div className="row">
 {/* Map start here  */}
 {data.length ? (
            data.map((a) => {
              return (
               <>
               <div className="col-10">
               <div  class="row"
                  style={{
                    margin: "20px",
                    padding: "5px",
                    borderRadius: "10px",
                    background: "#e0e0e0",
                  }}
                >
                  <div class="col">
                    <h5>{a.foodname}</h5>
                    <img height={200} src={`${basename}/${a.image.originalname}`}/>
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

                  <div className="col">
                    <Link className="btn btn-primary" to={`/buyitem/${JSON.stringify({fid:a._id, cid:a.catid})}`}>
                      {" "}
                      Buy
                    </Link>
                  </div>
                </div>
               </div>
                <div className="col"
                 style={{
                    margin: "20px",
                    padding: "5px",
                    borderRadius: "10px",
                    background: "#e0e0e0",
                  }}>
                    <h3> Reviews</h3>
                 {a.reviews.map((a)=>{
                  return  <p> {a}</p>
                 })}
                </div>
                </>

              );
            })
          ) : (
            <div class="row align-items-start">
              <div class="col">
                <h5>No Data </h5>
              </div>
            </div>
          )}
          {/* Map Ends here  */}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Caterer;
