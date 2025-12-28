import api from "./api";

export const getObjectifs = async () => {
  try {
    const response = await api.get("/objectifs");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des objectifs :", error);
    throw error;
  }
};

export const updateObjectifQuantite = async (idObjectif, quantiteObj) => {
  try {
    const response = await api.put(`/objectifs/${idObjectif}`, {
      quantiteObj,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la quantité de l'objectif :",
      error
    );
    throw error;
  }
};
