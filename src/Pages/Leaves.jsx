import React from 'react';
import '../style.css';

const Leaves = () => {
    const holidays = [
        {
            name: 'New Year\'s Day',
            date: '2024-01-01',
            description: 'Celebration of the first day of the Gregorian calendar year.'
        },
        {
            name: 'Christmas Day',
            date: '2024-12-25',
            description: 'Celebration of the birth of Jesus Christ.'
        },
        {
            name: 'Independence Day',
            date: '2024-07-04',
            description: 'Celebration of the United States Declaration of Independence.'
        },
        {
            name: 'Thanksgiving Day',
            date: '2024-11-28',
            description: 'A day of giving thanks for the harvest and blessings of the past year.'
        },
        {
            name: 'Labor Day',
            date: '2024-09-02',
            description: 'Celebration of the contributions of workers.'
        },
        {
            name: 'Memorial Day',
            date: '2024-05-27',
            description: 'A day of remembrance for those who have died in military service.'
        }
    ];

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Office Holiday List 2024</h2>
            <div className="row">
                {holidays.map((holiday, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card holiday-card h-100">
                            <div className="card-header holiday-card-header">
                                <h5 className="card-title mb-0">{holiday.name}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><strong>Date:</strong> {holiday.date}</p>
                                <p className="card-text"><strong>Description:</strong> {holiday.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaves;
