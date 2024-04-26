import React from "react";
import "../../App.css";
import { useState } from "react";
import { useEffect } from "react";
import { post, remove, put } from "../apiHandler";
import AuthCheck from "../AuthCheck";
import { useSelector, useDispatch } from "react-redux";
import { addPlayer, removePlayer } from "../../redux/fantasyTeamSlice";
import SocialMedia from "../SocialMedia";
import TeamPlayerList from "./TeamPlayerList";
import FantasyPlayerList from "./FantasyPlayerList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuildTeam = () => {
  const dispatch = useDispatch();
  //Storing state in store, not the component so it can be used in other components
  const fantasyPlayers = useSelector((state) => state.fantasyTeam.players);
  const selectedPlayerToAdd = useSelector(
    (state) => state.fantasyTeam.selectedPlayerToAdd
  );
  const selectedPlayerToRemove = useSelector(
    (state) => state.fantasyTeam.selectedPlayerToRemove
  );
  const email = useSelector((state) => state.email.value);

  const isFantasyTeamFull = () => {
    return fantasyPlayers.length === 11;
  };

  const isPlayerSelected = (selectedPlayer) => {
    return selectedPlayer && fantasyPlayers.includes(selectedPlayer);
  };

  const isPlayerSelectedForButton = (selectedPlayer) => selectedPlayer;

  const isFantasyPlayerSelected = (selectedPlayer) => {
    return selectedPlayer && fantasyPlayers.includes(selectedPlayer);
  };

  // const getFantasyPlayer = async();

  const resetFantasyTeam = async () => {
    try {
      await remove("applicationuser", email);
      console.log("Team successfully deleted");
      toast("Team successfully reset");
      window.location.reload();
    } catch (error) {
      console.error("Fantasy Team could not be reset", error);
    }
  };

  const handleAddPlayer = async (e) => {
    if (!selectedPlayerToAdd) {
      toast("Please select a player first.");
      return;
    }
    if (isFantasyTeamFull()) {
      toast("You cannot add more than 11 players");
      return;
    }
    dispatch(addPlayer(selectedPlayerToAdd));
  };

  const handleRemovePlayer = async (e) => {
    if (!selectedPlayerToRemove) {
      toast("Please select a player first.");
      return;
    }
    dispatch(removePlayer(selectedPlayerToRemove));
  };

  //If fantasy team not null, put methdo called to edit the team. If null use post to "create" the team for the first time.
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
      toast("Team added successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast(
          "You already have a fantasy team. Please reset it to create a new one."
        );
        console.log(error.response);
      }
    }
  };

  const [currentImage, setCurrentImage] = useState(
    "/images_other/tottenham.png"
  );
  const img_array = [
    "/images_other/kop.png",
    "/images_other/stretford.png",
    "/images_other/tottenham.png",
    "/images_other/cardiff.png",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % img_array.length;
      setCurrentImage(img_array[index]);
    }, 8000);

    return () => {
      clearInterval(interval);
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

      <div className="bg-light py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="text-primary mb-4">Build Your Team</h2>
              <div className="d-flex align-items-start mb-3">
                <img
                  src="/images_other/arrowblue.jpeg"
                  alt="Instructions"
                  className="img-fluid me-3"
                  style={{ width: "40px" }}
                />
                <p>
                  Choose your favourite Premier League team from the dropdown to
                  load players.
                </p>
              </div>
              <div className="d-flex align-items-start mb-3">
                <img
                  src="/images_other/arrowblue.jpeg"
                  alt="Select"
                  className="img-fluid me-3"
                  style={{ width: "40px" }}
                />
                <p>Add eleven players to your team.</p>
              </div>
              <div className="d-flex align-items-start mb-3">
                <img
                  src="/images_other/arrowblue.jpeg"
                  alt="Save"
                  className="img-fluid me-3"
                  style={{ width: "40px" }}
                />
                <p>Don't forget to save your selection after making changes.</p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/images_other/pogba.png"
                alt="Blank Starting Eleven"
                className="img-fluid"
                style={{
                  maxHeight: "300px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark" style={{ width: "100%" }}>
        <div className="container bg-dark">
          <div className="row"></div>
          <div className="row">
            <TeamPlayerList />
            <FantasyPlayerList />
          </div>
          <div className="mt-3">
            <button
              key={
                selectedPlayerToAdd ? selectedPlayerToAdd.playerId : "no-player"
              }
              className="btn btn-success me-2"
              style={{
                backgroundColor: isPlayerSelectedForButton(selectedPlayerToAdd)
                  ? "green"
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
                  ? "red"
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
                backgroundColor: isFantasyTeamFull() ? "blue" : "black",
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
      <SocialMedia />
    </AuthCheck>
  );
};
export default BuildTeam;
