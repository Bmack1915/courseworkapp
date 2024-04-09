import React from "react";
import LoginForm from "./LoginForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import Cookies from "js-cookie";

const AccountForm = () => {
  const [form, setForm] = useState("login");
  console.log(form);
  if (Cookies.get("token")) {
    return null;
  }
  if (form == "login") {
    return (
      <div
        className="bg-white p-4 rounded-3 shadow"
        style={{ marginTop: "20px" }}
      >
        <LoginForm setFormFunction={setForm} />;
      </div>
    );
  } else if (form == "register") {
    return (
      <div
        className="bg-white p-4 rounded-3 shadow"
        style={{ marginTop: "20px" }}
      >
        <RegisterForm setFormFunction={setForm} />;
      </div>
    );
  }
};

export default AccountForm;
