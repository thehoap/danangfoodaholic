import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { PATH } from 'constants/path';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Restaurants from 'pages/Restaurants';
import Register from 'pages/Register';
import RestaurantDetail from 'pages/RestaurantDetail';

const Routers = () => {
    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.HOME.path} element={<Home />} />
                    <Route
                        path={PATH.RESTAURANTS.path}
                        element={<Restaurants />}
                    />
                    <Route
                        path={PATH.RESTAURANTS.DETAIL}
                        element={<RestaurantDetail />}
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
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
