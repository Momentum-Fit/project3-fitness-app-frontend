import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import "../App.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <img className="logo" src={logo} />
      <div className="nav-buttons-container">
        <Link to="/">
          <button id="home-button">Home</button>
        </Link>
        <Link to="/plans">
          <button id="plans-button">Workout Plans</button>
        </Link>

        {isLoggedIn && (
          <>
            <button id="logout-button" onClick={logOutUser}>
              Logout
            </button>
            <span id="user-name"> {user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/auth/signup">
              {" "}
              <button id="signup-button">Sign Up</button>{" "}
            </Link>
            <Link to="/auth/login">
              {" "}
              <button id="login-button">Login</button>{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
