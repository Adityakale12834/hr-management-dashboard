// src/components/TodayActivity.jsx
import React, { useRef } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

// Dummy activity data
const activities = [
  { action: "Punch In", time: "10:00 AM" },
  { action: "Punch Out", time: "11:00 AM" },
  { action: "Punch In", time: "11:30 AM" },
  { action: "Punch Out", time: "01:30 PM" },
  { action: "Punch In", time: "02:30 PM" },
  { action: "Punch Out", time: "07:00 PM" },
  { action: "Punch In", time: "08:30 PM" },
  { action: "Punch Out", time: "09:30 PM" },
];

const TodayActivity = () => {
  const scrollRef = useRef(null);

  // Scroll down to see more activities
  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 150,
        behavior: "smooth",
      });
    }
  };

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: -150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md w-full max-w-md">
      {/* Header Section */}
      <h3 className="text-blue-500 text-lg font-semibold mb-4">
        Today Activity
      </h3>

      {/* Activity Timeline with Scrollable Area */}
      <div className="relative space-y-6">
        {/* Vertical Chain/Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4"
        >
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative flex items-start space-x-4 bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              {/* Icon Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-white shadow-md ${
                  activity.action === "Punch In" ? "bg-green-500" : "bg-red-500"
                } relative z-10`}
              >
                {activity.action === "Punch In" ? (
                  <FaSignInAlt className="text-white text-sm" />
                ) : (
                  <FaSignOutAlt className="text-white text-sm" />
                )}
              </div>

              {/* Activity Content */}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-between mt-3">
          <button
            onClick={scrollUp}
            className="px-3 py-1 bg-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-300"
          >
            ⬆ Scroll Up
          </button>
          <button
            onClick={scrollDown}
            className="px-3 py-1 bg-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-300"
          >
            ⬇ Scroll Down
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayActivity;
