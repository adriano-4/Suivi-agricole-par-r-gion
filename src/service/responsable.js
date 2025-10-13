import api from "./api";

// ------------------ Superviseurs ------------------
export const getSuperviseurs = () => api.get("/superviseurs");
export const getSuperviseur = (id) => api.get(`/superviseurs/${id}`);
export const createSuperviseur = (data) => api.post("/superviseurs", data);
export const updateSuperviseur = (id, data) =>
  api.put(`/superviseurs/${id}`, data);
export const deleteSuperviseur = (id) => api.delete(`/superviseurs/${id}`);

// ------------------ Techniciens ------------------
export const getTechniciens = () => api.get("/techniciens");
export const getTechnicien = (id) => api.get(`/techniciens/${id}`);
export const createTechnicien = (data) => api.post("/techniciens", data);
export const updateTechnicien = (id, data) =>
  api.put(`/techniciens/${id}`, data);
export const deleteTechnicien = (id) => api.delete(`/techniciens/${id}`);

// ------------------ Responsables Magasin ------------------
export const getResponsables = () => api.get("/responsables");
export const getResponsable = (id) => api.get(`/responsables/${id}`);
export const createResponsable = (data) => api.post("/responsables", data);
export const updateResponsable = (id, data) =>
  api.put(`/responsables/${id}`, data);
export const deleteResponsable = (id) => api.delete(`/responsables/${id}`);
