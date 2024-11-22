import { useContext } from "react";
import Plans from "../components/Plans";
import { PlansContext } from "../context/plans.context";

function PlansPage () {

    const deletePlan = useContext(PlansContext);
    const plan = useContext(PlansContext);
    
    const handleDelete = (planId) => {
        deletePlan(planId);
      };

    return (
        <>
            <h1>Momentum Fit</h1>
            <Plans />
            <button onClick={() => handleDelete(plan._id)}>Delete</button>
        </>
      )
}

export default PlansPage;