import React from "react";
// import Sidebar from "../components/Sidebar";
import HiringNavBar from "./HiringNavBar";

const userData = {
  name: "John Doe",
  role: "Project Manager",
  avatar: "/images/avatar.png",
};

const ProjectDashboard = () => {
  return (
    <div className="flex bg-gray-100 h-screen  w-350">
      {/* Sidebar Section */}
      <div className="w-60 flex-shrink-0  bg-white shadow-lg">
        {/* <Sidebar userData={userData} /> */}
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-4 ml-10">
        <HiringNavBar />
      </div>
    </div>
  );
};

export default ProjectDashboard;
