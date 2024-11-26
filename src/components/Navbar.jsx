import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import "../App.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <img className="logo" src={logo} />
      <div className="nav-buttons-container">
        <Link to="/">
          <button
            id="home-button"
            className={isActive("/") ? "active-button" : ""}
          >
            Home
          </button>
        </Link>
        <Link to="/plans">
          <button
            id="plans-button"
            className={isActive("/plans") ? "active-button" : ""}
          >
            Workout Plans
          </button>
        </Link>

        {isLoggedIn && (
          <>
            <button id="logout-button" onClick={logOutUser}>
              Logout
            </button>
            <Link to="/profile">
              <span id="user-name"> {user && user.name}</span>
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/auth/signup">
              {" "}
              <button
                id="signup-button"
                className={isActive("/auth/signup") ? "active-button" : ""}
              >
                Sign Up
              </button>{" "}
            </Link>
            <Link to="/auth/login">
              {" "}
              <button
                id="login-button"
                className={isActive("/auth/login") ? "active-button" : ""}
              >
                Login
              </button>{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
