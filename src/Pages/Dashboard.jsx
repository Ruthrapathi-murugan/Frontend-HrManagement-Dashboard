import React, { useEffect ,useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        axios.get('http://localhost:5000/dashboard')
            .then(res => {
                if (res.data.Status === "Success") {
                    if (res.data.role === "admin") {
                        navigate('/');
                    } else {
                        const id = res.data.id;
                        navigate('/employeedetail/' + id);
                    }
                } else {
                    navigate('/start');
                }
            });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/logout', { withCredentials: true });

            localStorage.removeItem('authStatus');
            localStorage.removeItem('token');
            sessionStorage.clear();
            navigate('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <h2 className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
                        </h2>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="/home" className="nav-link text-white px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Dashboard</span> 
                                </Link>
                            </li>
                            <li>
                                <Link to="/home/employee" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-people"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Manage Employees</span> 
                                </Link>
                            </li>
                            <li>
                                <Link to="/home/addemployee" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-person-plus"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Registration Form</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/home/leavemanagement" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-calendar-check"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Leave Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/home/recruitment" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-briefcase"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Recruitment Process</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/home/analytics" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-person"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Analytics</span>
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="nav-link px-0 align-middle text-white bg-dark border-0" 
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <i className="fs-4 bi-power"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-center'>
                        <h4>Employee Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
