import React from "react";

// Generate full month data dynamically
const generateAttendanceData = () => {
  const daysInMonth = 29; // February 2025 (leap year)
  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(2025, 1, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Saturday or Sunday

    data.push({
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      punchIn: isWeekend ? "--" : "10 AM",
      punchOut: isWeekend ? "--" : "7 PM",
      production: isWeekend ? "0 hrs" : "9 hrs",
      break: isWeekend ? "0 hrs" : "1 hr",
      overtime: isWeekend ? "0 hrs" : day % 2 === 0 ? "1 hr" : "0 hrs",
      isWeekend,
    });
  }

  return data;
};

const attendanceData = generateAttendanceData();

const AttendanceList = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      <h3 className="text-black text-xl font-semibold mb-4">
        Attendance List - February 2025
      </h3>

      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-sm text-left">
          {/* Table Header */}
          <thead className="border-b-2 border-gray-300">
            <tr className="text-gray-600">
              <th className="p-3">S. No</th>
              <th className="p-3">Date</th>
              <th className="p-3">In</th>
              <th className="p-3">Out</th>
              <th className="p-3">Prod</th>
              <th className="p-3">Break</th>
              <th className="p-3">OT</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {attendanceData.map((data, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  data.isWeekend
                    ? "bg-gray-100 text-gray-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td
                  className={`p-3 text-center ${
                    data.isWeekend ? "font-semibold" : ""
                  }`}
                >
                  {data.date}
                </td>
                <td className="p-3 text-center">{data.punchIn}</td>
                <td className="p-3 text-center">{data.punchOut}</td>
                <td className="p-3 text-center">{data.production}</td>
                <td className="p-3 text-center">{data.break}</td>
                <td className="p-3 text-center">{data.overtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend for weekends */}
      <div className="mt-3 text-xs text-gray-500">
        <p>
          <span className="inline-block w-3 h-3 bg-gray-100 border border-gray-400 rounded-sm mr-1"></span>
          Weekend (Saturday & Sunday)
        </p>
      </div>
    </div>
  );
};

export default AttendanceList;
