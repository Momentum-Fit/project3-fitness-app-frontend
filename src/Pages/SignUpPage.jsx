import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import "../css/auth.css";
import "../App.css";
import logo from "../assets/logo.jpeg";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        const token = response.data.authToken;
        storeToken(token);
        authenticateUser();
        navigate("/");
        setIsModalOpen(false);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="auth-container">
      {!isModalOpen && (
        <div className="auth-callto">
          <h1>Signup Page</h1>
          <button className="callto-button" onClick={toggleModal}>
            Sign Up
          </button>
          <div
            id="already-account"
            className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"
          >
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Already have an account?{" "}
            </span>
            <Link
              to="/auth/login"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      )}

      {isModalOpen && (
        <>
          <div
            className="modal-overlay fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>

          <div className="modal-container fixed inset-0 flex items-center justify-center px-4 z-50 rounded-lg">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 relative">
              <button
                className="absolute top-2 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={toggleModal}
                aria-label="Close"
              >
                &times;
              </button>

              <div className="px-6 py-4">
                <div className="flex justify-center mx-auto">
                  <img className="w-auto h-11 sm:h-12" src={logo} alt="Logo" />
                </div>
                <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                  Signup
                </h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                  Create your account below
                </p>

                <form onSubmit={handleSignupSubmit}>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleName}
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

              {errorMessage && (
                <p className="error-message text-red-500 text-center mt-2">
                  {errorMessage}
                </p>
              )}
              <div
                id="already-account"
                className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"
              >
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/auth/login"
                  className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUpPage;
