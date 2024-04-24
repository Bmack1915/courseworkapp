import React from "react";
import "../../App.css";
import { API_BASE_URL } from "../../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { get, post, remove, getTeams, put } from "../apiHandler";
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
    try {
      const response = await getTeams("applicationuser/getplayerids", email);
      const playerIDs = response.data.split(",");
      const playerObjects = await Promise.all(
        playerIDs.map(async (playerID) => {
          const playerResponse = await get(`player/${playerID}`);
          return playerResponse.data;
        })
      );
      dispatch(setFantasyPlayers(playerObjects));
    } catch (error) {
      console.error("Failed to fetch fantasy team:", error);
    }
  };

  // const getFantasyPlayer = async();

  const resetFantasyTeam = async () => {
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

  //If fantasy team not null, put the team. If null use post to "create" first time

  const SavePlayersToDb = async (e) => {
    const playerIDs = fantasyPlayers.map((player) => player.playerId);
    const playerIDsString = playerIDs.join(",");
    try {
      e.preventDefault();
      const body = {
        Email: email,
        PlayerIDs: playerIDsString,
      };
      console.log(fantasyPlayers);
      if (fantasyPlayers.length < 1) {
        await post("applicationuser/addplayers", body);
      } else {
        await put("applicationuser/addplayers", body);
      }
      alert("Team added successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(
          "You already have a fantasy team. Please reset it to create a new one."
        );
        console.log(error.response);
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
        setSelectedTeamBadgeUrl(`team-badges/${selectedTeam.badgeURL}`);
      } else {
        setSelectedTeamBadgeUrl("");
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

  const [currentImage, setCurrentImage] = useState("/team-badges/kop.png");
  const [playerImage, setPlayerImage] = useState("/team-badges/pogba.png");
  const img_array = [
    "/team-badges/kop.png",
    "/team-badges/stretford.png",
    "/team-badges/clockend.png",
  ];

  const player_array = ["/team-badges/pogba.png", "/team-badges/pogba.png"];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % img_array.length;
      setCurrentImage(img_array[index]);
    }, 10000);

    let index2 = 0;
    const interval2 = setInterval(() => {
      index2 = (index2 + 1) % player_array.length;
      setPlayerImage(player_array[index2]);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  return (
    <AuthCheck>
      <header
        className="bg-light py-2 pt-2"
        style={{
          backgroundImage: `url('${currentImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></header>

      <div className="bg-white text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="text-dark px-3">How to Build Your Team</h2>
              <div className="d-flex align-items-start py-2 px-3">
                <img
                  src="/team-badges/arrow.png"
                  alt="Instructions"
                  className="img-fluid me-3"
                  style={{ width: "50px" }}
                />
                <p className="text-dark">
                  Choose your favourite Premier League team from the dropdown to
                  load players.
                </p>
              </div>
              <div className="d-flex align-items-start py-2 px-3">
                <img
                  src="/team-badges/arrow.png"
                  alt="Select"
                  className="img-fluid me-3"
                  style={{ width: "50px" }}
                />
                <p className="text-dark">Add eleven players to your team.</p>
              </div>
              <div className="d-flex align-items-start py-2 px-3">
                <img
                  src="/team-badges/arrow.png"
                  alt="Save"
                  className="img-fluid me-3"
                  style={{ width: "50px" }}
                />
                <p className="text-dark">
                  Don't forget to save your selection after making changes.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src={`${playerImage}`}
                alt="Blank Starting Eleven"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark" style={{ width: "100%" }}>
        <div className="container bg-dark">
          <div className="row"></div>
          <div className="row">
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
            <div className="col-md-8 pt-5 ">
              <h1 className="text-white pb-5 pt-5">Starting Eleven</h1>
              <ul className="list-group pt-3">
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
      </div>
    </AuthCheck>
  );
};
export default TeamList;

{
  /* <section class="py-5 bg-dark mb-4" id="features">
        <div class="container px-4 my-1">
          <div class="row gx-5">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h2 class="fw-bolder mb-0 text-white">Team Information</h2>
            </div>
            <div class="col-lg-8">
              <div class="row gx-5 row-cols-1 row-cols-md-2">
                <div class="col mb-5 h-100">
                  <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-collection"></i>
                  </div>
                  <h2 class="h5 text-white">About the Club</h2>
                  <p class="mb-0 text-white">
                    Click on your favourite team to find out more!
                  </p>
                </div>
                <div class="col mb-5 h-100">
                  <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-toggles2"></i>
                  </div>
                  <h2 class="h5 text-white">Team Stadium</h2>
                  <p class="mb-0 text-white">
                    Click to see a map of your favourite clubs stadium!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */
}
