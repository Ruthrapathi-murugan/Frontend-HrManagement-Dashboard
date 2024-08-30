import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recruitment() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch initial data from local storage
    const storedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    setCandidates(storedCandidates);
  }, []);

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position: '',
    status: 'Interview Scheduled',
    email: '',
    phone: '',
    applicationDate: '',
    notes: '',
  });

  const handleStatusChange = async (id, newStatus) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    await axios.put(`http://localhost:5000/api/candidates/${id}`, { status: newStatus });
  };

  const handleNotesChange = async (id, newNotes) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, notes: newNotes } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    await axios.put(`http://localhost:5000/api/candidates/${id}`, { notes: newNotes });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prevCandidate => ({
      ...prevCandidate,
      [name]: value,
    }));
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const newCandidateWithId = {
      ...newCandidate,
      id: candidates.length + 1,
    };
    const updatedCandidates = [...candidates, newCandidateWithId];
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    
    await axios.post(`${import.meta.env.VITE_BE_URL}/api/candidates`, newCandidateWithId);

    setNewCandidate({
      name: '',
      position: '',
      status: 'Interview Scheduled',
      email: '',
      phone: '',
      applicationDate: '',
      notes: '',
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Recruitment Management</h2>
      
      {/* Add Candidate Form */}
      <form className="mb-4" onSubmit={handleAddCandidate}>
        <h4 className="mb-3">Add New Candidate</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={newCandidate.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="position"
              placeholder="Position"
              value={newCandidate.position}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={newCandidate.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              name="applicationDate"
              value={newCandidate.applicationDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="notes"
              placeholder="Notes"
              value={newCandidate.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Candidate</button>
      </form>

      {/* Candidates Table */}
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Candidate Name</th>
            <th>Position</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Application Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.position}</td>
              <td>
                <span className={`badge ${candidate.status === 'Hired' ? 'bg-success' : 'bg-info'}`}>
                  {candidate.status}
                </span>
              </td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.applicationDate}</td>
              <td>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={candidate.notes}
                  onChange={(e) => handleNotesChange(candidate.id, e.target.value)}
                  placeholder="Add notes"
                />
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button className="btn btn-warning btn-sm" onClick={() => handleStatusChange(candidate.id, 'Interview Scheduled')}>
                    Schedule Interview
                  </button>
                  <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(candidate.id, 'Hired')}>
                    Hire
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(candidate.id, 'Rejected')}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recruitment;
  