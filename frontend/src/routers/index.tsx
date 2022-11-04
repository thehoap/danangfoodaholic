import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { PATH } from 'constants/path';
import Home from 'pages/Home';
import Login from 'pages/Login';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.HOME.path} element={<Home />} />
                </Route>
                <Route path={PATH.LOGIN.path} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
