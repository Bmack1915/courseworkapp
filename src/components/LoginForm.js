import React from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/emailSlice";
import Cookies from "js-cookie";
import { post } from "./apiHandler";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ setFormFunction }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.loginUsername.value;
    const password = e.target.elements.loginPassword.value;

    if (email == null || !password) {
      toast.error("You must enter both an email and a password", {
        position: "top-center",
      });
      return null;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
      });
      return null;
    }

    dispatch(setEmail(email));

    try {
      const response = await post("account/login", {
        Email: email,
        Password: password,
      });

      const { token } = response.data;
      Cookies.set("token", token, { expires: 1 });
      dispatch(setEmail(email));
      toast.success("Login succesfull", {
        position: "top-center",
      });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast("Invalid username or password. Please try again.");
      } else {
        toast("An error occurred. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };

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
          onClick={() => setFormFunction("register")}
          className="text-decoration-none"
          style={{ color: "#0d6efd", cursor: "pointer" }}
        >
          Don't have an account? Register here
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
