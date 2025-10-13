import api from "./api";

export const addRegionUser = async (userData) => {
  try {
    const response = await api.post("/users_region/addRegionUser", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de l'utilisateur :",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateRegionUser = async (id, userData) => {
  try {
    const response = await api.put(
      `/users_region/updateRegionUser/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'utilisateur :",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users_region/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur :",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserByRegion = async (regionId) => {
  try {
    const response = await api.get(`/users_region/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par région :",
      error.response?.data || error.message
    );
    throw error;
  }
};
