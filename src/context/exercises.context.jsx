import axios from "axios";
import React, { useEffect, useState } from "react";

const ExercisesContext = React.createContext();

const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/exercises");
        setExercises(response.data);
      } catch (error) {
        console.log("error fetching exercises", error);
      } finally {
        setLoading(false);
      }
    };
    getExercises();
  }, []);

  return (
    <ExercisesContext.Provider value={{ exercises, loading }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export { ExercisesContext, ExercisesProvider };
