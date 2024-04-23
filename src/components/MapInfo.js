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
    <>
      <section class="py-5 bg-dark" id="features">
        <div class="container px-4 my-1">
          <div class="row gx-5">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h2 class="fw-bolder mb-0 text-white">Team Information</h2>
            </div>
            <div class="col-lg-8">
              <div class="row gx- row-cols-1 row-cols-md-2">
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
      </section>
      <div>
        <div className="container-flex">
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
                      flexDirection: "column", // Change to column to stack image and text vertically
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px", // Adjusted gap for better spacing in a column layout
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
                    <p className="px-5 text-center lead w-100 fs-3">
                      {selectedTeam.description || "No description available."}
                    </p>
                  </div>
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
    </>
  );
};

export default MapInfo;
