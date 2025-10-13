import api from "./api";

export const getAllRegions = async () => {
  try {
    const response = await api.get("/regions");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des régions :", error);
    throw error;
  }
};

export const addRegion = async (nomReg, idRegRef) => {
  try {
    const response = await api.post("/regions", { nomReg, idRegRef });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la région :", error);
    throw error;
  }
};
