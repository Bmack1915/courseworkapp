import React from "react";
import "../../App.css";
import { API_BASE_URL } from "../../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { get, post } from "../apiHandler";
import AuthCheck from "../AuthCheck";
import { useSelector, useDispatch } from "react-redux";
import { addPlayer, removePlayer } from "../../redux/fantasyTeamSlice";
import { act } from "react-dom/test-utils";

const TeamList = () => {
  const dispatch = useDispatch();
  const fantasyPlayers = useSelector((state) => state.fantasyTeam.players);
  const [teams, setTeams] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedPlayerToAdd, setSelectedPlayerToAdd] = useState(null);
  const [selectedPlayerToRemove, setSelectedPlayerToRemove] = useState(null);
  const [selectedTeamBadgeUrl, setSelectedTeamBadgeUrl] = useState("");

  useEffect(() => {
    fetchTeams();
    fetchPlayersByTeamId(1);
  }, []);

  const isPlayerSelected = (selectedPlayer) => {
    return selectedPlayer && fantasyPlayers.includes(selectedPlayer);
  };

  const isPlayerSelectedForButton = (selectedPlayer) => selectedPlayer;

  const isFantasyPlayerSelected = (selectedPlayer) => {
    return selectedPlayer && fantasyPlayers.includes(selectedPlayer);
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

  const handleAddPlayer = async (e) => {
    if (!selectedPlayerToAdd) {
      alert("Please select a player first.");
      return;
    }
    dispatch(addPlayer(selectedPlayerToAdd));
    setSelectedPlayerToAdd(null);
  };

  const handleRemovePlayer = async (e) => {
    if (!selectedPlayerToRemove) {
      alert("Please select a player first.");
      return;
    }
    dispatch(removePlayer(selectedPlayerToRemove));
    setSelectedPlayerToRemove(null);
  };

  const SavePlayersToDb = async (e) => {
    try {
      e.preventDefault();
      console.log(e);
      const body = {
        Email: e.target.elements.loginUsername.value,
        selectedPlayerId: selectedPlayerToAdd.playerId,
      };

      console.log(body);
      const response = await axios.post("applicationuser/addplayer", body);
      console.log("Player added successfully:", response.data);
      alert("Player added successfully!");
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player.");
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
        console.log("Selected Team:", selectedTeam);
        console.log("Badge URL: ", selectedTeam.badgeURL);
        setSelectedTeamBadgeUrl(`team-badges/${selectedTeam.badgeURL}`);
      } else {
        setSelectedTeamBadgeUrl("");
        console.log("Badge not fetched");
      }
    } else {
      setTeamPlayers([]);
      setSelectedTeamBadgeUrl("");
    }
  };

  const handlePlayerSelect = (player) => {
    if (!fantasyPlayers.includes(player)) {
      setSelectedPlayerToAdd(player);
    }
  };

  const handleFantasyPlayerSelect = (player) => {
    if (fantasyPlayers.includes(player)) {
      setSelectedPlayerToRemove(player);
    }
  };

  return (
    <AuthCheck>
      <div className="container">
        <div className="row">
          <p1> Select your team and start building</p1>
        </div>
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
              {teamPlayers.map((teamPlayer) => (
                <li
                  key={teamPlayer.PlayerId}
                  onClick={() => handlePlayerSelect(teamPlayer)}
                  className={
                    selectedPlayerToAdd &&
                    selectedPlayerToAdd.playerId === teamPlayer.playerId
                      ? "selected"
                      : ""
                  }
                >
                  {teamPlayer.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8">
            <h3>Starting Eleven</h3>
            <ul>
              {fantasyPlayers.map((teamPlayer) => (
                <li
                  key={teamPlayer.playerId}
                  onClick={() => handleFantasyPlayerSelect(teamPlayer)}
                  className={
                    selectedPlayerToRemove &&
                    selectedPlayerToRemove.playerId === teamPlayer.playerId
                      ? "selected"
                      : ""
                  }
                >
                  {teamPlayer.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            key={
              selectedPlayerToAdd ? selectedPlayerToAdd.playerId : "no-player"
            }
            className="btn btn-success"
            style={{
              backgroundColor: isPlayerSelectedForButton(selectedPlayerToAdd)
                ? "lightblue"
                : "black",
            }}
            onClick={handleAddPlayer}
            disabled={isPlayerSelected(selectedPlayerToAdd)}
          >
            Add Player
          </button>

          <button
            className="btn btn-success"
            style={{
              backgroundColor: isFantasyPlayerSelected(selectedPlayerToRemove)
                ? "lightblue"
                : "black",
            }}
            onClick={handleRemovePlayer}
            disabled={!isFantasyPlayerSelected(selectedPlayerToRemove)}
          >
            Remove Player
          </button>
        </div>
      </div>
    </AuthCheck>
  );
};
export default TeamList;
