import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import axios from "axios";
import "../css/popup.css";

function CreateExercise(props) {
  const { planId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [repetitions, setRepetitions] = useState("");
  const navigate = useNavigate();

  const { exercises, createExercise, assignExerciseToPlan } =
    useContext(ExercisesContext);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);

  const categoryCombobox = useCombobox({
    onDropdownClose: () => categoryCombobox.resetSelectedOption(),
  });

  const difficultyCombobox = useCombobox({
    onDropdownClose: () => difficultyCombobox.resetSelectedOption(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !category || !difficulty) {
      alert("Please fill all required fields.");
      return;
    }

    const exerciseDetails = {
      name: name,
      description: description,
      category: category,
      difficulty: difficulty,
      repetitions: repetitions,
    };

    try {
      const createdExercise = await createExercise(exerciseDetails);

      await assignExerciseToPlan(createdExercise._id, planId, repetitions);

      setName("");
      setDescription("");
      setCategory("");
      setDifficulty("");
      setRepetitions("");

      props.onClose();
      props.createdExerciseToast();
      props.getPlan();
    } catch (error) {
      console.error("Error creating or assigning exercise:", error);
      alert("An error occurred while creating or assigning the exercise.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          className="create-ex-input"
          name="name"
          placeholder="Enter exercise name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          className="create-ex-input"
          name="description"
          placeholder="Enter a Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Combobox
          className="create-ex-input"
          store={categoryCombobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setCategory(val);
            categoryCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
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
              <Combobox.Option value="lower body">Lower Body</Combobox.Option>
              <Combobox.Option value="upper body">Upper Body</Combobox.Option>
              <Combobox.Option value="full body">Full Body</Combobox.Option>
              <Combobox.Option value="cardio">Cardio</Combobox.Option>
              <Combobox.Option value="core">Core</Combobox.Option>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <Combobox
          className="create-ex-input"
          store={difficultyCombobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setDifficulty(val);
            difficultyCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => difficultyCombobox.toggleDropdown()}
              rightSectionPointerEvents="none"
            >
              {difficulty || (
                <Input.Placeholder>Select Difficulty</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              <Combobox.Option value="easy">Easy</Combobox.Option>
              <Combobox.Option value="medium">Medium</Combobox.Option>
              <Combobox.Option value="hard">Hard</Combobox.Option>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <TextInput
          name="repetitions"
          placeholder="Enter number of repetitions"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
        <Button className="create-ex-btn" type="submit">
          Add exercise
        </Button>
      </form>
    </>
  );
}

export default CreateExercise;
