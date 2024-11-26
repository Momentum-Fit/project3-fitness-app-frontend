import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function UpdatePlan() {
  const { planId } = useParams();
  const { plans, updatePlan } = useContext(PlansContext);
  const { exercises } = useContext(ExercisesContext);
  const navigate = useNavigate();
  const updatedPlan = plans.find((plan) => plan._id === planId);
  if (!updatedPlan) {
    return <div>Plan not found.</div>;
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);

  const categoryCombobox = useCombobox({
    onDropdownClose: () => categoryCombobox.resetSelectedOption(),
  });

  const lengthCombobox = useCombobox({
    onDropdownClose: () => lengthCombobox.resetSelectedOption(),
  });

  const [name, setName] = useState(updatedPlan.name);
  const [description, setDescription] = useState(updatedPlan.description);
  const [category, setCategory] = useState(updatedPlan.category);
  const [length, setLength] = useState(updatedPlan.length);
  const [selectedExercises, setSelectedExercises] = useState(
    updatedPlan.exercises || []
  );
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
    if (checked) {
      setSelectedExercises((prev) => [
        ...prev,
        { exerciseId, repetitions: 12 },
      ]);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="name-input-pop"
          name="name"
          placeholder="enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextInput
          id="desc-input-pop"
          name="description"
          placeholder="enter description"
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
          <Checkbox.Group>
            {exercises.map((exercise) => (
              <div key={exercise._id}>
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
                  <Input
                    id="num-reps"
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
                )}
              </div>
            ))}
          </Checkbox.Group>
        </div>

        <Button filled onClick={closePopup}>
          Update My Plan
        </Button>
      </form>
    </>
  );
}

export default UpdatePlan;
