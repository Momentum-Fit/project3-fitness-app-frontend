import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ExercisesList from "./components/ExercisesList";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/PageNotFound";
import CreatePlan from "./components/CreatePlan";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/exercises" element={<ExercisesList />} />
        <Route path="/createPlan" element={<CreatePlan />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
