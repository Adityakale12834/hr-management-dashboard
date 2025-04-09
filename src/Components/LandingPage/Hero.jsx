import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-slate-50 to-purple-300 min-h-screen flex flex-col items-center justify-center mx-5 rounded-2xl my-5"
    >
      <div className="container mx-auto px-4 text-center mt-22 mb-5">
        <p className="text-purple-600 font-semibold mb-2">
          NEW Payroll for All Your Employees
        </p>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Simplify Payroll <br /> Empower Your Workforce
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage payroll for full-time and contract employees seamlessly <br />{" "}
          with our intuitive HR dashboard.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
            Get Started
          </button>
        </div>
      </div>
      <div className="relative w-full max-w-5xl h-full mx-auto rounded-lg overflow-hidden">
        <img
          className="overflow-hidden my-10 w-5xl rounded-lg"
          src="/hero-image.png"
          alt="hero"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/100" />
    </section>
  );
};

export default Hero;
