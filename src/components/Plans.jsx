import { useContext, useState } from "react";
import { PlansContext } from "../context/plans.context";
import { useNavigate, Link } from "react-router-dom";
import CreatePlan from "./CreatePlan";
import Popup from "./Popup";
import { AuthContext } from "../context/auth.context";
import "../App.css";

function Plans() {
  const { isLoggedIn } = useContext(AuthContext);
  const { plans, loading, deletePlan } = useContext(PlansContext);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDelete = async (planId) => {
    await deletePlan(planId);
    navigate("/plans");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <h1
        id="title"
        className="bg-#E5E8EB text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
      >
        Our Workout Plans
        <span className="underline decoration-blue-500"></span>
      </h1>
      <div>
        {isLoggedIn ? (
          <>
            <section className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-10 mx-auto">
                <div>
                  <button
                    onClick={openPopup}
                    id="create-plan-button"
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

                    <span className="mx-1">Create customized Plan</span>
                  </button>
                  <Popup isOpen={isPopupOpen} onClose={closePopup}>
                    <h2>Create a New Plan</h2>
                    <CreatePlan />
                  </Popup>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p>
            <Link to="/auth/signup">Sign up</Link> or{" "}
            <Link to="/auth/login">log in</Link> to create a customized plan.
          </p>
        )}
      </div>
      <div>
        {plans.length === 0 ? (
          <p>No plans available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl"
              >
                <span className="inline-block text-blue-500 dark:text-blue-400"></span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  {plan.name}{" "}
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  {plan.description}
                </p>
                <p className="text-gray-500 dark:text-gray-300">
                  {plan.length} week program
                </p>
                <p className="text-gray-500 dark:text-gray-300">
                  {plan.category}
                </p>
                <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Plans;
