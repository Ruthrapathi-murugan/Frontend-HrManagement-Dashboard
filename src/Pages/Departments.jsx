import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEllipsisV } from 'react-icons/fa'; // More options icon

const Departments = () => {
    // Static list of departments
    const departments = [
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'Application Development' },
        { id: 3, name: 'IT Management' },
        { id: 4, name: 'Accounts Management' },
        { id: 5, name: 'Support Management' },
        { id: 6, name: 'Marketing' },
    ];

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Departments</h2>
            
            <div className="card">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Department Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(department => (
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.name}</td>
                                    <td>
                                        <button className="btn btn-link">
                                            <FaEllipsisV size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Departments;
