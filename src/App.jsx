import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ExercisesList from "./components/ExercisesList";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/PageNotFound";
import CreatePlan from "./components/CreatePlan";
import MyPlan from "./Pages/MyPlan";
import PlansPage from "./Pages/PlansPage";
import "./index.css";
import Footer from "./components/Footer";
import UserProfilePage from "./Pages/UserProfilePage";
import About from "./Pages/About";
import NotLoggedIn from "./components/NotLoggedIn";
import "./css/footer.css";
import IsPrivate from "./components/IsPrivate";
import CreateExercise from "./components/CreateExercise";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/exercises" element={<ExercisesList />} />
        <Route
          path="/createPlan"
          element={
            <IsPrivate>
              <CreatePlan />
            </IsPrivate>
          }
        />
        <Route path="/plans" element={<PlansPage />} />
        <Route
          path="/plans/:planId"
          element={
            <IsPrivate>
              <MyPlan />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <UserProfilePage />{" "}
            </IsPrivate>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/notloggedin" element={<NotLoggedIn />} />
        <Route path="/create-exercise" element={<CreateExercise />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
