import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function ProtectedLayouts() {
  const { isLoggedIn } = useAuth();
  console.log('isloggedIn', isLoggedIn);

  if (!isLoggedIn) {
    // Se non è loggato, vai al login
    return <Navigate to="/" replace />; //sost la voce vecchia nell'url invece di aggiungerla
  }

  // Se è loggato, mostra la rotta figlia
  return <Outlet />;
}

export default ProtectedLayouts;