// fichier : service/vulgarisation.js
import api from "./api";

const API_URL = "/vulgarisation";

export const updateVulg = async (id, data) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la vulgarisation :", error);
    throw error;
  }
};
