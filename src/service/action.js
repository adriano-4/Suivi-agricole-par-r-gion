import api from "./api";

export const getActions = async (idFormation) => {
  try {
    const response = await api.get(`/formations/actions/${idFormation}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des appartenances :", error);
    throw error;
  }
};

export const updateActionDate = async (idAction, data) => {
  try {
    const response = await api.put(`/formations/actions/${idAction}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'action :", error);
    throw error;
  }
};
