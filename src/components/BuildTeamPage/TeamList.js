import React from "react";
import "../../App.css";
import { API_BASE_URL } from "../../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { get, post, remove, getTeams } from "../apiHandler";
import AuthCheck from "../AuthCheck";
import { useSelector, useDispatch } from "react-redux";
import {
  addPlayer,
  removePlayer,
  setFantasyPlayers,
} from "../../redux/fantasyTeamSlice";

const TeamList = () => {
  const dispatch = useDispatch();
  const fantasyPlayers = useSelector((state) => state.fantasyTeam.players);
  const email = useSelector((state) => state.email.value);
  const [teams, setTeams] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedPlayerToAdd, setSelectedPlayerToAdd] = useState(null);
  const [selectedPlayerToRemove, setSelectedPlayerToRemove] = useState(null);
  const [selectedTeamBadgeUrl, setSelectedTeamBadgeUrl] = useState("");

  const isFantasyTeamFull = () => {
    return fantasyPlayers.length === 11;
  };
  useEffect(() => {
    fetchTeams();
    fetchPlayersByTeamId(1);
    fetchFantasyTeam();
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

  const fetchFantasyTeam = async () => {
    console.log(email);
    try {
      const response = await getTeams("applicationuser/getplayerids", email);
      const playerIDs = response.data.split(",");
      const playerObjects = await Promise.all(
        playerIDs.map(async (playerID) => {
          const playerResponse = await get(`player/${playerID}`);
          return playerResponse.data;
        })
      );
      console.log(playerObjects);
      dispatch(setFantasyPlayers(playerObjects));
    } catch (error) {
      console.error("Failed to fetch fantasy team:", error);
    }
  };

  const resetFantasyTeam = async () => {
    console.log(email);
    try {
      await remove("applicationuser", email);
      console.log("Team successfully deleted");
      alert("Team successfully reset");
      window.location.reload();
    } catch (error) {
      console.error("Fantasy Team could not be reset", error);
    }
  };

  const handleAddPlayer = async (e) => {
    if (!selectedPlayerToAdd) {
      alert("Please select a player first.");
      return;
    }
    if (isFantasyTeamFull()) {
      alert("You cannot add more than 11 players");
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
    const playerIDs = fantasyPlayers.map((player) => player.playerId);
    const playerIDsString = playerIDs.join(",");
    try {
      e.preventDefault();
      console.log(e);
      const body = {
        Email: email,
        PlayerIDs: playerIDsString,
      };

      console.log(body);
      const response = await post("applicationuser/addplayers", body);
      console.log("Team added successfully:", response.data);
      alert("Team added successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(
          "You already have a fantasy team. Please reset it to create a new one."
        );
      }
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
          <p className="mb-3">Select your team and start building</p>
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
                className="mt-3 img-fluid"
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
          <div className="col-md-8">
            <h3>Starting Eleven</h3>
            <ul className="list-group">
              {fantasyPlayers.map((teamPlayer) => (
                <li
                  key={teamPlayer.playerId}
                  onClick={() => handleFantasyPlayerSelect(teamPlayer)}
                  className={
                    "list-group-item " +
                    (selectedPlayerToRemove &&
                    selectedPlayerToRemove.playerId === teamPlayer.playerId
                      ? "list-group-item-danger"
                      : "")
                  }
                >
                  {teamPlayer.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <button
            key={
              selectedPlayerToAdd ? selectedPlayerToAdd.playerId : "no-player"
            }
            className="btn btn-success me-2"
            style={{
              backgroundColor: isPlayerSelectedForButton(selectedPlayerToAdd)
                ? "lightblue"
                : "black",
            }}
            onClick={handleAddPlayer}
            disabled={
              isPlayerSelected(selectedPlayerToAdd) || isFantasyTeamFull()
            }
          >
            Add Player
          </button>

          <button
            className="btn btn-danger me-2"
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

          <button
            className="btn btn-primary me-2"
            style={{
              backgroundColor: isFantasyTeamFull() ? "lightblue" : "black",
            }}
            onClick={SavePlayersToDb}
            disabled={!isFantasyTeamFull()}
          >
            Save Team
          </button>

          <button className="btn btn-warning" onClick={resetFantasyTeam}>
            Reset Team
          </button>
        </div>
      </div>
    </AuthCheck>
  );
};
export default TeamList;
