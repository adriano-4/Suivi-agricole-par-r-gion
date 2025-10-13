import api from "./api";

export const getRegions = () => api.get("/regionsref").then((res) => res.data);
