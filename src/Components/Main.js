import React from "react";
import carousel0 from "../Assets/img/flight3.png";
import carousel1 from "../Assets/img/carousel1.png";
import carousel2 from "../Assets/img/flight3.png";
import carousel3 from "../Assets/img/carousel1.png";

import about from "../Assets/img/about.jpg";
import cta from "../Assets/img/cta.jpg";
import About from "./About";
import { Link } from "react-router-dom";

function Main({auth}) {

  let x 
  if(auth==0){
    x=carousel0
  }
  else if(auth==1){
    x=carousel1
  }
  else if (auth==2){
    x=carousel2
  }
  else if(auth==3){
   x=carousel3
  }
  return (
    <div>
      <section
        id="hero-animated"
        class="hero-animated d-flex align-items-center"
      >
        <div
          class="container d-flex flex-column justify-content-center align-items-center text-center position-relative"
          data-aos="zoom-out"
        >
          <div className="container" >
            <div className="row">
              <div className="col">
                <img src={x} class="img-fluid animated" />
              </div>
            </div>
          </div>

          <h2>
            Welcome to <span> HUNGRY HUB</span>
          </h2>
          <p>Your One-Stop Destination for Smart Catering Services </p>
          <div class="d-flex">
            <Link to="/register/cusreg" class="btn-get-started scrollto">
              Get Started
            </Link>
            {/* <a href="#" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Video</span></a> */}
          </div>
        </div>
      </section>
      <section id="featured-services" class="featured-services">
        <div class="container">
          <div class="row gy-4">
            <div class="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-activity icon"></i>
                </div>
                <h4>
                  <a  class="stretched-link">
                    Extensive Menu Selection
                  </a>
                </h4>
                <p>
                  Explore a diverse range of culinary options, including
                  appetizers, main courses, desserts, and beverages, tailored to
                  suit various tastes and dietary preferences.
                </p>
              </div>
            </div>

            <div
              class="col-xl-3 col-md-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-bounding-box-circles icon"></i>
                </div>
                <h4>
                  <a  class="stretched-link">
                    User-Friendly Ordering Process
                  </a>
                </h4>
                <p>
                  Enjoy a seamless online ordering experience with an intuitive
                  interface that allows you to effortlessly browse, select, and
                  customize your catering choices.
                </p>
              </div>
            </div>

            <div
              class="col-xl-3 col-md-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="400"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-calendar4-week icon"></i>
                </div>
                <h4>
                  <a  class="stretched-link">
                    Event Planning Assistance:
                  </a>
                </h4>
                <p>
                  Receive expert guidance and support from catering
                  professionals who can help you with menu planning, portion
                  sizing, and other aspects of event catering to ensure a
                  memorable experience.
                </p>
              </div>
            </div>

            <div
              class="col-xl-3 col-md-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="600"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-broadcast icon"></i>
                </div>
                <h4>
                  <a class="stretched-link">
                    Reviews and Ratings
                  </a>
                </h4>
                <p>
                  Benefit from customer reviews and ratings to make informed
                  decisions about your catering choices, ensuring exceptional
                  quality and service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      {/* <section id="cta" class="cta">
        <div class="container" data-aos="zoom-out">
          <div class="row g-5">
            <div class="col-lg-8 col-md-6 content d-flex flex-column justify-content-center order-last order-md-first">
              <h3>
                Alias sunt quas <em>Cupiditate</em> oluptas hic minima
              </h3>
              <p>
                {" "}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <a class="cta-btn align-self-start" href="#">
                Call To Action
              </a>
            </div>

            <div class="col-lg-4 col-md-6 order-first order-md-last d-flex align-items-center">
              <div class="img">
                <img src={cta} alt="" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="onfocus" class="onfocus">
        <div class="container-fluid p-0" data-aos="fade-up">
          <div class="row g-0">
            <div class="col-lg-6 video-play position-relative">
              <a
                href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                class="glightbox play-btn"
              ></a>
            </div>
            <div class="col-lg-6">
              <div class="content d-flex flex-column justify-content-center h-100">
                <h3>Voluptatem dignissimos provident quasi corporis</h3>
                <p class="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i class="bi bi-check-circle"></i> Ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i> Duis aute irure dolor in
                    reprehenderit in voluptate velit.
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i> Ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate trideta storacalaperda mastiro
                    dolore eu fugiat nulla pariatur.
                  </li>
                </ul>
                <a href="#" class="read-more align-self-start">
                  <span>Read More</span>
                  <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Main;
