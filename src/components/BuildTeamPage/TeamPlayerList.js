// TeamPlayerList.js
import React from "react";
import { addPlayer } from "../../redux/fantasyTeamSlice";
import { useState } from "react";

const TeamPlayerList = ({ teamPlayers, fantasyPlayers, dispatch }) => {
  const [selectedPlayerToAdd, setSelectedPlayerToAdd] = useState(null);
  const handlePlayerSelect = (player) => {
    if (!fantasyPlayers.includes(player)) {
      dispatch(addPlayer(player));
    }
  };

  const isPlayerSelectedForButton = (player) => {
    return fantasyPlayers.includes(player);
  };

  return (
    <div>
      <ul id="player-list">
        {teamPlayers.map((teamPlayer) => (
          <li
            key={teamPlayer.PlayerId}
            onClick={() => handlePlayerSelect(teamPlayer)}
            className={isPlayerSelectedForButton(teamPlayer) ? "selected" : ""}
          >
            {teamPlayer.name}
          </li>
        ))}
      </ul>
      <button
        key={selectedPlayerToAdd ? selectedPlayerToAdd.playerId : "no-player"}
        className="btn btn-success"
        style={{
          backgroundColor: isPlayerSelectedForButton(selectedPlayerToAdd)
            ? "lightblue"
            : "black",
        }}
        onClick={() => handlePlayerSelect(selectedPlayerToAdd)}
        disabled={isPlayerSelectedForButton(selectedPlayerToAdd)}
      >
        Add Player
      </button>
    </div>
  );
};

export default TeamPlayerList;
