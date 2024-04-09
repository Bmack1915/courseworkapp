import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

const useFetchTeams = (API_BASE_URL) => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}team`);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError(error);
      }
    };

    fetchTeams();
  }, [API_BASE_URL]);

  return { teams, error };
};

export default useFetchTeams;
