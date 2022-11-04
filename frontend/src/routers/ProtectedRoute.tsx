import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from 'constants/path';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={PATH.LOGIN.path} replace />
    );
};

export default ProtectedRoute;
