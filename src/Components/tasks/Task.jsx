import React, { useState } from "react";
import {
  FiPlus,
  FiCheck,
  FiX,
  FiTrash2,
  FiEdit2,
  FiMail,
  FiCalendar,
  FiFlag,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

// Initialize EmailJS with your user ID
emailjs.init("f50uI3YwhVu4gZ15K");

const TaskManager = () => {
  // State for tasks and UI
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [selectedTaskForEmail, setSelectedTaskForEmail] = useState(null);

  const users = [
    { name: "Aditya kale", email: "adityakale11011@gmail.com" },
    { name: "Rahul", email: "rahul@gmail.com" },
    { name: "Saurabh", email: "saurabh@gmail.com" },
  ];
  // Form states
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [emailData, setEmailData] = useState({
    recipient: "",
    message: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  // Task CRUD operations
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      ...newTask,
      id: Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    resetTaskForm();
    setIsTaskModalOpen(false);
    toast.success("Successfully added the Task", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const updateTask = (e) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, ...newTask } : task
      )
    );
    toast.success("Successfully added the Task", {
      //   icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    resetTaskForm();
    setEditingTaskId(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Successfully added the Task", {
      //   icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  const resetTaskForm = () => {
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
  };

  // Email handling
  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailData.recipient || !selectedTaskForEmail) return;

    setIsSendingEmail(true);

    try {
      await emailjs.send("service_ml66teg", "template_3xyxkcf", {
        to_email: emailData.recipient,
        message: emailData.message,
        from_name: "Task Manager App",
        title: selectedTaskForEmail.title,
        description:
          selectedTaskForEmail.description || "No description provided",
        dueDate: selectedTaskForEmail.dueDate
          ? new Date(selectedTaskForEmail.dueDate).toLocaleDateString()
          : "No due date set",
        priority: selectedTaskForEmail.priority,
      });

      //   alert("Email sent successfully!");
      toast.success("Email Sent successfully", {
        //   icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setIsEmailModalOpen(false);
      setEmailData({ recipient: "", message: "" });
      setSelectedTaskForEmail(null);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Open email modal with task data
  const openEmailModalWithTask = (task) => {
    setSelectedTaskForEmail(task);
    setIsEmailModalOpen(true);
  };

  // Priority helpers
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="p-6 w-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            {/* <p className="text-gray-600">Organize your work efficiently</p> */}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <FiPlus /> Add Task
          </motion.button>
        </header>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Tasks</h3>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter((t) => t.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter((t) => t.status === "completed").length}
            </p>
          </div>
        </div> */}

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending ({tasks.filter((t) => t.status === "pending").length || 0})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed (
            {tasks.filter((t) => t.status === "completed").length || 0})
          </button>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                No tasks found. Create your first task!
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-100 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-1 ${
                          task.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {task.status === "completed" && (
                          <FiCheck className="text-white text-xs" />
                        )}
                        {/* {task.status === "pending" && (
                        //   <FiCheck className="text-gray-800 text-xs" />
                        )} */}
                      </button>

                      <div className="flex-1 ml-3">
                        <h3
                          className={`font-semibold ${
                            task.status === "completed"
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-gray-600 text-sm mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 text-white">
                        <button
                          onClick={() => {
                            setNewTask({
                              title: task.title,
                              description: task.description,
                              dueDate: task.dueDate,
                              priority: task.priority,
                            });
                            setEditingTaskId(task.id);
                            setIsTaskModalOpen(true);
                          }}
                          className="text-gray-100 hover:text-white p-2 bg-amber-400 rounded-md"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => openEmailModalWithTask(task)}
                          className="text-gray-100 hover:text-white bg-blue-500 p-2 rounded-md"
                        >
                          <FiMail />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-100 hover:text-white p-2 bg-red-500 rounded-md"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {task.dueDate && (
                        <span className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          <FiCalendar className="mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded ${getPriorityStyle(
                          task.priority
                        )}`}
                      >
                        <FiFlag className="inline mr-1" />
                        {task.priority}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          task.status === "completed"
                            ? "bg-green-200"
                            : "bg-pink-300"
                        }`}
                      >
                        {/* <FiFlag className="inline mr-1" /> */}
                        {task.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {isTaskModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50 fixed.inset-0"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-semibold">
                  {editingTaskId ? "Edit Task" : "Add New Task"}
                </h2>
                <button
                  onClick={() => {
                    setIsTaskModalOpen(false);
                    setEditingTaskId(null);
                    resetTaskForm();
                  }}
                >
                  <FiX className="text-gray-500" />
                </button>
              </div>

              <form
                onSubmit={editingTaskId ? updateTask : addTask}
                className="p-4"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title*</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTaskModalOpen(false);
                      setEditingTaskId(null);
                      resetTaskForm();
                    }}
                    className="px-4 py-2 text-gray-700 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingTaskId ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-semibold">Share Task via Email</h2>
                <button
                  onClick={() => {
                    setIsEmailModalOpen(false);
                    setSelectedTaskForEmail(null);
                  }}
                  disabled={isSendingEmail}
                >
                  <FiX className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Recipient Email*
                  </label>
                  <select
                    value={emailData.recipient}
                    onChange={(e) =>
                      setEmailData({ ...emailData, recipient: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={isSendingEmail}
                  >
                    <option value="">Select Recipient</option>
                    {users.map((user, index) => (
                      <option key={index} value={user.email}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Task Details
                  </label>
                  <div className="bg-gray-50 p-3 rounded border text-sm">
                    <p className="font-medium">
                      {selectedTaskForEmail?.title || "No title"}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {selectedTaskForEmail?.description ||
                        "No description provided"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedTaskForEmail?.dueDate && (
                        <span className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          <FiCalendar className="mr-1" />
                          {new Date(
                            selectedTaskForEmail.dueDate
                          ).toLocaleDateString()}
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          selectedTaskForEmail
                            ? getPriorityStyle(selectedTaskForEmail.priority)
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <FiFlag className="inline mr-1" />
                        {selectedTaskForEmail?.priority || "No priority set"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    value={emailData.message}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    rows="3"
                    disabled={isSendingEmail}
                    placeholder="Add any additional information here..."
                  />
                </div> */}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEmailModalOpen(false);
                      setSelectedTaskForEmail(null);
                    }}
                    className="px-4 py-2 text-gray-700 border rounded"
                    disabled={isSendingEmail}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700 flex items-center justify-center min-w-24"
                    disabled={isSendingEmail}
                  >
                    {isSendingEmail ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Email"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskManager;
