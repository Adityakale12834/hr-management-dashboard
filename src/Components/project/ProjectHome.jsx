import React from "react";
import ProjectTimeline from "./ProjectStats";
import TimelineProject from "./TimeLine";

const ProjectHome = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-xl font-semibold mb-5">Company Performance</h3>
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">Total Projects</h4>
          <p className="text-2xl font-bold">128</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">Completed</h4>
          <p className="text-2xl font-bold text-green-500">85</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">In Progress</h4>
          <p className="text-2xl font-bold text-yellow-500">30</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">Pending</h4>
          <p className="text-2xl font-bold text-red-500">13</p>
        </div>
      </div>

      {/* Project Timeline */}

      <ProjectTimeline />
      <div className="mt-6">
        <TimelineProject />
      </div>
    </div>
  );
};

export default ProjectHome;
