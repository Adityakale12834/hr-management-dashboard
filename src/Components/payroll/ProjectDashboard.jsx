import React from "react";
import Sidebar from "../components/Sidebar";
// import PayrollDashboardMetrics from "../components/PayrollDashboardMetrics";
import PayrollNavBar from "../components/PayrollNavBar";

const userData = {
  name: "John Doe",
  role: "Project Manager",
  avatar: "/images/avatar.png",
};

const ProjectDashboard = () => {
  return (
    <div className="flex bg-gray-100 h-screen">
      {/* Sidebar Section */}
      <div className="w-60 flex-shrink-0 bg-white shadow-lg">
        <Sidebar userData={userData} />
      </div>
      <div className="w-350 ml-4 flex flex-col flex-grow overflow-y-auto p-6 space-y-8">
        <PayrollNavBar />
        {/* Dashboard Metrics */}
        {/* <PayrollDashboardMetrics /> */}
      </div>
    </div>
  );
};

export default ProjectDashboard;
