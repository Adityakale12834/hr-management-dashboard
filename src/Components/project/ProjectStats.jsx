import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const projectData = [
  { month: "Jan", AssignedProjects: 10 },
  { month: "Feb", AssignedProjects: 15 },
  { month: "Mar", AssignedProjects: 34 },
  { month: "Apr", AssignedProjects: 20 },
  { month: "May", AssignedProjects: 18 },
  { month: "Jun", AssignedProjects: 22 },
  { month: "Jul", AssignedProjects: 25 },
  { month: "Aug", AssignedProjects: 30 },
  { month: "Sep", AssignedProjects: 40 },
  { month: "Oct", AssignedProjects: 35 },
  { month: "Nov", AssignedProjects: 38 },
  { month: "Dec", AssignedProjects: 42 },
];

const timeWorkedData = [
  { date: "Dec 20", hours: 8 },
  { date: "Dec 21", hours: 9 },
  { date: "Dec 22", hours: 10 },
  { date: "Dec 23", hours: 11 },
  { date: "Dec 24", hours: 12 },
  { date: "Dec 25", hours: 13 },
  { date: "Dec 26", hours: 13.5 },
];

const CompanyPerformance = () => {
  return (
    <div>
      <div className="p-6 bg-white rounded-xl space-y-6 w-full flex h-[50vh] gap-5">
        {/* Project Completion Rate */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md inset-shadow-sm w-full h-full">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium">Project Completion Rate</h4>
            <button className="px-3 py-1 text-sm bg-gray-200 rounded-md">
              Monthly View
            </button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "6px" }}
              />
              <Line
                type="monotone"
                dataKey="AssignedProjects"
                stroke="#7c3aed"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Time Worked */}
        <div className="w-full">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md inset-shadow-sm h-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-medium">Total Time Worked</h4>
              <button className="px-3 py-1 text-sm bg-gray-200 rounded-md">
                Weekly View
              </button>
            </div>
            <div className="text-2xl font-bold">
              13 hr 26 min{" "}
              <span className="text-green-500 text-sm">+8.4% Vs Last Week</span>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={timeWorkedData}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "6px" }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#7c3aed"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* <div className="text-xs text-gray-500 mt-1">
            209 hr 43 min Total Time
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPerformance;
