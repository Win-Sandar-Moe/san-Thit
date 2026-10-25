import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore.tsx";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}
export function ProtectedRoute({
                                   allowedRoles
                               }: ProtectedRouteProps) {

    const {isAuthenticated, user} = useAuthStore();
    const location = useLocation();
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{from: location}}
                replace
            />
        );
    }
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = user?.roles?.some(role =>
            allowedRoles.includes(role)
        );
        console.log("hasRequiredRole:", hasRequiredRole);
        if (!hasRequiredRole) {
            return <Navigate to="/" replace/>;
        }
    }
    return <Outlet/>;
}