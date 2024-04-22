// FantasyPlayerList.js
import React from "react";
import { removePlayer } from "../../redux/fantasyTeamSlice";
import { useState } from "react";
const FantasyPlayerList = ({ fantasyPlayers, dispatch }) => {
  const [selectedPlayerToRemove, setSelectedPlayerToRemove] = useState(null);
  const handleFantasyPlayerSelect = (player) => {
    if (fantasyPlayers.includes(player)) {
      dispatch(removePlayer(player));
    }
  };

  const isFantasyPlayerSelected = (player) => {
    return fantasyPlayers.includes(player);
  };

  return (
    <div>
      <h3>Starting Eleven</h3>
      <ul>
        {fantasyPlayers.map((player) => (
          <li
            key={player.playerId}
            onClick={() => handleFantasyPlayerSelect(player)}
            className="player-list-item"
          >
            {player.name}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-success"
        style={{
          backgroundColor: isFantasyPlayerSelected(selectedPlayerToRemove)
            ? "lightblue"
            : "black",
        }}
        onClick={() => handleFantasyPlayerSelect(selectedPlayerToRemove)}
        disabled={!isFantasyPlayerSelected(selectedPlayerToRemove)}
      >
        Remove Player
      </button>
    </div>
  );
};

export default FantasyPlayerList;
