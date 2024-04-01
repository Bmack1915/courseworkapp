import React from "react";
import "../App.css";

const Homepage = () => {
  return (
    <div>
      <h1 className="header-title">Welcome to Premier League Info</h1>
      <nav className="navbar">
        <a href="/teams" className="nav-link">
          Team List
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/contact" className="nav-link">
          Contact Info
        </a>
      </nav>
    </div>
  );
};

export default Homepage;
