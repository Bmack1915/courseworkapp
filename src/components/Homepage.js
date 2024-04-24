import React from "react";
import "../App.css";
import AccountForm from "./AccountForm";
import Features from "./Features";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [currentImage, setCurrentImage] = useState("/team-badges/kop.png");
  const img_array = [
    "/team-badges/kop.png",
    "/team-badges/stretford.png",
    "/team-badges/clockend.png",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % img_array.length;
      setCurrentImage(img_array[index]);
    }, 10000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <>
      <header
        className="bg-light py-2 pt-2"
        style={{
          backgroundImage: `url('${currentImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-between">
            <div className="col-lg-5 text-center text-lg-start">
              <div className="display-5 fw-normal text-white mb-2 p-3 bg-dark rounded my-custom-bubble">
                <div className="row">
                  <div className="col-md-6">
                    <h1>Premier League Fantasy</h1>
                    <p className="lead fw-normal text-white-50 mb-4">
                      Welcome to Premier League Fantasy! Create your dream
                      fantasy team today!
                    </p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start">
                      <Link to="/MapInfo" className="btn btn-primary btn-lg">
                        Get Started
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      className="img-fluid rounded-3 my-5"
                      src="/team-badges/league.png"
                      alt="Luton Town FC Badge"
                      style={{
                        marginTop: "10px",
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <AccountForm />
            </div>
          </div>
        </div>
      </header>
      <div>
        <Features />
      </div>
    </>
  );
};

export default Homepage;
