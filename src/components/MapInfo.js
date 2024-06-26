import React, { useState, useEffect } from "react";
import axios from "axios";
import StadiumMap from "./StadiumMap";
import { API_BASE_URL } from "../apiConfig";

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
      console.log(response);
      if (response.data.length > 0) {
        setSelectedTeam(response.data[0]);
      }
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  return (
    <>
      <div>
        <div className="container-flex">
          <div className="tab-container overflow-auto">
            {teams.map((team) => (
              <button
                key={team.teamId}
                onClick={() => setSelectedTeam(team)}
                className={`btn ${
                  selectedTeam && selectedTeam.teamId === team.teamId
                    ? "btn-active"
                    : "btn-light btn-hover"
                } m-1 flex-fill`}
              >
                {team.name}
              </button>
            ))}
          </div>

          <section class="py-1 bg-dark" id="features">
            <div class="container px-4 my-1">
              <div class="row gx-5">
                <div class="col-lg-12">
                  <h2 class="fw-bolder mb-0 text-white pt-3 pb-3">
                    Team Information
                  </h2>
                  <h3 class="mb-0 text-white pt-3 pb-3">
                    Click on your favourite team to find out more about the club
                    and see a map of your favourite club's stadium!
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <div className="d-flex w-100 justify-content-between pt-2 pb-5">
            <div className="team-info w-50">
              {selectedTeam && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
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
                    <h2>{selectedTeam.name}</h2>
                    <p className="px-5 text-center lead w-100 fs-4">
                      {selectedTeam.description || "No description available."}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="map-container pt-5 w-50">
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
