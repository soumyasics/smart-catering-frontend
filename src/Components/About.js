import React from "react";
import img1 from "../Assets/img/about.jpg";

function About() {
  return (
    <div>
      <div class="container-fluid p-5">
        <div class="row gx-5">
          <div class="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: "300px" }}>
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100 rounded"
                src={img1}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="mb-4">
              <h1 class="display-3 text-uppercase mb-0 text-dark">
               About us
              </h1>
            </div>
            <p class="text-dark mb-4">
              At HUNGRY HUB, we are passionate about delivering exceptional
              catering services with convenience and efficiency. As an online
              platform for ordering catering services, we aim to simplify the
              process of planning and organizing events, whether it's a small
              gathering, corporate function, or grand celebration.
            </p>
            <p class="mb-3 text-dark">
              Our dedicated team of culinary experts and event planners
              understands the importance of creating memorable experiences
              through delicious food and impeccable service. We work closely
              with a curated network of professional caterers who excel in their
              craft, ensuring that every dish is crafted with care and attention
              to detail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
