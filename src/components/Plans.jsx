import { useContext, useState } from "react";
import { PlansContext } from "../context/plans.context";
import { useNavigate, Link } from "react-router-dom";
import CreatePlan from "./CreatePlan";
import Popup from "./Popup";
import { AuthContext } from "../context/auth.context";

function Plans() {
  const isLoggedIn = useContext(AuthContext);
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
      <h1>Workout Plans</h1>
      <div>
        {isLoggedIn ? (
          <>
            <button onClick={openPopup}>Create New Plan</button>
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
              <h2>Create a New Plan</h2>
              <CreatePlan />
            </Popup>
          </>
        ) : (
          <p>
            <Link to="/signup">Sign up</Link> or <Link to="/login">log in</Link>{" "}
            to create a customized plan.
          </p>
        )}
      </div>
      <div>
        {plans.length === 0 ? (
          <p>No plans available.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan._id}>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <p>{plan.length} week program</p>
              <p>{plan.category}</p>
              <button onClick={() => handleDelete(plan._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Plans;
