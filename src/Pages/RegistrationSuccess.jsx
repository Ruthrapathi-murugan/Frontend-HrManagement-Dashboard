import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow-sm bg-white w-50 text-center">
        <h2 className="mb-4">Registration Successful!</h2>
        <p>Your account has been created successfully.</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
