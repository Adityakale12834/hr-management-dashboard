import React from "react";
import { Search, Bell, Info, Square } from "lucide-react";

function Horizontal_Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 sm:ml-64 z-50">
      {/* Left Section - Logo and Name */}
      {/* <div className="flex items-center space-x-3">
        <div className="text-blue-500 text-2xl font-bold">+</div>
        <span className="text-gray-900 text-lg font-semibold">Efficio</span>
      </div> */}

      {/* Middle Section - Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-14 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm bg-white px-2 py-1 rounded-lg border border-gray-300">
          ⌘ K
        </span>
      </div>

      {/* Right Section - Icons */}
      <div className="items-center space-x-2 hidden sm:flex">
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <Info className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <Square className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </nav>
  );
}

export default Horizontal_Nav;
