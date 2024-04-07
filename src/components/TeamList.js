import React from "react";
import "../App.css";
import { Navbar } from "./Navbar";
import { API_BASE_URL } from "../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [selectedPlayerId, setSelectedPlayerId] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);
    
    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}team`);
            console.log("Teams fetched:", response.data);
            setTeams(response.data);
        } catch (error) {
            console.error('Axios error fetching teams:', error);
        }
    };
    
    const fetchPlayersByTeamId = async (teamId) => {
        try {
            // Construct the URL with the teamId as a query parameter
            const url = `${API_BASE_URL}player?teamId=${teamId}`;
            const response = await axios.get(url);
            setPlayers(response.data);  // Update the players state with the fetched data
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handleTeamChange = (event) => {
        const teamId = event.target.value;
        setSelectedTeamId(teamId);
        if (teamId) {
            fetchPlayersByTeamId(teamId);  // Fetch players for the selected team
        } else {
            setPlayers([]);  // Clear the players list if no team is selected
        }
    };

    const handlePlayerSelect = (playerId) => {
        setSelectedPlayerId(playerId);
        console.log("player selected")
    };
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <select id="team-select" className="form-control" onChange={handleTeamChange} value={selectedTeamId}>
                        <option value="">Select a Premier League Team</option>
                        {teams.map(team => (
                            <option key={team.teamId} value={team.teamId}>{team.name}</option>
                        ))}
                    </select>
                    <ul id="player-list">
                        {players.map(player => (
                            <li key={player.PlayerId} 
                                onClick={() => handlePlayerSelect(player.playerId)}
                                className={selectedPlayerId === player.playerId ? "selected" : ""}>
                                {player.name}
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-md-8">
                    <h3>Starting Eleven</h3>
                    <ul id="starting-eleven">
                        {/* Future enhancement to add starting eleven players */}
                    </ul>
                </div>
            </div>
        </div>
    );
    
    
};
export default TeamList;
