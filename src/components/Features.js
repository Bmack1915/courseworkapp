import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section className="py-5 bg-dark">
      <div className="container px-5">
        <div className="row gx-5">
          <div className="col-xl-8">
            <h2 className="fw-bolder fs-10 mb-4 text-white">Features</h2>
            <div className="mb-4">
              <h3 className="text-white">
                Create and Customize Your Dream Team
              </h3>
              <p className="text-left text-white">
                Build your ultimate fantasy team by selecting players from the
                Premier League. Choose from all 20 teams and pick your favourite
                players.
              </p>
            </div>
            <div className="mb-5">
              <h3 className="text-white">Access Team Summaries</h3>
              <p className="text-left text-white">
                Make informed decisions about your starting 11 by learning about
                the history of the premier leagues most presitigous clubs.
              </p>
            </div>
            <div className="mb-5">
              <h3 className="text-white">
                Find Out Where Your Favourite Clubs Play
              </h3>
              <p className="text-left text-white">
                Ever wondered where the "Theatre of dreams is?" or where "The
                Bridge" really is? Access maps of each of the premier leagues
                stadiums across the country
              </p>
            </div>
            <div className="text-end mb-5 mb-xl-0">
              <Link
                to="/MapInfo"
                className="bi bi-arrow-right ext-decoration-none"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card border-0 h-100 shadow rounded-5 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex h-100 align-items-center justify-content-center">
                  <div className="text-center">
                    <div className="h2 fw-bolder">Contact</div>
                    <p className="text-muted mb-4">
                      For press inquiries, email us at
                      <br />
                      <a href="mailto:premierleaguefantasy@demo.com">
                        premierleaguefantasy@demo.com
                      </a>
                    </p>
                    <div className="h6 fw-bolder">Follow us</div>
                    <a
                      className="fs-5 px-2 link-dark"
                      href="https://twitter.com"
                    >
                      <img
                        src="/social-media/x.png"
                        alt="Twitter"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </a>
                    <a
                      className="fs-5 px-2 link-dark"
                      href="https://facebook.com"
                    >
                      <img
                        src="/social-media/facebook.png"
                        alt="Facebook"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </a>
                    <a
                      className="fs-5 px-2 link-dark"
                      href="https://linkedin.com"
                    >
                      <img
                        src="/social-media/linkedin.png"
                        alt="LinkedIn"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </a>
                    <a
                      className="fs-5 px-2 link-dark"
                      href="https://youtube.com"
                    >
                      <img
                        src="/social-media/youtube.png"
                        alt="YouTube"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
