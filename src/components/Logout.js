import React from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setFantasyPlayers } from "../redux/fantasyTeamSlice";
import { setEmail } from "../redux/emailSlice";

const Logout = () => {
  // Check if token exists to render logout button
  const dispatch = useDispatch();
  if (!Cookies.get("token")) {
    return null;
  }
  const handleLogOut = () => {
    //Reset token, email & state of fantasyList using redux.
    Cookies.remove("token");
    dispatch(setFantasyPlayers([]));
    dispatch(setEmail(""));
    console.log("User logged out");
    window.location.href = "/"; //homepage redirect after logout
  };

  return (
    <button className="btn-secondary rounded-3" onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default Logout;
