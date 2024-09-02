import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'; // Import custom CSS file for additional styles

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [salary, setSalary] = useState();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BE_URL}/api/adminCount`)
      .then(res => {
        setAdminCount(res.data.adminCount);
      }).catch(err => console.log(err));

    axios.get(`${import.meta.env.VITE_BE_URL}/api/employeeCount`)
      .then(res => {
        setEmployeeCount(res.data.employeeCount);
      }).catch(err => console.log(err));

    axios.get(`${import.meta.env.VITE_BE_URL}/api/salary`)
      .then((response) => {
        setSalary(response.data.result[0].sumOfSalary);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='container home-container'>
      <div className='row mt-5'>
        <div className='col-md-4'>
          <div className='card text-center shadow-sm custom-card' style={{ backgroundImage: `url('/images/admin-bg.jpg')` }}>
            <div className='card-header bg-primary text-white'>
              <h4>Admin</h4>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Total Admins</h5>
              <p className='card-text display-4'>{adminCount}</p>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card text-center shadow-sm custom-card' style={{ backgroundImage: `url('/images/employee-bg.jpg')` }}>
            <div className='card-header bg-success text-white'>
              <h4>Employee</h4>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Total Employees</h5>
              <p className='card-text display-4'>{employeeCount}</p>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card text-center shadow-sm custom-card' style={{ backgroundImage: `url('/images/salary-bg.jpg')` }}>
            <div className='card-header bg-warning text-dark'>
              <h4>Salary</h4>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Total Salary</h5>
              <p className='card-text display-4'>{salary}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <h3 className='mb-4'>Current Admin Session</h3>
        <div className='table-responsive'>
          <table className='table table-bordered table-hover custom-table'>
            <thead className='thead-dark'>
              <tr>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin@123</td>
                <td>Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
