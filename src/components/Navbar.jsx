import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <img className="logo" />
      <div className="nav-buttons-container">
        <Link to="/">
          <button>home</button>
        </Link>
        <Link to="/plans">
          <button>Workout Plans</button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/plans">
              <button>Plans</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/auth/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/auth/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
