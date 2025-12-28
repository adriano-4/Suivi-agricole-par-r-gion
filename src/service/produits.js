import api from "./api";

export const getIntrants = () => api.get("/intrants");
export const getIntrant = (id) => api.get(`/intrants/${id}`);
export const createIntrant = (data) =>
  api.post("/intrants", null, { params: data });
export const updateIntrant = (id, data) =>
  api.put(`/intrants/${id}`, null, { params: data });
export const deleteIntrant = (id) => api.delete(`/intrants/${id}`);

export const getAutresProduits = () => api.get("/autres-produits");
export const getAutreProduit = (id) => api.get(`/autres-produits/${id}`);
export const createAutreProduit = (data) =>
  api.post("/autres-produits", null, { params: data });
export const updateAutreProduit = (id, data) =>
  api.put(`/autres-produits/${id}`, null, { params: data });
export const deleteAutreProduit = (id) => api.delete(`/autres-produits/${id}`);

export const getIntrantsByBeneficiaire = (idBenef) =>
  api.get(`/beneficiaires/${idBenef}/intrants`);

export const updateQuantiteIntrantBeneficiaire = (
  idBenef,
  idIntrant,
  quantite
) => api.put(`/beneficiaires/${idBenef}/intrants/${idIntrant}`, { quantite });
