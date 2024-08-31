import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    salary: '',
    image: null,
    id: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!data.name || !data.email || !data.password || !data.address || !data.salary || !data.id || !data.image) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('address', data.address);
    formData.append('salary', data.salary);
    formData.append('image', data.image);
    formData.append('id', data.id);

    try {
      setLoading(true); // Set loading to true
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/api/employee`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.Status === 'Success') {
        // Store in local storage
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.push(response.data.Data);
        localStorage.setItem('employees', JSON.stringify(employees));

        // Reset form
        setData({
          name: '',
          email: '',
          password: '',
          address: '',
          salary: '',
          image: null,
          id: ''
        });

        navigate('/home/employee');
      } else {
        setError('Failed to add employee. Server response: ' + response.data.Message);
      }
    } catch (err) {
      setError('Failed to add employee. Error: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Employee</h2>
      {error && <p className='text-danger'>{error}</p>}
      {loading && <p className='text-info'>Submitting...</p>}
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputName' className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            id='inputName'
            placeholder='Enter Name'
            autoComplete='off'
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputEmail4' className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            id='inputEmail4'
            placeholder='Enter Email'
            autoComplete='off'
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputPassword4' className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            id='inputPassword4'
            placeholder='Enter Password'
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputSalary' className='form-label'>Salary</label>
          <input
            type='text'
            className='form-control'
            id='inputSalary'
            placeholder='Enter Salary'
            autoComplete='off'
            value={data.salary}
            onChange={e => setData({ ...data, salary: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputAddress' className='form-label'>Address</label>
          <input
            type='text'
            className='form-control'
            id='inputAddress'
            placeholder='1234 Main St'
            autoComplete='off'
            value={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div className='col-12 mb-3'>
          <label className='form-label' htmlFor='inputGroupFile01'>Select Image</label>
          <input
            type='file'
            className='form-control'
            id='inputGroupFile01'
            onChange={e => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputID' className='form-label'>Enter Registration ID</label>
          <input
            type='text'
            className='form-control'
            id='inputID'
            placeholder='ID'
            autoComplete='off'
            value={data.id}
            onChange={e => setData({ ...data, id: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
