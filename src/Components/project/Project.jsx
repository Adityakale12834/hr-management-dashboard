import React, { useEffect, useState } from "react";
import { auth, db } from "../../app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiPlus,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Projects = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [showWelcomeBox, setShowWelcomeBox] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [showProjectOptions, setShowProjectOptions] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    team: [],
    startDate: "",
    endDate: "",
    tasks: [],
  });
  const [newTask, setNewTask] = useState({
    name: "",
    status: "pending",
  });
  const navigate = useNavigate();

  const maharashtrianEmployees = [
    { id: 21, name: "Rajiv Kulkarni", position: "Business Analyst" },
    { id: 22, name: "Anjali Deshpande", position: "Project Manager" },
    { id: 23, name: "Vikram Joshi", position: "Solutions Architect" },
    { id: 24, name: "Sandeep Patil", position: "Senior Developer" },
    { id: 25, name: "Priya Gaikwad", position: "UX Designer" },
    { id: 26, name: "Amit Pawar", position: "DevOps Engineer" },
    { id: 27, name: "Sonali Bhalerao", position: "Product Owner" },
    { id: 28, name: "Rahul Mhatre", position: "QA Engineer" },
    { id: 29, name: "Neha Sathe", position: "Frontend Developer" },
    { id: 30, name: "Rohan More", position: "Backend Developer" },
  ];

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Cloud Migration Initiative",
      status: "active",
      priority: "high",
      progress: 65,
      team: [
        { id: 3, name: "Amit Kulkarni", position: "CTO" },
        { id: 4, name: "Neha Patil", position: "VP of Engineering" },
        { id: 13, name: "Aditya Rane", position: "Data Scientist" },
      ],
      description: "Migrate company infrastructure to AWS cloud platform",
      startDate: "2025-01-15",
      endDate: "2025-04-30",
      tasks: [
        { id: 1, name: "Assessment", status: "completed" },
        { id: 2, name: "Data Migration", status: "in-progress" },
        { id: 3, name: "Testing", status: "pending" },
      ],
    },
    {
      id: 2,
      title: "DevOps Pipeline Implementation",
      status: "active",
      priority: "high",
      progress: 35,
      team: [
        { id: 5, name: "Vikram Chavan", position: "Senior Developer" },
        { id: 17, name: "Rohit Naik", position: "Backend Developer" },
        { id: 16, name: "Anjali Mhatre", position: "Frontend Developer" },
      ],
      description: "Implement CI/CD pipeline using Jenkins and Kubernetes",
      startDate: "2025-02-10",
      endDate: "2025-05-20",
      tasks: [
        { id: 1, name: "Tool Selection", status: "completed" },
        { id: 2, name: "Configuration", status: "in-progress" },
        { id: 3, name: "Deployment", status: "pending" },
      ],
    },
    {
      id: 3,
      title: "Cybersecurity Enhancement",
      status: "completed",
      priority: "high",
      progress: 100,
      team: [
        { id: 3, name: "Amit Kulkarni", position: "CTO" },
        { id: 12, name: "Shreya Salvi", position: "Product Manager" },
        { id: 4, name: "Neha Patil", position: "VP of Engineering" },
      ],
      description: "Upgrade security protocols and implement new firewall",
      startDate: "2024-11-01",
      endDate: "2025-01-31",
      tasks: [
        { id: 1, name: "Vulnerability Assessment", status: "completed" },
        { id: 2, name: "Implementation", status: "completed" },
        { id: 3, name: "Training", status: "completed" },
      ],
    },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such user data!");
        }
      } else {
        navigate("/signup");
      }
    };

    fetchUserData();

    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDateTime(now.toLocaleDateString("en-US", options));
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-gray-200 text-gray-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-200 text-red-800";
      case "medium":
        return "bg-yellow-200 text-yellow-800";
      case "low":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <FiClock className="mr-1" />;
      case "completed":
        return <FiCheckCircle className="mr-1" />;
      case "pending":
        return <FiAlertCircle className="mr-1" />;
      default:
        return null;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamSelect = (employee) => {
    setNewProject((prev) => {
      if (prev.team.some((m) => m.id === employee.id)) {
        return {
          ...prev,
          team: prev.team.filter((member) => member.id !== employee.id),
        };
      } else {
        return { ...prev, team: [...prev.team, employee] };
      }
    });
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (newTask.name.trim()) {
      setNewProject((prev) => ({
        ...prev,
        tasks: [
          ...prev.tasks,
          {
            id: prev.tasks.length + 1,
            name: newTask.name,
            status: newTask.status,
          },
        ],
      }));
      setNewTask({ name: "", status: "pending" });
    }
  };

  const handleRemoveTask = (taskId) => {
    setNewProject((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }));
  };

  const handleAddProject = () => {
    const newProjectObj = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      status: newProject.status,
      priority: newProject.priority,
      progress:
        newProject.status === "completed"
          ? 100
          : newProject.status === "pending"
          ? 0
          : 30,
      team: newProject.team,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      tasks: newProject.tasks,
    };

    setProjects([...projects, newProjectObj]);
    setNewProject({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      team: [],
      startDate: "",
      endDate: "",
      tasks: [],
    });
    setNewTask({
      name: "",
      status: "pending",
    });
    setShowNewProjectForm(false);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    setShowProjectOptions(null);
  };

  const statusPieData = [
    {
      name: "Active",
      value: projects.filter((p) => p.status === "active").length,
      color: "#4A90E2", // Soft blue
    },
    {
      name: "Completed",
      value: projects.filter((p) => p.status === "completed").length,
      color: "#50C878", // Soft green
    },
    {
      name: "Pending",
      value: projects.filter((p) => p.status === "pending").length,
      color: "#F4A460", // Soft yellow-orange
    },
  ];

  const priorityPieData = [
    {
      name: "High",
      value: projects.filter((p) => p.priority === "high").length,
      color: "#E57373", // Soft red
    },
    {
      name: "Medium",
      value: projects.filter((p) => p.priority === "medium").length,
      color: "#F4A460", // Soft yellow-orange
    },
    {
      name: "Low",
      value: projects.filter((p) => p.priority === "low").length,
      color: "#50C878", // Soft green
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1 p-8">
        {showWelcomeBox && (
          <div className="bg-white rounded-lg p-4 mb-6 shadow-md relative border-t-4 border-gray-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowWelcomeBox(false)}
            >
              <FiX size={20} />
            </button>
            <p className="text-gray-800 text-lg font-semibold">
              Manage your projects efficiently—track progress, assign tasks, and
              collaborate with your team!
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Projects Dashboard
            </h1>
            <p className="text-sm text-gray-600 font-medium">{dateTime}</p>
          </div>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => setShowNewProjectForm(true)}
          >
            <FiPlus className="mr-2" /> New Project
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "all"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              All Status
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "pending"
                  ? "bg-yellow-300 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "active"
                  ? "bg-blue-300 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setStatusFilter("active")}
            >
              In Progress
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "completed"
                  ? "bg-green-300 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md ${
                priorityFilter === "all"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setPriorityFilter("all")}
            >
              All Priority
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                priorityFilter === "high"
                  ? "bg-red-300 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setPriorityFilter("high")}
            >
              High
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                priorityFilter === "medium"
                  ? "bg-yellow-300 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setPriorityFilter("medium")}
            >
              Medium
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                priorityFilter === "low"
                  ? "bg-green-300 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setPriorityFilter("low")}
            >
              Low
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Projects by Status
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Projects by Priority
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {priorityPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {showNewProjectForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Create New Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleNewProjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleNewProjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="pending">Pending</option>
                  <option value="active">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newProject.priority}
                  onChange={handleNewProjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleNewProjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleNewProjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleNewProjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  rows="3"
                  placeholder="Enter project description"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Members
                </label>
                <div className="flex flex-wrap gap-2">
                  {maharashtrianEmployees.map((employee) => (
                    <button
                      key={employee.id}
                      type="button"
                      onClick={() => handleTeamSelect(employee)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newProject.team.some((m) => m.id === employee.id)
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {employee.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tasks
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    name="name"
                    value={newTask.name}
                    onChange={handleTaskChange}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Task name"
                  />
                  <select
                    name="status"
                    value={newTask.status}
                    onChange={handleTaskChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Add Task
                  </button>
                </div>

                {newProject.tasks.length > 0 && (
                  <div className="border rounded-md p-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Current Tasks ({newProject.tasks.length})
                    </h4>
                    <ul className="space-y-2">
                      {newProject.tasks.map((task) => (
                        <li
                          key={task.id}
                          className="flex justify-between items-center bg-gray-50 p-2 rounded"
                        >
                          <div className="flex items-center">
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                task.status === "completed"
                                  ? "bg-green-500"
                                  : task.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                            ></span>
                            <span>{task.name}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveTask(task.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setShowNewProjectForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={handleAddProject}
                disabled={!newProject.title || !newProject.description}
              >
                Create Project
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-gray-300 relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setShowProjectOptions(
                      showProjectOptions === project.id ? null : project.id
                    )
                  }
                >
                  <FiMoreVertical />
                </button>
                {showProjectOptions === project.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setShowProjectOptions(null);
                      }}
                    >
                      <FiEdit className="mr-2" /> Edit
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {project.title}
                </h2>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-3 py-1 text-sm rounded-full flex items-center ${getStatusColor(
                      project.status
                    )} mb-1`}
                  >
                    {getStatusIcon(project.status)}
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(
                      project.priority
                    )}`}
                  >
                    {project.priority.charAt(0).toUpperCase() +
                      project.priority.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      project.status === "completed"
                        ? "bg-green-500"
                        : project.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium">Start:</span>{" "}
                  {project.startDate}
                </div>
                <div>
                  <span className="font-medium">End:</span> {project.endDate}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiUsers className="mr-1" /> Team ({project.team.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.team.slice(0, 3).map((member, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {member.name.split(" ")[0]}
                    </span>
                  ))}
                  {project.team.length > 3 && (
                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                      +{project.team.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Tasks ({project.tasks.length})
                </h4>
                <ul className="space-y-2">
                  {project.tasks.map((task) => (
                    <li key={task.id} className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          task.status === "completed"
                            ? "bg-green-500"
                            : task.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span
                        className={`text-sm ${
                          task.status === "completed"
                            ? "line-through text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {task.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Project Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-gray-200 p-2 rounded-full mr-3">
                <FiCheckCircle className="text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Cloud Migration Initiative
                </p>
                <p className="text-gray-600 text-sm">
                  Data migration phase completed (65% overall progress)
                </p>
                <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-200 p-2 rounded-full mr-3">
                <FiUsers className="text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  DevOps Pipeline Implementation
                </p>
                <p className="text-gray-600 text-sm">
                  Vikram Chavan added 2 new team members
                </p>
                <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-200 p-2 rounded-full mr-3">
                <FiAlertCircle className="text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  IoT Infrastructure Setup
                </p>
                <p className="text-gray-600 text-sm">
                  Hardware delivery delayed - awaiting vendor response
                </p>
                <p className="text-gray-400 text-xs mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <FiX size={24} />
            </button>

            <img
              src={userData?.profileImage}
              alt="Enlarged Profile"
              className="max-w-[90vw] max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
