import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlansContext } from "../context/plans.context";
import { ExercisesContext } from "../context/exercises.context";
import {
  Checkbox,
  Group,
  Button,
  Input,
  TextInput,
  Combobox,
  InputBase,
  useCombobox,
} from "@mantine/core";
import "../App.css";
import "../css/popup.css";

function CreatePlan() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [length, setLength] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [repetitions, setRepetitions] = useState(12);
  const [loading, setLoading] = useState();

  const { createPlan } = useContext(PlansContext);
  const { exercises } = useContext(ExercisesContext);
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => setIsPopupOpen(false);

  const categoryCombobox = useCombobox({
    onDropdownClose: () => categoryCombobox.resetSelectedOption(),
  });

  const lengthCombobox = useCombobox({
    onDropdownClose: () => lengthCombobox.resetSelectedOption(),
  });

  if (!exercises || exercises.length === 0) {
    return <div>No exercises available.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !length || selectedExercises.length === 0) {
      alert(
        "Please fill all required fields and select at least one exercise."
      );
      return;
    }

    const planDetails = {
      name: name,
      description: description,
      category: category,
      length: length,
      exercises: selectedExercises.map(({ exerciseId, repetitions }) => ({
        exerciseId: exerciseId,
        repetitions,
      })),
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
    if (checked) {
      setSelectedExercises((prev) => [...prev, { exerciseId, repetitions }]);
    } else {
      setSelectedExercises((prev) =>
        prev.filter((exercise) => exercise.exerciseId !== exerciseId)
      );
    }
  };

  const handleRepetitionChange = (exerciseId, repetitions) => {
    setSelectedExercises((prev) =>
      prev.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? { ...exercise, repetitions: parseInt(repetitions) }
          : exercise
      )
    );
  };

  if (loading) return <div>Loading exercises...</div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="name-input-pop"
          name="name"
          placeholder="Enter a Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextInput
          id="desc-input-pop"
          name="description"
          placeholder="Enter a Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Combobox
          store={categoryCombobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setCategory(val);
            categoryCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              id="cat-input-pop"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => categoryCombobox.toggleDropdown()}
              rightSectionPointerEvents="none"
            >
              {category || (
                <Input.Placeholder>Select Category</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              <Combobox.Option value="hiit">HIIT</Combobox.Option>
              <Combobox.Option value="strength">Strength</Combobox.Option>
              <Combobox.Option value="low impact">Low Impact</Combobox.Option>
              <Combobox.Option value="cardio">Cardio</Combobox.Option>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <Combobox
          store={lengthCombobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setLength(val);
            lengthCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              id="length-input-pop"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => lengthCombobox.toggleDropdown()}
              rightSectionPointerEvents="none"
            >
              {length || <Input.Placeholder>Select Duration</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              <Combobox.Option value="4">4 weeks</Combobox.Option>
              <Combobox.Option value="8">8 weeks</Combobox.Option>
              <Combobox.Option value="12">12 weeks</Combobox.Option>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <div className="exercises-section-pop">
        <h3>Select Exercises</h3>
          <Checkbox.Group label="Select Exercises for your Plan">
            {exercises.map((exercise) => (
              <div key={exercise._id} className="exercise-checkbox-container">
                <label className="exercise-check">
                  <Checkbox
                    value={exercise._id}
                    onChange={(e) =>
                      handleExerciseSelection(exercise._id, e.target.checked)
                    }
                    checked={selectedExercises.some(
                      (selected) => selected.exerciseId === exercise._id
                    )}
                  />
                  <span className="exercise-name-pop">{exercise.name}</span>
                </label>
                {selectedExercises.some(
                  (selected) => selected.exerciseId === exercise._id
                ) && (
                  <div className="repetition-input-container">
                  <Input
                    style={{ width: "50px", padding: "4px", fontSize: "14px" }}
                    type="number"
                    min="1"
                    value={
                      selectedExercises.find(
                        (selected) => selected.exerciseId === exercise._id
                      ).repetitions
                    }
                    onChange={(e) =>
                      handleRepetitionChange(exercise._id, e.target.value)
                    }
                  />
                  </div>
                )}
              </div>
            ))}
          </Checkbox.Group>
        </div>

        <Button filled onClick={closePopup}>
          Create Plan
        </Button>
      </form>
    </>
  );
}

export default CreatePlan;
