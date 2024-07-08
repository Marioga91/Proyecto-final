import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate} from "react-router-dom";

const UnprotectedRoute = ({ children }) => {
  const { user, isAuthLoaded } = useContext(AuthContext);

  if (!isAuthLoaded) {
    return <p>Loading...</p>
  }

  if (user) {
    return <Navigate to="/home" />;
  }
  
  return (
    children
  );
};

export default UnprotectedRoute;


