import React from "react";
import { motion } from "framer-motion";

function Contact_us() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="mx-5 rounded-2xl mb-5 py-10 bg-yellow-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Contact HR Management Team
          </h2>
          <motion.p
            className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500"
            variants={fadeInUp}
          >
            Get in touch with our HR team for any queries regarding employee
            onboarding, payroll, company policies, or career opportunities.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto mt-12 sm:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={staggerContainer}
        >
          <motion.div
            className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3"
            variants={staggerContainer}
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="overflow-hidden bg-white rounded-xl"
                variants={cardVariants}
              >
                <div className="p-6">
                  {index === 0 && (
                    <svg
                      className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                  <p className="mt-6 text-lg font-medium text-gray-900">
                    {index === 0 && "+1-800-HR-SUPPORT\n+1-800-123-4567"}
                    {index === 1 && "hr@company.com\nsupport@hrportal.com"}
                    {index === 2 &&
                      "HR Department, 4th Floor, Tower A,\nBusiness Hub, NY 10001"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 overflow-hidden bg-white rounded-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={fadeInUp}
          >
            <div className="px-6 py-12 sm:p-12">
              <h3 className="text-3xl font-semibold text-center text-gray-900">
                Send a Message to HR
              </h3>

              <form action="#" method="POST" className="mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Email Address{" "}
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Phone Number{" "}
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Department / Company{" "}
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="text"
                        placeholder="Enter your department or company"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Message{" "}
                    </label>
                    <div className="mt-2.5 relative">
                      <textarea
                        placeholder="Describe your HR-related query or concern"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700"
                    >
                      Submit to HR
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact_us;
