import React from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setFantasyPlayers } from "../redux/fantasyTeamSlice";
import { setEmail } from "../redux/emailSlice";

const Logout = () => {
  const dispatch = useDispatch();
  if (!Cookies.get("token")) {
    return null;
  }
  const handleLogOut = () => {
    Cookies.remove("token");
    dispatch(setFantasyPlayers([]));
    dispatch(setEmail(""));
    console.log("User logged out");
    window.location.href = "/"; // Redirects to the root, which is typically the homepage
  };

  // Check if token exists to render logout button

  return (
    <button className="btn-secondary rounded-3" onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default Logout;
