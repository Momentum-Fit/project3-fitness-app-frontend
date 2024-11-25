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
import PlansPage from "./Pages/PlansPage";
import "./index.css";
import Footer from "./components/Footer";
import UserProfilePage from "./Pages/UserProfilePage";
import About from "./Pages/About";

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
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/plans/:planId" element={<MyPlan />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
