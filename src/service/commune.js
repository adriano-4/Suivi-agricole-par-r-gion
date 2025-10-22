import api from "./api"; // ton instance Axios pré-configurée

// Récupérer toutes les communes
export const getAllCommunes = async () => {
  try {
    const response = await api.get("/communes");
    return response.data || []; // retourne un tableau vide si aucune donnée
  } catch (error) {
    console.error("Erreur lors de la récupération des communes :", error);
    throw error;
  }
};

// Récupérer les communes d'un district
export const getCommunesByDistrict = async (districtId) => {
  try {
    const response = await api.get(`/communes/district/${districtId}`);
    return response.data || []; // tableau vide si aucune commune
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des communes pour le district ${districtId} :`,
      error
    );
    throw error;
  }
};

// Ajouter une commune
export const addCommune = async (districtId, communeData) => {
  try {
    const response = await api.post(
      `/communes/district/${districtId}`,
      communeData
    );

    if (response && response.data) {
      console.log("Commune ajoutée avec succès :", response.data);

      const idComm = response.data.idComm;
      const nomComm = response.data.nomComm;
      const nomDist = response.data.district?.nomDist;
      const nomReg = response.data.district?.region?.nomReg;

      return response.data;
    } else {
      console.warn("Aucune donnée reçue après l'ajout de la commune");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la commune :", error);
    throw error;
  }
};

export const deleteCommune = async (communeId) => {
  try {
    await api.delete(`/communes/${communeId}`);
    console.log(`Commune ${communeId} supprimée avec succès`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la commune :", error);
    throw error;
  }
};

export const updateCommune = async (communeId, communeData) => {
  try {
    const response = await api.put(`/communes/${communeId}`, communeData);
    console.log(
      `Commune ${communeId} mise à jour avec succès :`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la commune ${communeId} :`,
      error
    );
    throw error;
  }
};
