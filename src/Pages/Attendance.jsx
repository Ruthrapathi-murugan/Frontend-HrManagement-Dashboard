import React, { useState } from 'react';
import '../style.css';

const Attendance = () => {
    const [attendance, setAttendance] = useState([
        {
            employee: 'John Doe',
            date: '2024-09-01',
            status: 'Present'
        },
        {
            employee: 'Jane Smith',
            date: '2024-09-01',
            status: 'Absent'
        },
        {
            employee: 'Sarah Johnson',
            date: '2024-09-01',
            status: 'Present'
        },
        {
            employee: 'Michael Brown',
            date: '2024-09-01',
            status: 'Late'
        }
    ]);

    const [newRecord, setNewRecord] = useState({
        employee: '',
        date: '',
        status: 'Present'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAttendance([...attendance, newRecord]);
        setNewRecord({
            employee: '',
            date: '',
            status: 'Present'
        });
    };

    const renderCalendar = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const daysInMonth = new Date(2024, 9, 0).getDate(); // Change 9 to the desired month (0-indexed)
        const firstDayOfMonth = new Date(2024, 8, 1).getDay(); // Change 8 to the desired month (0-indexed)
        
        const calendarDays = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="day"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(<div key={i} className="day">{i}</div>);
        }

        return (
            <div className="calendar">
                {daysOfWeek.map(day => (
                    <div key={day} className="day day-header">{day}</div>
                ))}
                {calendarDays}
            </div>
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Attendance Management</h2>
            
            {/* Attendance Form */}
            <div className="mb-4">
                <h4>Manual Attendance Entry</h4>
                <form onSubmit={handleSubmit} className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="employee" className="sr-only">Employee</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employee"
                            name="employee"
                            placeholder="Employee Name"
                            value={newRecord.employee}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="date" className="sr-only">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={newRecord.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="status" className="sr-only">Status</label>
                        <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={newRecord.status}
                            onChange={handleChange}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Add Record</button>
                </form>
            </div>

            {/* Attendance List */}
            <div className="row">
                {attendance.map((record, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card attendance-card h-100">
                            <div className="card-header attendance-card-header">
                                <h5 className="card-title mb-0">{record.employee}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><strong>Date:</strong> {record.date}</p>
                                <p className="card-text"><strong>Status:</strong> {record.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Calendar */}
            <h3 className="text-center mt-4">Calendar</h3>
            {renderCalendar()}
        </div>
    );
};

export default Attendance;
