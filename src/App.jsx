import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ExercisesList from "./components/ExercisesList";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/exercises" element={<ExercisesList />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
