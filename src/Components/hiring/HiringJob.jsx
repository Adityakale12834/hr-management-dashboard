import React, { useState } from "react";

const JobListings = () => {
  const [activeTab, setActiveTab] = useState("Jobs");
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "QA Engineer",
      posts: 1,
      qualification: "MSc",
      experience: "0 years",
      lastDate: "10/12/2024",
      company: "Qloron",
      country: "India",
      state: "Maharashtra",
      postedDate: "10/12/2024",
      status: "Active",
    },
    {
      id: 2,
      title: "Test Engineer",
      posts: 2,
      qualification: "B.Tech/B.E.",
      experience: "1.5 years",
      lastDate: "16/12/2024",
      company: "Qloron",
      country: "India",
      state: "Maharashtra",
      postedDate: "11/12/2024",
      status: "Active",
    },
    {
      id: 3,
      title: "Senior QA",
      posts: 1,
      qualification: "BE",
      experience: "3 years",
      lastDate: "15/12/2024",
      company: "Qloron",
      country: "India",
      state: "Madhya Pradesh",
      postedDate: "12/12/2024",
      status: "Active",
    },
    {
      id: 4,
      title: "Software Engineer",
      posts: 5,
      qualification: "BE/B.Tech",
      experience: "N/A",
      lastDate: "N/A",
      company: "Qloron",
      country: "N/A",
      state: "Maharashtra",
      postedDate: "N/A",
      status: "Draft",
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    qualification: "",
    experience: "",
    lastDate: "",
    posts: "",
    company: "Qloron",
    country: "India",
    state: "Maharashtra",
    postedDate: new Date().toLocaleDateString("en-GB"),
    status: "Active",
  });

  const handleAddJob = () => {
    setJobs([
      ...jobs,
      {
        id: jobs.length + 1,
        ...newJob,
        postedDate: new Date().toLocaleDateString("en-GB"),
      },
    ]);
    setShowModal(false);
    setNewJob({
      title: "",
      qualification: "",
      experience: "",
      lastDate: "",
      posts: "",
      company: "Qloron",
      country: "India",
      state: "Maharashtra",
      postedDate: new Date().toLocaleDateString("en-GB"),
      status: "Active",
    });
  };

  const toggleStatus = (id, newStatus) => {
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
    setShowDropdown(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  // Filter jobs based on activeTab
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "Jobs") return job.status === "Active";
    if (activeTab === "Drafts") return job.status === "Draft";
    if (activeTab === "Archived") return job.status === "Inactive";
    return false;
  });

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
            <p className="text-gray-600">
              Manage all your job postings in one place
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Hiring
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {["Jobs", "Drafts", "Archived"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modal for Adding Hiring */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add New Hiring
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newJob.title}
                      placeholder="e.g. Software Engineer"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company*
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={newJob.company}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Posts*
                    </label>
                    <input
                      type="number"
                      name="posts"
                      value={newJob.posts}
                      placeholder="e.g. 5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification*
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={newJob.qualification}
                      placeholder="e.g. B.Tech, MSc"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience*
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={newJob.experience}
                      placeholder="e.g. 2-3 years"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Date*
                    </label>
                    <input
                      type="date"
                      name="lastDate"
                      value={newJob.lastDate}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country*
                    </label>
                    <select
                      name="country"
                      value={newJob.country}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <select
                      name="state"
                      value={newJob.state}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddJob}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Listings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-y-scroll max-h-[54vh]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {job.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.state}, {job.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.posts}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.qualification}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.experience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.lastDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : job.status === "Draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button
                          onClick={() =>
                            setShowDropdown(
                              showDropdown === job.id ? null : job.id
                            )
                          }
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {showDropdown === job.id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div
                              className="py-1"
                              role="menu"
                              aria-orientation="vertical"
                            >
                              <button
                                onClick={() => toggleStatus(job.id, "Active")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                role="menuitem"
                              >
                                Mark as Active
                              </button>
                              <button
                                onClick={() => toggleStatus(job.id, "Inactive")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                role="menuitem"
                              >
                                Mark as Inactive
                              </button>
                              <button
                                onClick={() => toggleStatus(job.id, "Draft")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                role="menuitem"
                              >
                                Save as Draft
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No {activeTab.toLowerCase()} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
