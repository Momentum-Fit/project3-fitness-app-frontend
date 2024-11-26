import { useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function About() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <section id="not-found-bg" class="bg-#E5E8EB dark:bg-gray-900 ">
      <div
        id="not-found-content"
        class="container min-h-screen px-20 py-20 mx-auto"
      >
        <div>
          <h1 class="text-sm font-medium text-blue-500 dark:text-blue-400">
            About
          </h1>
          <h2 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Momentum Fit
          </h2>
          <p class="mt-4 text-gray-500 dark:text-gray-400">
            Momentum Fit is your personalized fitness companion, designed to
            make staying active simple and enjoyable. We provide customized
            workout plans tailored to your unique goals, preferences, and
            schedule. Whether you’re a beginner looking to kickstart your
            fitness journey, or an experienced athlete seeking to enhance
            performance, Momentum Fit adapts to your needs. Choose how often you
            want to work out, the type of exercise you love—like strength
            training, yoga, or cardio—and the difficulty level that challenges
            you just right. Our intuitive app takes the guesswork out of fitness
            planning, offering routines that grow with you as you build strength
            and confidence. Momentum Fit isn’t just about workouts; it’s about
            helping you build consistency, achieve results, and make fitness a
            sustainable part of your lifestyle. Take the next step in your
            fitness journey with Momentum Fit, and let’s move toward your goals
            together!
          </p>

          <div class="flex items-center mt-6 gap-x-3">
            <button
              onClick={() => {
                isLoggedIn ? navigate("/plans") : navigate("/auth/signup");
              }}
              class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Get Started!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
