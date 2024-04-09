import React from "react";
import "../App.css";
import { post } from "./apiHandler";
import { API_BASE_URL } from "../apiConfig";

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(e);
  const data = {
    Email: e.target.elements.loginUsername.value,
    Password: e.target.elements.loginPassword.value,
  };
  console.log(data);
  post("account/login", data);
};

const LoginForm = () => {
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2 className="fw-bolder text-dark mb-4">Sign In</h2>
      <div className="mb-3">
        <label htmlFor="loginUsername" className="form-label text-dark">
          Email
        </label>
        <input
          type="email"
          id="loginUsername"
          name="login"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="loginPassword" className="form-label text-dark">
          Password
        </label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          className="form-control"
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary btn-lg">
          Sign In
        </button>
      </div>
      <div className="mt-3">
        <a
          href="https://users.premierleague.com/accounts/password-reset/"
          className="text-decoration-none"
          style={{ color: "#0d6efd" }}
        >
          Forgot your password?
        </a>
      </div>

      <div className="mt-3">
        <a
          href="https://users.premierleague.com/accounts/password-reset/"
          className="text-decoration-none"
          style={{ color: "#0d6efd" }}
        >
          Don't have an account? Register here
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
