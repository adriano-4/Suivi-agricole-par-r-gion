import api from "./api";

export const getAllFormationsView = async () => {
  try {
    const response = await api.get("/formationsview");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des formations :", error);
    throw error;
  }
};


export const getFormationsByRegion = async (nomReg) => {
  try {
    const response = await api.get("/formationsview", {
      params: { nomReg: nomReg },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur :", error);
  }
};
