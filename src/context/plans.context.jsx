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
        const response = await axios.get("http://localhost:5005/api/plans");
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
      const storedToken = localStorage.getItem("authToken")
    try {
      const response = await axios.get(`http://localhost:5005/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      return response.data;
    }
    catch (error) {
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
        const response = await axios.post("http://localhost:5005/api/plans", planData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setPlans((prevPlans) => [...prevPlans, response.data]); 
        console.log("Plan created:", response.data);
      } catch (error) {
        console.log("Error creating plan:", error);
        setError("Failed to create plan.");
      }
    };

    const deletePlan = async (planId) => {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        setError("User is not authenticated");
        return;
      }

      try {
        const response = await axios.delete(`http://localhost:5005/api/plans/${planId}`, {
          headers: { Authorization: `Bearer ${storedToken}`}
        })
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id === planId));
      console.log(response.data.message)
      }
      catch (error) {
        console.log(error, "error deleting plan");
      }

      }
    
  

  return (
    <PlansContext.Provider value={{ plans, loading, getPlanById, deletePlan, createPlan }}>
      {children}
    </PlansContext.Provider>
  );
};

export { PlansContext, PlansProvider };
