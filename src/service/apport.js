import api from "./api";

const API_URL = "/apports";

export const getApportsByBeneficiaire = async (idBenef) => {
  try {
    const response = await api.get(`${API_URL}/beneficiaire/${idBenef}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des apports :", error);
    throw error;
  }
};

export const updateApport = async (idApport, data) => {
  try {
    const response = await api.put(`${API_URL}/${idApport}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l’apport :", error);
    throw error;
  }
};
