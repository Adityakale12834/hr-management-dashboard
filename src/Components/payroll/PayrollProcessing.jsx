import { useState } from "react";
import {
  FiCalendar,
  FiDownload,
  FiUpload,
  FiCheckCircle,
  FiSearch,
} from "react-icons/fi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const PayrollProcessing = () => {
  const [payPeriod, setPayPeriod] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const deductions = [
    {
      id: 1,
      type: "Income Tax",
      description: "Federal income tax",
      amount: "15%",
    },
    {
      id: 2,
      type: "Social Security",
      description: "SSN contribution",
      amount: "6.2%",
    },
    { id: 3, type: "Medicare", description: "Medicare tax", amount: "1.45%" },
    {
      id: 4,
      type: "Health Insurance",
      description: "Company health plan",
      amount: "$200",
    },
    { id: 5, type: "401(k)", description: "Retirement plan", amount: "5%" },
  ];

  // Calculate total deductions
  const totalDeductions = deductions.reduce((sum, item) => {
    if (item.amount.includes("%")) {
      return sum; // Skip percentage for now (you can calculate based on salary if available)
    } else {
      const amount = parseFloat(item.amount.replace("$", "")) || 0;
      return sum + amount;
    }
  }, 0);

  // Export Payroll
  const handleExportPayroll = () => {
    const csv = [
      ["Type", "Description", "Amount/Percentage"],
      ...deductions.map((item) => [item.type, item.description, item.amount]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "payroll_data.csv");
  };

  // File Upload Handlers
  const handleFileUpload = (event) => {
    const file = event.target.files
      ? event.target.files[0]
      : event.dataTransfer.files[0];
    if (!file) return;

    setUploadedFile(file.name);
    setProcessing(true);

    if (file.type === "text/csv") {
      Papa.parse(file, {
        complete: (result) => {
          console.log("Parsed CSV data:", result.data);
          setProcessing(false);
          alert("CSV file processed successfully!");
        },
        header: true,
        skipEmptyLines: true,
        error: () => {
          setProcessing(false);
          alert("Error processing CSV file!");
        },
      });
    } else if (
      file.type.includes("spreadsheetml") ||
      file.type === "application/vnd.ms-excel"
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        console.log("Parsed Excel data:", parsedData);
        setProcessing(false);
        alert("Excel file processed successfully!");
      };
      reader.onerror = () => {
        setProcessing(false);
        alert("Error processing Excel file!");
      };
      reader.readAsBinaryString(file);
    } else {
      setProcessing(false);
      alert("Unsupported file format. Please upload CSV, XLS, or XLSX files.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileUpload(event);
  };

  // Filter deductions based on search
  const filteredDeductions = deductions.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Payroll Management
          </h2>
          <div className="flex items-center space-x-3">
            <select
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              className="block w-40 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-40 pl-10 pr-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-md font-medium text-gray-900 mb-2">Summary</h3>
            <p className="text-sm text-gray-600">
              Total Deductions: ${totalDeductions.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Pay Period: {payPeriod}</p>
            <p className="text-sm text-gray-600">
              Payment Date: {selectedDate || "Not set"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-md font-medium text-gray-900 mb-2">Status</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  processing ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: processing ? "50%" : "100%" }}
              ></div>
            </div>
            <p
              className={`text-sm mt-1 ${
                processing ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {processing ? "Processing..." : "Ready"}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-md font-medium text-gray-900">
                Deductions & Contributions
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
                />
                <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleExportPayroll}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiDownload className="mr-2 h-4 w-4" />
                Export Payroll
              </button>
              <button
                onClick={() => setProcessing(true)} // Simulate processing
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiCheckCircle className="mr-2 h-4 w-4" />
                Process Payroll
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount/Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDeductions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Import Hours & Data
        </h2>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Drag and drop files here
          </h3>
          <p className="mt-1 text-sm text-gray-500">CSV, XLS, or XLSX files</p>
          <div className="mt-6">
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors">
              <input
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
              Browse Files
            </label>
          </div>
          {processing && (
            <p className="mt-2 text-sm text-yellow-600">Processing file...</p>
          )}
          {uploadedFile && !processing && (
            <p className="mt-2 text-sm text-green-600">
              File uploaded: {uploadedFile}
            </p>
          )}
          {uploadedFile && (
            <button
              onClick={() => setUploadedFile(null)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Clear Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollProcessing;
