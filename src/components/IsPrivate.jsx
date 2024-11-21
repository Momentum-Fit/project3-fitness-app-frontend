import { useContext } from "react";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
