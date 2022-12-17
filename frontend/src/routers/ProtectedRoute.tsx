import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from 'constants/path';
import { useAppSelector } from 'redux/hooks';

interface IProtectedRoute {
    roles: ('USER' | 'ADMIN')[];
}

const ProtectedRoute = ({ roles }: IProtectedRoute) => {
    const isAuthenticated = localStorage.getItem('token');
    const role = localStorage.getItem('role') as 'USER' | 'ADMIN';

    if (!roles.includes(role)) return <Navigate to={PATH.ERROR.path} replace />;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={PATH.LOGIN.path} replace />
    );
};

export default ProtectedRoute;
