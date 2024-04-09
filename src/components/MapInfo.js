// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import TeamList from "./TeamList";
// import axios from "axios";
// import { useEffect } from "react";

// // Define the map container style
// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

// // Google Maps API Key
// const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key

// const MapInfo = () => {
//   const [teams, setTeams] = useState([]);

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const fetchTeams = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}team`);
//       console.log("Teams data:", response.data);
//       setTeams(response.data);
//     } catch (error) {
//       console.error("Error fetching teams:", error);
//     }
//   };
//   const [selectedTeam, setSelectedTeam] = useState(teams[0]);

//   return (
//     <div className="map-info">
//       <div className="tabs">
//         {teams.map((team, index) => (
//           <Link
//             key={index}
//             to={`/team/${team.name}`}
//             className="tab"
//             onClick={() => setSelectedTeam(team)}
//           >
//             {team.name}
//           </Link>
//         ))}
//       </div>

//       <Routes>
//         {teams.map((team, index) => (
//           <Route
//             key={index}
//             path={`/team/${team.name}`}
//             element={
//               <div className="team-info">
//                 <h2>{team.name}</h2>
//                 <LoadScript googleMapsApiKey={apiKey}>
//                   <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={{ lat: team.lat, lng: team.lng }}
//                     zoom={10}
//                   >
//                     <Marker position={{ lat: team.lat, lng: team.lng }} />
//                   </GoogleMap>
//                 </LoadScript>
//               </div>
//             }
//           />
//         ))}
//       </Routes>
//     </div>
//   );
// };

// export default MapInfo;
