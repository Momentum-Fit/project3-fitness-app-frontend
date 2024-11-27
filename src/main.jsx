import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PlansProvider } from "./context/plans.context.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { ExercisesProvider } from "./context/exercises.context.jsx";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { UserProvider } from "./context/user.context.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <AuthProviderWrapper>
          <PlansProvider>
            <ExercisesProvider>
              <UserProvider>
               <App />
               </UserProvider> 
            </ExercisesProvider>
          </PlansProvider>
        </AuthProviderWrapper>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
