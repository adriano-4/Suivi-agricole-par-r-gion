import api from "./api";

export const createFormation = async (formationData) => {
  try {
    const response = await api.post("/formations", formationData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la formation :", error);
    throw error;
  }
};
