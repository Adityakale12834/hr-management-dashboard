import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const generateGradient = (ctx, colorStart, colorEnd) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
};

const DailyRecords = () => {
  const chartRef = useRef(null);

  // Generate slate gradient colors
  const getGradientData = () => {
    const chart = chartRef.current;
    if (!chart) return [];

    const ctx = chart.ctx;
    return [
      generateGradient(ctx, "#E2E8F0", "#CBD5E1"), // slate-200 → slate-300
      generateGradient(ctx, "#CBD5E1", "#94A3B8"), // slate-300 → slate-400
      generateGradient(ctx, "#94A3B8", "#64748B"), // slate-400 → slate-500
      generateGradient(ctx, "#64748B", "#475569"), // slate-500 → slate-600
      generateGradient(ctx, "#475569", "#334155"), // slate-600 → slate-700
    ];
  };

  const data = {
    labels: ["29 Feb", "30 Feb", "01 Mar", "02 Mar", "03 Mar"],
    datasets: [
      {
        label: "Hours Worked",
        data: [7, 9, 6, 11, 12],
        backgroundColor: getGradientData(),
        borderColor: ["#94A3B8", "#64748B", "#475569", "#334155", "#1E293B"], // slate shades
        borderWidth: 1.5,
        hoverBackgroundColor: "#CBD5E1", // slate-300
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 10,
          color: "#1E293B", // slate-900
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1E293B", // slate-900
        titleColor: "#F8FAFC", // slate-50
        bodyColor: "#F8FAFC", // slate-50
        padding: 10,
        displayColors: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#1E293B", // slate-900
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 15,
        ticks: {
          stepSize: 3,
          color: "#1E293B", // slate-900
          font: {
            size: 12,
          },
        },
      },
    },
  };

  useEffect(() => {
    getGradientData(); // Update gradients after mount
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto inset-shadow-sm">
      <h3 className="text-black text-xl font-semibold mb-4">
        Daily Records - Work Hours
      </h3>

      <div className="relative w-full h-64">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      <div className="mt-4 text-sm text-slate-600 text-center">
        <p>
          <span className="font-semibold text-black">Average:</span> 8.4 hrs/day
          | <span className="font-semibold text-black">Max:</span> 12 hrs on 01
          Mar
        </p>
      </div>
    </div>
  );
};

export default DailyRecords;
