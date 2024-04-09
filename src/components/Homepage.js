import React from "react";
import "../App.css";
import AccountForm from "./AccountForm";

const Homepage = () => {
  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-between">
            <div className="col-lg-4 text-center text-lg-start">
              <h1 className="display-5 fw-bolder text-white mb-2">
                Premier League Fantasy
              </h1>
              <p className="lead fw-normal text-white-50 mb-4">
                Welcome to Premier League Fantasy! Create your dream fantasy
                team TODAY!
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start">
                <a
                  className="btn btn-primary btn-lg px-4 me-sm-3"
                  href="#features"
                >
                  Get Started
                </a>
                <a className="btn btn-outline-light btn-lg px-4" href="#!">
                  Learn More
                </a>
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

      <section className="py-5 bg-light">
        <div className="container px-5">
          <div className="row gx-5">
            <div className="col-xl-8">
              <h2 className="fw-bolder fs-5 mb-4">Features</h2>

              <div className="mb-4">
                <a className="link-dark" href="#!">
                  <h3>Create and Customize Your Dream Team</h3>
                </a>
                <p className="text-left">
                  Build your ultimate fantasy team by selecting players from the
                  Premier League. Customize your team name, logo, and jersey to
                  stand out in the league.
                </p>
              </div>

              <div className="mb-5">
                <a className="link-dark" href="#!">
                  <h3>Access Real-time Player Stats and Analytics</h3>
                </a>
                <p className="text-left">
                  Make informed decisions with up-to-date player statistics,
                  health updates, and performance analytics. Stay ahead of the
                  game with our comprehensive player insights.
                </p>
              </div>

              <div className="mb-5">
                <a className="link-dark" href="#!">
                  <h3>Compete in Weekly Challenges and Earn Rewards</h3>
                </a>
                <p className="text-left">
                  Engage in weekly challenges against friends and other fantasy
                  managers. Climb the leaderboard and win exclusive rewards
                  based on your team's performance.
                </p>
              </div>

              <div className="text-end mb-5 mb-xl-0">
                <a className="text-decoration-none" href="#!">
                  Explore More Features
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card border-0 h-100 shadow rounded-5 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex h-100 align-items-center justify-content-center">
                    <div className="text-center">
                      <div className="h2 fw-bolder">Contact</div>
                      <p className="text-muted mb-4 h">
                        For press inquiries, email us at
                        <br />
                        <a href="mailto:looksmaxxing@gmail.com">
                          looksmaxxing@gmail.com
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
    </>
  );
};

export default Homepage;
