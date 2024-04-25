import React from "react";
import "../../App.css";
import { useEffect } from "react";
import { get, post, remove, getTeams, put } from "../apiHandler";
import AuthCheck from "../AuthCheck";
import { useSelector, useDispatch } from "react-redux";
import {
  setFantasyPlayers,
  setSelectedPlayerToRemove,
} from "../../redux/fantasyTeamSlice";

const FantasyPlayerList = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email.value);
  //Storing state in store, not the component so it can be used in other components
  const fantasyPlayers = useSelector((state) => state.fantasyTeam.players);
  const selectedPlayerToRemove = useSelector(
    (state) => state.fantasyTeam.selectedPlayerToRemove
  );

  useEffect(() => {
    fetchFantasyTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleFantasyPlayerSelect = (player) => {
    if (fantasyPlayers.includes(player)) {
      dispatch(setSelectedPlayerToRemove(player));
    }
  };

  return (
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
  );
};

export default FantasyPlayerList;
