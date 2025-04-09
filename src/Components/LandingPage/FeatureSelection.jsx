import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="features"
      className="bg-gradient-to-b from-yellow-100 to-yellow-100 min-h-screen py-16 mx-5 rounded-2xl"
    >
      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="container max-w-7xl mx-auto px-4 text-center"
      >
        <h2 className="text-yellow-600 text-sm font-semibold uppercase mb-2">
          Features
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Powerful Tools to Streamline Your HR Operations
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Simplify employee management with automated onboarding, digital
          document storage, real-time performance tracking, and seamless payroll
          processing—all from one dashboard.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Explore Dashboard
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-1"></span>
                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full"></span>
              </div>
              {i === 0 ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Easy Employee Onboarding
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 p-4 mb-4 text-center h-52 flex items-center justify-center">
                    <p className="text-gray-500">
                      Upload resumes, contracts & ID proofs in one place
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Automate the onboarding process with smart checklists,
                    document uploads, and welcome emails.
                  </p>
                </>
              ) : (
                <>
                  <img
                    src="2nd.png"
                    alt="Payroll illustration"
                    className="mb-4"
                  />
                  <p className="text-gray-600 text-sm mb-4">
                    Manage payroll, tax deductions, and payslips with a
                    click—ensuring compliance and timely payments.
                  </p>
                </>
              )}
              <a href="#" className="text-purple-600 text-sm hover:underline">
                Learn More
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
