import React from "react";
import Cookies from "js-cookie";

const Logout = () => {
  if (!Cookies.get("token")) {
    return null;
  }
  const handleLogOut = () => {
    Cookies.remove("token");
    console.log("User logged out");
    window.location.href = "/"; // Redirects to the root, which is typically the homepage
  };

  // Check if token exists to render logout button

  return <button onClick={handleLogOut}>Log Out</button>;
};

export default Logout;
