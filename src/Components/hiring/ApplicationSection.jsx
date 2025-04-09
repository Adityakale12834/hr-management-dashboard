import React, { useState } from "react";

const ApplicationSection = () => {
  const initialApplications = [
    {
      id: 1,
      applicantName: "John Doe",
      jobTitle: "Software Engineer",
      applicationDate: "12/10/2024",
      stage: "New",
      email: "john.doe@email.com",
      resume: "john_doe_resume.pdf",
      coverLetter: "cover_letter.pdf",
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      jobTitle: "QA Engineer",
      applicationDate: "12/11/2024",
      stage: "In Review",
      email: "jane.smith@email.com",
      resume: "jane_smith_resume.pdf",
      coverLetter: "cover_letter.pdf",
    },
    {
      id: 3,
      applicantName: "Mike Johnson",
      jobTitle: "Senior QA",
      applicationDate: "12/12/2024",
      stage: "Interview Scheduled",
      email: "mike.johnson@email.com",
      resume: "mike_johnson_resume.pdf",
      coverLetter: "cover_letter.pdf",
    },
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    applicantName: "",
    jobTitle: "",
    interviewers: "",
    interviewDate: "",
    startTime: "",
    endTime: "",
    type: "Video",
    locationLink: "",
    notes: "",
  });

  const hiringStages = [
    "New",
    "In Review",
    "Interview Scheduled",
    "Hired",
    "Rejected",
  ];

  const filteredApplications = applications.filter(
    (application) =>
      application.applicantName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const updateStage = (id, newStage) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, stage: newStage } : app
      )
    );
  };

  const getAvailableActions = (currentStage) => {
    const stageIndex = hiringStages.indexOf(currentStage);
    if (stageIndex === -1 || stageIndex === hiringStages.length - 1) return [];

    const actions = [];
    if (currentStage === "New") {
      actions.push({ label: "Mark as In Review", stage: "In Review" });
    } else if (currentStage === "In Review") {
      actions.push({
        label: "Schedule Interview",
        stage: "Interview Scheduled",
      });
    } else if (currentStage === "Interview Scheduled") {
      actions.push({ label: "Hire", stage: "Hired" });
      actions.push({ label: "Reject", stage: "Rejected" });
    }
    return actions;
  };

  const handleAction = (id, newStage) => {
    if (newStage === "Interview Scheduled") {
      const application = applications.find((app) => app.id === id);
      handleScheduleInterview(application);
    } else {
      updateStage(id, newStage);
    }
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetailsModal(true);
  };

  const handleScheduleInterview = (applicant) => {
    setSelectedApplicant(applicant);
    setScheduleData({
      applicantName: applicant.applicantName,
      jobTitle: applicant.jobTitle,
      interviewers: "",
      interviewDate: "",
      startTime: "",
      endTime: "",
      type: "Video",
      locationLink: "",
      notes: "",
    });
    setShowScheduleModal(true);
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    console.log("Scheduled Interview:", scheduleData);
    alert("Interview scheduled!");
    setShowScheduleModal(false);
    updateStage(selectedApplicant.id, "Interview Scheduled");
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Job Applications
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all job applications through the hiring
                process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Applicant Name",
                    "Job Title",
                    "Application Date",
                    "Stage",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide cursor-pointer hover:bg-gray-200 transition"
                      onClick={() =>
                        handleSort(header.toLowerCase().replace(" ", ""))
                      }
                    >
                      {header}
                      {sortConfig.key ===
                        header.toLowerCase().replace(" ", "") && (
                        <span className="ml-1 text-gray-500">
                          {sortConfig.direction === "ascending" ? " ↑" : " ↓"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {application.applicantName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {application.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {application.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {application.applicationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {application.stage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition focus:outline-none"
                      >
                        View Details
                      </button>
                      {getAvailableActions(application.stage).map((action) => (
                        <button
                          key={action.stage}
                          onClick={() =>
                            handleAction(application.id, action.stage)
                          }
                          className={`px-3 py-1 rounded-md text-white transition focus:outline-none ${
                            action.label === "Mark as In Review"
                              ? "bg-gray-500 hover:bg-gray-600"
                              : action.label === "Schedule Interview"
                              ? "bg-green-500 hover:bg-green-600"
                              : action.label === "Hire"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-red-500 hover:bg-red-600" // For "Reject"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Applicant Details */}
        {showDetailsModal && selectedApplicant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Applicant Details
                  </h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
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

                <div className="space-y-6">
                  {[
                    {
                      label: "Applicant Name",
                      value: selectedApplicant.applicantName,
                    },
                    { label: "Job Title", value: selectedApplicant.jobTitle },
                    { label: "Email", value: selectedApplicant.email },
                    {
                      label: "Application Date",
                      value: selectedApplicant.applicationDate,
                    },
                    { label: "Current Stage", value: selectedApplicant.stage },
                    {
                      label: "Resume",
                      value: selectedApplicant.resume,
                      isLink: true,
                    },
                    {
                      label: "Cover Letter",
                      value: selectedApplicant.coverLetter,
                      isLink: true,
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <label className="block text-sm font-medium text-gray-700">
                        {item.label}
                      </label>
                      {item.isLink ? (
                        <a
                          href="#"
                          className="mt-1 text-blue-600 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-gray-900">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                  >
                    Close
                  </button>
                  {getAvailableActions(selectedApplicant.stage).map(
                    (action) => (
                      <button
                        key={action.stage}
                        onClick={() => {
                          handleAction(selectedApplicant.id, action.stage);
                          setShowDetailsModal(false);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                      >
                        {action.label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Scheduling Interview */}
        {showScheduleModal && selectedApplicant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Schedule Interview
                  </h2>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
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

                <form onSubmit={handleScheduleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Applicant Name
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      value={scheduleData.applicantName}
                      onChange={handleScheduleChange}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={scheduleData.jobTitle}
                      onChange={handleScheduleChange}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Interviewer(s)
                    </label>
                    <input
                      type="text"
                      name="interviewers"
                      value={scheduleData.interviewers}
                      onChange={handleScheduleChange}
                      placeholder="Enter interviewer names"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Interview Date
                    </label>
                    <input
                      type="date"
                      name="interviewDate"
                      value={scheduleData.interviewDate}
                      onChange={handleScheduleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={scheduleData.startTime}
                      onChange={handleScheduleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={scheduleData.endTime}
                      onChange={handleScheduleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      name="type"
                      value={scheduleData.type}
                      onChange={handleScheduleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="Phone">Phone</option>
                      <option value="Video">Video</option>
                      <option value="In-person">In-person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location/Link
                    </label>
                    <input
                      type="text"
                      name="locationLink"
                      value={scheduleData.locationLink}
                      onChange={handleScheduleChange}
                      placeholder="Enter location or video conference link"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={scheduleData.notes}
                      onChange={handleScheduleChange}
                      placeholder="Add any additional notes"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      rows={4}
                    />
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowScheduleModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                    >
                      Schedule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationSection;
