import React, { useState } from "react";

const AddEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Arjun Mehta",
      role: "CEO",
      gross: "$11,475",
      taxes: "- $2,295",
      net: "$9,180",
      performance: "Good",
      status: "UNPAID",
    },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    gross: "",
    taxes: "",
    net: "",
    performance: "",
    status: "",
  });

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    if (editMode) {
      setEmployees(
        employees.map((emp) =>
          emp.id === currentEmployeeId ? { ...emp, ...newEmployee } : emp
        )
      );
      setEditMode(false);
    } else {
      setEmployees([
        ...employees,
        { id: employees.length + 1, ...newEmployee },
      ]);
    }
    setShowModal(false);
    setNewEmployee({
      name: "",
      role: "",
      gross: "",
      taxes: "",
      net: "",
      performance: "",
      status: "",
    });
  };

  const handleEdit = (employee) => {
    setNewEmployee({
      name: employee.name,
      role: employee.role,
      gross: employee.gross,
      taxes: employee.taxes,
      net: employee.net,
      performance: employee.performance,
      status: employee.status,
    });
    setCurrentEmployeeId(employee.id);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition border border-gray-300"
        onClick={() => setShowModal(true)}
      >
        + Add Employee
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editMode ? "Edit Employee" : "Add New Employee"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setNewEmployee({
                    name: "",
                    role: "",
                    gross: "",
                    taxes: "",
                    net: "",
                    performance: "",
                    status: "",
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="name"
                  value={newEmployee.name}
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="role"
                  value={newEmployee.role}
                  placeholder="Role"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gross
                  </label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="gross"
                    value={newEmployee.gross}
                    placeholder="Gross Salary"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taxes
                  </label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="taxes"
                    value={newEmployee.taxes}
                    placeholder="Taxes"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Net
                  </label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="net"
                    value={newEmployee.net}
                    placeholder="Net Salary"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Performance
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="performance"
                    value={newEmployee.performance}
                    onChange={handleChange}
                  >
                    <option value="">Select Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="status"
                    value={newEmployee.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="UNPAID">UNPAID</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-100 transition"
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setNewEmployee({
                    name: "",
                    role: "",
                    gross: "",
                    taxes: "",
                    net: "",
                    performance: "",
                    status: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-black font-medium rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddEmployee}
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {emp.name}
                </h3>
                <p className="text-gray-500 text-sm">{emp.role}</p>
              </div>
              <button
                onClick={() => handleEdit(emp)}
                className="text-black hover:text-blue-600"
                title="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Gross:</span>
                <span className="text-gray-900">{emp.gross}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Taxes:</span>
                <span className="text-red-500">{emp.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Net:</span>
                <span className="text-green-500">{emp.net}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Performance:</span>
                <span
                  className={`${
                    emp.performance === "Excellent"
                      ? "text-green-600"
                      : emp.performance === "Good"
                      ? "text-blue-600"
                      : emp.performance === "Average"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {emp.performance}
                </span>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-100">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    emp.status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : emp.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {emp.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEmployee;
