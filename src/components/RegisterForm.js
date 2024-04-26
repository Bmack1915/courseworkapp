import React from "react";
import "../App.css";
import { post } from "./apiHandler";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.elements.loginUsername.value;
  const password = e.target.elements.loginPassword.value;

  if (email == null || !password) {
    toast("You must enter both an email and a password");
    return null;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast("Please enter a valid email address.");
    return null;
  }
  const data = {
    Email: email,
    Password: password,
  };
  try {
    const response = await post("account/register", data);
    const { token } = response.data;
    Cookies.set("token", token, { expires: 1 });
    await post("account/login", data);
    window.location.reload();
    toast("Successfully registered and logged in!");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(
        "Invalid username or password. Please try again. Passwords must have at least one non alphanumeric character and atleast one uppercase and lowercase character"
      );
    } else {
      toast("An error occurred. Please try again later.");
    }
    console.error("Login error:", error);
  }
};

const RegisterForm = ({ setFormFunction }) => {
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2 className="fw-bolder text-dark mb-4">Register</h2>
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
          Register
        </button>
      </div>

      <div className="mt-3">
        <a
          onClick={() => setFormFunction("login")}
          className="text-decoration-none"
          style={{ color: "#0d6efd", cursor: "pointer" }}
        >
          Already have an account? Login here
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
