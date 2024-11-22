import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import "../css/auth.css";

const API_URL = "http://localhost:5005";

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
      .post(`${API_URL}/auth/signup`, requestBody)
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
        <>
          <h1>Signup Page</h1>
          <button onClick={toggleModal}>Sign Up</button>
        </>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                required
              />
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                required
              />
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
