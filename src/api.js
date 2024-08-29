// src/api.js
import axios from 'axios';


const apiUrl = 'http://localhost:5001'; // Replace with your actual backend URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/register', userData);
    return response.data; // Ensure your backend returns an object with a `msg` field
  } catch (error) {
    throw error; // Rethrow error to be caught in the component
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', credentials);
    return response.data; // Ensure this matches the backend response structure
  } catch (error) {
    throw error;
  }
};




// import axios from 'axios';

// const baseUrl = `${import.meta.env.VITE_BE_URL}`;

// // Function to register a new user
// // api.js
// // src/api.js


// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post('/api/register', userData); // Adjust the endpoint URL as needed
//     return response.data;
//   } catch (error) {
//     // Log error details for debugging
//     console.error('Registration Error:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };


// // Function to fetch all users (for login validation)
// export const fetchUsers = async () => {
//   try {
//     const response = await axios.get(`${baseUrl}/users`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };
