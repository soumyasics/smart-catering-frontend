import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";

function CusComplaints({basename}) {
  const [custcomplaint, setcustcomp] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewComplaintsByCustId/${localStorage.getItem("cuslogid")}`)
      .then((res) => {
        console.log(res, " cust complaints");
        if (res.data.data != undefined) {
          setcustcomp(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{minHeight:"400px", padding:"40px"}}>


<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        View My Complaints
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="container">
        <div className="row">
          
          {custcomplaint.length
            ? custcomplaint.map((a) => {
                return (
                  <div className="col-4">
                    <div class="card">
                      {/* <img src="..." class="card-img-top" alt="..."> */}
                      <div class="card-body">
                        <h5 class="card-title">Caterer : {a.catid.unitname}</h5>
                        <h5 class="card-title">{a.complaint}</h5>
                        <p class="card-text">{a.date.slice(0, 10)}</p>
                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                      </div>
                    </div>
                  </div>
                );
              })
            : <div className="col-12">
            <div class="card">
              {/* <img src="..." class="card-img-top" alt="..."> */}
              <div class="card-body">
                <h5 class="card-title">No Complaints to display</h5>
               
              </div>
            </div>
          </div>}
        </div>
      </div>
      </div>
    </div>
  </div> </div>
     
    </div>
  );
}

export default CusComplaints;
