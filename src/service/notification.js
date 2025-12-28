import api from "./api";

export const getNotifications = () => api.get("/notifications");

export const markNotificationAsRead = (id) =>
  api.put(`/notifications/${id}/read`);
