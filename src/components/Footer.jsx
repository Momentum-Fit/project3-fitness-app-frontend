import logo from "../assets/logo.jpeg";
import "../css/footer.css";
import "../App.css";

function Footer() {
  return (
    <footer class="bg-white dark:bg-gray-900">
      <div class="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
        <a id="logo-footer" href="#">
          <img class="w-auto h-7" src={logo} alt="Logo" />{" "}
          <span>Momentum Fit</span>
        </a>

        <div class="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <a
            href="http://localhost:5173/about"
            class="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            About
          </a>
          <a
            href="https://github.com/Momentum-Fit"
            target="_blank"
            class="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Github
          </a>
          <a
            href="#"
            class="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            LinkedIn
          </a>
          <a
            href="http://localhost:5173/about"
            class="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
