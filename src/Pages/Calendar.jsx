import React, { useState } from 'react';
import '../style.css';

const Calendar = () => {
    const importantDates = [
        { date: '2024-01-01', title: 'New Year\'s Day', description: 'Celebration of the first day of the Gregorian calendar year.' },
        { date: '2024-03-15', title: 'Company Annual Meeting', description: 'Annual meeting to discuss company performance and plans.' },
        { date: '2024-07-04', title: 'Independence Day', description: 'Celebration of the United States Declaration of Independence.' },
        { date: '2024-12-25', title: 'Christmas Day', description: 'Celebration of the birth of Jesus Christ.' }
    ];

    const [modalData, setModalData] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        
        const calendarDays = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="day"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = `${currentYear}-${currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1}-${i < 10 ? `0${i}` : i}`;
            const important = importantDates.find(date => date.date === currentDate);
            calendarDays.push(
                <div
                    key={i}
                    className={`day ${important ? 'important' : ''}`}
                    onClick={() => important && setModalData(important)}
                >
                    {i}
                </div>
            );
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

    const handlePreviousMonth = () => {
        setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
        setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
        setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Company Calendar 2024</h2>
            <div className="navigation">
                <button className="btn btn-primary" onClick={handlePreviousMonth}>Previous</button>
                <h3>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h3>
                <button className="btn btn-primary" onClick={handleNextMonth}>Next</button>
            </div>
            {renderCalendar()}
            {modalData && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalData(null)}>&times;</span>
                        <h2>{modalData.title}</h2>
                        <p><strong>Date:</strong> {modalData.date}</p>
                        <p>{modalData.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
