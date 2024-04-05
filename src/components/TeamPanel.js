import React from "react";
import "../App.css";

const teams = [
  { name: "Arsenal", badgeUrl: "/team-badges/arsenal.png" },
  { name: "Aston Villa", badgeUrl: "/team-badges/villa.png" },
  { name: "Brentford", badgeUrl: "/team-badges/brentford.png" },
  { name: "Brighton & Hove Albion", badgeUrl: "/team-badges/brighton.png" },
  { name: "Burnley", badgeUrl: "/team-badges/burnley.png" },
  { name: "Chelsea", badgeUrl: "/team-badges/chelsea.png" },
  { name: "Crystal Palace", badgeUrl: "/team-badges/palace.png" },
  { name: "Everton", badgeUrl: "/team-badges/everton.png" },
  { name: "Fulham", badgeUrl: "/team-badges/fulham.png" },
  { name: "Leeds United", badgeUrl: "/team-badges/leeds-united.png" },
  { name: "Liverpool", badgeUrl: "/team-badges/liverpool.png" },
  { name: "Manchester City", badgeUrl: "/team-badges/city.png" },
  { name: "Manchester United", badgeUrl: "/team-badges/utd.png" },
  { name: "Newcastle United", badgeUrl: "/team-badges/newcastle.png" },
  { name: "Sheffield United", badgeUrl: "/team-badges/sheffield.png" },
  { name: "Southampton", badgeUrl: "/team-badges/southampton.png" },
  { name: "Tottenham Hotspur", badgeUrl: "/team-badges/spurs.png" },
  { name: "West Ham United", badgeUrl: "/team-badges/westham.png" },
  { name: "Wolverhampton Wanderers", badgeUrl: "/team-badges/wolves.png" },
];

const TeamPanel = () => {
  return (
    <div className="team-grid">
      {teams.map((team) => (
        <div key={team.name} className="team-panel">
          <img src={team.badgeUrl} className="team-badge" />
          <div className="team-name">{team.name}</div>
        </div>
      ))}
    </div>
  );
};

export default TeamPanel;
