import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/exercises`)
      .then((response) => {
        const reverseNewResponse = response.data.reverse();
        setExercises(reverseNewResponse);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);
  return (
    <div>
      {exercises &&
        exercises.map((exercise) => {
          return (
            <div key={exercise.id}>
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
