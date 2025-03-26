// src/components/Statistics.jsx
import React from "react";

const Statistics = () => {
  const stats = [
    { label: "Overtime", value: "5 hrs", max: "", color: "bg-slate-700  " },
    {
      label: "This Month",
      value: "90",
      max: "160 hrs",
      color: "bg-slate-700  ",
    },
    {
      label: "Remaining",
      value: "90",
      max: "160 hrs",
      color: "bg-slate-700  ",
    },
    { label: "Today", value: "3.45", max: "8 hrs", color: "bg-slate-700  " },
    { label: "This Week", value: "28", max: "40 hrs", color: "bg-slate-700  " },
  ];
  return (
    <div className=" p-5 bg-white rounded-lg shadow-md inset-shadow-sm w-full">
      <h3 className="text-slate-900 text-xl font-semibold">Statistics</h3>
      {stats.map((stat, index) => (
        <div key={index} className="my-2">
          <p className="text-gray-500 text-xs mb-1 font-medium">{stat.label}</p>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className={`h-3 ${stat.color} rounded-full`}
              style={{
                width: stat.max
                  ? `${(parseFloat(stat.value) / parseFloat(stat.max)) * 100}%`
                  : "100%",
              }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1">
            {stat.value + " / " + stat.max}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
