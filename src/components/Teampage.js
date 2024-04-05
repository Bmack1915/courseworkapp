import React from "react";
import "../App.css";
import { Navbar } from "./Navbar";

const Teampage = () => {
  return (
    <body>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <select id="team-select" class="form-control">
                    <option value="">Select a Premier League Team</option>
                    <option value="team1">Luton</option>
                    <option value="team2">United</option>
                </select>
                <ul id="player-list">
                </ul>
            </div>
            <div class="col-md-8">
                <h3>Starting Eleven</h3>
                <ul id="starting-eleven">
                </ul>
            </div>
        </div>
    </div>
    </body>
  )
};

export default Teampage;