import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash, FiSearch, FiDownload } from "react-icons/fi";

const AddEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    gross: "",
    taxes: "",
    net: "",
    performance: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!newEmployee.name) tempErrors.name = "Name is required";
    if (!newEmployee.role) tempErrors.role = "Role is required";
    if (!newEmployee.gross) tempErrors.gross = "Gross salary is required";
    if (!newEmployee.taxes) tempErrors.taxes = "Taxes are required";
    if (!newEmployee.net) tempErrors.net = "Net salary is required";
    if (!newEmployee.performance)
      tempErrors.performance = "Performance is required";
    if (!newEmployee.status) tempErrors.status = "Status is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddEmployee = () => {
    if (!validateForm()) return;

    if (editMode) {
      setEmployees(
        employees.map((emp) =>
          emp.id === currentEmployeeId
            ? { ...emp, ...newEmployee, id: emp.id }
            : emp
        )
      );
      setEditMode(false);
    } else {
      setEmployees([
        ...employees,
        { id: Date.now(), ...newEmployee }, // Use timestamp for unique ID
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
    setErrors({});
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

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Role", "Gross", "Taxes", "Net", "Performance", "Status"],
      ...employees.map((emp) => [
        emp.name,
        emp.role,
        emp.gross,
        emp.taxes,
        emp.net,
        emp.performance,
        emp.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees_data.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter and sort employees
  const filteredAndSortedEmployees = employees
    .filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "role") return a.role.localeCompare(b.role);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {/* <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="status">Sort by Status</option>
            </select> */}
            {/* <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FiDownload className="mr-2" /> Export
            </button> */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus className="mr-2" /> Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {emp.name}
                </h3>
                <p className="text-gray-600 text-sm">{emp.role}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="p-2 text-blue-600 hover:text-blue-800 transition"
                  title="Edit"
                >
                  <FiEdit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="p-2 text-red-600 hover:text-red-800 transition"
                  title="Delete"
                >
                  <FiTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Gross Salary:</span>
                <span className="font-medium text-gray-900">{emp.gross}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Taxes:</span>
                <span className="font-medium text-red-500">{emp.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Net Salary:</span>
                <span className="font-medium text-green-500">{emp.net}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Performance:</span>
                <span
                  className={`font-medium ${
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
              <div className="pt-2">
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
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
                  setErrors({});
                }}
                className="text-gray-500 hover:text-gray-700 transition"
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
            <form className="space-y-6">
              {["name", "role", "gross", "taxes", "net"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={newEmployee[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Performance
                  </label>
                  <select
                    name="performance"
                    value={newEmployee.performance}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.performance ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                  {errors.performance && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.performance}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newEmployee.status}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.status ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Status</option>
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="UNPAID">UNPAID</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                  )}
                </div>
              </div>
            </form>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
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
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
