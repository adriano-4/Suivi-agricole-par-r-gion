import api from "./api";

export const getAllDistricts = async () => {
  try {
    const response = await api.get("/districts");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des districts :", error);
    throw error;
  }
};

export const getDistrictsByRegion = async (regionId) => {
  try {
    const response = await api.get(`/districts/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des districts pour la région ${regionId} :`,
      error
    );
    throw error;
  }
};

export const addDistrict = async (regionId, districtData) => {
  try {
    const response = await api.post(
      `/districts/region/${regionId}`,
      districtData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du district :", error);
    throw error;
  }
};

export const deleteDistrict = async (districtId) => {
  try {
    await api.delete(`/districts/${districtId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du district :", error);
    throw error;
  }
};
