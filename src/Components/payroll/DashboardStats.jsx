import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// Register required components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const DashboardStats = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
      {/* Line Chart Component */}
      <div className="w-full md:w-2/3 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Task Rate Trends
          </h3>
          <p className="text-sm text-gray-500"></p>
        </div>

        <div className="h-80">
          <Line data={data} options={options} />
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div>Last updated: {new Date().toLocaleDateString()}</div>
          <div className="flex space-x-2"></div>
        </div>
      </div>

      {/* Payment Status Component */}
      <div className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Status
          </h3>
        </div>

        <div className="space-y-6">
          <PaymentStatusItem
            status="Paid"
            percentage={36}
            color="bg-emerald-500"
          />
          <PaymentStatusItem
            status="Pending"
            percentage={27}
            color="bg-amber-500"
          />
          <PaymentStatusItem
            status="Unpaid"
            percentage={36}
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

const PaymentStatusItem = ({ status, percentage, color }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-600">{percentage}%</span>
        <span className="text-sm font-medium text-gray-600">{status}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Chart data and options (same as original)
const data = {
  labels: [
    "10/21/2022",
    "10/23/2022",
    "10/25/2022",
    "10/27/2022",
    "10/29/2022",
    "11/02/2022",
    "11/06/2022",
  ],
  datasets: [
    {
      label: "Created",
      data: [5, 20, 35, 50, 70, 100, 115],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      pointBackgroundColor: "#10b981",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      tension: 0.3,
      fill: true,
    },
    {
      label: "Completed",
      data: [3, 18, 33, 48, 68, 95, 120],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      pointBackgroundColor: "#3b82f6",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      tension: 0.3,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          family: "Inter, sans-serif",
          size: 12,
          weight: "500",
        },
        color: "#4b5563",
      },
    },
    tooltip: {
      backgroundColor: "#1f2937",
      titleFont: {
        family: "Inter, sans-serif",
        size: 12,
        weight: "normal",
      },
      bodyFont: {
        family: "Inter, sans-serif",
        size: 12,
      },
      padding: 10,
      usePointStyle: true,
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#6b7280",
        font: {
          family: "Inter, sans-serif",
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: "rgba(229, 231, 235, 0.5)",
        drawBorder: false,
      },
      ticks: {
        color: "#6b7280",
        font: {
          family: "Inter, sans-serif",
          size: 11,
        },
        padding: 10,
      },
      beginAtZero: true,
    },
  },
  elements: {
    line: {
      cubicInterpolationMode: "monotone",
    },
  },
};

export default DashboardStats;
