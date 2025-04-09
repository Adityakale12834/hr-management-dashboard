import React from "react";

function Pricing() {
  return (
    <section
      id="pricing"
      className="py-10 bg-pink-50 sm:py-16 lg:py-24 rounded-2xl my-5 mx-5"
    >
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Pricing & Plans for HR Management
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Streamline your HR processes with Efficio's scalable plans designed
            for employee management, payroll, and performance tracking.
          </p>
        </div>

        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 text-center lg:max-w-full lg:mt-16 lg:grid-cols-3">
          <div className="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
            <div className="p-8 xl:px-12">
              <h3 className="text-base font-semibold text-purple-600">Basic</h3>
              <p className="text-5xl font-bold text-black mt-7">$29</p>
              <p className="mt-3 text-base text-gray-600">Per month</p>

              <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    50 Employee Records{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Basic Payroll Processing{" "}
                  </span>
                </li>
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Real-Time Attendance Monitoring{" "}
                  </span>
                </li>
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Real-Time Attendance Monitoring{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Attendance Tracking{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Email Support{" "}
                  </span>
                </li>
              </ul>

              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                role="button"
              >
                Get Started
              </a>
              <p className="mt-4 text-sm text-gray-500">
                14 Days Moneyback Guarantee
              </p>
            </div>
          </div>

          <div className="overflow-hidden bg-white border-2 border-gray-100 rounded-md shadow-lg">
            <div className="p-8 xl:px-12">
              <h3 className="text-base font-semibold text-purple-600">Pro</h3>
              <p className="text-5xl font-bold text-black mt-7">$49</p>
              <p className="mt-3 text-base text-gray-600">Per month</p>

              <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    200 Employee Records{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Automated Payroll{" "}
                  </span>
                </li>
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Real-Time Attendance Monitoring{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Advanced Attendance Tracking{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Live Chat Support{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed">
                    {" "}
                    Performance Analytics{" "}
                  </span>
                </li>
              </ul>

              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                role="button"
              >
                Get Started
              </a>
              <p className="mt-4 text-sm text-gray-500">
                14 Days Moneyback Guarantee
              </p>
            </div>
          </div>

          <div className="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
            <div className="p-8 xl:px-12">
              <h3 className="text-base font-semibold text-purple-600">
                Enterprise
              </h3>
              <p className="text-5xl font-bold text-black mt-7">$79</p>
              <p className="mt-3 text-base text-gray-600">Per month</p>

              <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Unlimited Employee Records{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Advanced Payroll Automation{" "}
                  </span>
                </li>
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Real-Time Attendance Monitoring{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    Real-Time Attendance Monitoring{" "}
                  </span>
                </li>

                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    24/7 Priority Support{" "}
                  </span>
                </li>
                <li className="inline-flex items-center space-x-2">
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
                  <span className="text-base font-medium text-gray-900">
                    {" "}
                    24/7 Priority Support{" "}
                  </span>
                </li>
              </ul>

              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                role="button"
              >
                Get Started
              </a>
              <p className="mt-4 text-sm text-gray-500">
                14 Days Moneyback Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
