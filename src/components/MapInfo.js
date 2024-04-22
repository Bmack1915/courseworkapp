import React, { useState, useEffect } from "react";
import axios from "axios";
import StadiumMap from "./StadiumMap";
import { API_BASE_URL } from "../apiConfig"; // Confirm this path is correct

const MapInfo = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

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

  return (
    <div>
      <h1 className="header-title"> Team Information</h1>
      <h2>Select a team to see more information</h2>
      <div className="container">
        <div className="tab-container overflow-auto">
          {teams.map((team) => (
            <button
              key={team.teamId}
              onClick={() => setSelectedTeam(team)}
              className={`btn ${
                selectedTeam && selectedTeam.teamId === team.teamId
                  ? "btn-dark"
                  : "btn-light"
              } m-1 flex-fill`}
            >
              {team.name}
            </button>
          ))}
        </div>

        <div className="d-flex w-100 justify-content-between">
          <div className="team-info w-50">
            {selectedTeam && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "50px",
                  }}
                >
                  <img
                    src={`team-badges/${selectedTeam.badgeURL}`}
                    alt="Team Badge"
                    style={{
                      marginTop: "20px",
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <h1>{selectedTeam.name}</h1>
                </div>

                <p className="pt-3">
                  {selectedTeam.description || "No description available."}
                </p>
              </>
            )}
          </div>
          <div className="map-container w-50">
            {selectedTeam && (
              <StadiumMap
                key={`${selectedTeam.lat}-${selectedTeam.lng}`}
                lat={selectedTeam.lat}
                lng={selectedTeam.lng}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInfo;
