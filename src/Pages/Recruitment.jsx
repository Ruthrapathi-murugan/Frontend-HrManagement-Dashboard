import React, { useState } from 'react';

function Recruitment() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Alice Johnson', position: 'Software Engineer', status: 'Interview Scheduled', email: 'alice@example.com', phone: '123-456-7890', applicationDate: '2024-08-15', notes: '' },
    { id: 2, name: 'Bob Smith', position: 'UI/UX Designer', status: 'Resume Reviewed', email: 'bob@example.com', phone: '987-654-3210', applicationDate: '2024-08-20', notes: '' },
    { id: 3, name: 'Charlie Brown', position: 'Project Manager', status: 'Hired', email: 'charlie@example.com', phone: '456-789-1230', applicationDate: '2024-08-10', notes: '' },
  ]);

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position: '',
    status: 'Interview Scheduled',
    email: '',
    phone: '',
    applicationDate: '',
    notes: '',
  });

  const handleStatusChange = (id, newStatus) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  const handleNotesChange = (id, newNotes) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate.id === id ? { ...candidate, notes: newNotes } : candidate
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prevCandidate => ({
      ...prevCandidate,
      [name]: value,
    }));
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    const newCandidateWithId = {
      ...newCandidate,
      id: candidates.length + 1,
    };
    setCandidates(prevCandidates => [...prevCandidates, newCandidateWithId]);
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
