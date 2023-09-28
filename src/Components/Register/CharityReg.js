import React, { useState } from 'react'
import axiosInstance from '../../baseurl';
import { useNavigate } from 'react-router-dom';

function CharityReg() {

  const navigate = useNavigate()
    const [data, setdata] = useState({
        unitname: "",
        pincode: "",
        city: "",
        contact: "",
        email: "",
        password: "",
        district: "",
        regno: "",
      });
      const changefn = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
      };
      const submitfn = (e) => {
        e.preventDefault();
        console.log(data);
        axiosInstance
          .post("/registerCharity", data)
          .then((res) => {
            console.log("Submitted", res);
            if (res.data.status == 200) {
              alert(res.data.msg);
              navigate("/Login/charlog");
            } else if (res.data.status == 500) {
              alert("Couldn't Register. Please try again");
            }
          })
          .catch((e) => {
            console.log("Error", e);
          });
      };
  return (
   <div className='container'>
    <div className='row'>
      <div className='col-5 charity'></div>
      <div className='col-7'> <div className="main">
    <section id="featured-services" class="featured-services">
      <div className="container">
        <div className="row">
          <div class="col-12">
            <form onSubmit={submitfn}>
              <div class="service-item position-relative">
                <h2 style={{ textAlign: "center" }}> Register - Charity</h2>
                <div className="mb-3">
                  <input
                     class="form-control"
                    type="text"
                    name="unitname"
                    placeholder="name"
                    required
                    onChange={changefn}
                  />
                </div>
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
                    type="password"
                    name="password"
                    placeholder="password"
                    required
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
  </div></div>
    </div>
   </div>
  )
}

export default CharityReg