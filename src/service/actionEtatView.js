import axios from "axios";

const API_URL = "http://localhost:8080/api/viewactionsetat";

export const getAllActionsEtat = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getActionsEtatByRegion = async (region) => {
  const response = await axios.get(`${API_URL}/region/${region}`);
  return response.data;
};

export const getActionsEtatByEtat = async (etat) => {
  const response = await axios.get(`${API_URL}/etat/${etat}`);
  return response.data;
};
