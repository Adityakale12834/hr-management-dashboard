// src/components/EmployeeTree.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";

// Updated sample data with more fields
const orgChartData = {
  name: "Aditya Kale",
  attributes: {
    title: "CEO",
    email: "Aditya.kale@example.com",
    phone: "+1-234-567-8900",
    department: "Management",
  },
  children: [
    {
      name: "Mayur Satone",
      attributes: {
        title: "CTO",
        email: "Mayur.satone@example.com",
        phone: "+1-987-654-3210",
        department: "Technology",
      },
      children: [
        {
          name: "Atharv Darvekar",
          attributes: {
            title: "Finance Manager",
            email: "Atharv.darvekar@example.com",
            phone: "+1-555-123-4567",
            department: "Finance",
          },
        },
        {
          name: "Siddhesh Mahulkar",
          attributes: {
            title: "Accountant",
            email: "Siddhesh.Mahulkar@example.com",
            phone: "+1-444-987-6543",
            department: "Finance",
          },
        },
        {
          name: "Amélie Dubois",
          attributes: {
            title: "Security Analyst",
            email: "Amélie.Dubois@example.com",
            phone: "+1-333-876-5432",
            department: "Security",
          },
        },
      ],
    },
    {
      name: "Nikolai Petrov",
      attributes: {
        title: "COO",
        email: "Nikolai.Petrov@example.com",
        phone: "+1-888-222-3333",
        department: "Operations",
      },
      children: [
        {
          name: "Leila Al-Farsi",
          attributes: {
            title: "Operations Manager",
            email: "Leila.Al.Farsi@example.com",
            phone: "+1-111-222-3334",
            department: "Operations",
          },
        },
        {
          name: "Elias Schneider",
          attributes: {
            title: "Logistics Coordinator",
            email: "Elias.Schneider@example.com",
            phone: "+1-222-333-4445",
            department: "Logistics",
          },
        },
      ],
    },
    {
      name: "Rafael Costa",
      attributes: {
        title: "CFO",
        email: "Rafael.Costa@example.com",
        phone: "+1-777-555-6666",
        department: "Finance",
      },
      children: [
        {
          name: "Ingrid Bjornsson",
          attributes: {
            title: "Treasury Head",
            email: "Ingrid.Bjornsson@example.com",
            phone: "+1-444-666-7777",
            department: "Finance",
          },
        },
        {
          name: "Karim Haddad",
          attributes: {
            title: "Risk Analyst",
            email: "Karim.Haddad@example.com",
            phone: "+1-999-888-7776",
            department: "Risk Management",
          },
        },
      ],
    },
  ],
};

// Node colors based on position
const getNodeColor = (title) => {
  switch (title) {
    case "CEO":
      return "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg";
    case "CTO":
      return "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg";
    case "COO":
      return "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg";
    case "CFO":
      return "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow-lg";
    case "Finance Manager":
    case "Treasury Head":
      return "bg-gradient-to-r from-teal-600 to-teal-400 text-white shadow-lg";
    case "Accountant":
    case "Risk Analyst":
      return "bg-gradient-to-r from-orange-500 to-orange-300 text-white shadow-lg";
    case "Security Analyst":
    case "Logistics Coordinator":
      return "bg-gradient-to-r from-red-600 to-red-400 text-white shadow-lg";
    case "Operations Manager":
      return "bg-gradient-to-r from-indigo-600 to-indigo-400 text-white shadow-lg";
    default:
      return "bg-gradient-to-r from-gray-300 to-gray-100 text-gray-800 shadow-md";
  }
};

// Avatar initials generator
const getInitials = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials;
};

// Custom render function for tree nodes
const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  const colorClass = getNodeColor(nodeDatum.attributes?.title);

  return (
    <foreignObject width="300" height="150" x="-150" y="-50">
      <div
        onClick={toggleNode}
        className={`flex items-center ${colorClass} cursor-pointer border border-gray-300 rounded-full shadow-lg p-4 transition-all transform`}
      >
        {/* Circular Avatar with Initials */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-700 border-2 border-gray-300 shadow-md">
          {getInitials(nodeDatum.name)}
        </div>

        {/* Employee Info on the Right */}
        <div className="ml-4 text-left text-white">
          <h3 className="text-lg font-semibold">{nodeDatum.name}</h3>
          {nodeDatum.attributes?.title && (
            <p className="text-sm opacity-90">{nodeDatum.attributes.title}</p>
          )}
          {nodeDatum.attributes?.email && (
            <p className="text-xs opacity-75">
              <a
                href={`mailto:${nodeDatum.attributes.email}`}
                className="underline hover:text-blue-200"
              >
                {nodeDatum.attributes.email}
              </a>
            </p>
          )}
          {nodeDatum.attributes?.phone && (
            <p className="text-xs opacity-75">{nodeDatum.attributes.phone}</p>
          )}
          {nodeDatum.attributes?.department && (
            <p className="text-xs opacity-75">
              {nodeDatum.attributes.department}
            </p>
          )}
        </div>
      </div>
    </foreignObject>
  );
};

const EmployeeTree = () => {
  const treeContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Adjust tree size dynamically based on container size
  useEffect(() => {
    if (treeContainerRef.current) {
      setDimensions({
        width: treeContainerRef.current.offsetWidth,
        height: treeContainerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div
      ref={treeContainerRef}
      className="w-full h-screen bg-gradient-to-br overflow-hidden p-5"
    >
      <Tree
        data={orgChartData}
        orientation="vertical"
        collapsible={true}
        translate={{ x: dimensions.width / 2, y: 100 }}
        pathFunc="diagonal"
        nodeSize={{ x: 260, y: 170 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        zoomable={true}
        initialDepth={1}
        renderCustomNodeElement={(rd3tProps) => renderCustomNode(rd3tProps)}
      />
    </div>
  );
};

export default EmployeeTree;
