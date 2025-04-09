// Navbar.jsx (Updated)
import React, { useState } from "react";
import HiringJob from "./HiringJob";
import ApplicationSection from "./ApplicationSection";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Job");

  const tabs = ["Job", "Application"];

  const renderContent = () => {
    switch (activeTab) {
      case "Job":
        return (
          <div className="p-6 border border-gray-200 shadow-md bg-white">
            <HiringJob />
          </div>
        );
      case "Application":
        return (
          <div className="p-6 border border-gray-200 shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Application Management
            </h2>
            <ApplicationSection />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans bg-gray-100">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        {/* <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">Hiring Dashboard</h1>
        </div> */}
        <ul className="flex space-x-6">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`px-4 py-2 cursor-pointer text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto">{renderContent()}</div>
    </div>
  );
};

export default Navbar;
