import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { PATH } from 'constants/path';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Restaurants from 'pages/Restaurants';
import Register from 'pages/Register';
import RestaurantDetail from 'pages/RestaurantDetail';
import Posts from 'pages/Posts';
import Profile from 'pages/Profile';
import Error from 'pages/Error';
import ManageUsers from 'pages/ManageUsers';
import ManagePosts from 'pages/ManagePosts';
import { useAppSelector } from 'redux/hooks';

const Routers = () => {
    const token = localStorage.getItem('token');
    const { role } = useAppSelector((state) => state.profile);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute roles={['USER']} />}>
                    <Route path={PATH.HOME.path} element={<Home />} />
                    <Route
                        path={PATH.RESTAURANTS.path}
                        element={<Restaurants />}
                    />
                    <Route
                        path={PATH.RESTAURANTS.DETAIL}
                        element={<RestaurantDetail />}
                    />
                    <Route path={PATH.POSTS.path} element={<Posts />} />
                    <Route path={PATH.POSTS.DETAIL} element={<Posts />} />
                    <Route path={PATH.PROFILE.path} element={<Profile />} />
                </Route>
                <Route element={<ProtectedRoute roles={['ADMIN']} />}>
                    <Route
                        path={PATH.MANAGE_USERS.path}
                        element={<ManageUsers />}
                    />
                    <Route
                        path={PATH.MANAGE_POSTS.path}
                        element={<ManagePosts />}
                    />
                </Route>
                <Route
                    path={PATH.LOGIN.path}
                    element={
                        token ? (
                            <Navigate to={PATH.HOME.path} replace />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route path={PATH.REGISTER.path} element={<Register />} />
                <Route path={PATH.ERROR.path} element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
