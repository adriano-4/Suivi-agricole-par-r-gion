import api from "./api";

export const getAllBeneficiaires = async () => {
  const response = await api.get(`/beneficiairesIntrantsView`);
  return response.data;
};

export const getBeneficiairesByRegion = async (region) => {
  const response = await api.get(`/beneficiairesIntrantsView/region/${region}`);
  return response.data;
};
