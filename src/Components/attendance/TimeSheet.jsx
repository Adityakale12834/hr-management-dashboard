// src/components/Timesheet.jsx
import React, { useState, useEffect } from "react";

const Timesheet = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (time) => {
    return time.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-5 bg-white rounded-xl inset-shadow-sm shadow-md w-full">
      <h3 className="text-slate-900 text-xl font-semibold">Timesheet</h3>
      <p className="text-gray-500 text-xs">{formatDate(currentTime)}</p>
      <div className="flex items-center justify-center my-6">
        <div className="w-38 h-38 rounded-full border-4 border-slate-700 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-500">
            {formatTime(currentTime)}
          </span>
        </div>
      </div>

      <button className="w-full mx-auto bg-slate-700   text-white py-2 rounded-lg hover:bg-stone-800 hover:scale-105 transition duration-200 ">
        clockin
      </button>
      <div className="flex flex-col justify-between mt-4 text-gray-500 text-sm gap-2 font-sans">
        <p>Break: 1.21 hrs</p>
        <p>Overtime: 3 hrs</p>
      </div>
    </div>
  );
};

export default Timesheet;
