import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", baseSalary: 100000, bonuses: 10000 },
  { month: "Feb", baseSalary: 103000, bonuses: 12000 },
  { month: "Mar", baseSalary: 102000, bonuses: 11000 },
  { month: "Apr", baseSalary: 98000, bonuses: 7000 },
  { month: "May", baseSalary: 107000, bonuses: 13000 },
  { month: "Jun", baseSalary: 111000, bonuses: 14000 },
];

const MonthlySalaryTrend = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Legend />
        <Bar
          dataKey="baseSalary"
          stackId="a"
          fill="#3498db"
          name="Base Salary"
        />
        <Bar dataKey="bonuses" stackId="a" fill="#2ecc71" name="Bonuses" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlySalaryTrend;
