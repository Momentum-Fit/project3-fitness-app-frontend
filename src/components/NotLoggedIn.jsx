import { useNavigate } from "react-router-dom";
import "../css/notloggedin.css";
import "../App.css";

function NotLoggedIn() {
  const navigate = useNavigate();
  return (
    <>
      <section id="not-found-bg" className="bg-#E5E8EB dark:bg-gray-900 ">
        <div
          id="not-found-content"
          className="container min-h-screen px-20 py-20 mx-auto"
        >
          <div>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Oh no! 🫣
            </h1>
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
              It looks like you are not logged in
            </p>

            <div className="flex items-center mt-6 gap-x-3">
              <button
                onClick={() => navigate("/auth/signup")}
                id="signup-btn"
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-#404347 transition-colors duration-200 bg-#e9eef6 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/auth/login")}
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotLoggedIn;
