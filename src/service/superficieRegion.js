import api from "./api";

const API_URL = "/superficieRegion";

export const getAllSuperficieRegion = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors du chargement des superficies par région :",
      error
    );
    throw error;
  }
};
