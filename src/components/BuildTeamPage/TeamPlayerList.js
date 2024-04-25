import React from "react";
import "../../App.css";
import { API_BASE_URL } from "../../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "../apiHandler";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayerToAdd } from "../../redux/fantasyTeamSlice";

const TeamPlayerList = () => {
  const dispatch = useDispatch();
  const fantasyPlayers = useSelector((state) => state.fantasyTeam.players);
  const [teams, setTeams] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedTeamBadgeUrl, setSelectedTeamBadgeUrl] = useState("");
  const selectedPlayerToAdd = useSelector(
    (state) => state.fantasyTeam.selectedPlayerToAdd
  );

  useEffect(() => {
    fetchTeams();
    fetchPlayersByTeamId(1);
  }, []);

  const handleTeamChange = (event) => {
    const teamId = event.target.value;
    setSelectedTeamId(teamId);
    if (teamId) {
      fetchPlayersByTeamId(teamId);
      const selectedTeam = teams.find(
        (team) => team.teamId.toString() === teamId
      );
      if (selectedTeam) {
        setSelectedTeamBadgeUrl(`team-badges/${selectedTeam.badgeURL}`);
      } else {
        setSelectedTeamBadgeUrl("");
      }
    } else {
      setTeamPlayers([]);
      setSelectedTeamBadgeUrl("");
    }
  };
  const fetchTeams = async () => {
    try {
      const response = await get("team");
      console.log("Teams data:", response.data);
      setTeams(response.data);
      if (response.data.length > 0) {
        setSelectedTeamId(1);
        setSelectedTeamBadgeUrl(`team-badges/arsenal.png`);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchPlayersByTeamId = async (teamId) => {
    try {
      // Construct the URL with the teamId as a query parameter
      const url = `${API_BASE_URL}player?teamId=${teamId}`;
      const response = await axios.get(url);
      setTeamPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handlePlayerSelect = (player) => {
    if (!fantasyPlayers.includes(player)) {
      dispatch(setSelectedPlayerToAdd(player));
    }
  };
  return (
    <div className="col-md-4 pt-5">
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
          className="mt-3 img-fluid object-fit-contain"
          style={{ width: "100px", height: "100px" }}
        />
      )}
      <ul id="player-list" className="list-group mt-3">
        {teamPlayers.map((teamPlayer) => (
          <li
            key={teamPlayer.PlayerId}
            onClick={() => handlePlayerSelect(teamPlayer)}
            className={
              "list-group-item " +
              (selectedPlayerToAdd &&
              selectedPlayerToAdd.playerId === teamPlayer.playerId
                ? "list-group-item-primary"
                : "")
            }
          >
            {teamPlayer.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPlayerList;
