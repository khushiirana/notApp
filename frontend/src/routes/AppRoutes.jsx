import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import KanbanBoard from '../components/KanbanBoard';
import PrivateVault from '../components/PrivateVault';
import Layout from '../components/Layout';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/kanban" element={
                <PrivateRoute>
                    <Layout>
                        <KanbanBoard />
                    </Layout>
                </PrivateRoute>
            } />
            <Route path="/vault" element={
                <PrivateRoute>
                    <Layout>
                        <PrivateVault />
                    </Layout>
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;
