import React from "react";
import { Calendar, Info, Bell, Square } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const rows = [200, 150, 100, 50, 10]; // Labels on the left (Y-axis)

// Sample heatmap data
const heatmapData = [
  [1, 2, 1, 2, 1, 1], // Row 1
  [2, 2, 2, 2, 2, 2], // Row 2
  [3, 2, 2, 3, 2, 3], // Row 3
  [3, 3, 3, 4, 3, 3], // Row 4
  [4, 4, 4, 4, 4, 4], // Row 5
];

// Define shades of blue based on intensity
const shades = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#42A5F5", "#1E88E5"];

const AttendanceReport = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Attendance Report</h2>
        <div className="flex items-center border px-3 py-2 rounded-lg text-gray-700">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <span>01 March 2025</span>
        </div>
        {/* <div className="flex space-x-3">
          <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
          <Square className="w-5 h-5 text-gray-500 cursor-pointer" />
          <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div> */}
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-4 gap-6 text-center mb-6">
        <div>
          <p className="text-3xl font-bold">173</p>
          <p className="text-sm text-gray-500">Total Employees</p>
        </div>
        <div>
          <p className="text-3xl font-bold">128</p>
          <p className="text-sm text-gray-500">On Time</p>
        </div>
        <div>
          <p className="text-3xl font-bold">21</p>
          <p className="text-sm text-gray-500">Absent</p>
        </div>
        <div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-gray-500">Late</p>
        </div>
      </div>

      {/* Attendance Heatmap */}
      <div className="grid grid-cols-7 gap-1 items-center w-full">
        {/* Heatmap with Y-axis labels */}
        {heatmapData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Y-axis label for each row */}
            <p className="text-sm text-gray-500 self-center">
              {rows[rowIndex]}
            </p>

            {/* Heatmap Row */}
            {row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="h-8 w-10 rounded-md"
                style={{ backgroundColor: shades[value - 1] }}
              />
            ))}
          </React.Fragment>
        ))}
        {/* X-axis labels (Months) */}
        <div className="col-span-1"></div>{" "}
        {/* Empty space to align with Y-axis */}
        {months.map((month, index) => (
          <p key={index} className="text-center text-sm text-gray-500">
            {month}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AttendanceReport;
