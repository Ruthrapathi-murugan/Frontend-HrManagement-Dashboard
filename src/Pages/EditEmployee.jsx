import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`)
      .then(res => {
        if (res.data.Status === 'Success') {
          setEmployee(res.data.Result);
        } else {
          setError('Error fetching employee data');
        }
      })
      .catch(err => setError('Error: ' + err.message));
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);

    try {
      const response = await axios.put(`${import.meta.env.VITE_BE_URL}/api/employees/${id}`, formData);
      if (response.data.Status === 'Success') {
        navigate('/employee');
      } else {
        setError('Failed to update employee. Server response: ' + response.data.Message);
      }
    } catch (err) {
      setError('Failed to update employee. Error: ' + err.message);
    }
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Edit Employee</h2>
      {error && <p className='text-danger'>{error}</p>}
      {employee && (
        <form className='row g-3 w-50' onSubmit={handleUpdate}>
          {/* Form fields similar to AddEmployee */}
          <button type='submit' className='btn btn-primary'>Update</button>
        </form>
      )}
    </div>
  );
}

export default EditEmployee;
