import React, { useState } from 'react';
import '../style.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([
        {
            name: 'Onboard New Employee',
            description: 'Complete the onboarding process for the new marketing intern.',
            assignedTo: 'John Doe',
            dueDate: '2024-09-15',
            status: 'In Progress'
        },
        {
            name: 'Conduct Annual Performance Review',
            description: 'Evaluate the performance of all team members for the annual review.',
            assignedTo: 'Jane Smith',
            dueDate: '2024-09-30',
            status: 'Pending'
        },
        {
            name: 'Update Employee Handbook',
            description: 'Revise the employee handbook with the latest policies and procedures.',
            assignedTo: 'Sarah Johnson',
            dueDate: '2024-10-05',
            status: 'Completed'
        }
    ]);

    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        status: 'Pending'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, newTask]);
        setNewTask({
            name: '',
            description: '',
            assignedTo: '',
            dueDate: '',
            status: 'Pending'
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">HR Management Tasks</h2>

            {/* Task Form */}
            <div className="mb-4">
                <h4>Add a New Task</h4>
                <form onSubmit={handleSubmit} className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="name" className="sr-only">Task Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Task Name"
                            value={newTask.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="description" className="sr-only">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Description"
                            rows="2"
                            value={newTask.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="assignedTo" className="sr-only">Assigned To</label>
                        <input
                            type="text"
                            className="form-control"
                            id="assignedTo"
                            name="assignedTo"
                            placeholder="Assigned To"
                            value={newTask.assignedTo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="dueDate" className="sr-only">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dueDate"
                            name="dueDate"
                            value={newTask.dueDate}
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
                            value={newTask.status}
                            onChange={handleChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Add Task</button>
                </form>
            </div>

            {/* Task List */}
            <div className="row">
                {tasks.map((task, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card task-card h-100">
                            <div className="card-header task-card-header">
                                <h5 className="card-title mb-0">{task.name}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><strong>Description:</strong> {task.description}</p>
                                <p className="card-text"><strong>Assigned To:</strong> {task.assignedTo}</p>
                                <p className="card-text"><strong>Due Date:</strong> {task.dueDate}</p>
                                <p className="card-text"><strong>Status:</strong> {task.status}</p>
                                <a href="#" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
