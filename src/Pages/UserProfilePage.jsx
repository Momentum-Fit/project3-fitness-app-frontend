import React, { useState } from "react";
import "../App.css";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { updateUserProfile, uploadImage } from "../services/fileupload.service";
import Popup from '../components/Popup';
import { UserContext } from '../context/user.context';

const UserProfilePage = () => {
  const { user, updateUserProfile } = useContext(UserContext);
  const [about, setAbout] = useState("");
  const [goals, setGoals] = useState({
    weightLoss: false,
    muscleGain: false,
    endurance: false,
  });
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    try {
      const response = await uploadImage(uploadData);
      console.log(response)
      setImageUrl(response.fileUrl);
    } catch (err) {
      console.log("error uploading file", err)
    }
  }

  const handleSaveProfile = async () => {
    const updatedData = {
      height, 
      weight,
      about, 
      goals, 
      imageUrl,
    };

    updateUserProfile(updatedData);
    setIsPopupOpen(false);
  };

  return (
    <>
    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    My Profile:
                </h1>

                <div className="flex mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
            </div>

            <div className="flex justify-between mt-8 md:mt-0">
                <button title="left arrow" className="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button title="right arrow" className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 border rounded-lg dark:border-gray-700">
                <p className="leading-loose text-gray-500 dark:text-gray-400">Height: {user?.height || "Not set"}</p>
                <p className="leading-loose text-gray-500 dark:text-gray-400">Weight: {user?.weight || "Not set"}</p>
                <p className="leading-loose text-gray-500 dark:text-gray-400">Goals: { user && Object.keys(user?.goals).filter(key => goals[key]).join(", ") || "Not set"}</p>
                <p className="leading-loose text-gray-500 dark:text-gray-400">My Momentum Fit Journey: {user?.about || "Not set"}</p>
                <p className="leading-loose text-gray-500 dark:text-gray-400">
                    Text
                </p>

                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src={user?.imageUrl || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"} alt="" />

                    <div className="mx-2">
                        <h1 className="font-semibold text-gray-800 dark:text-white">{user?.name || "Name"}</h1>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email || "Email"}</span>
                    </div>
                </div>
            </div>
        </section>
        <button className="mt-4 text-blue-600 underline" onClick={() => setIsPopupOpen(true)}>Update Profile</button>
    </div>
</section>

<Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2>Update Profile</h2>
        <form>
          <label>Profile Picture</label>
          <input type="file" onChange={handleFileUpload} />
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About me" rows="4" cols="50"></textarea>
          <div className="goals">
            <label>
              <input type="checkbox" checked={goals.weightLoss} onChange={() => setGoals({ ...goals, weightLoss: !goals.weightLoss })} />
              Weight Loss
            </label>
            <label>
              <input type="checkbox" checked={goals.muscleGain} onChange={() => setGoals({ ...goals, muscleGain: !goals.muscleGain })} />
              Muscle Gain
            </label>
            <label>
              <input type="checkbox" checked={goals.endurance} onChange={() => setGoals({ ...goals, endurance: !goals.endurance })} />
              Endurance
            </label>
          </div>
          <button type="button" onClick={handleSaveProfile}>Save</button>
        </form>
      </Popup>
    </>
  );
};


export default UserProfilePage;
