import { useUserContext } from "@context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
