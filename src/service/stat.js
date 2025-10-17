import api from "./api";

const API_URL = "/statistiques";

export const getAllStats = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des statistiques :", error);
    throw error;
  }
};

export const getStatByRegion = async (region) => {
  try {
    const response = await api.get(`${API_URL}/${region}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors du chargement des statistiques pour la région ${region} :`,
      error
    );
    throw error;
  }
};
