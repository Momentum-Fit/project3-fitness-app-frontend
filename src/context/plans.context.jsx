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

  return (
    <PlansContext.Provider value={{ plans, loading }}>
      {children}
    </PlansContext.Provider>
  );
};

export { PlansContext, PlansProvider };
