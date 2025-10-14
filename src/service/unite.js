import api from "./api";

const API_URL = "/unites";

export const getAllUnites = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des unités :", error);
    throw error;
  }
};
