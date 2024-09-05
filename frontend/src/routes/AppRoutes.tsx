import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home, Login, NotFound } from "../pages";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => ({
        token: state.userReducer.token,
        isAuthenticated: state.userReducer.isAuthenticated,
    }));

    const ProtectedRoute = () => {
        return isAuthenticated ? <Home /> : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<ProtectedRoute />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
