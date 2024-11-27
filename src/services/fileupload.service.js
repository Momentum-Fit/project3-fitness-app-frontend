import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5005",
  withCredentials: true,
});

const errorHandler = (err) => {
  console.log("API error", err);
  throw err;
};

export const uploadImage = async (file) => {
  try {
    const res = await api.post("/auth/upload", file);
    return res.data;
  } catch (err) {
    return errorHandler(err);
  }
};

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem("authToken");
    if(!token) {
        throw new Error("No auth token found.")
    }

    const res = await api.put(`/auth/users/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    return errorHandler(err);
  }
};
