import axios from "axios";
import React, { useEffect, useState } from "react";

const ExercisesContext = React.createContext();

const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [plans, setPlans] = useState([]); // Manage plans as well
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/exercises`);
        setExercises(response.data);
      } catch (error) {
        console.log("Error fetching exercises:", error);
        setError("Failed to fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    const getPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/plans");
        console.log("Fetched plans:", response.data);
        setPlans(response.data);
      } catch (error) {
        console.log("Error fetching plans:", error);
        setError("Failed to fetch plans.");
      }
    };

    getExercises();
    getPlans();
  }, []);

  const createExercise = async (exerciseData) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("User is not authenticated.");
      return null;
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
      return response.data;
    } catch (error) {
      setError("Failed to create exercise.");
      return;
    }
  };

  const assignExerciseToPlan = async (exerciseId, planId, repetitions) => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5005/api/plans/${planId}`,
        { exerciseId: exerciseId, repetitions: repetitions },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log("Exercise assigned to plan:", response.data);

      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === planId
            ? { ...plan, exercises: [...plan.exercises, response.data] }
            : plan
        )
      );
    } catch (error) {
      console.error("Error assigning exercise to plan:", error);
      setError("Failed to assign exercise to the plan.");
    }
  };

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        plans,
        loading,
        createExercise,
        assignExerciseToPlan,
        error,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export { ExercisesContext, ExercisesProvider };
