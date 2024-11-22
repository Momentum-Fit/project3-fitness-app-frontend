import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ExercisesList from "./components/ExercisesList";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/PageNotFound";
import ExerciseForm from "./components/ExerciseForm";
import CreatePlan from "./components/CreatePlan";
import MyPlan from "./Pages/MyPlan";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/exercises" element={<ExercisesList />} />
        <Route path="/create-exercise" element={<ExerciseForm />} />
        <Route path="/createPlan" element={<CreatePlan />} />
        <Route path="/plans/:planId" element={<MyPlan />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
