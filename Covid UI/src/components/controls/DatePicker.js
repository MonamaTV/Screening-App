import React from 'react';
import './DatePicker.css';


const DatePicker = ({handleDateChange}) => {
    
    return (
        <input
            type="date"
            onChange={handleDateChange} 
        />
    )
}

export default DatePicker;
