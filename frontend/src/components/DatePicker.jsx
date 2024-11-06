import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select date / category and search</label>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        dateFormat="yyyy-MM-dd"
        className="w-full bg-slate-200 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default DatePicker;
