import axios from "axios";
import React, { useEffect, useState } from "react";

const ExercisesContext = React.createContext();

const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/exercises`);
        setExercises(response.data);
      } catch (error) {
        console.log("error fetching exercises", error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };
    getExercises();
  }, []);

  const createExercise = async (exerciseData) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/exercises`,
        exerciseData,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setExercises((prevExercises) => [...prevExercises, response.data]);
    } catch (error) {
      setError("Failed to create exercise.");
    }
  };

  return (
    <ExercisesContext.Provider value={{ exercises, loading, createExercise }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export { ExercisesContext, ExercisesProvider };
