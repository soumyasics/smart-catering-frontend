import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLog() {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("cuslogid") != null || localStorage.getItem("catlogid") != null || localStorage.getItem("charlogid") != null ) {
      alert(
        "Please logout from your current account and login as an admin,if you want to access admin panel"
      );
      navigate("/home");
    }

    if(localStorage.getItem(`adminlog`)!=undefined){
      navigate('/admin/adminpage')
    }
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const submitfn = (e) => {
    e.preventDefault();

    if (data.name == "admin" && data.password == "admin12345") {
      
      localStorage.setItem("adminlog", 1);
      alert("Logged in ");
      window.location.reload(false)
    }else{
      alert("Please enter valid credentials  ");

    }
  };

  return (
    <div className="main">
      <section id="featured-services" class="featured-services">
        <div className="container">
          <div className="row">
            <div class="col-12">
              <form onSubmit={submitfn}>
                <div class="service-item position-relative">
                  <h2 style={{ textAlign: "center" }}> Login - Admin</h2>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="name"
                      name="name"
                      onChange={changefn}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      name="password"
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

      <div class="main-w3layouts wrapper"></div>
    </div>
  );
}

export default AdminLog;
