import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Employee() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios.get(`${import.meta.env.VITE_BE_URL}/getEmployee`)
      .then(res => {
        if (res.data.Status === 'Success') {
          setData(res.data.Data);
        } else {
          alert('Error fetching employee data.');
        }
      })
      .catch(err => console.log(err));

    // Initialize with default data if empty
    const defaultData = [
      { id: '1', name: 'John Doe', email: 'john@example.com', address: '123 Main St', salary: '50000', image: 'default.jpg' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St', salary: '60000', image: 'default.jpg' }
    ];
    if (data.length === 0) {
      setData(defaultData);
    }
  }, [data]);

  const handleDelete = (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (userConfirmed) {
      axios.delete(`${import.meta.env.VITE_BE_URL}/delete/${id}`)
        .then(res => {
          if (res.data.Status === 'Success') {
            setData(data.filter(employee => employee.id !== id));
          } else {
            alert('Error deleting employee.');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/home/addemployee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>
                  {employee.image && (
                    <img 
                      src={`${import.meta.env.VITE_BE_URL}/images/${employee.image}`} 
                      alt={employee.name} 
                      className='employee_image' 
                      style={{ width: '50px', height: '50px' }}
                    />
                  )}
                </td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/home/employee/edit/${employee.id}`} className='btn btn-primary btn-sm me-2'>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(employee.id)} className='btn btn-sm btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
