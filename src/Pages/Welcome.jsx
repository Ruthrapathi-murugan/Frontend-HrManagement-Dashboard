import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?office,corporate)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Overlay for darkening the background image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2,
        }}
      />
      
      <div
        className="text-center p-5 rounded"
        style={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
        }}
      >
        <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Welcome to the HR Management Dashboard
        </h1>
        <h2 style={{ fontWeight: '300', fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Developed by Ruthrapathi-Murugan
        </h2>
        <p className="mb-4" style={{ fontSize: '1.5rem', fontWeight: '300', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Please click the buttons below to login or register as an admin
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary btn-lg"
            style={{ fontSize: '1.2rem', padding: '10px 20px', boxShadow: '3px 3px 10px rgba(0,0,0,0.3)' }}
            onClick={() => navigate('/login')}
          >
            Admin Login
          </button>
          <button
            className="btn btn-secondary btn-lg"
            style={{ fontSize: '1.2rem', padding: '10px 20px', boxShadow: '3px 3px 10px rgba(0,0,0,0.3)' }}
            onClick={() => navigate('/registration')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
  