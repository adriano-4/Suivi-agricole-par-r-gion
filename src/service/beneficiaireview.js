import api from "./api";

export const getAllBeneficiairesView = async () => {
  try {
    const response = await api.get("/beneficiairesview");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des bénéficiaires :", error);
    throw error;
  }
};

export const getBeneficiairesParRegion = async (nomReg) => {
  try {
    const response = await api.get("/beneficiairesview", {
      params: { nomReg: nomReg },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur :", error);
  }
};
