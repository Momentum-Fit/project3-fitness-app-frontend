import axios from "axios";
import React, { useEffect, useState } from "react";

const PlansContext = React.createContext();

const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plans`);
        setPlans(response.data);
      } catch (error) {
        console.log("error fetching plans", error);
      } finally {
        setLoading(false);
      }
    };
    getPlans();
  }, []);

  const getPlanById = async (planId) => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/plans/${planId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error fetching specified plan");
    }
  };

  const createPlan = async (planData) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/plans`,
        planData,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setPlans((prevPlans) => [...prevPlans, response.data]);
    } catch (error) {
      console.log("Error creating plan:", error);
      setError("Failed to create plan.");
    }
  };

  const updatePlan = async (updatedPlan) => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/plans/${updatedPlan._id}`,
        updatedPlan,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === updatedPlan._id ? response.data : plan
        )
      );
    } catch (error) {
      console.error("Error updating plan:", error);
      setError("Failed to update plan.");
    }
  };

  const deletePlan = async (planId) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("User is not authenticated");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/plans/${planId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));
    } catch (error) {
      console.log(error, "error deleting plan");
    }
  };

  return (
    <PlansContext.Provider
      value={{
        plans,
        loading,
        updatePlan,
        getPlanById,
        deletePlan,
        createPlan,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};

export { PlansContext, PlansProvider };
