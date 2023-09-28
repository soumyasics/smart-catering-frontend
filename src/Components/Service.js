import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import weddingservice from "../Assets/img/weddingservice.jpg";
// import birthday from "../Assets/img/birthdayservice.jpg";
import axiosInstance from "../baseurl";
function Service({basename}) {
  const mainnavigate = useNavigate();

  const [services, setservices] = useState([]);
  const [refresh,setrefresh] = useState('')
 

  useEffect(() => {
    axiosInstance
      .post("/viewAllStaffs")
      .then((res) => {
        console.log(res, "res");
        if(res.data.data!=undefined){
          setservices(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    if (localStorage.getItem("cuslogid") == null) {
      mainnavigate("/home");
    }
  });


  return (
    <div className="servicediv" style={{minHeight:"400px", padding:"40px"}}>
      <div class="container text-center">
        <div class="row" >
          {services.length?services.map((a) => {
            const rate = [];
            for (let i = 0; i < parseFloat(a.rating).toFixed(); i++) {
              rate.push(i);
            }
            return (
              <div class="col-4"style={{margin:"20px 0px"}} >
                <div class="card" style={{minHeight:"350px"}}>
                  <img src="https://static.vecteezy.com/system/resources/previews/002/387/840/original/service-icon-flat-style-isolated-on-white-background-free-vector.jpg"
                  height={300}/>
                  <div class="card-body">
                    <h5 class="card-title">{a.unitname}</h5>
                    <p class="card-text">
                      {a.contact} <hr /> {a.city}
                    </p>
                    <div class="rate">
                      {rate.length?rate.map(() => {
                        return <span style={{fontSize:"30px"}}>⭐</span>;
                      }):<span style={{fontSize:"30px"}}>👎</span>}
                    </div>
                    <Link to={`/Caterer/${a._id}`} class="btn btn-danger">
                      View this catering service
                    </Link>
                    <hr/>
                    
                  </div>
                </div>
              </div>
            );
          }):<div class="col-12" >
          <div class="card" >
            
            <div class="card-body">
              <h5 class="card-title">No Services available</h5>
              
              
            </div>
          </div>
        </div>}
        </div>
      </div>
    </div>
  );
}

export default Service;
