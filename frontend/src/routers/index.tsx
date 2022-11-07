import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { PATH } from 'constants/path';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Restaurants from 'pages/Restaurants';
import Register from 'pages/Register';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.HOME.path} element={<Home />} />
                    <Route
                        path={PATH.RESTAURANTS.path}
                        element={<Restaurants />}
                    />
                </Route>
                <Route path={PATH.LOGIN.path} element={<Login />} />
                <Route path={PATH.REGISTER.path} element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
