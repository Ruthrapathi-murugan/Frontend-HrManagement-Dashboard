import React, { useState } from 'react';
import axios from 'axios';

function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([
    // Initial data if any
  ]);

  const [form, setForm] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    department: '',
    reason: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    if (!form.employeeName || !form.leaveType || !form.startDate || !form.endDate || !form.department || !form.reason) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const responseLocal = await axios.post(`${import.meta.env.VITE_BE_URL}/api/leave-requests`, form);
      const responseMongo = await axios.post(`${import.meta.env.VITE_BE_URL}/api/leave-requests`, form); // Assuming same backend URL for both
      
      setLeaveRequests([...leaveRequests, responseLocal.data]);
      setForm({
        employeeName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        department: '',
        reason: '',
      });
    } catch (error) {
      console.error('Error adding leave request:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BE_URL}/api/leave-requests/${id}`, { status: 'Approved' });
      setLeaveRequests(leaveRequests.map(request => request.id === id ? { ...request, status: 'Approved' } : request));
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BE_URL}/api/leave-requests/${id}`, { status: 'Rejected' });
      setLeaveRequests(leaveRequests.map(request => request.id === id ? { ...request, status: 'Rejected' } : request));
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Leave Management</h2>
      
      <form onSubmit={handleAddRequest} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name="employeeName"
              value={form.employeeName}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Employee Name"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="leaveType"
              value={form.leaveType}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Leave Type"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Start Date"
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="End Date"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Department"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="reason"
              value={form.reason}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Reason"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Leave Request</button>
      </form>

      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Department</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employeeName}</td>
              <td>{request.leaveType}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.department}</td>
              <td>{request.reason}</td>
              <td>
                <span className={`badge ${request.status === 'Approved' ? 'bg-success' : request.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                  {request.status}
                </span>
              </td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(request.id)}>
                  Approve
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleReject(request.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveManagement;
