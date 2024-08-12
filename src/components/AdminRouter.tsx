import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectIsLoading, userInfo } from "../features/auth/authSlice";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectIsLoading);
    const userDetails = useSelector(userInfo);

    if(isLoading){
        return <div>Loading...</div>
    }

    const userIsAdmin = isAuthenticated && userDetails?.realms.roles.includes("admin")

    if (!userIsAdmin) {
      return <Navigate to="/unauthorized" replace />;
    }
  
    return <>{children}</>;
  };

export default AdminRoute;