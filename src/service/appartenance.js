import api from "./api";

export const getAppartenances = async () => {
  try {
    const response = await api.get("/appartenances");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des appartenances :", error);
    throw error;
  }
};
export const getAppartenancesByFokontany = async (fokontanyId) => {
  try {
    const response = await api.get(`/appartenances/fokontany/${fokontanyId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des appartenances du fokontany :",
      error
    );
    throw error;
  }
};

export const addAppartenance = async (fokontanyId, appartenanceData) => {
  try {
    const response = await api.post(
      `/appartenances/fokontany/${fokontanyId}`,
      appartenanceData
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'appartenance :", error);
    throw error;
  }
};

export const getAppartenancesByRegion = async (regionId) => {
  try {
    const response = await api.get(`/appartenances/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des appartenances de la région :",
      error
    );
    throw error;
  }
};
