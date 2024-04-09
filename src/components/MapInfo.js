import React, { useState, useEffect } from "react";
import axios from "axios";
import StadiumMap from "./StadiumMap";
import { API_BASE_URL } from "../apiConfig";

const MapInfo = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}team`);
      console.log("Teams data:", response.data);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  return (
    <div>
      <h1>Team Maps</h1>
      <div className="tab-container">
        {teams.map((team) => (
          <button
            key={team.teamId}
            onClick={() => setSelectedTeam(team)}
            style={{
              cursor: "pointer",
              padding: "10px 20px",
              margin: "0 5px",
              background:
                selectedTeam && selectedTeam.teamId === team.teamId
                  ? "navy"
                  : "gray",
              color: "white",
              border: "none",
              borderBottom:
                selectedTeam && selectedTeam.teamId === team.teamId
                  ? "3px solid blue"
                  : "3px solid transparent",
            }}
          >
            {team.name}
          </button>
        ))}
      </div>
      {selectedTeam && (
        <StadiumMap lat={selectedTeam.lat} lng={selectedTeam.lng} />
      )}
    </div>
  );
};

export default MapInfo;
