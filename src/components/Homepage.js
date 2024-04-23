import React from "react";
import "../App.css";
import AccountForm from "./AccountForm";
import Features from "./Features";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <header className="bg-light py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-between">
            <div className="col-lg-4 text-center text-lg-start">
              <h1 className="display-5 fw-bolder text-black mb-2">
                Premier League Fantasy
              </h1>
              <p className="lead fw-normal text-black-50 mb-4">
                Welcome to Premier League Fantasy! Create your dream fantasy
                team TODAY!
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start">
                <Link to="/MapInfo" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
              </div>
            </div>

            <div className="col-lg-4 d-none d-lg-block text-center">
              <img
                className="img-fluid rounded-3 my-5"
                src="/team-badges/league.png"
                alt="Luton Town FC Badge"
              />
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
