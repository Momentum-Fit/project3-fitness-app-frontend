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
        <button>home</button>

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
