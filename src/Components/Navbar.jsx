import React from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Employee from "./Employee";
// import Payroll from "./Payroll";
import Signup from "./auth/Signup";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../app/firebase";
import Horizontal_Nav from "./Horizontal_Nav";
import HiringNavBar from "./hiring/HiringNavBar";
// import { Calendar } from "lucide-react";
import { useState } from "react";
import {
  Home as hm,
  CheckSquare,
  Mail,
  Calendar as cl,
  Folder,
  Users,
  Clock,
  CreditCard,
  Briefcase,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Attendance from "./Attendance";
import ProjectHome from "./project/ProjectHome";
import Inbox from "./Inbox/Inbox";
import Calendar from "./calendar/Calendar";
import Tasks from "./tasks/Task";
import Projects from "./project/Project";
// import Payroll from "../Components/payroll/Payroll";
import Payroll from "./payroll/Navbar";
import ProjectDashboard from "./hiring/ProjectDashboard";

const auth = getAuth(app);

function Navbar() {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: hm, path: "/dashboard" },
    { name: "Tasks", icon: CheckSquare, path: "/task" },
    { name: "Inbox", icon: Mail, path: "/inbox" },
    { name: "Calendar", icon: cl, path: "/calendar" },
    { name: "Projects", icon: Folder, path: "/project" },
  ];

  //console.log("hello");

  const hrManagement = [
    { name: "Employees", icon: Users, path: "/employee" },
    { name: "Attendance", icon: Clock, path: "/attendance" },
    { name: "Payroll", icon: CreditCard, path: "/payroll" },
    { name: "Hiring", icon: Briefcase, path: "/hiring" },
  ];

  const analyticsReports = [
    { name: "Settings", icon: Settings },
    { name: "Help & Support", icon: HelpCircle },
  ];
  return (
    <div>
      <Horizontal_Nav />
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-700 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="default-sidebar"
          class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white shadow-md"
          aria-label="Sidebar"
        >
          {/* <div class="h-full px-3 py-4 overflow-y-auto">
            <ul class="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span class="ms-3">HR Dashboard</span>
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Z" />
                  </svg>
                  <span class="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/department"
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.418 3.623l-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="ms-3">Department</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/employee"
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span class="ms-3">Employee</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  </svg>
                  <span class="ms-3">Logout</span>
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="w-64 h-screen bg-white shadow-lg p-5 flex flex-col overflow-y-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold ">
                +
              </div>
              <h1 className="text-xl font-semibold">Efficio</h1>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-gray-100 mb-4">
              <img
                src="profile.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 bg-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">Arnold Smith</p>
                <p className="text-xs text-gray-500">arnoldsmith@gmail.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <div className="mb-6">
              {/* <p className="text-gray-500 text-sm">Main Menu</p> */}
              {menuItems.map((item) => (
                <Link to={item.path}>
                  <div
                    key={item.name}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      active === item.name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setActive(item.name)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mb-6">
              <p className="text-gray-500 text-sm">HR Management</p>
              {hrManagement.map((item) => (
                <Link to={item.path}>
                  <div
                    key={item.name}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      active === item.name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setActive(item.name)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mb-6">
              <p className="text-gray-500 text-sm">Analytics & Reports</p>
              {analyticsReports.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${
                    active === item.name ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div
                className="flex items-center p-3 rounded-lg cursor-pointer text-red-600"
                onClick={() => console.log("Logging out...")}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Log Out
              </div>
            </div>
          </div>
        </aside>

        <div class="p-4 sm:ml-64">
          <div class="px-4 rounded-lg dark:border-gray-700">
            {/* <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div> */}
            <Routes>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/task" element={<Tasks />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/hiring" element={<HiringNavBar />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
