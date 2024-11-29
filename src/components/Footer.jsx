import logo from "../assets/logo.jpeg";
import "../css/footer.css";
import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
        <Link to="/">
          <img className="w-auto h-7" src={logo} alt="Logo" />{" "}
          <span className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Momentum Fit
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <Link
            to="/about"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            About
          </Link>
          <a
            href="https://github.com/Momentum-Fit"
            target="_blank"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Github Repo
          </a>
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-blue-500 hover:text-blue-400"
            />
            <a
              href="https://www.linkedin.com/in/olga-casanovas-bb29bb89/"
              className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Olga Casanovas
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-blue-500 hover:text-blue-400"
            />
            <a
              href="https://www.linkedin.com/in/fiona-hulse/"
              className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Fiona Hulse
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
