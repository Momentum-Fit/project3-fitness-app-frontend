import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
      <h1>this is the app</h1>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/*" element={<h1>Nothing to see</h1>} />
      </Routes>
    </>
  );
}

export default App;
