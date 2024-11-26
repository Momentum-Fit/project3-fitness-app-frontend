import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PlansContext } from "../context/plans.context";
import axios from "axios";
import UpdatePlan from "../components/UpdatePlan";
import Popup from "../components/Popup";
import "../css/popup.css";
import "../css/myplan.css";
import "../App.css";
import { AuthContext } from "../context/auth.context";
import NotLoggedIn from "../components/NotLoggedIn";

function MyPlan() {
  const { planId } = useParams();
  const { getPlanById, loading } = useContext(PlansContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getPlan = async () => {
      const storedToken = localStorage.getItem("authToken");
      try {
        const fetchedPlan = await getPlanById(planId);
        setPlan(fetchedPlan);
        const exerciseDetails = await Promise.all(
          fetchedPlan.exercises.map(async (exercise) => {
            const response = await axios.get(
              `http://localhost:5005/api/exercises/${exercise.exerciseId}`,
              {
                headers: { Authorization: `Bearer ${storedToken}` },
              }
            );
            return { ...exercise, details: response.data };
          })
        );
        setExercises(exerciseDetails);
      } catch (error) {
        console.error("Error fetching specific plan:", error);
      } finally {
        setPlanLoading(false);
      }
    };

    getPlan();
  }, [planId, getPlanById]);

  if (loading || planLoading)
    return <div className="text-center">Loading...</div>;

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn />
      ) : (
        <div>
          <section className="bg-#E5E8EB dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div>
                <button
                  id="update-plan-button"
                  onClick={openPopup}
                  className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  <svg
                    className="w-5 h-5 mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="mx-1">Update My Plan</span>
                </button>
                <Popup isOpen={isPopupOpen} onClose={closePopup}>
                  <h2>Update My Plan</h2>
                  <UpdatePlan />
                </Popup>
              </div>
              <h1
                id="plan-title"
                className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
              >
                Your Plan:{" "}
                <span className="underline decoration-blue-500">
                  {plan.name}
                </span>
              </h1>
              <div
                id="category-length-container"
                className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700"
              >
                <button className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                  {plan.category}
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                  {plan.length} weeks
                </button>
              </div>
              <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                {plan.description}
              </p>

              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                {exercises.map((exercise) => (
                  <div
                    key={exercise._id}
                    className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl"
                  >
                    <span className="inline-block text-blue-500 dark:text-blue-400"></span>
                    <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                      {exercise.details?.name}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-300">
                      {exercise.details?.description ||
                        "No description available"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      <strong>Category:</strong> {exercise.details?.category}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      <strong>Repetitions:</strong> {exercise.repetitions}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      <strong>Difficulty:</strong>{" "}
                      {exercise.details?.difficulty}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default MyPlan;
