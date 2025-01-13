import { useUserContext } from "@context/userContext";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: Array<"USER" | "ADMIN">;
}
const ProtectedRoute = ({
  children,
  requiredRole = ["USER"],
}: ProtectedRouteProps) => {
  const { user } = useUserContext();
  const signinStatus = localStorage.getItem("signinStatus");

  if (!signinStatus || signinStatus === "false") {
    return <Navigate to="/signin" replace />;
  }

  if (user.role && !requiredRole.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
