import React, { useState } from "react";
import "../App.css";

const UserProfilePage = () => {
  const [about, setAbout] = useState("");
  const [goals, setGoals] = useState({
    weightLoss: false,
    muscleGain: false,
    endurance: false,
  });
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="user-profile-page">
      <h1>My Momentum Fit Journey</h1>

      <section className="about-yourself">
        <h2>About Yourself</h2>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Share why you want to start your fitness transformation and what you hope to achieve."
          rows="4"
          cols="50"
        />
      </section>
      <section>
        <h2>Details</h2>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="height"
        ></input>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="weight"
        ></input>
      </section>

      <section className="fitness-goals">
        <h2>Fitness Goals</h2>
        <div className="goals">
          <label>
            <input
              type="checkbox"
              checked={goals.weightLoss}
              onChange={() =>
                setGoals({ ...goals, weightLoss: !goals.weightLoss })
              }
            />
            Weight Loss
          </label>
          <label>
            <input
              type="checkbox"
              checked={goals.muscleGain}
              onChange={() =>
                setGoals({ ...goals, muscleGain: !goals.muscleGain })
              }
            />
            Muscle Gain
          </label>
          <label>
            <input
              type="checkbox"
              checked={goals.endurance}
              onChange={() =>
                setGoals({ ...goals, endurance: !goals.endurance })
              }
            />
            Endurance
          </label>
        </div>
      </section>

      <section className="weekly-progress">
        <h2>Upload Weekly Pictures</h2>
        <div className="upload-section">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && (
            <div className="image-preview">
              <h3>Image Preview:</h3>
              <img
                src={image}
                alt="Uploaded Progress"
                style={{ width: "300px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>
      </section>

      <section className="submit-section">
        <button onClick={() => alert("Profile updated successfully!")}>
          Save Profile
        </button>
      </section>
    </div>
  );
};

export default UserProfilePage;
