import React from "react";
import { motion } from "framer-motion";

function Pricing() {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="pricing"
      className="py-10 bg-pink-50 sm:py-16 lg:py-24 rounded-2xl my-5 mx-5"
    >
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Triggers when any part of the element is in view
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Pricing & Plans for HR Management
          </h2>
          <motion.p
            className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600"
            variants={fadeInUp}
          >
            Streamline your HR processes with Efficio's scalable plans designed
            for employee management, payroll, and performance tracking.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 text-center lg:max-w-full lg:mt-16 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Triggers when any part of the grid is in view
          variants={staggerContainer}
        >
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              className={`overflow-hidden bg-white border-2 border-gray-100 rounded-md ${
                index === 1 ? "shadow-lg" : ""
              }`}
              variants={cardVariants}
            >
              <div className="p-8 xl:px-12">
                <h3 className="text-base font-semibold text-purple-600">
                  {index === 0 ? "Basic" : index === 1 ? "Pro" : "Enterprise"}
                </h3>
                <p className="text-5xl font-bold text-black mt-7">
                  ${index === 0 ? "29" : index === 1 ? "49" : "79"}
                </p>
                <p className="mt-3 text-base text-gray-600">Per month</p>

                <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                  {[
                    ` ${
                      index === 0 ? "50" : index === 1 ? "200" : "Unlimited"
                    } Employee Records`,
                    index === 0
                      ? "Basic Payroll Processing"
                      : "Automated Payroll",
                    "Real-Time Attendance Monitoring",
                    index === 0
                      ? "Attendance Tracking"
                      : "Advanced Attendance Tracking",
                    index === 0
                      ? "Email Support"
                      : index === 1
                      ? "Live Chat Support"
                      : "24/7 Priority Support",
                    index === 2
                      ? "24/7 Priority Support"
                      : index === 1
                      ? "Performance Analytics"
                      : "",
                  ].map(
                    (item, i) =>
                      item && (
                        <li
                          key={i}
                          className="inline-flex items-center space-x-2"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-indigo-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            className={`text-base font-medium text-gray-900 ${
                              index === 1 && i === 5
                                ? "pb-0.5 border-b border-black border-dashed"
                                : ""
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      )
                  )}
                </ul>

                <motion.a
                  href="#"
                  title=""
                  className={`inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 rounded-md ${
                    index === 1
                      ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                      : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                  }`}
                  role="button"
                  whileHover={{ scale: 1.05 }} // Slight scale on hover
                  whileTap={{ scale: 0.95 }} // Slight scale on click
                >
                  Get Started
                </motion.a>
                <p className="mt-4 text-sm text-gray-500">
                  14 Days Moneyback Guarantee
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
