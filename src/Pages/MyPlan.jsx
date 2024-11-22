import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PlansContext } from "../context/plans.context";
import axios from "axios";

function MyPlan() {
  const { planId } = useParams();
  const { getPlanById, loading } = useContext(PlansContext);
  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getPlan = async () => {
      const storedToken = localStorage.getItem("authToken");
      try {
        const fetchedPlan = await getPlanById(planId);
        setPlan(fetchedPlan);
        const exerciseDetails = await Promise.all(
          fetchedPlan.exercises.map(async (exercise) => {
            const response = await axios.get(
              `http://localhost:5005/api/exercises/${exercise.exerciseId}`,
              {
                headers: { Authorization: `Bearer ${storedToken}` },
              }
            );
            return { ...exercise, details: response.data };
          })
        );
        setExercises(exerciseDetails);
      } catch (error) {
        console.error("Error fetching specific plan:", error);
      } finally {
        setPlanLoading(false);
      }
    };

    getPlan();
  }, [planId, getPlanById]);

  if (loading || planLoading)
    return <div className="text-center">Loading...</div>;

  if (!plan) return <div className="text-center">Plan not found!</div>;

  return (
    <div>
      <p>Name: {plan.name}</p>
      <p>Description: {plan.description}</p>
      <p>Category: {plan.category}</p>
      <p>Length: {plan.length}</p>
      <div>
        <h3>Exercises:</h3>
        {exercises?.map((exercise) => (
          <div key={exercise._id}>
            <p>Name: {exercise.details?.name}</p>
            <p>Description: {exercise.details?.description}</p>
            <p>Repetitions: {exercise.repetitions}</p>
            <p>Category: {exercise.details?.category}</p>
            <p>Difficulty: {exercise.details?.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPlan;
