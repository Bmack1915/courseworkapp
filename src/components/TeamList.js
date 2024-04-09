import React from "react";
import "../App.css";
import { API_BASE_URL } from "../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "./apiHandler";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [selectedTeamBadgeUrl, setSelectedTeamBadgeUrl] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await get("team");
      console.log("Teams data:", response.data);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchPlayersByTeamId = async (teamId) => {
    try {
      // Construct the URL with the teamId as a query parameter
      const url = `${API_BASE_URL}player?teamId=${teamId}`;
      const response = await axios.get(url);
      setPlayers(response.data); // Update the players state with the fetched data
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleTeamChange = (event) => {
    const teamId = event.target.value;
    setSelectedTeamId(teamId);
    if (teamId) {
      fetchPlayersByTeamId(teamId);
      const selectedTeam = teams.find(
        (team) => team.teamId.toString() === teamId
      );
      if (selectedTeam) {
        console.log("Selected Team:", selectedTeam); // Log the entire selected team object
        console.log("Badge URL: ", selectedTeam.badgeURL); // Log the BadgeURL
        setSelectedTeamBadgeUrl(`team-badges/${selectedTeam.badgeURL}`);
      } else {
        setSelectedTeamBadgeUrl("");
        console.log("Badge not fetched");
      }
    } else {
      setPlayers([]);
      setSelectedTeamBadgeUrl("");
    }
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayerId(playerId);
    console.log("player selected");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <select
            id="team-select"
            className="form-control"
            onChange={handleTeamChange}
            value={selectedTeamId}
          >
            <option value="">Select a Premier League Team</option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
          {selectedTeamBadgeUrl && (
            <img
              src={selectedTeamBadgeUrl}
              alt="Team Badge"
              style={{ marginTop: "20px", width: "100px", height: "100px" }}
            />
          )}

          <ul id="player-list">
            {players.map((player) => (
              <li
                key={player.PlayerId}
                onClick={() => handlePlayerSelect(player.playerId)}
                className={
                  selectedPlayerId === player.playerId ? "selected" : ""
                }
              >
                {player.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <h3>Starting Eleven</h3>
          <ul id="starting-eleven">
            {/* Future enhancement to add starting eleven players */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TeamList;
