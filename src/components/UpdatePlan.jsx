import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlansContext } from "../context/plans.context";
import { ExercisesContext } from "../context/exercises.context";


function UpdatePlan() {
    const {planId} = useParams();
    const {plans, updatePlan} = useContext(PlansContext);
    const { exercises } = useContext(ExercisesContext);
    const navigate = useNavigate();
    const updatedPlan = plans.find(plan => plan._id === planId);
    if (!updatedPlan) {
        return <div>Plan not found.</div>;
    }
   
  const [name, setName] = useState(updatedPlan.name);
  const [description, setDescription] = useState(updatedPlan.description);
  const [category, setCategory] = useState(updatedPlan.category);
  const [length, setLength] = useState(updatedPlan.length);
  const [selectedExercises, setSelectedExercises] = useState(updatedPlan.exercises || []);
  const [loading, setLoading] = useState(false);

  if (!plans || !exercises) return <div>Loading...</div>;


    const handleSubmit = async (e) => {
    e.preventDefault();

    const planDetails = {
      _id: planId,
      name: name,
      description: description,
      category: category,
      length: length,
      exercises: selectedExercises,
    };

    await updatePlan(planDetails);
    navigate("/");
};

    const handleExerciseSelection = (exerciseId, checked) => {
        if(checked) {
            setSelectedExercises((prev) => [...prev, {exerciseId, repetitions: 12}])
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

        <button>Update My Plan</button>
      </form>
    </>
  );
}

export default UpdatePlan;
