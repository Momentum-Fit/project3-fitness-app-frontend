import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SigUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <>
      <h1>this is the app</h1>
      <Routes>
        <Route path="/auth/signup" element={<SigUpPage />} />
        <Route path="*" element={<h1>Nothing to see</h1>} />
      </Routes>
    </>
  );
}

export default App;
