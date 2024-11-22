import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlansContext } from "../context/plans.context";

const API_URL = "http://localhost:5005";

function MyPlan() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        setPlan(response.data);
      })
      .catch((error) => console.error("Error fetching plan details:", error));
  }, [planId, storedToken, setPlan]);

  if (!plan) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <p>name: {plan.name}</p>
      <p>description: {plan.description}</p>
      <p> category: {plan.category}</p>
      <p>length: {plan.length}</p>
      <p>
        exercises:
        {plan &&
          plan.exercises.map((exercise) => {
            return (
              <div key={exercise._id}>
                <p>name: {exercise.name}</p>
                <p>description: {exercise.description}</p>
                <p>category: {exercise.category}</p>
                <p>difficulty: {exercise.difficulty}</p>
                <p></p>
              </div>
            );
          })}
      </p>
    </div>
  );
}
export default MyPlan;
