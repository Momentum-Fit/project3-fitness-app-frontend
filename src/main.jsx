import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PlansProvider } from "./context/plans.context.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { ExercisesProvider } from "./context/exercises.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <PlansProvider>
          <ExercisesProvider>
            <App />
          </ExercisesProvider>
        </PlansProvider>
      </AuthProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);
