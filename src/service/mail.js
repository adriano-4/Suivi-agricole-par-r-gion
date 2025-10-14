import api from "./api";

export const sendMail = async (email, file) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    const response = await api.post("/send-mail", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ E-mail envoyé :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de l’envoi d’e-mail :", error);
    throw error;
  }
};
