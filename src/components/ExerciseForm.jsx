import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const API_URL = "http://localhost:5005";

function ExerciseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleDifficulty = (e) => setDifficulty(e.target.value);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !category || !difficulty) {
      setError("Please fill in all required fields.");
      return;
    }

    const newExercise = {
      name,
      description,
      category,
      difficulty,
    };

    setError("");

    axios
      .post(`${API_URL}/api/exercises`, newExercise, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        setName("");
        setDescription("");
        setCategory("");
        setDifficulty("");
        navigate("/exercises");
      })
      .catch((error) => {
        setError("Error creating a new exercise. Please try again.");
        console.log("Error creating a new exercise...", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleCategory}
        />
        <label>Difficulty</label>
        <input
          type="text"
          name="difficulty"
          value={difficulty}
          onChange={handleDifficulty}
        />
        <button type="submit">submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default ExerciseForm;
