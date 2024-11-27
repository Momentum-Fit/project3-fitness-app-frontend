import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/exercises`)
      .then((response) => {
        const reverseNewResponse = response.data.reverse();
        setExercises(reverseNewResponse);
      })
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);
  return (
    <div>
      {exercises &&
        exercises.map((exercise) => {
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
    </div>
  );
}

export default ExercisesList;
