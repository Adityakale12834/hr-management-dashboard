import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  if (location.pathname === "/signup") {
    return <>{children}</>; // Render only children without Navbar
  }

  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
