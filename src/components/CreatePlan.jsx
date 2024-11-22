import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlansContext } from "../context/plans.context";
import { ExercisesContext } from "../context/exercises.context";


function CreatePlan() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("hiit");
  const [length, setLength] = useState("4");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [repetitions, setRepetitions] = useState(12);
  const [loading, setLoading] = useState();

    const {createPlan} = useContext(PlansContext);
    const { exercises } = useContext(ExercisesContext);
    const navigate = useNavigate();

    if (!exercises || exercises.length === 0) {
        return <div>No exercises available.</div>; 
      }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const planDetails = {
      name: name,
      description: description,
      category: category,
      length: length,
      exercises: selectedExercises.map(({ exerciseId, repetitions }) => ({
      exerciseId: exerciseId, // Send exerciseId as a string, not as ObjectId
      repetitions,
    }))
    };

    await createPlan(planDetails);

    setName("");
    setDescription("");
    setCategory("");
    setLength("");
    setSelectedExercises([]);
    setRepetitions(12);

    navigate("/");
};

    const handleExerciseSelection = (exerciseId, checked) => {
        if(checked) {
            setSelectedExercises((prev) => [...prev, {exerciseId, repetitions}])
        }
        else {
            setSelectedExercises((prev) => 
            prev.filter((exercise) => exercise.exerciseId !== exerciseId))
        }
    };

    const handleRepetitionChange = (exerciseId, repetitions) => {
        setSelectedExercises((prev) => 
        prev.map((exercise) => 
        exercise.exerciseId === exerciseId ? {...exercise, repetitions: parseInt(repetitions)} : exercise ))
    }

if(loading) return <div>Loading exercises...</div>

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="textarea"
          name="description"
          placeholder="enter description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <select
          name="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="strength">Strength</option>
          <option value="hiit">HIIT</option>
          <option value="low impact">Low Impact</option>
          <option value="cardio">Cardio</option>
        </select>
        <select
          name="length"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}>
          <option value="4">4 weeks</option>
          <option value="8">8 weeks</option>
          <option value="12">12 weeks</option>
        </select>
        <div>
            <h3>Select Exercises for your Plan</h3>
            {exercises.map((exercise) => (
                <div key={exercise._id}>
                <label>
                    <input type="checkbox" value={exercise._id} onChange={(e) => handleExerciseSelection(exercise._id, e.target.checked)} 
                    checked={selectedExercises.some((selected) => selected.exerciseId === exercise._id)} />
                    {exercise.name}
                </label>
                {selectedExercises.some((selected) => selected.exerciseId === exercise._id) && (
                  <input
                    type="number"
                    min="1"
                    value={
                      selectedExercises.find((selected) => selected.exerciseId === exercise._id).repetitions
                    }
                    onChange={(e) => handleRepetitionChange(exercise._id, e.target.value)}
                  />
                )}
              </div>
            ))
            }
                </div>

        <button>Create Plan</button>
      </form>
    </>
  );
}

export default CreatePlan;
