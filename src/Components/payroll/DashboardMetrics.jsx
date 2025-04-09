import React from "react";
// import PayrollMonthlyGraph from "./";
import PayrollGraph from "./MonthlySalaryTrend";
import Reports from "./Reports";

const DashboardMetrics = () => {
  const metrics = [
    {
      icon: "💵",
      title: "Total Payroll",
      value: "$53,098",
      trend: "+3% from last month",
      isPositive: true,
      bgColor: "bg-blue-50",
    },
    {
      icon: "👥",
      title: "Employees",
      value: "450",
      trend: "+9 since January",
      isPositive: true,
      bgColor: "bg-green-50",
    },
    {
      icon: "📅",
      title: "Next Payroll",
      value: "April 1",
      trend: "$128k estimated",
      isPositive: true,
      bgColor: "bg-purple-50",
    },
    {
      icon: "🖥",
      title: "Resources",
      value: "101/120",
      trend: "+2% from last month",
      isPositive: true,
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-md border border-gray-100 bg-white hover:shadow-lg transition-all duration-300"
          >
            {/* <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-2xl text-gray-700">{item.icon}</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                {item.trend}
              </span>
            </div> */}
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
              {item.trend}
            </span>
            <h3 className="text-sm font-medium text-gray-500 mt-4">
              {item.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {item.value}
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <svg
                className={`w-4 h-4 ${
                  item.isPositive ? "text-green-500" : "text-red-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {item.isPositive ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                )}
              </svg>
              <span
                className={`ml-2 font-medium ${
                  item.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.trend.split(" ")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Payroll Overview
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                Monthly
              </button>
              <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                Quarterly
              </button>
              <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                Yearly
              </button>
            </div>
          </div>
          {/* <PayrollMonthlyGraph /> */}
        {/* </div> */}

        <div className="bg-white p-6 w-full">
          {/* <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Payroll Distribution
            </h2>
            <select className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Last 2 Years</option>
            </select>
          </div>
          <PayrollGraph /> */}
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
