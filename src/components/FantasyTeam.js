import React from "react";
import "../App.css";
import { API_BASE_URL } from "../apiConfig";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "./apiHandler";

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);
