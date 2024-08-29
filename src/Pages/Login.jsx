import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../style.css';
import axios from 'axios'; // Ensure axios is installed

function Login() {
  const authStatus = localStorage.getItem("authStatus");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isChecked) {
      setError("Please agree to the terms and policies.");
      return;
    }

    try {
      // Make API request to login
      const response = await axios.post('http://localhost:5000/api/login', values);
      
      // On successful login, save the token and set auth status
      localStorage.setItem("authStatus", "authenticated");
      localStorage.setItem("token", response.data.token); // Save token for authenticated API requests
      
      navigate("/home"); // Redirect to home page
    } catch (err) {
      console.error('Login failed:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid email or password');
      }
    }
  };

  if (authStatus === "authenticated") {
    console.log("Already Authenticated");
    return <Navigate to="/home" />;
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>
          {error && error}
        </div>
        <h2>HR Dashboard Admin - Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email" style={{ marginRight: '40px' }}><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              onChange={handleChange}
              className='form-control rounded-0'
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3' style={{ marginTop: '10px' }}>
            <label htmlFor="password" style={{ marginRight: '10px' }}><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              onChange={handleChange}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-success w-48 rounded-0'>
              Log in
            </button>
            <button
              type='button'
              onClick={() => navigate('/registration')}
              className='btn btn-primary w-48 rounded-0'
            >
              Register
            </button>
          </div>
          <div className='mb-3 mt-3'>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={isChecked}
                onChange={e => {
                  setIsChecked(e.target.checked);
                  setError(""); // Clear the error message when the checkbox is checked
                }}
                style={{ marginRight: '5px' }}
              />
              You agree to our terms and policies
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
