import React from "react";

const SocialMedia = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-auto">
          {" "}
          <a className="fs-5 px-2 link-dark" href="https://twitter.com">
            <img
              src="/social-media/x.png"
              alt="Twitter"
              style={{ width: "60px", height: "60px" }}
            />
          </a>
        </div>
        <div className="col-auto">
          <a className="fs-5 px-2 link-dark" href="https://facebook.com">
            <img
              src="/social-media/facebook.png"
              alt="Facebook"
              style={{ width: "60px", height: "60px" }}
            />
          </a>
        </div>
        <div className="col-auto">
          <a className="fs-5 px-2 link-dark" href="https://linkedin.com">
            <img
              src="/social-media/linkedin.png"
              alt="LinkedIn"
              style={{ width: "60px", height: "60px" }}
            />
          </a>
        </div>
        <div className="col-auto">
          <a className="fs-5 px-2 link-dark" href="https://youtube.com">
            <img
              src="/social-media/youtube.png"
              alt="YouTube"
              style={{ width: "60px", height: "60px" }}
            />
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-muted pb-5">Share your team on social media!</h3>
      </div>
    </div>
  );
};

export default SocialMedia;
