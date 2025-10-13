import api from "./api";

export const getAllBeneficiaires = async () => {
  try {
    const response = await api.get("/beneficiaires");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des bénéficiaires :", error);
    throw error;
  }
};

export const addBeneficiaire = async (beneficiaireData) => {
  try {
    const response = await api.post("/beneficiaires", beneficiaireData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du bénéficiaire :", error);
    throw error;
  }
};

export const updateBeneficiaire = async (id, updateData) => {
  try {
    const response = await api.put(`/beneficiaires/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du bénéficiaire ${id} :`,
      error
    );
    throw error;
  }
};
