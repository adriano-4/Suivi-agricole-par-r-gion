import api from "./api"; // ton instance Axios pré-configurée

// Récupérer tous les fokontany
export const getAllFokontany = async () => {
  try {
    const response = await api.get("/fokontany");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des fokontany :", error);
    throw error;
  }
};

// Récupérer les fokontany par commune
export const getFokontanyByCommune = async (communeId) => {
  try {
    const response = await api.get(`/fokontany/commune/${communeId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des fokontany pour la commune ${communeId} :`,
      error
    );
    throw error;
  }
};

// Ajouter un fokontany à une commune
export const addFokontany = async (communeId, fokontanyData) => {
  try {
    const response = await api.post(
      `/fokontany/commune/${communeId}`,
      fokontanyData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du fokontany :", error);
    throw error;
  }
};

// Supprimer un fokontany
export const deleteFokontany = async (fokontanyId) => {
  try {
    await api.delete(`/fokontany/${fokontanyId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du fokontany :", error);
    throw error;
  }
};
