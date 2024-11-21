import { useContext } from "react";
import { PlansContext } from "../context/plans.context";

function Plans() {
    const {plans, loading} = useContext(PlansContext);

    if(loading) {
        return <div>Loading...</div>
    }

  return (
    <>
        <h1>Workout Plans</h1>
        <div>{plans.map(plan => (
            <div key={plan._id}>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p>{plan.length} week program</p>
            <p>{plan.category}</p>
            </div>
        ))}
      </div>
    </>
  );
}

export default Plans;


