import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Pages/AuthContext'; // Ensure correct path
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import DashboardLayout from './Pages/DashboardLayout'; // Ensure correct import path
import Employee from './Pages/Employee';
import AddEmployee from './Pages/AddEmployee';
import LeaveManagement from './Pages/LeaveManagement';
import Recruitment from './Pages/Recruitment';
import EmAnalytics from './Pages/EmAnalytics';
import HRRegistration from './Pages/HRRegistration';
import RegistrationSuccess from './Pages/RegistrationSuccess';
import ProtectedRoute from './Pages/ProtectedRoute'; // Ensure correct import path

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<HRRegistration />} />
                <Route path="/registration-success" element={<RegistrationSuccess />} />
                <Route path="/home" element={<DashboardLayout />}>
                    <Route index element={<ProtectedRoute element={Home} />} />
                    <Route path="employee" element={<ProtectedRoute element={Employee} />} />
                    <Route path="addemployee" element={<ProtectedRoute element={AddEmployee} />} />
                    <Route path="leavemanagement" element={<ProtectedRoute element={LeaveManagement} />} />
                    <Route path="recruitment" element={<ProtectedRoute element={Recruitment} />} />
                    <Route path="analytics" element={<ProtectedRoute element={EmAnalytics} />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
