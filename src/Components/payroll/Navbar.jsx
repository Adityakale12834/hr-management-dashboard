// Navbar.jsx
import React, { useState } from "react";
import PayrollDashboardMetrics from "./DashboardMetrics";
import EmployeeList from "./Employee";
import PayrollProcessing from "./PayrollProcessing";
import Report from "./Reports";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    "Dashboard",
    "Employee List",
    "Payroll Processing",
    // 'Settings',
    // "Reports",
    // 'Approvals'
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="p-5 rounded-lg mt-1 min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4">Dashboard Content</h2>
            <PayrollDashboardMetrics />
            {/* <p>This is where your dashboard information would appear.</p> */}
          </div>
        );
      case "Employee List":
        return <EmployeeList />;
      case "Payroll Processing":
        return (
          <div className="p-5 border border-gray-200 rounded-lg mt-1 min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4">
              Payroll Processing Content
            </h2>
            <PayrollProcessing />
            {/* <p>This is where payroll processing would appear.</p> */}
          </div>
        );
      //   case 'Settings':
      //     return (
      //       <div className="p-5 border border-gray-200 rounded-lg mt-1 min-h-[300px]">
      //         <h2 className="text-2xl font-bold mb-4">Settings Content</h2>
      //         <p>This is where settings would appear.</p>
      //       </div>
      //     );
      // case "Reports":
      //   return (
      //     <div className="p-5 border border-gray-200 rounded-lg mt-1 min-h-[300px]">
      //       <h2 className="text-2xl font-bold mb-4">Reports Content</h2>
      //       <Report />
      //       {/* <p>This is where reports would appear.</p> */}
      //     </div>
      //   );
      case "Approvals":
        return (
          <div className="p-5 border border-gray-200 rounded-lg mt-1 min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4">Approvals Content</h2>
            {/* <p>This is where approvals would appear.</p> */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans">
      <nav className="bg-gray-50 py-2">
        <ul className="flex">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`px-5 py-2 cursor-pointer ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 font-bold"
                  : "border-b-4 border-transparent hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>
      <div className="content-area">{renderContent()}</div>
    </div>
  );
};

export default Navbar;
