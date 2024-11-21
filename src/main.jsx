import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PlansProvider } from "./context/plans.context.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlansProvider>
        <App />
      </PlansProvider>
    </BrowserRouter>
  </StrictMode>
);
