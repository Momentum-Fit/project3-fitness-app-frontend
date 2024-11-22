import axios from "axios";
import React, { useEffect, useState } from "react";

const PlansContext = React.createContext();

const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState();
  const [loading, setLoading] = useState(true);

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
  

  return (
    <PlansContext.Provider value={{ plans, loading, getPlanById }}>
      {children}
    </PlansContext.Provider>
  );
};

export { PlansContext, PlansProvider };
