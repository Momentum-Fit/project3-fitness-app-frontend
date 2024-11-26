import { useNavigate } from "react-router-dom";
import "../App.css";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section id="not-found-bg" className="bg-#E5E8EB dark:bg-gray-900 ">
      <div
        id="not-found-content"
        className="container min-h-screen px-20 py-20 mx-auto"
      >
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Oops, nothing to see here
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={() => navigate("/")}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default PageNotFound;
