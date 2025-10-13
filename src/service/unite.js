import api from "./api";

const API_URL = "/unites"; // endpoint backend pour toutes les unités

// Récupérer toutes les unités
export const getAllUnites = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des unités :", error);
    throw error;
  }
};
