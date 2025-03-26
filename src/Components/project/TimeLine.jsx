import React from "react";

const events = [
  {
    time: "09:00",
    title: "Cisco Weekly Meeting",
    color: "bg-black text-white",
  },
  {
    time: "09:20",
    title: "Interview With UI Designer",
    color: "bg-purple-600 text-white",
  },
  {
    time: "10:15",
    title: "Aisles Weekly Meeting with Client",
    color: "bg-teal-500 text-white",
  },
  { time: "11:15", title: "Exploration Meeting", color: "bg-black text-white" },
];

const getStackedEvents = (events) => {
  let rows = [];
  events.forEach((event) => {
    let placed = false;
    for (let row of rows) {
      if (row[row.length - 1].time < event.time) {
        row.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) rows.push([event]);
  });
  return rows;
};

const stackedEvents = getStackedEvents(events);

const TimelineProject = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Timeline Project</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-gray-200 rounded-md">
            Daily View
          </button>
          <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md">
            Add Task
          </button>
        </div>
      </div>

      {/* Time Labels */}
      <div className="flex justify-between text-sm text-gray-600 border-b pb-2 mb-2">
        {["09.00", "09.30", "10.00", "10.30", "11.00", "11.30"].map((time) => (
          <span key={time} className="w-1/6 text-center">
            {time}
          </span>
        ))}
      </div>

      {/* Timeline Grid */}
      <div className="relative bg-gray-50 rounded-lg p-4">
        {stackedEvents.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2 mb-2">
            {row.map((event, index) => (
              <div
                key={index}
                className={`relative px-3 py-2 rounded-md text-sm ${event.color}`}
              >
                <span className="absolute -top-4 left-2 text-xs font-semibold">
                  {event.time}
                </span>
                {event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineProject;
