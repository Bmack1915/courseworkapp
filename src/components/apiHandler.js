import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const get = async (endpoint) => {
  return await axios.get(`${API_BASE_URL}${endpoint}`);
};

export const getTeams = async (endpoint, email) => {
  return await axios.get(
    `${API_BASE_URL}${endpoint}?email=${encodeURIComponent(email)}`
  );
};

export const post = async (endpoint, data) => {
  return await axios.post(`${API_BASE_URL}${endpoint}`, data);
};

export const put = async (endpoint, data) => {
  return await axios.put(`${API_BASE_URL}${endpoint}`, data);
};

export const remove = async (endpoint, email) => {
  return await axios.delete(
    `${API_BASE_URL}${endpoint}?email=${encodeURIComponent(email)}`
  );
};
