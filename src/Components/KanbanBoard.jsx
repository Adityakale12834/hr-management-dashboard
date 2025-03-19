import { useState } from "react";
import { Calendar, Filter, Table, LayoutGrid, List } from "lucide-react";

const initialTasks = {
  NewRequest: [
    {
      title: "Employee Onboarding Approval",
      description:
        "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
      tags: ["Recruitment", "Compliance"],
    },
  ],
  InProgress: [
    {
      title: "Payroll Processing",
      description:
        "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
      tags: ["Finance", "Compensation"],
    },
  ],
  Complete: [
    {
      title: "Employee Satisfaction Survey",
      description:
        "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
      tags: ["Feedback", "Engagement"],
    },
  ],
};

const KanbanBoard = () => {
  const [kanbanTasks, setKanbanTasks] = useState(initialTasks);

  return (
    <div className="p-6 border border-gray-300 my-10 rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="border px-3 py-1 rounded flex items-center gap-2">
            <Calendar className="w-4 h-4" /> 01 March 2025
          </button>
          <button className="border px-3 py-1 rounded flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>
      <div className="my-5">
        <div className="flex gap-2">
          <button className="border px-3 py-1 rounded flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" /> Kanban
          </button>
          <button className="border px-3 py-1 rounded flex items-center gap-2">
            <Table className="w-4 h-4" /> Table
          </button>
          <button className="border px-3 py-1 rounded flex items-center gap-2">
            <List className="w-4 h-4" /> List View
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(kanbanTasks).map(([status, tasks]) => (
          <div key={status} className="bg-white p-4 rounded-lg shadow-lg">
            {/* <h3 className="text-lg font-semibold capitalize mb-4">
              {status.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <div className="border border-gray-300 p-2 rounded-lg mb-4 text-center cursor-pointer">
              +
            </div> */}
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex gap-2 mb-2">
                    {task.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-md font-bold">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
