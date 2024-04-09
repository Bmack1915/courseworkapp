import React, { useState, useEffect } from "react";
import axios from "axios";
import StadiumMap from "./StadiumMap";

const API_BASE_URL = "https://your-api-url.com/"; // Replace with your actual base URL

const MapInfo = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}team`);
        console.log("Teams data:", response.data);
        setTeams(response.data);
        if (response.data.length > 0) {
          setSelectedTeam(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Team Maps</h1>
      <ul>
        {teams.map((team) => (
          <li
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            style={{ cursor: "pointer" }}
          >
            {team.name}
          </li>
        ))}
      </ul>
      {selectedTeam && (
        <StadiumMap lat={selectedTeam.lat} lng={selectedTeam.lng} />
      )}
    </div>
  );
};

export default MapInfo;
