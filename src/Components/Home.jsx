import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import AttendanceReport from "./AttendanceReport";
import KanbanBoard from "./KanbanBoard";

const COLORS = ["#4CAF50", "#FF7043"];

const Dashboard = () => {
  const [view, setView] = useState("kanban");
  const employeeStats = {
    total: 173,
    active: 128,
    inactive: 21,
    newHires: 24,
    jobApplicants: 983,
    attendanceRate: "75%",
    revenue: "$4,842.00",
  };

  const genderRatio = [
    { name: "Male", value: 60 },
    { name: "Female", value: 40 },
  ];

  const salaryDistribution = [
    { department: "HR", salary: 5000 },
    { department: "Engineering", salary: 12000 },
    { department: "Marketing", salary: 8000 },
  ];

  const revenueTrends = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 4600 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 5000 },
  ];

  const departmentWiseEmployees = [
    { department: "HR", count: 20 },
    { department: "Engineering", count: 90 },
    { department: "Marketing", count: 40 },
    { department: "Sales", count: 23 },
  ];
  const kanbanTasks = {
    newRequest: [
      {
        title: "Employee Onboarding Approval",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: ["Recruitment", "Compliance"],
      },
    ],
    inProgress: [
      {
        title: "Payroll Processing",
        description:
          "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
        tags: ["Finance", "Compensation"],
      },
    ],
    complete: [
      {
        title: "Employee Satisfaction Survey",
        description:
          "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
        tags: ["Feedback", "Engagement"],
      },
    ],
  };
  const stats = [
    {
      title: "Total Employees",
      value: 173,
      change: 1.8,
      description: "+16 from last month",
    },
    {
      title: "Job Applicant",
      value: 983,
      change: 2.4,
      description: "+32 from last month",
    },
    {
      title: "Total Revenue",
      value: "$4,842.00",
      change: 4.2,
      description: "+$3,834.00 from last month",
    },
    {
      title: "Attendance Rate",
      value: "75%",
      change: -1.7,
      description: "-6.4% from last month",
    },
  ];

  return (
    <div className="p-6 text-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hallo, Arnold Smith</h1>
          <p className="text-gray-600">Wednesday, 06 March 2025</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Export
        </button>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-gray-500 text-sm font-medium flex items-center justify-between">
                  {stat.title}
                  <button className="text-gray-400">⋮</button>
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      stat.change > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {stat.change > 0
                      ? `▲ ${stat.change}%`
                      : `▼ ${Math.abs(stat.change)}%`}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
              </div>
              <button className="text-blue-500 text-sm font-medium mt-2 text-start">
                Details →
              </button>
            </div>
          ))}
        </div>

        {/* Attendance Report */}
        <div className="grid grid-cols-1 ">
          {/* Placeholder for Graph */}
          {/* <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              📊 Attendance Graph Here
            </div> */}
          {/* <div className="mt-4 flex justify-between text-sm text-gray-600">
              <p>
                <strong>173</strong> Total Employees
              </p>
              <p>
                <strong>128</strong> On Time
              </p>
              <p>
                <strong>21</strong> Absent
              </p>
              <p>
                <strong>24</strong> Late
              </p>
            </div> */}
          <AttendanceReport />
        </div>
      </div>

      {/* Task Management */}
      {/* <div className="mt-8 border p-3 rounded-lg border-gray-300 shadow-2xs">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(kanbanTasks).map(([status, tasks]) => (
            <div key={status} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold capitalize mb-4">
                {status.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex gap-2 mb-2">
                      {task.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-md font-bold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <KanbanBoard />
      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monthly Revenue Trends */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrends}>
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4CAF50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department-wise Employee Count */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Department-wise Employee Count
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentWiseEmployees}>
              <XAxis dataKey="department" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Bar dataKey="count" fill="#FF5733" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
