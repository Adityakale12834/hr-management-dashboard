import React, { useState } from "react";
import { motion } from "framer-motion";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How to create an employee profile?",
      answer:
        "Navigate to the 'Employees' section in the dashboard and click on 'Add Employee'. Fill out the required details like name, email, department, and role.",
    },
    {
      question: "How to approve leave requests?",
      answer:
        "Go to the 'Leave Requests' tab. You'll see all pending requests. Click 'Approve' or 'Reject' based on the request details and your discretion.",
    },
    {
      question: "Can I generate attendance reports?",
      answer:
        "Yes, the HR dashboard allows you to generate daily, weekly, and monthly attendance reports from the 'Reports' section.",
    },
    {
      question: "How can I assign roles to employees?",
      answer:
        "Under 'Employees', select the employee you want to manage. In their profile, choose 'Edit' and update their assigned role.",
    },
    // {
    //   question: "Is there a way to track employee performance?",
    //   answer:
    //     "Yes, the 'Performance' module helps you set goals, collect feedback, and conduct performance reviews periodically.",
    // },
    // {
    //   question: "How secure is employee data?",
    //   answer:
    //     "All data in the HR Management System is encrypted and stored securely. Role-based access ensures only authorized personnel can view or edit sensitive data.",
    // },
    // {
    //   question: "Can I integrate the HR system with payroll software?",
    //   answer:
    //     "Yes, our system supports integration with popular payroll tools via APIs, ensuring smooth data synchronization.",
    // },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child's animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="mx-5 mt-5 rounded-2xl py-10 bg-blue-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Triggers when any part is in view
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <motion.p
            className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600"
            variants={fadeInUp}
          >
            Find answers to the most common queries below.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mt-8 space-y-8 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Triggers when any part of the FAQ list is in view
          variants={staggerContainer}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="transition-all duration-300 bg-white border border-gray-200 shadow-md cursor-pointer hover:bg-gray-50 hover:shadow-none"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "linear-gradient(0 12px 20px pink,0 0 15px rgba(255, 0, 122, 0.5), 0 0 45px rgba(0, 255, 128, 0.3))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
              variants={itemVariants}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex text-lg font-semibold text-black">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-gray-600 text-base mt-9"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={fadeInUp}
        >
          Didn’t find the answer you are looking for?{" "}
          <a
            href="#"
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
          >
            Contact our support
          </a>
        </motion.p>
      </div>
    </section>
  );
}

export default Faq;
