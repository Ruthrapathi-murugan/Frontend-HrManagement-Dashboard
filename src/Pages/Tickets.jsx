import React, { useState } from 'react';
import '../style.css';

const Tickets = () => {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            title: 'Issue with Payroll',
            description: 'Incorrect payroll for the last month.',
            status: 'Open'
        },
        {
            id: 2,
            title: 'Equipment Request',
            description: 'Request for new laptop.',
            status: 'In Progress'
        },
        {
            id: 3,
            title: 'Access Issue',
            description: 'Unable to access internal system.',
            status: 'Resolved'
        }
    ]);

    const [newTicket, setNewTicket] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTicket({
            ...newTicket,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicketEntry = {
            id: tickets.length + 1,
            title: newTicket.title,
            description: newTicket.description,
            status: 'Open'
        };
        setTickets([...tickets, newTicketEntry]);
        setNewTicket({
            title: '',
            description: ''
        });
    };

    return (
        <div className="container mt-4 tickets-container">
            <h2 className="text-center mb-4">Tickets</h2>

            {/* Ticket Form */}
            <div className="ticket-form">
                <h4>Raise a Ticket</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={newTicket.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={newTicket.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Ticket</button>
                </form>
            </div>

            {/* Ticket List */}
            <div className="ticket-list">
                <h4>Existing Tickets</h4>
                <div className="row">
                    {tickets.map(ticket => (
                        <div className="col-md-4 mb-4" key={ticket.id}>
                            <div className="card ticket-card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{ticket.title}</h5>
                                    <p className="card-text">{ticket.description}</p>
                                    <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tickets;
