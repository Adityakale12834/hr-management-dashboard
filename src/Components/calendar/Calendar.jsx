import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  isAfter,
  getDay,
  parseISO,
} from "date-fns";
import { auth, db } from "../../app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showHolidaysPopup, setShowHolidaysPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("holidays");
  const [formData, setFormData] = useState({
    type: "meeting",
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
    id: null,
  });
  const [userData, setUserData] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);

  const navigate = useNavigate();

  // Fetch user data
  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       const user = auth.currentUser;

  //       if (user) {
  //         const userRef = doc(db, "users", user.uid);
  //         const docSnap = await getDoc(userRef);

  //         if (docSnap.exists()) {
  //           setUserData(docSnap.data());
  //         } else {
  //           console.log("No such user data!");
  //         }
  //       } else {
  //         navigate("/login");
  //       }
  //     };

  //     fetchUserData();
  //   }, [navigate]);

  // Fetch holidays from Calendarific API
  useEffect(() => {
    const fetchHolidays = async () => {
      const currentYear = new Date().getFullYear();
      const country = "IN"; // Change this to your country code

      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=i32QKH1jWlPqCqdMITZLvDVQt0SMi5yd&country=${country}&year=${currentYear}`
        );
        const data = await response.json();

        if (data.response && data.response.holidays) {
          const formattedHolidays = data.response.holidays.map((holiday) => ({
            id: holiday.date.iso,
            type: "holiday",
            title: holiday.name,
            date: holiday.date.iso,
            description: holiday.description || "Public holiday",
            month: new Date(holiday.date.iso).getMonth(),
          }));

          setHolidays(formattedHolidays);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
        // Fallback to sample holidays if API fails
        const sampleHolidays = [
          {
            id: 1,
            type: "holiday",
            title: "New Year",
            date: format(new Date(currentYear, 0, 1), "yyyy-MM-dd"),
            description: "First day of the year",
            month: 0,
          },
          {
            id: 2,
            type: "holiday",
            title: "Independence Day",
            date: format(new Date(currentYear, 7, 15), "yyyy-MM-dd"),
            description: "National holiday",
            month: 7,
          },
        ];
        setHolidays(sampleHolidays);
      }
    };

    fetchHolidays();
  }, []);

  // Load sample notes on first render
  useEffect(() => {
    const sampleNotes = [
      {
        id: 3,
        type: "meeting",
        title: "Team Meeting",
        date: format(new Date(), "yyyy-MM-dd"),
        description: "Quarterly planning session",
      },
      {
        id: 4,
        type: "note",
        title: "Project Deadline",
        date: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
        description: "Submit final project deliverables",
      },
    ];
    setEvents(sampleNotes);
  }, []);

  // Group holidays by month
  const groupHolidaysByMonth = () => {
    const grouped = {};

    holidays.forEach((holiday) => {
      const month = new Date(holiday.date).getMonth();
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(holiday);
    });

    // Sort months and holidays within months
    const sortedMonths = {};
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    monthNames.forEach((month, index) => {
      if (grouped[index]) {
        sortedMonths[month] = grouped[index].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      }
    });

    return sortedMonths;
  };

  const holidaysByMonth = groupHolidaysByMonth();

  // Calendar calculations with proper day alignment
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDay = getDay(monthStart); // Get day of week (0-6)

  // Generate days array with proper offset
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const daysArray = [];

  // Add empty slots for days before the start of the month
  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }

  // Add actual days of the month
  daysArray.push(...daysInMonth);

  // Navigation
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setShowAllEvents(false);
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setShowAllEvents(false);
  };

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEvents;

    if (formData.id) {
      updatedEvents = events.map((ev) =>
        ev.id === formData.id ? formData : ev
      );
    } else {
      updatedEvents = [...events, { ...formData, id: Date.now() }];
    }

    setEvents(updatedEvents);
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  const resetForm = () =>
    setFormData({
      type: "meeting",
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
      id: null,
    });

  // Helper functions
  const getDayEvents = (day) => {
    if (!day) return [];
    const allEvents = [...events, ...holidays];
    return allEvents.filter((ev) => isSameDay(parseISO(ev.date), day));
  };

  const getCurrentMonthEvents = () => {
    const allEvents = [...events, ...holidays];
    return allEvents.filter((ev) => {
      if (activeTab === "holidays") {
        return (
          ev.type === "holiday" &&
          isWithinInterval(parseISO(ev.date), {
            start: monthStart,
            end: monthEnd,
          })
        );
      } else {
        return (
          (ev.type === "note" || ev.type === "meeting") &&
          isWithinInterval(parseISO(ev.date), {
            start: monthStart,
            end: monthEnd,
          })
        );
      }
    });
  };

  // Get upcoming 3 holidays
  const upcomingHolidays = holidays
    .filter((holiday) => isAfter(parseISO(holiday.date), new Date()))
    .sort((a, b) => parseISO(a.date) - parseISO(b.date))
    .slice(0, 3);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <div className="flex ">
      {/* <Sidebar
        userData={userData}
        handleLogout={handleLogout}
        openModal={openProfileModal}
      /> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Navbar /> */}

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-600 flex items-center">
                <FiCalendar className="mr-2" />
                {activeTab === "holidays"
                  ? "Company Calendar"
                  : "Personal Events"}
              </h1>

              <div className="flex items-center gap-4">
                {activeTab === "notes" && (
                  <button
                    onClick={() => {
                      setFormData({
                        type: "meeting",
                        title: "",
                        date: format(new Date(), "yyyy-MM-dd"),
                        description: "",
                        id: null,
                      });
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-black hover:scale-105 transition ease-in flex items-center shadow-md"
                  >
                    <FiPlus className="mr-2" />
                    Add Event
                  </button>
                )}
                <div className="flex rounded-md">
                  <button
                    onClick={() => {
                      setActiveTab("holidays");
                      setShowAllEvents(false);
                    }}
                    className={`px-4 py-2 ${
                      activeTab === "holidays"
                        ? "bg-slate-200 text-black hover:bg-slate-300 hover:transition ease-in-out hover:scale-105 rounded-md"
                        : "bg-white"
                    }`}
                  >
                    Holidays
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("notes");
                      setShowAllEvents(false);
                    }}
                    className={`px-4 py-2 ${
                      activeTab === "notes"
                        ? "bg-slate-100 text-black hover:bg-slate-300 hover:transition ease-in-out hover:scale-105 rounded-md"
                        : "bg-white"
                    }`}
                  >
                    My Events
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-slate-600 hover:text-white hover:scale-110 hover:ease-in-out text-md hover:font-bold rounded border"
                  >
                    &lt;
                  </button>
                  <span className="font-semibold hover:bg-gray-100 py-2 rounded-md px-1">
                    {format(currentDate, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-slate-600 hover:text-white hover:scale-110 hover:ease-in-out text-md hover:font-bold rounded border"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Holidays (only shown on holidays tab) */}
            {/* {activeTab === "holidays" && upcomingHolidays.length > 0 && (
              <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Upcoming Holidays</h2>
                  <button
                    onClick={() => setShowHolidaysPopup(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    See All Holidays <FiChevronRight className="ml-1" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {upcomingHolidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="bg-white p-3 rounded-md shadow-sm border-l-4 border-red-500"
                    >
                      <div className="font-medium">{holiday.title}</div>
                      <div className="text-sm text-gray-600">
                        {format(parseISO(holiday.date), "MMMM d, yyyy")}
                      </div>
                      {holiday.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {holiday.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Calendar Grid */}
            {/* <div className="grid grid-cols-7 gap-1 mb-6">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold py-2">
                  {day}
                </div>
              ))}

              {daysArray.map((day, index) => {
                const dayEvents = getDayEvents(day).filter((ev) => {
                  if (activeTab === "holidays") return ev.type === "holiday";
                  return ev.type === "note" || ev.type === "meeting";
                });
                return (
                  <div
                    key={day ? day.toString() : `empty-${index}`}
                    className={`p-2 bg-slate-200 border border-gray-300 shadow-sm inset-shadow-sm rounded-md min-h-32 ${
                      !day
                        ? "bg-transparent"
                        : isToday(day)
                        ? "bg-slate-500 text-white"
                        : !isSameMonth(day, currentDate)
                        ? "bg-gray-100 text-gray-400"
                        : "hover:bg-slate-600 hover:transition ease-in-out hover:scale-105 hover:delay-100 hover:text-white"
                    }`}
                  >
                    {day && (
                      <>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">
                            {format(day, "d")}
                          </span>
                          {dayEvents.length > 0 && activeTab === "notes" && (
                            <button
                              onClick={() => {
                                setFormData({ ...dayEvents[0] });
                                setShowModal(true);
                              }}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <FiEdit2 size={14} />
                            </button>
                          )}
                        </div>

                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`mt-1 text-xs p-1 rounded truncate ${
                              event.type === "holiday"
                                ? "bg-green-100 text-green-600 font-semibold"
                                : event.type === "meeting"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div> */}

            <div className="grid grid-cols-7 gap-1 mb-6">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold py-2">
                  {day}
                </div>
              ))}

              {daysArray.map((day, index) => {
                const dayEvents = getDayEvents(day).filter((ev) => {
                  if (activeTab === "holidays") return ev.type === "holiday";
                  return ev.type === "note" || ev.type === "meeting";
                });

                return (
                  <div
                    key={
                      day
                        ? `${format(day, "yyyy-MM-dd")}-${index}`
                        : `empty-${index}`
                    }
                    className={`p-2 bg-slate-200 border border-gray-300 shadow-sm rounded-md min-h-32 cursor-pointer ${
                      !day
                        ? "bg-transparent"
                        : isToday(day)
                        ? "bg-slate-500 text-white"
                        : !isSameMonth(day, currentDate)
                        ? "bg-gray-100 text-gray-400"
                        : "hover:bg-slate-600 hover:transition ease-in-out hover:scale-105 hover:delay-100 hover:text-white"
                    }`}
                    onClick={() => {
                      if (day && dayEvents.length > 0) {
                        setSelectedDay(day);
                        setSelectedEvents(dayEvents);
                        setShowDateModal(true);
                      }
                    }}
                  >
                    {day && (
                      <>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">
                            {format(day, "d")}
                          </span>
                          {dayEvents.length > 0 && activeTab === "notes" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering modal when editing
                                setFormData({ ...dayEvents[0] });
                                setShowDateModal(true);
                              }}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <FiEdit2 size={14} />
                            </button>
                          )}
                        </div>

                        {dayEvents.map((event, eventIndex) => (
                          <div
                            key={`${event.id}-${eventIndex}`}
                            className={`mt-1 text-xs p-1 rounded truncate ${
                              event.type === "holiday"
                                ? "bg-green-100 text-green-600 font-semibold"
                                : event.type === "meeting"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal for displaying event details */}
            {showDateModal && selectedDay && (
              <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  <h2 className="text-lg font-semibold mb-4">
                    Events on {format(selectedDay, "PPP")}
                  </h2>
                  <ul>
                    {selectedEvents.map((event, idx) => (
                      <li
                        key={`${event.id}-${idx}`}
                        className={`p-2 rounded-md mb-2 ${
                          event.type === "holiday"
                            ? "bg-green-100 text-green-600"
                            : event.type === "meeting"
                            ? "bg-purple-50 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <p className="font-semibold text-lg">{event.title}</p>
                        <p className="text-xs">
                          Event Type:{" "}
                          <span className="font-medium">{event.type}</span>
                        </p>
                        <p className="text-xs">
                          Date:{" "}
                          <span className="font-medium">
                            {format(event.date, "dd-MM-yyyy")}
                          </span>
                        </p>
                        {event.type !== "holiday" && (
                          <p className="text-xs">
                            Time UTC:{" "}
                            <span className="font-medium">
                              {event.time || "--:--"}
                            </span>
                          </p>
                        )}
                        {event.description && (
                          <p className="text-xs mt-1">
                            Description:{" "}
                            <span className="italic">{event.description}</span>
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Month's Events List */}
            {/* <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {format(currentDate, "MMMM yyyy")}{" "}
                  {activeTab === "holidays" ? "Holidays" : "My Events"}
                </h2>
                {getCurrentMonthEvents().length > 3 && (
                  <button
                    onClick={() => setShowAllEvents(!showAllEvents)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {showAllEvents ? "Show Less" : "See More"}{" "}
                    <FiChevronRight className="ml-1" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {(showAllEvents
                  ? getCurrentMonthEvents()
                  : getCurrentMonthEvents().slice(0, 3)
                )
                  .sort((a, b) => parseISO(a.date) - parseISO(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                    >
                      <div>
                        <span className="font-medium">{event.title}</span>
                        <div className="text-sm text-gray-500">
                          {format(parseISO(event.date), "MMMM d, yyyy")}
                          {event.type === "holiday" ? (
                            <span className="ml-2 text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                              Holiday
                            </span>
                          ) : event.type === "meeting" ? (
                            <span className="ml-2 text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                              Meeting
                            </span>
                          ) : (
                            <span className="ml-2 text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                              Note
                            </span>
                          )}
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-600 mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                      {(event.type === "note" || event.type === "meeting") && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setFormData({ ...event });
                              setShowModal(true);
                            }}
                            className="text-gray-500 hover:text-blue-600 p-1"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div> */}
          </div>
        </main>
      </div>

      {/* Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm backdrop-opacity-95">
          <div className="bg-slate-200 p-6 border border-gray-400 shadow-2xl rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {formData.id ? "Edit" : "Add"}{" "}
              {formData.type === "holiday"
                ? "Holiday"
                : formData.type === "meeting"
                ? "Meeting"
                : "Note"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {activeTab === "notes" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="meeting">Meeting</option>
                      <option value="note">Note</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time UTC*
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {formData.id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* All Holidays Popup */}
      {showHolidaysPopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                All Holidays ({new Date().getFullYear()})
              </h2>
              <button
                onClick={() => setShowHolidaysPopup(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4">
              {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
                <div key={month} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">{month}</h3>
                  <div className="space-y-2">
                    {monthHolidays.map((holiday) => (
                      <div
                        key={holiday.id}
                        className="p-3 bg-gray-50 rounded-md border"
                      >
                        <div className="font-medium">{holiday.title}</div>
                        <div className="text-sm text-gray-600">
                          {format(parseISO(holiday.date), "EEEE, MMMM d, yyyy")}
                        </div>
                        {holiday.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {holiday.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Image Modal */}
      {isProfileModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeProfileModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={closeProfileModal}
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

export default Calendar;
