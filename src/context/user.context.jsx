import { createContext, useState, useEffect } from "react";
import { api } from "../services/fileupload.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
      if(!token) {
        throw new Error("No auth token found.")
    }

        const res = await api.get("/auth/me", {
          headers: {Authorization: `Bearer ${token}`}
        }); 
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUserProfile = async (updatedData) => {
    const token = localStorage.getItem("authToken");
      if(!token) {
        throw new Error("No auth token found.")
    }
    try {
      const res = await api.put(`/auth/users`, updatedData, {
        headers: {Authorization: `Bearer ${token}`}
      });
      setUser(res.data); 
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
