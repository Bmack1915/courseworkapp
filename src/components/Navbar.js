import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <Link className="navbar-brand" to="/">
          Premier League Fantasy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/TeamList" className="nav-link">
                Build Team
              </Link>{" "}
            </li>

            <li className="nav-item">
              <Link to="/MapInfo" className="nav-link">
                Team Information
              </Link>{" "}
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <Logout></Logout>
          </ul>
        </div>
      </div>
    </nav>
  );
};
