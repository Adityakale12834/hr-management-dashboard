import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const rows = [200, 150, 100, 50, 10];

// Sample heatmap data
const heatmapData = [
  [2, 3, 1, 3, 4, 2],
  [4, 3, 2, 3, 2, 1],
  [3, 2, 4, 3, 2, 4],
  [1, 4, 3, 2, 3, 2],
  [4, 3, 2, 1, 4, 3],
];

const shades = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#42A5F5", "#1E88E5"];

const AttendanceReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full  ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold ">Attendance Report</h2>

        {/* Date Picker */}
        <div className="flex items-center border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer hover:border-blue-500 transition-all">
          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMMM yyyy"
            className="outline-none cursor-pointer bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { value: 173, label: "Total Employees", color: "text-blue-600" },
          { value: 128, label: "On Time", color: "text-green-600" },
          { value: 21, label: "Absent", color: "text-red-600" },
          { value: 24, label: "Late", color: "text-yellow-600" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all flex flex-col justify-center items-center h-full"
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Attendance Heatmap */}
      <div className="grid grid-cols-7 gap-1 items-center w-full mb-6">
        {/* Row Labels */}
        <div className="col-span-1 flex flex-col gap-1">
          {rows.map((row, index) => (
            <p
              key={index}
              className="text-xs text-gray-500 text-right pr-2 h-8 flex items-center justify-end"
            >
              {row}
            </p>
          ))}
        </div>

        {/* Heatmap Cells */}
        <div className="col-span-6 grid grid-cols-6 gap-1">
          {heatmapData.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex} - ${colIndex}`}
                className="h-8 w-8 rounded-md hover:shadow-lg transition-all"
                style={{ backgroundColor: shades[value - 1] }}
              />
            ))
          )}
        </div>

        {/* Month Labels */}
        <div className="col-span-1"></div>
        <div className="col-span-6 grid grid-cols-6 gap-1">
          {months.map((month, index) => (
            <p
              key={index}
              className="text-center text-xs text-gray-500 justify-self-center"
            >
              {month}
            </p>
          ))}
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex justify-center items-center space-x-2">
        <p className="text-xs text-gray-500">Less</p>
        {shades.map((shade, index) => (
          <div
            key={index}
            className="h-4 w-4 rounded-sm"
            style={{ backgroundColor: shade }}
          />
        ))}
        <p className="text-xs text-gray-500">More</p>
      </div>
    </div>
  );
};

export default AttendanceReport;
